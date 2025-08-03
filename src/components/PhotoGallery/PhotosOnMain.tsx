'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import PhotoCard from './PhotoCard'
import { Photo } from '@/types/photo'
import { useMegaPhotosAdvanced } from '@/components/MegaIntegration/useMegaPhotosAdvanced'

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

    // MEGA Integration - Shared Folder (Empfohlen)
    const { megaPhotos, loading, error, requiresMFA, connectionType } = useMegaPhotosAdvanced({
        config: {
            sharedFolderUrl: process.env.NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL
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
            {loading && (
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm pointer-events-none">
                    MEGA lädt... {connectionType === 'shared' ? '(Shared Folder + Streaming)' : '(Account)'}
                </div>
            )}

            {/* MEGA Error Indicator */}
            {error && (
                <div className="absolute top-4 right-4 bg-red-500/80 text-white px-3 py-1 rounded text-sm pointer-events-none max-w-xs">
                    <div className="font-semibold">MEGA Fehler:</div>
                    <div className="text-xs mt-1">{error}</div>
                    {requiresMFA && (
                        <div className="text-xs mt-1">
                            MFA Code erforderlich. Bitte in .env.local hinzufügen: NEXT_PUBLIC_MEGA_MFA_CODE=your-mfa-code
                        </div>
                    )}
                    {error.includes('Keine MEGA-Konfiguration') && (
                        <div className="text-xs mt-1">
                            Fügen Sie in .env.local hinzu:<br />
                            NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL=https://mega.nz/folder/XXXXX#YYYYY
                        </div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className={`pointer-events-auto absolute ${photo.id === '1' ? 'left-[50px] top-[200px] sm:left-[50px] sm:top-[400px] md:left-[50px] md:top-[400px]' : ''
                            } ${photo.id === '2' ? 'top-[600px] sm:left-[100px] sm:top-[100px] md:left-[100px] md:top-[100px] lg:left-[1100px] lg:top-[400px]' : ''
                            } ${photo.id === '3' ? 'left-[150px] top-[400px] sm:left-[250px] sm:top-[400px] md:left-[250px] md:top-[400px]' : ''
                            } ${photo.id === '4' ? 'left-[300px] top-[200px] sm:left-[350px] sm:top-[200px] md:left-[350px] md:top-[200px]' : ''
                            } ${photo.id === 'mega-1' ? 'left-[400px] top-[200px] sm:left-[450px] sm:top-[200px] md:left-[450px] md:top-[200px]' : ''
                            } ${photo.id === 'mega-2' ? 'left-[500px] top-[200px] sm:left-[550px] sm:top-[200px] md:left-[550px] md:top-[200px]' : ''
                            }`}
                    >
                        <PhotoCard
                            photo={photo}
                            onClose={handleClosePhoto}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    )
} 