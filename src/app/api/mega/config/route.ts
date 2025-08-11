import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Server-seitige Environment Variables (sicherer)
        const sharedFolderUrl = process.env.MEGA_SHARED_FOLDER_URL
        const uploadUrl = process.env.MEGA_UPLOAD_FOLDER_URL

        return NextResponse.json({
            sharedFolderUrl: sharedFolderUrl || null,
            uploadUrl: uploadUrl || null,
            hasSharedFolder: !!sharedFolderUrl,
            hasUploadUrl: !!uploadUrl
        })
    } catch (error) {
        console.error('Error loading MEGA config:', error)
        return NextResponse.json(
            { error: 'Failed to load MEGA configuration' },
            { status: 500 }
        )
    }
} 