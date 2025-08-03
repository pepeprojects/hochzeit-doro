import { MegaApi, MegaFile } from '../megaHelpers'

// Mock megajs
jest.mock('megajs', () => ({
    Storage: jest.fn().mockImplementation(() => ({
        ready: Promise.resolve(),
        root: {
            directory: true,
            children: [
                {
                    name: 'test-image.jpg',
                    size: 1024,
                    timestamp: 1640995200,
                    downloadId: 'test-download-id',
                    key: Buffer.from('test-key'),
                    nodeId: 'test-node-id',
                    link: jest.fn().mockResolvedValue('https://mega.nz/test-link')
                },
                {
                    name: 'test-image.png',
                    size: 2048,
                    timestamp: 1640995300,
                    downloadId: 'test-download-id-2',
                    key: Buffer.from('test-key-2'),
                    nodeId: 'test-node-id-2',
                    link: jest.fn().mockResolvedValue('https://mega.nz/test-link-2')
                },
                {
                    name: 'test-document.pdf',
                    size: 512,
                    timestamp: 1640995400,
                    downloadId: 'test-download-id-3',
                    key: Buffer.from('test-key-3'),
                    nodeId: 'test-node-id-3',
                    link: jest.fn().mockResolvedValue('https://mega.nz/test-link-3')
                }
            ]
        },
        files: {
            'test-node-id': {
                link: jest.fn().mockResolvedValue('https://mega.nz/test-link')
            },
            'test-node-id-2': {
                link: jest.fn().mockResolvedValue('https://mega.nz/test-link-2')
            }
        },
        close: jest.fn()
    }))
}))

describe('MegaApi', () => {
    let megaApi: MegaApi

    beforeEach(() => {
        megaApi = new MegaApi()
    })

    describe('connect', () => {
        it('should connect successfully with valid credentials', async () => {
            const config = {
                email: 'test@example.com',
                password: 'testpassword'
            }

            await expect(megaApi.connect(config)).resolves.not.toThrow()
        })

        it('should throw error with invalid credentials', async () => {
            const { Storage } = require('megajs')
            Storage.mockImplementationOnce(() => ({
                ready: Promise.reject(new Error('Invalid credentials'))
            }))

            const config = {
                email: 'invalid@example.com',
                password: 'wrongpassword'
            }

            await expect(megaApi.connect(config)).rejects.toThrow('Invalid credentials')
        })
    })

    describe('getLatestImages', () => {
        beforeEach(async () => {
            await megaApi.connect({
                email: 'test@example.com',
                password: 'testpassword'
            })
        })

        it('should return latest 2 image files', async () => {
            const images = await megaApi.getLatestImages(undefined, 2)

            expect(images).toHaveLength(2)
            expect(images[0].name).toBe('test-image.png') // Newer timestamp
            expect(images[1].name).toBe('test-image.jpg') // Older timestamp
            expect(images[0].timestamp).toBe(1640995300)
            expect(images[1].timestamp).toBe(1640995200)
        })

        it('should filter out non-image files', async () => {
            const images = await megaApi.getLatestImages(undefined, 5)

            expect(images).toHaveLength(2)
            expect(images.every(img => img.name.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i))).toBe(true)
        })

        it('should throw error when not connected', async () => {
            const disconnectedApi = new MegaApi()

            await expect(disconnectedApi.getLatestImages()).rejects.toThrow('MEGA API not connected')
        })
    })

    describe('getDownloadUrl', () => {
        beforeEach(async () => {
            await megaApi.connect({
                email: 'test@example.com',
                password: 'testpassword'
            })
        })

        it('should return download URL for valid file', async () => {
            const file: MegaFile = {
                name: 'test-image.jpg',
                size: 1024,
                timestamp: 1640995200,
                downloadId: 'test-download-id',
                key: 'test-key',
                nodeId: 'test-node-id'
            }

            const url = await megaApi.getDownloadUrl(file)
            expect(url).toBe('https://mega.nz/test-link')
        })

        it('should throw error for non-existent file', async () => {
            const { Storage } = require('megajs')
            Storage.mockImplementationOnce(() => ({
                ready: Promise.resolve(),
                files: {},
                close: jest.fn()
            }))

            const file: MegaFile = {
                name: 'non-existent.jpg',
                size: 1024,
                timestamp: 1640995200,
                downloadId: 'test-download-id',
                key: 'test-key',
                nodeId: 'non-existent-id'
            }

            await expect(megaApi.getDownloadUrl(file)).rejects.toThrow('File not found')
        })
    })

    describe('disconnect', () => {
        it('should close connection and reset storage', async () => {
            await megaApi.connect({
                email: 'test@example.com',
                password: 'testpassword'
            })

            megaApi.disconnect()

            // Should throw error after disconnect
            await expect(megaApi.getLatestImages()).rejects.toThrow('MEGA API not connected')
        })
    })
}) 