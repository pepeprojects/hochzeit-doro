import { Storage, File } from 'megajs'

export interface MegaConfig {
    email: string
    password: string
    folderId?: string
}

export interface MegaFile {
    name: string
    size: number
    timestamp: number
    downloadId: string
    key: string
    nodeId: string
}

export class MegaApi {
    private storage: Storage | null = null

    async connect(config: MegaConfig): Promise<void> {
        try {
            this.storage = new Storage({
                email: config.email,
                password: config.password,
                autologin: true,
                autoload: true
            })

            await this.storage.ready
            console.log('MEGA API connected successfully')
        } catch (error) {
            console.error('MEGA API connection failed:', error)
            throw error
        }
    }

    async getLatestImages(folderId?: string, limit: number = 2): Promise<MegaFile[]> {
        if (!this.storage) {
            throw new Error('MEGA API not connected')
        }

        try {
            // Navigate to specified folder or use root
            const targetFolder = folderId
                ? this.storage.files[folderId]
                : this.storage.root

            if (!targetFolder || targetFolder.directory !== true) {
                throw new Error('Invalid folder ID or not a directory')
            }

            // Get all files in folder
            const files = targetFolder.children || []

            // Filter for image files and sort by timestamp
            const imageFiles = files
                .filter(file => file.name && this.isImageFile(file.name))
                .filter(file => file.timestamp !== undefined)
                .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                .slice(0, limit)

            // Convert to MegaFile format
            return imageFiles.map(file => ({
                name: file.name || 'Unknown',
                size: file.size || 0,
                timestamp: file.timestamp || 0,
                downloadId: file.downloadId || '',
                key: file.key?.toString('hex') || '',
                nodeId: file.nodeId || ''
            }))
        } catch (error) {
            console.error('Error fetching latest images:', error)
            throw error
        }
    }

    private isImageFile(filename: string): boolean {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
        const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'))
        return imageExtensions.includes(extension)
    }

    async getDownloadUrl(file: MegaFile): Promise<string> {
        if (!this.storage) {
            throw new Error('MEGA API not connected')
        }

        try {
            const megaFile = this.storage.files[file.nodeId]
            if (!megaFile) {
                throw new Error('File not found')
            }

            const url = await megaFile.link({})
            return url
        } catch (error) {
            console.error('Error generating download URL:', error)
            throw error
        }
    }

    disconnect(): void {
        if (this.storage) {
            this.storage.close()
            this.storage = null
        }
    }
} 