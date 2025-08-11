'use client'

import { useState, useEffect } from 'react'

interface MegaConfig {
    sharedFolderUrl: string | null
    uploadUrl: string | null
    hasSharedFolder: boolean
    hasUploadUrl: boolean
}

export function useMegaConfig() {
    const [config, setConfig] = useState<MegaConfig | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadConfig = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch('/api/mega/config')

                if (!response.ok) {
                    throw new Error('Failed to load MEGA configuration')
                }

                const data = await response.json()
                setConfig(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                console.error('Failed to load MEGA config:', err)
            } finally {
                setLoading(false)
            }
        }

        loadConfig()
    }, [])

    return {
        config,
        loading,
        error
    }
} 