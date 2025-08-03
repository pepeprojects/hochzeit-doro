import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        status: 'MEGA API is working',
        message: 'Test endpoint reached successfully',
        timestamp: new Date().toISOString(),
        features: {
            mfa: 'Supported',
            userAgent: 'HochzeitDoro/1.0',
            apiVersion: '1.0'
        },
        nextSteps: [
            'Add your MEGA credentials to .env.local',
            'Set NEXT_PUBLIC_MEGA_MFA_CODE if MFA is enabled',
            'Test with real credentials'
        ]
    })
} 