# Feature: Draggable Photo Gallery

## 🎯 Ziel
Erstelle Fotos auf der Startseite, die es Benutzern ermöglicht, die Fotos per Drag & Drop zu verschieben und neu anzuordnen.

## 📋 Anforderungen

### Funktionale Anforderungen
- [ ] **Foto-Anzeige**:  Fotos werdenauf der Startseite angezeigt
- [ ] **Drag & Drop**: Fotos können per Maus/Touch verschoben werden
- [ ] **Schließen**: Fotos können per klick geschlossen werden 
- [ ] **Responsive Design**: Funktioniert auf Desktop, Tablet und Mobile
- [ ] **Lazy Loading**: Fotos werden nur bei Bedarf geladen


### Technische Anforderungen
- [ ] https://examples.motion.dev/react/drag motion react drag 
- [ ] **Next.js Image Component** für optimierte Bilddarstellung
- [ ] **TypeScript** für Type Safety
- [ ] **Tailwind CSS** für Styling

### UI/UX Anforderungen
- [ ] **Elegantes Design** passend zur Hochzeitsseite,
- [ ] **Smooth Animations** beim Verschieben (https://examples.motion.dev/react/drag)
- [ ] **Hover-Effekte** für bessere Interaktivität


## 🏗️ Architektur

### Komponenten-Struktur
```
src/
├── components/
│   ├── PhotoGallery/
│   │   ├── PhotoGallery.tsx          # Hauptkomponente
│   │   ├── PhotoCard.tsx             # Einzelnes Foto
│   │   └── PhotoGallery.module.css   # Styles
│   └── ...
├── types/
│   └── photo.ts                      # TypeScript Interfaces
└── utils/
    └── photoUtils.ts                 # Hilfsfunktionen
```

### Datenstruktur
```typescript
interface Photo {
  id: string;
  url: string;
  alt: string;
  uploadedAt: Date;
  uploadedBy: string;
  position: number;
  thumbnailUrl?: string;
}
```

## 🎨 Design-Spezifikation

### Layout
- **Foto-Layout**: Random verteilte Fotos auf der gesamten Fläche, 3 Fotos in Summe (z.B. eins oben links, eins rechts mittig, ein kleines unten rechts)

### Styling
- **Hintergrund**: Transparent (über Hintergrundbild)
- **Foto-Rahmen**: kein Rahmen
- **Loading**: Skeleton-Animation

### Farben
- **Schatten**: `shadow-lg shadow-amber-900/20`
- **Hover**: `shadow-xl shadow-amber-900/30`
- **Text**: `text-white` für Overlays

## 🔧 Implementation

### Schritt 1: Dependencies installieren
```bash
https://examples.motion.dev/react/drag motion react drag 
```

### Schritt 2: Basis-Komponenten erstellen
1. **PhotoCard.tsx** - Einzelnes Foto mit Drag-Handle
2. **PhotosOnMain.tsx** - Hauptcontainer mit DragDropContext



### Schritt 4: Integration in page.tsx
```tsx
// In page.tsx nach dem Upload-Button
<PhotoGallery />
```


## 🧪 Testing

### Unit Tests
- [ ] PhotoCard Component Rendering
- [ ] Drag & Drop Funktionalität
- [ ] Photo Modal Öffnen/Schließen
- [ ] Responsive Breakpoints

### Integration Tests
- [ ] Galerie-Integration in Hauptseite
- [ ] Foto-Upload Flow
- [ ] Local Storage Persistierung

## 🚀 Deployment

### Voraussetzungen
- [ ] Alle Tests bestanden
- [ ] Performance optimiert (Lazy Loading)
- [ ] Accessibility (ARIA-Labels)
- [ ] SEO optimiert (Alt-Tags)

### Rollout
1. Feature Branch in main mergen 
2. Vercel Deployment testen
3. Mobile/Desktop Testing
4. Performance Monitoring

## 📝 Notizen für Cursor

### Wichtige Punkte
- **Konsistenz**: Design muss zur bestehenden Hochzeitsseite passen
- **Performance**: Fotos sollten lazy geladen werden
- **Accessibility**: Screen Reader kompatibel
- **Mobile First**: Touch-Interaktionen priorisieren

### Technische Details
- Verwende import { motion } from "motion/react" 
- Implementiere **Intersection Observer** für Lazy Loading
- Nutze **Next.js Image** für optimierte Bilddarstellung
- Speichere Anordnung in **localStorage** für Persistierung

### Code-Style
- **TypeScript** für alle neuen Dateien
- **Tailwind CSS** für Styling
- **ESLint** Regeln befolgen
- **Prettier** Formatierung

---

**Status**: 🟡 In Entwicklung  
**Branch**: `feature/draggable-photo-gallery`  
**Assignee**: Cursor AI  
**Due Date**: TBD 