import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Hochzeit Doro & Felix Apple Icon'
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default async function AppleIcon() {
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
                    borderRadius: '22px',
                }}
            >
                {/* Dekorative Rahmen basierend auf dem Monogram-Design */}
                <div
                    style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        right: '8px',
                        bottom: '8px',
                        border: '3px solid rgba(255,255,255,0.4)',
                        borderRadius: '16px',
                    }}
                />

                {/* Innerer Rahmen */}
                <div
                    style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        right: '16px',
                        bottom: '16px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                    }}
                />

                {/* Hauptinhalt */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        zIndex: 1,
                    }}
                >
                    {/* Titel */}
                    <h1
                        style={{
                            fontSize: '32px',
                            fontWeight: '400',
                            color: '#ffffff',
                            margin: '0 0 8px 0',
                            fontFamily: 'serif',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        Hochzeit
                    </h1>

                    {/* Namen */}
                    <h2
                        style={{
                            fontSize: '24px',
                            fontWeight: '400',
                            color: '#ffffff',
                            margin: '0',
                            fontFamily: 'serif',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        Doro & Felix
                    </h2>
                </div>

                {/* Dekorative Elemente */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        fontSize: '16px',
                        color: '#ffffff',
                        opacity: 0.8,
                    }}
                >
                    ❤️
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        fontSize: '16px',
                        color: '#ffffff',
                        opacity: 0.8,
                    }}
                >
                    💒
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
} 