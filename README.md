# Hochzeit Doro & Felix 🎊

Eine moderne Hochzeits-Website mit automatischer MEGA-Integration für Foto-Sharing.

## ✨ Features

- **Responsive Design** mit Tailwind CSS
- **Draggable Photo Gallery** mit Framer Motion
- **MEGA Integration** - Automatisches Laden der neuesten Bilder aus MEGA-Ordner
- **Real-time Updates** - Alle 5 Minuten automatische Aktualisierung
- **Base64 Image Streaming** - Direkte Bildanzeige ohne externe URLs
- **Custom Fonts** - Typekit und Google Fonts Integration
- **SEO Optimized** - Open Graph, Twitter Cards, Meta Tags

## 🚀 Live Demo

**Website**: [https://hochzeit-doro-felix.de](https://hochzeit-doro-felix.de)

## 🛠️ Technologie-Stack

- **Framework**: Next.js 15.4.5 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **MEGA Integration**: MEGA.js mit Base64 Streaming
- **Deployment**: Vercel
- **Fonts**: Typekit (la-bohemienne, rokkitt) + Google Fonts (Playfair Display)

## 📦 Installation

```bash
# Repository klonen
git clone https://github.com/your-username/hochzeit-doro.git
cd hochzeit-doro

# Dependencies installieren
npm install

# Environment Variables konfigurieren
cp .env.example .env.local
```

## ⚙️ Konfiguration

### Environment Variables (.env.local)

```env
# MEGA Integration (Shared Folder) - Server-seitig, sicherer
MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/XXXXX#YYYYY"
MEGA_UPLOAD_FOLDER_URL="https://mega.nz/filerequest/XXXXX"

# Optional: Account-based MEGA (Alternative)
NEXT_PUBLIC_MEGA_EMAIL=your-email@example.com
NEXT_PUBLIC_MEGA_PASSWORD=your-password
NEXT_PUBLIC_MEGA_FOLDER_ID=optional-folder-id
NEXT_PUBLIC_MEGA_MFA_CODE=optional-mfa-code
```

### MEGA Setup

1. **Shared Folder erstellen**:
   - MEGA-Ordner erstellen
   - Ordner teilen → "Get link"
   - URL kopieren: `https://mega.nz/folder/XXXXX#YYYYY`

2. **Environment Variable setzen**:
   ```env
   MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/XXXXX#YYYYY"
   ```

## 🎯 MEGA Integration Details

### Funktionsweise

- **Automatisches Laden**: Die 2 neuesten Bilder werden automatisch geladen
- **Base64 Streaming**: Bilder werden als Data URLs übertragen (keine externen URLs)
- **Real-time Updates**: Alle 5 Minuten automatische Aktualisierung
- **Error Handling**: Robuste Fehlerbehandlung mit Benutzer-Feedback

### API Endpoints

- `GET /api/mega/shared/stream` - Shared Folder Streaming (Empfohlen)
- `GET /api/mega` - Account-based MEGA Access
- `GET /api/mega/test` - API Test Endpoint

### Technische Implementierung

```typescript
// Base64 Image Streaming
const buffer = Buffer.concat(chunks)
const base64 = buffer.toString('base64')
const dataUrl = `data:${mimeType};base64,${base64}`
```

## 🎨 UI/UX Features

### Photo Gallery

- **Draggable Photos**: Fotos können verschoben werden
- **Responsive Layout**: Optimiert für alle Bildschirmgrößen
- **Loading States**: Visuelle Feedback während MEGA-Ladevorgang
- **Error Handling**: Benutzerfreundliche Fehlermeldungen

### Design

- **Custom Fonts**: 
  - `la-bohemienne` (Haupttitel)
  - `rokkitt` (Footer)
  - `Playfair Display` (Text)
- **Color Scheme**: Amber/Gold Theme
- **Background**: Custom Hochzeits-Hintergrundbild

## 🚀 Development

```bash
# Development Server starten
npm run dev

# Build erstellen
npm run build

# Production Server starten
npm start

# Tests ausführen
npm test
```

## 📱 Responsive Design

- **Desktop**: Vollständige Galerie mit allen Fotos
- **Tablet**: Optimierte Anordnung für mittlere Bildschirme
- **Mobile**: Stacked Layout für kleine Bildschirme

## 🔧 Konfiguration

### Next.js Config

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mega.nz',
        port: '',
        pathname: '/file/**',
      },
    ],
  },
};
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'la-bohemienne': ['la-bohemienne', 'sans-serif'],
        'rokkitt': ['rokkitt', 'serif'],
      },
    },
  },
  plugins: [],
}
```

## 🚀 Deployment

### Vercel (Empfohlen)

1. **Repository verbinden**:
   ```bash
   vercel --prod
   ```

2. **Environment Variables setzen**:
   - Vercel Dashboard → Project Settings → Environment Variables
   - `MEGA_SHARED_FOLDER_URL` hinzufügen (Server-seitig, sicherer)
- `MEGA_UPLOAD_FOLDER_URL` hinzufügen (Server-seitig, sicherer)

3. **Automatisches Deployment**:
   - Jeder Push auf `main` Branch deployt automatisch

### Alternative Deployment

```bash
# Build erstellen
npm run build

# Production Server starten
npm start
```

## 📊 Performance

- **Base64 Streaming**: Direkte Bildanzeige ohne externe Requests
- **Lazy Loading**: Bilder werden bei Bedarf geladen
- **Caching**: MEGA-Bilder werden gecacht
- **Optimized Images**: Next.js Image Optimization

## 🔒 Sicherheit

- **Environment Variables**: Sensible Daten in .env.local
- **Shared Folder**: Sichere MEGA-Integration ohne Account-Credentials
- **No External URLs**: Base64-Streaming verhindert externe Abhängigkeiten

## 🐛 Troubleshooting

### MEGA Integration Probleme

1. **"Invalid MEGA shared folder URL"**:
   - Stellen Sie sicher, dass die URL den Hash enthält: `#YYYYY`
   - Format: `https://mega.nz/folder/XXXXX#YYYYY`

2. **"No images found"**:
   - Überprüfen Sie, ob Bilder im MEGA-Ordner vorhanden sind
   - Unterstützte Formate: JPG, PNG, GIF, BMP, WebP

3. **"API connection failed"**:
   - Überprüfen Sie die Internetverbindung
   - Stellen Sie sicher, dass der MEGA-Ordner öffentlich geteilt ist

### Development Probleme

1. **Port bereits in Verwendung**:
   ```bash
   # Port 3000 freigeben
   lsof -ti:3000 | xargs kill -9
   ```

2. **Environment Variables nicht geladen**:
   ```bash
   # Server neu starten
   npm run dev
   ```

## 📝 Changelog

### v1.0.0 (Aktuell)
- ✅ MEGA Integration mit Base64 Streaming
- ✅ Draggable Photo Gallery
- ✅ Responsive Design
- ✅ Custom Fonts Integration
- ✅ SEO Optimization
- ✅ Error Handling
- ✅ Real-time Updates

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Changes committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📄 License

Dieses Projekt ist für private Zwecke erstellt. Alle Rechte vorbehalten.

## 👥 Credits

- **Design & Development**: Clemens & Cila
- **MEGA Integration**: MEGA.js Library
- **UI Framework**: Next.js + Tailwind CSS
- **Animations**: Framer Motion

## 📞 Support

Bei Fragen oder Problemen:
- **Email**: [Ihre Email]
- **GitHub Issues**: [Repository Issues]

---

**Mit ❤️ gemacht für Doro & Felix** 🎊✨
