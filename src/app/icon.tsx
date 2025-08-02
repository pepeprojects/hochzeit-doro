import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Hochzeit Doro & Felix Icon'
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default async function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderRadius: '6px',
                }}
            >
                {/* Dekorative Elemente basierend auf dem Monogram-Design */}
                <div
                    style={{
                        position: 'absolute',
                        top: '2px',
                        left: '2px',
                        right: '2px',
                        bottom: '2px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '4px',
                    }}
                />

                {/* Zentrale Initialen */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        fontFamily: 'serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        lineHeight: '1',
                    }}
                >
                    <span style={{ fontSize: '10px', marginBottom: '1px' }}>D</span>
                    <span style={{ fontSize: '10px' }}>&</span>
                    <span style={{ fontSize: '10px', marginTop: '1px' }}>F</span>
                </div>

                {/* Dekorative Punkte */}
                <div
                    style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '2px',
                        height: '2px',
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        opacity: 0.8,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        width: '2px',
                        height: '2px',
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        opacity: 0.8,
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
} 