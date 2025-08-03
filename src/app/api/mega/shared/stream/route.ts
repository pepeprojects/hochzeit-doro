import { NextRequest, NextResponse } from 'next/server'
import { File } from 'megajs'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const folderUrl = searchParams.get('folderUrl')
        const fileName = searchParams.get('fileName') // Optional: specific file

        if (!folderUrl) {
            return NextResponse.json(
                { error: 'Shared folder URL is required' },
                { status: 400 }
            )
        }

        // Validate URL format
        if (!folderUrl.includes('mega.nz/folder/')) {
            return NextResponse.json(
                { error: 'Invalid MEGA shared folder URL format' },
                { status: 400 }
            )
        }

        // Check for hash in URL (handle URL encoding)
        const decodedUrl = decodeURIComponent(folderUrl)

        // For MEGA URLs, the hash part might be in the query parameters
        // or we need to reconstruct the full URL
        let fullUrl = decodedUrl
        if (!decodedUrl.includes('#')) {
            // Try to get hash from query parameters
            const hash = searchParams.get('hash')
            if (hash) {
                fullUrl = `${decodedUrl}#${hash}`
            } else {
                return NextResponse.json(
                    { error: 'Invalid MEGA shared folder URL: missing hash. Please include the full URL with hash.' },
                    { status: 400 }
                )
            }
        }

        // Get the folder object from the URL (following MEGA.js docs pattern)
        const mainFile = File.fromURL(fullUrl)

        // Setup user-agent (recommended by MEGA.js docs)
        mainFile.api.userAgent = 'HochzeitDoro/1.0 (+https://hochzeit-doro-felix.de/)'

        // Load attributes and get the selected file
        let selectedFile = await mainFile.loadAttributes()
        if (!selectedFile) {
            return NextResponse.json(
                { error: 'File not found!' },
                { status: 404 }
            )
        }

        // Handle directories (following MEGA.js docs pattern)
        if (selectedFile.children) {
            console.log('It points to a directory, finding image files:')

            // Find image files in the directory
            const imageFiles = selectedFile.children
                .filter(file => file.name && isImageFile(file.name))
                .filter(file => file.timestamp !== undefined)
                .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                .slice(0, 2)

            if (imageFiles.length === 0) {
                return NextResponse.json(
                    { error: 'No image files found in the shared folder' },
                    { status: 404 }
                )
            }

            // Process each image file with streaming support
            const images = await Promise.all(
                imageFiles.map(async (file, index) => {
                    try {
                        // Get file info (following MEGA.js docs pattern)
                        console.log('File info:', {
                            name: file.name,
                            size: file.size,
                            timestamp: file.timestamp
                        })

                        // Create download stream (following MEGA.js docs pattern)
                        const downloadStream = await file.download({})

                        // Download the file as buffer and convert to base64
                        const chunks: Buffer[] = []
                        for await (const chunk of downloadStream) {
                            chunks.push(chunk)
                        }
                        const buffer = Buffer.concat(chunks)
                        const base64 = buffer.toString('base64')
                        const mimeType = getMimeType(file.name || '')
                        const dataUrl = `data:${mimeType};base64,${base64}`

                        return {
                            id: `mega-${index + 1}`,
                            name: file.name || 'Unknown',
                            fileSize: file.size || 0,
                            timestamp: file.timestamp || 0,
                            downloadUrl: dataUrl,
                            position: 4 + index,
                            x: 300 + (index * 100),
                            y: 200 + (index * 50),
                            size: 'medium' as const,
                            source: 'mega' as const,
                            streamingSupported: true,
                            streamAvailable: !!downloadStream
                        }
                    } catch (error) {
                        console.error(`Error processing file ${file.name}:`, error)
                        return {
                            id: `mega-${index + 1}`,
                            name: file.name || 'Unknown',
                            fileSize: file.size || 0,
                            timestamp: file.timestamp || 0,
                            downloadUrl: '',
                            position: 4 + index,
                            x: 300 + (index * 100),
                            y: 200 + (index * 50),
                            size: 'medium' as const,
                            source: 'mega' as const,
                            streamingSupported: false,
                            error: error instanceof Error ? error.message : 'Unknown error'
                        }
                    }
                })
            )

            return NextResponse.json({
                images,
                streamingEnabled: true,
                userAgent: mainFile.api.userAgent
            })
        } else {
            // Single file (not a directory)
            return NextResponse.json(
                { error: 'Shared folder URL must point to a directory, not a single file' },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error('MEGA Shared Folder Streaming API error:', error)

        let errorMessage = 'Failed to fetch MEGA shared folder images'
        let statusCode = 500

        if (error instanceof Error) {
            if (error.message.includes('ENOTFOUND')) {
                errorMessage = 'Shared folder not found or access denied'
                statusCode = 404
            } else if (error.message.includes('ENOENT')) {
                errorMessage = 'Invalid shared folder URL'
                statusCode = 400
            } else if (error.message.includes('File not found')) {
                errorMessage = 'File not found in shared folder'
                statusCode = 404
            } else {
                errorMessage = error.message
            }
        }

        return NextResponse.json(
            {
                error: errorMessage,
                details: error instanceof Error ? error.message : 'Unknown error',
                streamingEnabled: false
            },
            { status: statusCode }
        )
    }
}

function isImageFile(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'))
    return imageExtensions.includes(extension)
}

function getMimeType(filename: string): string {
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'))
    switch (extension) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg'
        case '.png':
            return 'image/png'
        case '.gif':
            return 'image/gif'
        case '.bmp':
            return 'image/bmp'
        case '.webp':
            return 'image/webp'
        default:
            return 'image/jpeg'
    }
} 