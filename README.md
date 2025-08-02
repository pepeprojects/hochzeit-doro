# Hochzeit Doro & Felix

Eine elegante Hochzeitswebsite für Doro und Felix, erstellt mit Next.js und Tailwind CSS.

## 🚀 Getting Started

### Entwicklung

Installieren Sie die Abhängigkeiten:

```bash
npm install
```

Starten Sie den Entwicklungsserver:

```bash
npm run dev
```

Öffnen Sie [http://localhost:3002](http://localhost:3002) in Ihrem Browser, um das Ergebnis zu sehen.

### Build

Erstellen Sie eine Produktionsversion:

```bash
npm run build
```

Starten Sie die Produktionsversion:

```bash
npm start
```

## 🎨 Features

- **Elegantes Design** - Mit La Bohemienne und Playfair Display Schriftarten
- **Responsive Layout** - Optimiert für alle Geräte
- **Hintergrundbild** - Elegantes Monogram-Design
- **Upload-Funktion** - Integration mit Mega.nz für Foto-Uploads
- **404-Seite** - Benutzerdefinierte Fehlerseite
- **Typekit-Integration** - Externe Schriftarten

## 🛠️ Technologien

- [Next.js 15](https://nextjs.org/) - React Framework
- [Tailwind CSS 4](https://tailwindcss.com/) - CSS Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vercel](https://vercel.com/) - Deployment Platform

## 📁 Projektstruktur

```
src/
├── app/
│   ├── layout.tsx          # Root Layout
│   ├── page.tsx            # Hauptseite
│   ├── not-found.tsx       # 404-Seite
│   ├── globals.css         # Globale Styles
│   ├── page.module.css     # Komponenten-Styles
│   └── iframe.css          # iframe Styles
├── public/
│   └── background.png      # Hintergrundbild
└── ...
```

## 🌐 Deployment

### Vercel Deployment

Die Website ist automatisch auf Vercel konfiguriert:

1. **Automatisches Deployment** - Jeder Push auf `main` trigger ein neues Deployment
2. **Production URL** - Verfügbar über Vercel's automatische Domain
3. **Custom Domain** - Kann in Vercel Dashboard konfiguriert werden

### Deployment-Konfiguration

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: 18.x (automatisch)

## 📝 Anpassungen

### Schriftarten
- **La Bohemienne** - Für Haupttitel (über Typekit)
- **Playfair Display** - Für Untertitel (Google Fonts)
- **Rokkitt** - Für Footer-Zitat

### Farben
- **Hintergrund**: Elegantes Monogram-Bild
- **Text**: Weiß und Bernstein-Töne
- **Buttons**: Bernstein mit Hover-Effekten

## 🔧 Entwicklung

### Verfügbare Scripts

```bash
npm run dev      # Startet Entwicklungsserver
npm run build    # Erstellt Produktionsbuild
npm run start    # Startet Produktionsserver
npm run lint     # Führt ESLint aus
```

### Lokale Entwicklung

1. Klonen Sie das Repository
2. Installieren Sie Abhängigkeiten: `npm install`
3. Starten Sie den Dev-Server: `npm run dev`
4. Öffnen Sie http://localhost:3002



---

**Mit ❤️ gemacht für Doro & Felix**
