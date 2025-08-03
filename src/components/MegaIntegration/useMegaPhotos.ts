'use client'

import { useState, useEffect } from 'react'
import { Photo } from '@/types/photo'

interface UseMegaPhotosProps {
    config: {
        email: string
        password: string
        folderId?: string
        mfaCode?: string
    }
    refreshInterval?: number // in milliseconds
}

interface MegaApiResponse {
    images: Array<{
        id: string
        name: string
        fileSize: number
        timestamp: number
        downloadUrl: string
        position: number
        x: number
        y: number
        size: 'small' | 'medium' | 'large'
        source: 'mega'
    }>
}

export function useMegaPhotos({ config, refreshInterval = 300000 }: UseMegaPhotosProps) {
    const [megaPhotos, setMegaPhotos] = useState<Photo[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [requiresMFA, setRequiresMFA] = useState(false)

    const loadMegaPhotos = async () => {
        setLoading(true)
        setError(null)

        try {
            // Build API URL with query parameters
            const params = new URLSearchParams({
                email: config.email,
                password: config.password
            })

            if (config.folderId) {
                params.append('folderId', config.folderId)
            }

            if (config.mfaCode) {
                params.append('mfaCode', config.mfaCode)
            }

            const response = await fetch(`/api/mega?${params.toString()}`)

            if (!response.ok) {
                const errorData = await response.json()

                // Check if MFA is required
                if (errorData.requiresMFA) {
                    setRequiresMFA(true)
                    setError('Multi-Factor Authentication Required')
                    return
                }

                // Check for EFAILED error
                if (errorData.error && errorData.error.includes('EFAILED')) {
                    setError('MEGA connection failed - please check credentials and try again')
                    return
                }

                throw new Error(errorData.error || 'Failed to fetch MEGA images')
            }

            const data: MegaApiResponse = await response.json()

            // Convert API response to Photo format
            const photos: Photo[] = data.images.map(image => ({
                id: image.id,
                url: image.downloadUrl,
                alt: image.name,
                uploadedAt: new Date(image.timestamp * 1000),
                uploadedBy: 'MEGA',
                position: image.position,
                x: image.x,
                y: image.y,
                size: image.size,
                source: 'mega'
            }))

            setMegaPhotos(photos)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
            console.error('Failed to load MEGA photos:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Only load if we have credentials
        if (config.email && config.password) {
            loadMegaPhotos()

            // Set up refresh interval
            const interval = setInterval(loadMegaPhotos, refreshInterval)

            // Cleanup
            return () => {
                clearInterval(interval)
            }
        }
    }, [config.email, config.password, config.folderId])

    return {
        megaPhotos,
        loading,
        error,
        requiresMFA,
        refresh: loadMegaPhotos
    }
} 