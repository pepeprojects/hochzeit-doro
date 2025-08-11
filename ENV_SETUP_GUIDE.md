# Environment Setup Guide - Finale MEGA Integration

## 🎯 **Status: Vollständig konfiguriert und getestet!**

### **✅ Finale Lösung: Shared Folder mit Base64 Streaming**

**Empfohlen**: Shared Folder URL für sichere und stabile MEGA-Integration.

## 🔧 **Environment Variables Setup**

### **1. .env.local erstellen**

Erstellen Sie eine `.env.local` Datei im Root-Verzeichnis:

```bash
# Im Projekt-Root-Verzeichnis
touch .env.local
```

### **2. MEGA URLs konfigurieren**

**Empfohlen**: Shared Folder URL für Anzeige und Upload-URL für Gäste

```env
# MEGA Integration (Shared Folder) - EMPFOHLEN
NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/XXXXX#YYYYY"

# MEGA Upload URL für Gäste (Server-seitig, sicherer)
MEGA_UPLOAD_FOLDER_URL="https://mega.nz/filerequest/XXXXX"
```

**Beispiel mit echten URLs:**
```env
NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/zRswVJaI#gEPXHAiBjq_uuG-ttyOhFA"
MEGA_UPLOAD_FOLDER_URL="https://mega.nz/filerequest/!n-QyBQZXBl!t-SG9jaHplaXQgRG9ybyB1bmQgRmVsaXg!m-Mg"
```

### **3. Alternative: Account-based MEGA (Optional)**

Falls Sie Account-basierte Integration bevorzugen:

```env
# Optional: Account-based MEGA (Alternative)
NEXT_PUBLIC_MEGA_EMAIL=your-email@example.com
NEXT_PUBLIC_MEGA_PASSWORD=your-password
NEXT_PUBLIC_MEGA_FOLDER_ID=optional-folder-id
NEXT_PUBLIC_MEGA_MFA_CODE=optional-mfa-code
```

## 🚀 **MEGA Shared Folder Setup**

### **Schritt 1: MEGA-Ordner erstellen**
1. **MEGA.nz** öffnen: [https://mega.nz](https://mega.nz)
2. **Neuen Ordner** erstellen
3. **Bilder hochladen** (JPG, PNG, GIF, BMP, WebP)

### **Schritt 2: Ordner teilen**
1. **Rechtsklick** auf den Ordner
2. **"Get link"** auswählen
3. **URL kopieren**: `https://mega.nz/folder/XXXXX#YYYYY`

### **Schritt 3: Environment Variable setzen**
```env
NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/XXXXX#YYYYY"
```

## ✅ **Konfiguration testen**

### **1. Development Server starten**
```bash
npm run dev
```

### **2. API testen**
```bash
# Shared Folder Streaming API testen
curl -X GET "http://localhost:3000/api/mega/shared/stream?folderUrl=https://mega.nz/folder/zRswVJaI&hash=gEPXHAiBjq_uuG-ttyOhFA"
```

**Erwartete Response:**
```json
{
  "images": [
    {
      "id": "mega-1",
      "name": "IMG_3617_dxfUjL.jpeg",
      "downloadUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
      "source": "mega"
    }
  ],
  "streamingEnabled": true
}
```

### **3. Website testen**
1. **Browser öffnen**: `http://localhost:3000`
2. **MEGA-Bilder** sollten automatisch geladen werden
3. **Loading Indicator**: "MEGA lädt... (Shared Folder + Streaming)"

## 🔒 **Sicherheit**

### **Git Ignore**
Stellen Sie sicher, dass `.env.local` in `.gitignore` steht:

```gitignore
# Environment Variables
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### **Vercel Deployment**
1. **Vercel Dashboard** öffnen
2. **Project Settings** → **Environment Variables**
3. **Variablen hinzufügen**:
   - **Name**: `NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL`
   - **Value**: `https://mega.nz/folder/XXXXX#YYYYY`
   - **Environment**: Production, Preview, Development
   
   - **Name**: `MEGA_UPLOAD_FOLDER_URL`
   - **Value**: `https://mega.nz/filerequest/XXXXX`
   - **Environment**: Production, Preview, Development

## 🐛 **Troubleshooting**

### **Problem: "Invalid MEGA shared folder URL"**
**Lösung**: Stellen Sie sicher, dass die URL den Hash enthält:
```env
# ✅ Korrekt
NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/XXXXX#YYYYY"

# ❌ Falsch
NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/XXXXX"
```

### **Problem: "No images found"**
**Lösung**: Überprüfen Sie:
1. **Bilder im MEGA-Ordner** vorhanden
2. **Unterstützte Formate**: JPG, PNG, GIF, BMP, WebP
3. **Ordner öffentlich geteilt** ist

### **Problem: "API connection failed"**
**Lösung**: Überprüfen Sie:
1. **Internetverbindung**
2. **MEGA-Ordner** ist öffentlich geteilt
3. **URL-Format** korrekt

### **Problem: Environment Variable nicht geladen**
**Lösung**: Development Server neu starten:
```bash
# Server stoppen
pkill -f "npm run dev"

# Server neu starten
npm run dev
```

## 📊 **Funktionierende Konfiguration**

### **Getestete URLs:**
```env
NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL="https://mega.nz/folder/zRswVJaI#gEPXHAiBjq_uuG-ttyOhFA"
MEGA_UPLOAD_FOLDER_URL="https://mega.nz/filerequest/!n-QyBQZXBl!t-SG9jaHplaXQgRG9ybyB1bmQgRmVsaXg!m-Mg"
```

### **Geladene Bilder:**
- **IMG_3617_dxfUjL.jpeg** (3.2 MB) - Position 4
- **IMG_5771_dxfUjL.jpeg** (3.9 MB) - Position 5

### **Technische Details:**
- **Base64 Streaming**: Bilder werden als Data URLs übertragen
- **Keine externen URLs**: Keine CORS-Probleme
- **Sofortige Anzeige**: Bilder werden direkt geladen
- **Auto-Refresh**: Alle 5 Minuten automatische Aktualisierung

## 🎉 **Fertig!**

**Ihre MEGA Integration ist vollständig konfiguriert und funktional!**

### **Nächste Schritte:**
1. **Neue Bilder** in MEGA hochladen
2. **5 Minuten warten** oder **Browser-Refresh**
3. **Bilder werden automatisch** als Base64 geladen und angezeigt
4. **Produktion** deployen wenn bereit

### **Vorteile der Shared Folder Lösung:**
- ✅ **Sicher**: Keine Account-Credentials nötig
- ✅ **Stabil**: Weniger Fehler als Account-basierte Integration
- ✅ **Einfach**: Nur eine URL konfigurieren
- ✅ **Performance**: Base64 Streaming für sofortige Anzeige
- ✅ **Keine externen Abhängigkeiten**: Data URLs funktionieren direkt 