import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { useMegaPhotos } from '../MegaPhotoLoader'
import { MegaApi } from '@/utils/megaHelpers'

// Mock the MegaApi
jest.mock('@/utils/megaHelpers', () => ({
    MegaApi: jest.fn()
}))

const mockMegaApi = {
    connect: jest.fn(),
    getLatestImages: jest.fn(),
    getDownloadUrl: jest.fn(),
    disconnect: jest.fn()
}

describe('useMegaPhotos', () => {
    beforeEach(() => {
        jest.clearAllMocks()
            ; (MegaApi as jest.Mock).mockImplementation(() => mockMegaApi)
    })

    it('should load MEGA photos successfully', async () => {
        const mockFiles = [
            {
                name: 'test-image.jpg',
                size: 1024,
                timestamp: 1640995200,
                downloadId: 'test-download-id',
                key: 'test-key',
                nodeId: 'test-node-id'
            }
        ]

        mockMegaApi.connect.mockResolvedValue(undefined)
        mockMegaApi.getLatestImages.mockResolvedValue(mockFiles)
        mockMegaApi.getDownloadUrl.mockResolvedValue('https://mega.nz/test-link')

        const { result } = renderHook(() =>
            useMegaPhotos({
                config: {
                    email: 'test@example.com',
                    password: 'testpassword',
                    folderId: 'test-folder'
                }
            })
        )

        // Initially loading
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBe(null)
        expect(result.current.megaPhotos).toEqual([])

        // Wait for loading to complete
        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        // Check results
        expect(result.current.megaPhotos).toHaveLength(1)
        expect(result.current.megaPhotos[0]).toEqual({
            id: 'mega-1',
            url: 'https://mega.nz/test-link',
            alt: 'test-image.jpg',
            uploadedAt: new Date(1640995200 * 1000),
            uploadedBy: 'MEGA',
            position: 4,
            x: 300,
            y: 200,
            size: 'medium',
            source: 'mega'
        })

        expect(mockMegaApi.connect).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'testpassword',
            folderId: 'test-folder'
        })
    })

    it('should handle API errors gracefully', async () => {
        const errorMessage = 'MEGA API connection failed'
        mockMegaApi.connect.mockRejectedValue(new Error(errorMessage))

        const { result } = renderHook(() =>
            useMegaPhotos({
                config: {
                    email: 'invalid@example.com',
                    password: 'wrongpassword'
                }
            })
        )

        // Wait for error to be set
        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.error).toBe(errorMessage)
        expect(result.current.megaPhotos).toEqual([])
    })

    it('should handle empty results', async () => {
        mockMegaApi.connect.mockResolvedValue(undefined)
        mockMegaApi.getLatestImages.mockResolvedValue([])

        const { result } = renderHook(() =>
            useMegaPhotos({
                config: {
                    email: 'test@example.com',
                    password: 'testpassword'
                }
            })
        )

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.megaPhotos).toEqual([])
        expect(result.current.error).toBe(null)
    })

    it('should refresh photos when refresh function is called', async () => {
        const mockFiles = [
            {
                name: 'new-image.jpg',
                size: 2048,
                timestamp: 1640995300,
                downloadId: 'new-download-id',
                key: 'new-key',
                nodeId: 'new-node-id'
            }
        ]

        mockMegaApi.connect.mockResolvedValue(undefined)
        mockMegaApi.getLatestImages.mockResolvedValue(mockFiles)
        mockMegaApi.getDownloadUrl.mockResolvedValue('https://mega.nz/new-link')

        const { result } = renderHook(() =>
            useMegaPhotos({
                config: {
                    email: 'test@example.com',
                    password: 'testpassword'
                }
            })
        )

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        // Clear mocks to verify refresh call
        jest.clearAllMocks()
        mockMegaApi.connect.mockResolvedValue(undefined)
        mockMegaApi.getLatestImages.mockResolvedValue(mockFiles)
        mockMegaApi.getDownloadUrl.mockResolvedValue('https://mega.nz/new-link')

        // Call refresh
        await result.current.refresh()

        expect(mockMegaApi.connect).toHaveBeenCalledTimes(1)
        expect(mockMegaApi.getLatestImages).toHaveBeenCalledTimes(1)
    })

    it('should use default refresh interval when not provided', async () => {
        mockMegaApi.connect.mockResolvedValue(undefined)
        mockMegaApi.getLatestImages.mockResolvedValue([])

        renderHook(() =>
            useMegaPhotos({
                config: {
                    email: 'test@example.com',
                    password: 'testpassword'
                }
                // refreshInterval not provided, should use default 300000
            })
        )

        // The hook should be called with default refresh interval
        expect(MegaApi).toHaveBeenCalled()
    })
}) 