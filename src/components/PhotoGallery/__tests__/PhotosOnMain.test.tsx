import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import PhotosOnMain from '../PhotosOnMain'
import { useMegaPhotos } from '@/components/MegaIntegration/MegaPhotoLoader'

// Mock the useMegaPhotos hook
jest.mock('@/components/MegaIntegration/MegaPhotoLoader', () => ({
    useMegaPhotos: jest.fn()
}))

// Mock motion/react
jest.mock('motion/react', () => ({
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

const mockUseMegaPhotos = useMegaPhotos as jest.MockedFunction<typeof useMegaPhotos>

describe('PhotosOnMain', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        // Default mock implementation
        mockUseMegaPhotos.mockReturnValue({
            megaPhotos: [],
            loading: false,
            error: null,
            refresh: jest.fn()
        })
    })

    it('should render local photos correctly', () => {
        render(<PhotosOnMain />)

        // Check if local photos are rendered
        expect(screen.getByAltText('Hochzeitsfoto 1')).toBeInTheDocument()
        expect(screen.getByAltText('Hochzeitsfoto 2')).toBeInTheDocument()
        expect(screen.getByAltText('Hochzeitsfoto 3')).toBeInTheDocument()
        expect(screen.getByAltText('MEGA Foto 1')).toBeInTheDocument() // 4. Bild
    })

    it('should show loading indicator when MEGA is loading', () => {
        mockUseMegaPhotos.mockReturnValue({
            megaPhotos: [],
            loading: true,
            error: null,
            refresh: jest.fn()
        })

        render(<PhotosOnMain />)

        expect(screen.getByText('MEGA lädt...')).toBeInTheDocument()
    })

    it('should show error indicator when MEGA has error', () => {
        const errorMessage = 'MEGA API connection failed'
        mockUseMegaPhotos.mockReturnValue({
            megaPhotos: [],
            loading: false,
            error: errorMessage,
            refresh: jest.fn()
        })

        render(<PhotosOnMain />)

        expect(screen.getByText(`MEGA Fehler: ${errorMessage}`)).toBeInTheDocument()
    })

    it('should render MEGA photos when loaded', async () => {
        const mockMegaPhotos = [
            {
                id: 'mega-1',
                url: 'https://mega.nz/test-link-1',
                alt: 'MEGA Test Image 1',
                uploadedAt: new Date(),
                uploadedBy: 'MEGA',
                position: 4,
                x: 400,
                y: 200,
                size: 'medium' as const,
                source: 'mega' as const
            },
            {
                id: 'mega-2',
                url: 'https://mega.nz/test-link-2',
                alt: 'MEGA Test Image 2',
                uploadedAt: new Date(),
                uploadedBy: 'MEGA',
                position: 5,
                x: 500,
                y: 200,
                size: 'medium' as const,
                source: 'mega' as const
            }
        ]

        mockUseMegaPhotos.mockReturnValue({
            megaPhotos: mockMegaPhotos,
            loading: false,
            error: null,
            refresh: jest.fn()
        })

        render(<PhotosOnMain />)

        // Check if MEGA photos are rendered
        expect(screen.getByAltText('MEGA Test Image 1')).toBeInTheDocument()
        expect(screen.getByAltText('MEGA Test Image 2')).toBeInTheDocument()
    })

    it('should replace existing MEGA photos with new ones', async () => {
        // Initial state with old MEGA photos
        const oldMegaPhotos = [
            {
                id: 'mega-1',
                url: 'https://mega.nz/old-link',
                alt: 'Old MEGA Image',
                uploadedAt: new Date(),
                uploadedBy: 'MEGA',
                position: 4,
                x: 400,
                y: 200,
                size: 'medium' as const,
                source: 'mega' as const
            }
        ]

        const { rerender } = render(<PhotosOnMain />)

        // Update with new MEGA photos
        const newMegaPhotos = [
            {
                id: 'mega-1',
                url: 'https://mega.nz/new-link',
                alt: 'New MEGA Image',
                uploadedAt: new Date(),
                uploadedBy: 'MEGA',
                position: 4,
                x: 400,
                y: 200,
                size: 'medium' as const,
                source: 'mega' as const
            }
        ]

        mockUseMegaPhotos.mockReturnValue({
            megaPhotos: newMegaPhotos,
            loading: false,
            error: null,
            refresh: jest.fn()
        })

        rerender(<PhotosOnMain />)

        // Should show new MEGA photo
        expect(screen.getByAltText('New MEGA Image')).toBeInTheDocument()
        expect(screen.queryByAltText('Old MEGA Image')).not.toBeInTheDocument()
    })

    it('should call useMegaPhotos with correct config', () => {
        render(<PhotosOnMain />)

        expect(mockUseMegaPhotos).toHaveBeenCalledWith({
            config: {
                email: 'test@example.com',
                password: 'testpassword',
                folderId: 'test-folder'
            },
            refreshInterval: 300000
        })
    })

    it('should handle empty photos array', () => {
        // Mock localStorage to return empty array
        const localStorageMock = {
            getItem: jest.fn().mockReturnValue('[]'),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        }
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        })

        render(<PhotosOnMain />)

        // Should still render the default mock photos
        expect(screen.getByAltText('Hochzeitsfoto 1')).toBeInTheDocument()
    })

    it('should handle localStorage errors gracefully', () => {
        // Mock localStorage to throw error
        const localStorageMock = {
            getItem: jest.fn().mockImplementation(() => {
                throw new Error('localStorage error')
            }),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        }
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        })

        // Should not throw error and still render
        expect(() => render(<PhotosOnMain />)).not.toThrow()
    })
}) 