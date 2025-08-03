# Shared Folder Setup - Schritt-für-Schritt Anleitung

## 🎯 **Ziel: MEGA Shared Folder für Hochzeitsfotos einrichten**

### **Vorteile der Shared Folder Lösung:**
- ✅ **Keine EFAILED-Fehler**
- ✅ **Keine Credentials im Frontend**
- ✅ **Keine MFA erforderlich**
- ✅ **Sicherer für Produktion**
- ✅ **Einfacher Setup**

## 📋 **Schritt 1: MEGA-Ordner erstellen und teilen**

### **1.1 MEGA-Ordner erstellen**
1. Öffnen Sie [MEGA.nz](https://mega.nz) in Ihrem Browser
2. Loggen Sie sich in Ihr MEGA-Konto ein
3. Klicken Sie auf "New Folder" (Neuer Ordner)
4. Nennen Sie den Ordner "Hochzeitsfotos" oder ähnlich

### **1.2 Ordner teilen**
1. Rechtsklick auf den erstellten Ordner
2. Wählen Sie "Get link" (Link erhalten)
3. Kopieren Sie den generierten Link
4. Der Link sollte so aussehen: `https://mega.nz/folder/XXXXX#YYYYY`

### **1.3 Ordner-Einstellungen (Optional)**
1. Klicken Sie auf "Link options" (Link-Optionen)
2. Stellen Sie sicher, dass "Read and write" aktiviert ist
3. Optional: Setzen Sie ein Passwort für zusätzliche Sicherheit

## 🔧 **Schritt 2: Environment Variable setzen**

### **2.1 .env.local Datei öffnen**
```bash
# Im Projektverzeichnis
nano .env.local
# oder
code .env.local
```

### **2.2 Shared Folder URL hinzufügen**
```env
# Neue Variable hinzufügen
NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL=https://mega.nz/folder/XXXXX#YYYYY

# Alte MEGA-Variablen können entfernt werden (optional)
# NEXT_PUBLIC_MEGA_EMAIL=...
# NEXT_PUBLIC_MEGA_PASSWORD=...
# NEXT_PUBLIC_MEGA_FOLDER_ID=...
# NEXT_PUBLIC_MEGA_MFA_CODE=...
```

### **2.3 Datei speichern**
- Speichern Sie die `.env.local` Datei
- Starten Sie den Development Server neu: `npm run dev`

## 🧪 **Schritt 3: Test der Integration**

### **3.1 API-Route testen**
```bash
# Test der Shared Folder API
curl "http://localhost:3000/api/mega/shared?folderUrl=YOUR_SHARED_URL"
```

### **3.2 Browser testen**
1. Öffnen Sie `http://localhost:3000`
2. Überprüfen Sie die Browser-Konsole auf Fehler
3. Schauen Sie nach dem MEGA Loading Indicator

### **3.3 Test-Bilder hochladen**
1. Öffnen Sie den geteilten MEGA-Ordner
2. Laden Sie 1-2 Test-Bilder hoch
3. Warten Sie 5 Minuten oder aktualisieren Sie die Seite

## 🎨 **Schritt 4: UI-Verbesserungen**

### **4.1 Connection Type anzeigen**
Die UI zeigt jetzt automatisch an, ob Shared Folder oder Account verwendet wird:
- **"MEGA lädt... (Shared Folder)"** = Shared Folder
- **"MEGA lädt... (Account)"** = Account-basiert

### **4.2 Error Handling**
- **Keine EFAILED-Fehler** mehr
- **Benutzerfreundliche Fehlermeldungen**
- **Automatische Wiederherstellung**

## 🚀 **Schritt 5: Produktion vorbereiten**

### **5.1 Vercel Environment Variables**
1. Öffnen Sie das Vercel Dashboard
2. Gehen Sie zu Project Settings → Environment Variables
3. Fügen Sie hinzu:
   ```
   Name: NEXT_PUBLIC_MEGA_SHARED_FOLDER_URL
   Value: https://mega.nz/folder/XXXXX#YYYYY
   Environment: Production, Preview, Development
   ```

### **5.2 Deployment testen**
1. Committen Sie die Änderungen
2. Pushen Sie zu GitHub
3. Überprüfen Sie das Vercel Deployment
4. Testen Sie die Live-Website

## 📊 **Monitoring und Debugging**

### **6.1 Console Logs überwachen**
```javascript
// Browser Console
// Suchen Sie nach:
// - "MEGA lädt... (Shared Folder)"
// - "Failed to load MEGA photos"
// - "MEGA connection failed"
```

### **6.2 API-Status prüfen**
```bash
# Test-Route
curl http://localhost:3000/api/mega/test

# Shared Folder API
curl "http://localhost:3000/api/mega/shared?folderUrl=YOUR_URL"
```

### **6.3 Network Tab**
1. Öffnen Sie Browser DevTools
2. Gehen Sie zu Network Tab
3. Suchen Sie nach `/api/mega/shared` Requests
4. Überprüfen Sie Response Status

## 🔄 **Schritt 6: Automatische Updates**

### **6.1 Refresh Interval**
- **Standard**: Alle 5 Minuten
- **Konfigurierbar**: In `useMegaPhotosAdvanced`
- **Manuell**: Browser-Refresh

### **6.2 Neue Bilder**
1. Bilder in MEGA-Ordner hochladen
2. Automatische Erkennung nach 5 Minuten
3. Oder Browser-Refresh für sofortige Anzeige

## ✅ **Erfolgskriterien**

### **Funktionalität:**
- ✅ **MEGA Loading Indicator** erscheint
- ✅ **"(Shared Folder)"** wird angezeigt
- ✅ **Keine EFAILED-Fehler** in Console
- ✅ **Bilder werden geladen** (falls vorhanden)

### **Performance:**
- ✅ **Schnelle API-Responses**
- ✅ **Keine CORS-Probleme**
- ✅ **Stabile Verbindung**

### **Sicherheit:**
- ✅ **Keine Credentials** im Frontend
- ✅ **Shared Folder** Zugriff
- ✅ **Keine MFA** erforderlich

## 🆘 **Troubleshooting**

### **Problem: "Shared folder not found"**
**Lösung:**
1. Überprüfen Sie die Shared Folder URL
2. Stellen Sie sicher, dass der Ordner geteilt ist
3. Testen Sie den Link direkt im Browser

### **Problem: "No images found"**
**Lösung:**
1. Laden Sie Bilder in den MEGA-Ordner hoch
2. Warten Sie 5 Minuten oder aktualisieren Sie
3. Überprüfen Sie die Bildformate (.jpg, .png, etc.)

### **Problem: "API error"**
**Lösung:**
1. Überprüfen Sie die Environment Variable
2. Starten Sie den Development Server neu
3. Testen Sie die API-Route direkt

## 🎉 **Fertig!**

**Ihre MEGA Shared Folder Integration ist jetzt aktiv und bereit für den produktiven Einsatz!**

### **Nächste Schritte:**
1. **Test-Bilder** in den MEGA-Ordner hochladen
2. **Produktion** deployen
3. **Monitoring** aktivieren
4. **Gäste** einladen, Bilder hochzuladen

**Die Shared Folder Lösung bietet maximale Stabilität und Sicherheit!** 🚀✨ 