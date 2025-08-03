'use client'

import { motion } from "motion/react"
import Image from 'next/image'
import { useState } from 'react'
import { Photo } from '@/types/photo'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

interface PhotoCardProps {
    photo: Photo;
    onClose: (id: string) => void;
}

export default function PhotoCard({ photo, onClose }: PhotoCardProps) {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragStart = () => {
        setIsDragging(true)
        console.log('Drag started')
    }

    const handleDragEnd = () => {
        setIsDragging(false)
        console.log('Drag ended')
    }

    const handleClick = () => {
        // Öffne Mega.nz Link für Foto 3 (ID: '3')
        if (photo.id === '3') {
            window.open('https://mega.nz/filerequest/yPZaQ6HLPxc', '_blank')
        }
    }

    const getSizeClasses = () => {
        switch (photo.size) {
            case 'small':
                return 'w-24 h-24'
            case 'medium':
                return 'w-32 h-32'
            case 'large':
                return 'w-40 h-40'
            default:
                return 'w-32 h-32'
        }
    }

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            className={`cursor-grab active:cursor-grabbing ${getSizeClasses()} select-none`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            whileDrag={{
                scale: 1.1,
                rotate: 5,
                zIndex: 20
            }}
            style={{
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none'
            }}
        >
            <div className="relative w-full h-full">
                <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className="object-cover rounded-lg shadow-lg pointer-events-none"
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
                    draggable={false}
                />

                {/* Text Overlay für Foto 1 */}
                {photo.id === '1' && (
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center pointer-events-none">
                        <div className={`text-white text-xs font-medium text-center px-2 ${playfair.className}`}>
                            Verschieb mich
                        </div>
                    </div>
                )}

                {/* Text Overlay für Foto 3 */}
                {photo.id === '3' && (
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center pointer-events-none">
                        <div className={`text-white text-xs font-medium text-center px-2 ${playfair.className}`}>
                            Fotos hochladen
                        </div>
                    </div>
                )}

                {/* Drag Indicator */}
                {isDragging && (
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center pointer-events-none">
                        <div className="text-white text-xs font-medium">Verschieben...</div>
                    </div>
                )}
            </div>
        </motion.div>
    )
} 