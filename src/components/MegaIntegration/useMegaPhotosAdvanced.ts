'use client'

import { useState, useEffect } from 'react'
import { Photo } from '@/types/photo'

interface UseMegaPhotosAdvancedProps {
    config: {
        email?: string
        password?: string
        folderId?: string
        mfaCode?: string
        sharedFolderUrl?: string
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

export function useMegaPhotosAdvanced({ config, refreshInterval = 300000 }: UseMegaPhotosAdvancedProps) {
    const [megaPhotos, setMegaPhotos] = useState<Photo[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [requiresMFA, setRequiresMFA] = useState(false)
    const [connectionType, setConnectionType] = useState<'shared' | 'account' | null>(null)

    const loadMegaPhotos = async () => {
        setLoading(true)
        setError(null)
        setRequiresMFA(false)

        try {
            let response: Response
            let apiUrl: string

            // Determine which API to use
            if (config.sharedFolderUrl && config.sharedFolderUrl.trim() !== '') {
                // Parse the MEGA URL to separate base URL and hash
                const megaUrl = config.sharedFolderUrl
                const hashIndex = megaUrl.indexOf('#')

                if (hashIndex !== -1) {
                    const baseUrl = megaUrl.substring(0, hashIndex)
                    const hash = megaUrl.substring(hashIndex + 1)
                    apiUrl = `/api/mega/shared/stream?folderUrl=${encodeURIComponent(baseUrl)}&hash=${encodeURIComponent(hash)}`
                } else {
                    apiUrl = `/api/mega/shared/stream?folderUrl=${encodeURIComponent(config.sharedFolderUrl)}`
                }

                setConnectionType('shared')
            } else if (config.email && config.password) {
                // Use account-based API
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

                apiUrl = `/api/mega?${params.toString()}`
                setConnectionType('account')
            } else {
                // No valid configuration provided
                setError('Keine MEGA-Konfiguration gefunden. Bitte Shared Folder URL oder Credentials hinzufügen.')
                setLoading(false)
                return
            }

            response = await fetch(apiUrl)

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
        // Only load if we have valid configuration
        if (config.sharedFolderUrl || (config.email && config.password)) {
            loadMegaPhotos()

            // Set up refresh interval
            const interval = setInterval(loadMegaPhotos, refreshInterval)

            // Cleanup
            return () => {
                clearInterval(interval)
            }
        }
    }, [config.sharedFolderUrl, config.email, config.password, config.folderId, config.mfaCode])

    return {
        megaPhotos,
        loading,
        error,
        requiresMFA,
        connectionType,
        refresh: loadMegaPhotos
    }
} 