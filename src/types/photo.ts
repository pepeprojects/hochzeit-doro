export interface Photo {
    id: string;
    url: string;
    alt: string;
    uploadedAt: Date;
    uploadedBy: string;
    position: number;
    thumbnailUrl?: string;
    x: number;
    y: number;
    size: 'small' | 'medium' | 'large';
    source?: 'local' | 'mega'; // Neue Eigenschaft
}

export interface PhotoPosition {
    x: number;
    y: number;
    size: 'small' | 'medium' | 'large';
} 