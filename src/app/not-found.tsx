import { Playfair_Display } from 'next/font/google'
import Link from 'next/link'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function NotFound() {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: 'url(/background.png)' }}>
            <div className="text-center text-white max-w-md mx-auto px-4">
                <h1 className="text-6xl mb-4" style={{ fontFamily: '"la-bohemienne", sans-serif', fontWeight: 400, fontStyle: 'normal' }}>
                    404
                </h1>
                <h2 className={`text-2xl mb-6 ${playfair.className}`}>
                    Diese Seite wurde nicht gefunden
                </h2>
                <p className="text-amber-100/80 mb-8">
                    Entschuldigung, die gesuchte Seite existiert nicht.
                    Möchten Sie zur Hochzeitsseite zurückkehren?
                </p>
                <Link
                    href="/"
                    className="inline-block bg-transparent hover:bg-amber-100 text-white font-semibold hover:text-black py-2 px-6 border border-amber-200 hover:border-transparent rounded transition-colors"
                >
                    Zurück zur Hochzeit
                </Link>
            </div>
        </div>
    )
} 