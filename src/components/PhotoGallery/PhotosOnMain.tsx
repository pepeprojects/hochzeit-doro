'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import PhotoCard from './PhotoCard'
import { Photo } from '@/types/photo'
import { useMegaPhotosAdvanced } from '@/components/MegaIntegration/useMegaPhotosAdvanced'
import { useMegaConfig } from '@/components/MegaIntegration/useMegaConfig'

// Mock-Daten für Demo-Zwecke
const mockPhotos: Photo[] = [
    {
        id: '1',
        url: '/WhatsApp Image 2025-07-15 at 20.03.19.jpeg',
        alt: 'Hochzeitsfoto 1',
        uploadedAt: new Date(),
        uploadedBy: 'Gast 1',
        position: 1,
        x: 50,
        y: 200,
        size: 'medium',
        source: 'local'
    },
    {
        id: '2',
        url: '/titlebanner.jpg',
        alt: 'Hochzeitsfoto 2',
        uploadedAt: new Date(),
        uploadedBy: 'Gast 2',
        position: 2,
        x: 1100,
        y: 400,
        size: 'large',
        source: 'local'
    },
    {
        id: '3',
        url: '/background.png',
        alt: 'Hochzeitsfoto 3',
        uploadedAt: new Date(),
        uploadedBy: 'Gast 3',
        position: 3,
        x: 150,
        y: 400,
        size: 'small',
        source: 'local'
    },
    // 4. Bild für MEGA Integration
    {
        id: '4',
        url: '/placeholder-mega.jpg', // Placeholder bis MEGA lädt
        alt: 'MEGA Foto 1',
        uploadedAt: new Date(),
        uploadedBy: 'MEGA',
        position: 4,
        x: 300,
        y: 200,
        size: 'medium',
        source: 'mega'
    }
]

export default function PhotosOnMain() {
    const [photos, setPhotos] = useState<Photo[]>(mockPhotos)

    // Sichere MEGA-Konfiguration laden
    const { config: megaConfig, loading: configLoading, error: configError } = useMegaConfig()

    // MEGA Integration - Shared Folder (Empfohlen)
    const { megaPhotos, loading, error, requiresMFA, connectionType } = useMegaPhotosAdvanced({
        config: {
            sharedFolderUrl: megaConfig?.sharedFolderUrl || undefined
        },
        refreshInterval: 300000 // 5 Minuten
    })

    const handleClosePhoto = (id: string) => {
        setPhotos(prev => prev.filter(photo => photo.id !== id))
    }

    // Update photos when MEGA photos load
    useEffect(() => {
        if (megaPhotos.length > 0) {
            setPhotos(prev => {
                // Remove existing MEGA photos
                const localPhotos = prev.filter(photo => photo.source !== 'mega')
                // Add new MEGA photos
                return [...localPhotos, ...megaPhotos]
            })
        }
    }, [megaPhotos])

    // Speichere Fotos in localStorage (nur lokale Fotos)
    useEffect(() => {
        const localPhotos = photos.filter(photo => photo.source !== 'mega')
        localStorage.setItem('hochzeit-photos', JSON.stringify(localPhotos))
    }, [photos])

    // Load saved photos from localStorage
    useEffect(() => {
        const savedPhotos = localStorage.getItem('hochzeit-photos')
        if (savedPhotos) {
            try {
                const parsed = JSON.parse(savedPhotos)
                setPhotos(prev => {
                    const megaPhotos = prev.filter(photo => photo.source === 'mega')
                    return [...parsed, ...megaPhotos]
                })
            } catch (error) {
                console.error('Fehler beim Laden der Fotos:', error)
            }
        }
    }, [])

    if (photos.length === 0) {
        return null
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-10">
            {/* MEGA Loading Indicator */}
            {(loading || configLoading) && (
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm pointer-events-none">
                    MEGA lädt... {configLoading ? '(Konfiguration)' : connectionType === 'shared' ? '(Shared Folder + Streaming)' : '(Account)'}
                </div>
            )}

            {/* MEGA Error Indicator */}
            {(error || configError) && (
                <div className="absolute top-4 right-4 bg-red-500/80 text-white px-3 py-1 rounded text-sm pointer-events-none max-w-xs">
                    <div className="font-semibold">MEGA Fehler:</div>
                    {configError && (
                        <div className="text-xs mt-1">Konfiguration: {configError}</div>
                    )}
                    {error && (
                        <div className="text-xs mt-1">API: {error}</div>
                    )}
                    {requiresMFA && (
                        <div className="text-xs mt-1">
                            MFA Code erforderlich. Bitte in .env.local hinzufügen: MEGA_MFA_CODE=your-mfa-code
                        </div>
                    )}
                    {(error?.includes('Keine MEGA-Konfiguration') || configError) && (
                        <div className="text-xs mt-1">
                            Fügen Sie in .env.local hinzu:<br />
                            MEGA_SHARED_FOLDER_URL=https://mega.nz/folder/XXXXX#YYYYY
                        </div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {photos.map((photo) => {
                    // Responsive Positionierung für alle Fotos
                    let positionClasses = ''

                    switch (photo.id) {
                        case '1':
                            // Foto 1: Oben links
                            positionClasses = 'left-[20px] top-[150px] sm:left-[30px] sm:top-[200px] md:left-[50px] md:top-[250px] lg:left-[80px] lg:top-[300px]'
                            break
                        case '2':
                            // Foto 2: Oben rechts (aber nicht zu weit rechts auf Mobile)
                            positionClasses = 'right-[20px] top-[100px] sm:right-[30px] sm:top-[150px] md:right-[50px] md:top-[200px] lg:right-[100px] lg:top-[250px]'
                            break
                        case '3':
                            // Foto 3: Mitte links
                            positionClasses = 'left-[40px] top-[350px] sm:left-[60px] sm:top-[400px] md:left-[100px] md:top-[450px] lg:left-[150px] lg:top-[500px]'
                            break
                        case '4':
                            // Foto 4: Mitte rechts (begrenzt auf Mobile)
                            positionClasses = 'right-[40px] top-[300px] sm:right-[60px] sm:top-[350px] md:right-[100px] md:top-[400px] lg:right-[150px] lg:top-[450px]'
                            break
                        case 'mega-1':
                            // MEGA Foto 1: Unten links
                            positionClasses = 'left-[20px] top-[500px] sm:left-[40px] sm:top-[550px] md:left-[80px] md:top-[600px] lg:left-[120px] lg:top-[650px]'
                            break
                        case 'mega-2':
                            // MEGA Foto 2: Unten rechts (begrenzt auf Mobile)
                            positionClasses = 'right-[20px] top-[450px] sm:right-[40px] sm:top-[500px] md:right-[80px] md:top-[550px] lg:right-[120px] lg:top-[600px]'
                            break
                        default:
                            // Fallback für unbekannte Fotos
                            positionClasses = 'left-[50px] top-[200px]'
                    }

                    return (
                        <div
                            key={photo.id}
                            className={`pointer-events-auto absolute ${positionClasses}`}
                        >
                            <PhotoCard
                                photo={photo}
                                onClose={handleClosePhoto}
                            />
                        </div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
} 