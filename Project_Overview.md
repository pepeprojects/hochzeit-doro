# Project Overview - Hochzeit Doro & Felix

## 🎯 **Projektziel**
Hochzeits-Webseite mit MEGA-Integration für automatisches Foto-Sharing. Gäste können Fotos hochladen, die automatisch auf der Hauptseite angezeigt werden.

## 📊 **Projektstatus**
- **Phase**: MVP ✅ Produktiv
- **Deployment**: Vercel ✅ Live
- **MEGA Integration**: ✅ Vollständig implementiert
- **Security**: ✅ Server-seitige Environment Variables
- **Documentation**: ✅ Vollständig dokumentiert

## 🏗️ **Projektstruktur**

```
hochzeit-doro/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── mega/
│   │   │       ├── config/
│   │   │       │   └── route.ts          # Sichere MEGA-Konfiguration
│   │   │       ├── shared/
│   │   │       │   └── stream/
│   │   │       │       └── route.ts      # Base64 Image Streaming
│   │   │       └── test/
│   │   │           └── route.ts          # API Test Endpoint
│   │   ├── page.tsx                      # Hauptseite
│   │   ├── layout.tsx                    # Root Layout
│   │   └── globals.css                   # Global Styles
│   ├── components/
│   │   ├── PhotoGallery/
│   │   │   ├── PhotosOnMain.tsx          # Haupt-Photo-Container
│   │   │   └── PhotoCard.tsx             # Einzelnes Foto
│   │   └── MegaIntegration/
│   │       ├── useMegaConfig.ts          # Sichere Config Hook
│   │       └── useMegaPhotosAdvanced.ts  # MEGA Photo Hook
│   └── types/
│       └── photo.ts                      # TypeScript Interfaces
├── public/                               # Statische Assets
├── .env.local                            # Environment Variables (gitignored)
├── next.config.ts                        # Next.js Konfiguration
└── package.json                          # Dependencies
```

## 🔧 **Technologie-Stack**

### **Frontend**
- **Framework**: Next.js 15.4.5 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Fonts**: Custom Typekit + Google Fonts

### **Backend**
- **API Routes**: Next.js API Routes
- **MEGA Integration**: MEGA.js Library
- **Image Processing**: Base64 Streaming
- **Authentication**: Server-side Environment Variables

### **Deployment**
- **Platform**: Vercel
- **Environment**: Production + Preview
- **Domain**: hochzeit-doro-felix.de

## 🔐 **Security Schema**

### **Environment Variables**
```typescript
// ✅ Server-seitig (sicher)
MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/XXXXX#YYYYY"
MEGA_UPLOAD_FOLDER_URL="https://mega.nz/filerequest/XXXXX"

// ❌ Client-seitig (entfernt)
NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL
```

### **API Security**
- **CORS**: Server-side API Routes
- **Authentication**: MEGA Shared Folder (keine Credentials)
- **Data Flow**: Base64 → Data URLs (keine externen URLs)

## 📋 **Feature Matrix**

| Feature | Status | Implementation | Testing |
|---------|--------|----------------|---------|
| **Hauptseite** | ✅ | `src/app/page.tsx` | ✅ |
| **Photo Gallery** | ✅ | `src/components/PhotoGallery/` | ✅ |
| **Draggable Photos** | ✅ | Framer Motion | ✅ |
| **MEGA Integration** | ✅ | `src/components/MegaIntegration/` | ✅ |
| **Base64 Streaming** | ✅ | `/api/mega/shared/stream` | ✅ |
| **Responsive Design** | ✅ | Tailwind CSS | ✅ |
| **Custom Fonts** | ✅ | Typekit + Google Fonts | ✅ |
| **Upload Button** | ✅ | MEGA File Request | ✅ |
| **Auto-Refresh** | ✅ | 5-Minuten Interval | ✅ |
| **Error Handling** | ✅ | UI Feedback | ✅ |

## 🧪 **Testmanagement**

### **Test-Strategie**
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API Route Testing
- **E2E Tests**: Manual Testing (MVP)
- **Performance**: Vercel Analytics

### **Test-Coverage**
```bash
# API Tests
curl http://localhost:3000/api/mega/test
curl http://localhost:3000/api/mega/config

# Build Tests
npm run build
npm run lint
```

### **Quality Gates**
- ✅ **Build**: `npm run build` erfolgreich
- ✅ **Linting**: ESLint ohne Fehler
- ✅ **Types**: TypeScript kompiliert
- ✅ **Deployment**: Vercel Deploy erfolgreich

## 🚀 **Deployment Pipeline**

### **Vercel Configuration**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### **Environment Variables (Vercel)**
1. **MEGA_SHARED_FOLDER_URL**: MEGA Shared Folder
2. **MEGA_UPLOAD_FOLDER_URL**: MEGA File Request
3. **Environments**: Production, Preview, Development

### **Deployment Process**
1. **Git Push** → Vercel Auto-Deploy
2. **Build Check** → TypeScript + ESLint
3. **Environment Check** → Variables validieren
4. **Deploy** → Production/Preview

## 📚 **Dokumentation-Architektur**

### **Zentrale Dokumente**
- **`Project_Overview.md`** ← Dieses Dokument (Zentrale)
- **`README.md`** ← Projekt-Übersicht + Setup
- **`ENV_SETUP_GUIDE.md`** ← Environment Setup
- **`FEATURE_MEGA_INTEGRATION.md`** ← MEGA Implementation

### **Feature-Dokumente**
- **`FEATURE_DRAGGABLE_PHOTOS.md`** ← Photo Gallery
- **`MEGA_INTEGRATION_SUCCESS.md`** ← MEGA Success Story
- **`MEGA_STREAMING_COMPLETE.md`** ← Base64 Streaming

### **Dokumentation-Prinzipien**
- ✅ **DRY**: Keine Code-Duplikation
- ✅ **Verweise**: Links zu spezifischen Dateien
- ✅ **Cursor-Optimiert**: Klare Struktur für AI
- ✅ **Aktuell**: Nach jedem Commit updated

## 🎯 **MVP Vorgehen**

### **Phase 1: Foundation ✅**
- [x] Next.js + Tailwind Setup
- [x] Grundlegende Hochzeits-Seite
- [x] Custom Fonts Integration
- [x] Responsive Design

### **Phase 2: Photo Gallery ✅**
- [x] Draggable Photo System
- [x] Local Storage Persistence
- [x] Responsive Positioning
- [x] Close Functionality

### **Phase 3: MEGA Integration ✅**
- [x] MEGA.js API Integration
- [x] Base64 Image Streaming
- [x] Shared Folder Access
- [x] Auto-Refresh System

### **Phase 4: Production ✅**
- [x] Vercel Deployment
- [x] Environment Variables
- [x] Security Hardening
- [x] Documentation Complete

## 🔄 **Development Workflow**

### **Branch Strategy**
```bash
main                    # Production Branch
├── feature/mega        # MEGA Integration
├── feature/photos      # Photo Gallery
└── hotfix/security     # Security Fixes
```

### **Commit Convention**
```
type: Kurze Beschreibung

- ✅ Feature hinzugefügt
- 🔧 Bug fix
- 🔒 Security update
- 📚 Documentation update
```

### **Code Review Process**
1. **Feature Branch** erstellen
2. **Implementierung** + Tests
3. **Documentation** update
4. **Pull Request** mit Beschreibung
5. **Review** + Merge

## 📊 **Performance Metrics**

### **Build Performance**
- **Build Time**: ~4.0s
- **Bundle Size**: 146 kB (First Load)
- **Lighthouse Score**: 95+ (Performance)

### **Runtime Performance**
- **Image Loading**: Base64 (sofortig)
- **Auto-Refresh**: 5-Minuten Interval
- **Memory Usage**: Optimiert (keine externen URLs)

### **Monitoring**
- **Vercel Analytics**: Performance Tracking
- **Error Tracking**: Console Logs
- **User Feedback**: Manual Testing

## 🔧 **Cursor-Optimierung**

### **File Organization**
- **Klare Hierarchie**: src/ → components/ → features/
- **Konsistente Namensgebung**: PascalCase für Components
- **TypeScript**: Vollständige Typisierung
- **JSDoc**: Kommentare für komplexe Funktionen

### **Code Patterns**
```typescript
// ✅ Konsistente Hook-Struktur
export function useMegaPhotosAdvanced({ config, refreshInterval }) {
  const [state, setState] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // Implementation
  }, [dependencies])
  
  return { state, loading, error }
}

// ✅ Konsistente API-Struktur
export async function GET(request: NextRequest) {
  try {
    // Implementation
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
```

### **Documentation Patterns**
- **Verweise**: `[siehe FEATURE_MEGA_INTEGRATION.md](#mega-integration)`
- **Code-Blöcke**: Mit Syntax-Highlighting
- **Status-Emojis**: ✅ ❌ 🔧 📚
- **Strukturierte Listen**: Mit Hierarchie

## 🚨 **Troubleshooting Guide**

### **Häufige Probleme**
1. **Build Errors**: `npm run build` → ESLint/TypeScript
2. **MEGA Errors**: API Route Logs → Environment Variables
3. **Deployment Errors**: Vercel Logs → Environment Check
4. **Performance Issues**: Lighthouse → Bundle Analysis

### **Debugging Tools**
- **Browser**: Developer Tools + Console
- **Terminal**: `npm run dev` + API Logs
- **Vercel**: Function Logs + Analytics
- **MEGA**: Shared Folder Access Test

## 📈 **Roadmap**

TBD

### **Nächste Features**
- [ ] Galerie
- [ ] Basic Auth (eine Frage bei Login)


---

## 📝 **Last Updated**
- **Date**: 2025-08-11
- **Commit**: fa4ccf9
- **Status**: Production Ready ✅
- **Next Update**: Nach nächstem Commit

---

**💡 Tipp für Cursor**: Verwende diese Overview als zentrale Referenz. Alle spezifischen Details findest du in den verlinkten Dokumenten. Halte die Dokumentation aktuell und vermeide Duplikationen durch Verweise.** 