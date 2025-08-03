# MEGA Integration Testing

## 🧪 Test-Suite für MEGA Integration

Diese Test-Suite deckt alle Aspekte der MEGA Integration ab, basierend auf den Best Practices aus [React Testing](https://medium.com/@ian-white/testing-in-react-75827be47bea) und [Integration Testing](https://maxrozen.com/understanding-integration-testing-react).

## 📋 Test-Kategorien

### **1. Unit Tests**
- **MegaApi Class**: API-Wrapper Funktionalität
- **File Filtering**: Bild-Datei-Erkennung
- **Error Handling**: Fehlerbehandlung
- **Connection Management**: Verbindungsaufbau/-abbau

### **2. Integration Tests**
- **useMegaPhotos Hook**: React Hook Integration
- **State Management**: Loading, Error, Success States
- **API Integration**: MEGA API Calls
- **Data Transformation**: MEGA → Photo Format

### **3. Component Tests**
- **PhotosOnMain**: Komponente mit MEGA Integration
- **UI States**: Loading, Error, Success Indicators
- **Photo Rendering**: Lokale + MEGA Fotos
- **Responsive Design**: Verschiedene Bildschirmgrößen

## 🚀 Test-Ausführung

### **Installation (falls noch nicht geschehen):**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

### **Tests ausführen:**
```bash
# Alle Tests
npm test

# Watch Mode (für Entwicklung)
npm run test:watch

# Mit Coverage Report
npm run test:coverage

# Spezifische Tests
npm test -- --testPathPattern=MegaIntegration
```

## 📁 Test-Struktur

```
src/
├── utils/
│   ├── __tests__/
│   │   └── megaHelpers.test.ts          # Unit Tests für MegaApi
├── components/
│   ├── MegaIntegration/
│   │   ├── __tests__/
│   │   │   └── MegaPhotoLoader.test.tsx # Hook Integration Tests
│   └── PhotoGallery/
│       ├── __tests__/
│       │   └── PhotosOnMain.test.tsx    # Component Integration Tests
├── jest.config.js                       # Jest Konfiguration
└── jest.setup.js                        # Jest Setup
```

## 🎯 Test-Szenarien

### **MegaApi Unit Tests:**
- ✅ **Connection**: Erfolgreiche Verbindung mit gültigen Credentials
- ✅ **Authentication**: Fehlerbehandlung bei ungültigen Credentials
- ✅ **File Filtering**: Nur Bilddateien werden zurückgegeben
- ✅ **Sorting**: Dateien werden nach Timestamp sortiert (neueste zuerst)
- ✅ **Download URLs**: Korrekte URL-Generierung
- ✅ **Error Handling**: Graceful Degradation bei API-Fehlern

### **useMegaPhotos Hook Tests:**
- ✅ **Loading States**: Korrekte Loading-Indikatoren
- ✅ **Error Handling**: Fehlerbehandlung und -anzeige
- ✅ **Data Transformation**: MEGA Files → Photo Objects
- ✅ **Auto-Refresh**: Interval-basierte Aktualisierung
- ✅ **Manual Refresh**: Manuelles Neuladen
- ✅ **Empty Results**: Behandlung leerer Ergebnisse

### **PhotosOnMain Component Tests:**
- ✅ **Local Photos**: Anzeige lokaler Fotos
- ✅ **MEGA Photos**: Integration von MEGA-Bildern
- ✅ **Loading Indicator**: "MEGA lädt..." Anzeige
- ✅ **Error Indicator**: Fehlermeldungen bei API-Problemen
- ✅ **Photo Replacement**: Ersetzung alter MEGA-Bilder
- ✅ **localStorage**: Persistierung lokaler Fotos
- ✅ **Responsive Design**: Verschiedene Bildschirmgrößen

## 🔧 Mock-Strategien

### **MEGA.js Library:**
```typescript
jest.mock('megajs', () => ({
  Storage: jest.fn().mockImplementation(() => ({
    ready: Promise.resolve(),
    root: { /* Mock-Daten */ },
    files: { /* Mock-Files */ },
    close: jest.fn()
  }))
}))
```

### **React Hooks:**
```typescript
jest.mock('@/components/MegaIntegration/MegaPhotoLoader', () => ({
  useMegaPhotos: jest.fn()
}))
```

### **localStorage:**
```typescript
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock
```

## 📊 Coverage-Ziele

### **Mindest-Coverage:**
- **Statements**: 90%
- **Branches**: 85%
- **Functions**: 90%
- **Lines**: 90%

### **Kritische Pfade:**
- ✅ MEGA API Verbindung
- ✅ Bild-Filtering und Sorting
- ✅ Error Handling
- ✅ React Hook Lifecycle
- ✅ Component Rendering
- ✅ localStorage Integration

## 🐛 Debugging Tests

### **Häufige Probleme:**

#### **1. Jest Types nicht gefunden:**
```bash
npm install --save-dev @types/jest
```

#### **2. Testing Library nicht gefunden:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

#### **3. Module Resolution:**
```javascript
// jest.config.js
moduleNameMapping: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

#### **4. Environment Variables:**
```javascript
// jest.setup.js
process.env.NEXT_PUBLIC_MEGA_EMAIL = 'test@example.com'
```

## 🚀 CI/CD Integration

### **GitHub Actions:**
```yaml
name: MEGA Integration Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

### **Vercel Integration:**
- Tests laufen automatisch bei jedem Deploy
- Coverage Reports werden generiert
- Failed Tests blockieren Deploy

## 📝 Test-Best-Practices

### **1. Test-Namen:**
```typescript
it('should load MEGA photos successfully', async () => {
  // Test implementation
})
```

### **2. Arrange-Act-Assert:**
```typescript
// Arrange
const mockFiles = [/* test data */]
mockMegaApi.getLatestImages.mockResolvedValue(mockFiles)

// Act
const { result } = renderHook(() => useMegaPhotos(config))

// Assert
await waitFor(() => {
  expect(result.current.megaPhotos).toHaveLength(1)
})
```

### **3. Mock-Isolation:**
```typescript
beforeEach(() => {
  jest.clearAllMocks()
})
```

### **4. Async Testing:**
```typescript
await waitFor(() => {
  expect(screen.getByText('MEGA lädt...')).not.toBeInTheDocument()
})
```

## 🎯 Nächste Schritte

### **Erweiterte Tests:**
- **E2E Tests**: Cypress für vollständige User Journeys
- **Performance Tests**: MEGA API Response Times
- **Security Tests**: Credential Handling
- **Accessibility Tests**: Screen Reader Kompatibilität

### **Test-Automatisierung:**
- **Pre-commit Hooks**: Tests vor jedem Commit
- **Scheduled Tests**: Regelmäßige API-Tests
- **Visual Regression**: Screenshot-Vergleiche

**Die Test-Suite stellt sicher, dass die MEGA Integration robust und zuverlässig funktioniert!** 🧪✨ 