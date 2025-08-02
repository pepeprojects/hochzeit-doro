import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Hochzeit Doro & Felix'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                    position: 'relative',
                }}
            >
                {/* Hintergrundmuster */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        opacity: 0.3,
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
                            fontSize: '72px',
                            fontWeight: '400',
                            color: '#ffffff',
                            margin: '0 0 20px 0',
                            fontFamily: 'serif',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        Hochzeit
                    </h1>

                    {/* Namen */}
                    <h2
                        style={{
                            fontSize: '48px',
                            fontWeight: '400',
                            color: '#ffffff',
                            margin: '0 0 40px 0',
                            fontFamily: 'serif',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        Doro & Felix
                    </h2>

                    {/* Untertitel */}
                    <p
                        style={{
                            fontSize: '24px',
                            color: '#ffffff',
                            margin: '0',
                            fontFamily: 'sans-serif',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                            maxWidth: '800px',
                        }}
                    >
                        Ein besonderer Tag voller Liebe und Freude
                    </p>
                </div>

                {/* Dekorative Elemente */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        right: '40px',
                        fontSize: '18px',
                        color: '#ffffff',
                        opacity: 0.8,
                        fontFamily: 'serif',
                    }}
                >
                    ❤️
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
} 