'use client'

import { useState, useEffect } from 'react'
import { MegaApi, MegaFile } from '@/utils/megaHelpers'
import { Photo } from '@/types/photo'

interface UseMegaPhotosProps {
    config: {
        email: string
        password: string
        folderId?: string
    }
    refreshInterval?: number // in milliseconds
}

export function useMegaPhotos({ config, refreshInterval = 300000 }: UseMegaPhotosProps) {
    const [megaPhotos, setMegaPhotos] = useState<Photo[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [megaApi] = useState(() => new MegaApi())

    const loadMegaPhotos = async () => {
        setLoading(true)
        setError(null)

        try {
            // Connect to MEGA
            await megaApi.connect(config)

            // Get latest images
            const latestFiles = await megaApi.getLatestImages(config.folderId, 2)

            // Convert to Photo format
            const photos: Photo[] = await Promise.all(
                latestFiles.map(async (file, index) => {
                    const downloadUrl = await megaApi.getDownloadUrl(file)

                    return {
                        id: `mega-${index + 1}`,
                        url: downloadUrl,
                        alt: file.name,
                        uploadedAt: new Date(file.timestamp * 1000),
                        uploadedBy: 'MEGA',
                        position: 4 + index, // Start from position 4
                        x: 300 + (index * 100), // Position 4th and 5th photo
                        y: 200 + (index * 50),
                        size: 'medium' as const,
                        source: 'mega' as const
                    }
                })
            )

            setMegaPhotos(photos)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
            console.error('Failed to load MEGA photos:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMegaPhotos()

        // Set up refresh interval
        const interval = setInterval(loadMegaPhotos, refreshInterval)

        // Cleanup
        return () => {
            clearInterval(interval)
            megaApi.disconnect()
        }
    }, [config.email, config.password, config.folderId])

    return {
        megaPhotos,
        loading,
        error,
        refresh: loadMegaPhotos
    }
} 