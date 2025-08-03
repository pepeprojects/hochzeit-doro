'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import PhotoCard from './PhotoCard'
import { Photo } from '@/types/photo'

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
        size: 'medium'
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
        size: 'large'
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
        size: 'small'
    }
]

export default function PhotosOnMain() {
    const [photos, setPhotos] = useState<Photo[]>(mockPhotos)

    const handleClosePhoto = (id: string) => {
        setPhotos(prev => prev.filter(photo => photo.id !== id))
    }

    // Speichere Fotos in localStorage
    useEffect(() => {
        const savedPhotos = localStorage.getItem('hochzeit-photos')
        if (savedPhotos) {
            try {
                const parsed = JSON.parse(savedPhotos)
                setPhotos(parsed)
            } catch (error) {
                console.error('Fehler beim Laden der Fotos:', error)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('hochzeit-photos', JSON.stringify(photos))
    }, [photos])

    if (photos.length === 0) {
        return null
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-10">
            <AnimatePresence>
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className={`pointer-events-auto ${photo.id === '1' ? 'sm:left-[50px] sm:top-[400px]' : ''
                            } ${photo.id === '2' ? 'sm:left-[250px] sm:top-[100px]' : ''
                            } ${photo.id === '3' ? 'sm:left-[250px] sm:top-[400px]' : ''
                            }`}
                        style={{
                            position: 'absolute',
                            left: `${photo.x}px`,
                            top: `${photo.y}px`,
                        }}
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