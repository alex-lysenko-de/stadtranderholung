# Stadtranderholung 2025 - Group Management System

Ein webbasiertes System zur Verwaltung von Gruppen und Überwachung der täglichen Aktivitäten von Kindern bei organisierten Ausflügen (z.B. Camps, Exkursionen, Ferienfahrten).

## 📋 Übersicht

Das System wurde entwickelt, um die Sicherheit von Kindern durch systematische Kontrolle ihrer Anzahl in allen Phasen einer Reise zu gewährleisten. Es ermöglicht Betreuern die einfache Erfassung von Kinderzahlen und Administratoren eine zentrale Übersicht über alle Gruppen.

## 🎯 Hauptfunktionen

- **Betreuer-Anmeldung**: Einfache Registrierung für Betreuer mit Gruppenauswahl
- **Kinderzahl-Tracking**: Erfassung der Anzahl Kinder am Morgen und aktuell
- **Administrator-Übersicht**: Zentrale Ansicht aller Gruppen mit Echtzeitaktualisierung
- **Diskrepanz-Erkennung**: Automatische Warnung bei fehlenden Kindern
- **Mobile-optimiert**: Speziell für Android und iOS Smartphones entwickelt

## 🏗️ Architektur

### Technologie-Stack
- **Frontend**: HTML5, CSS (Bootstrap 5.3.3), JavaScript (Vue.js 3)
- **Backend**: JSONBin.io als Cloud-JSON-Storage
- **Hosting**: GitHub Pages
- **Sprache**: Deutsch

### Dateistruktur
```
stadtranderholung/
├── login.html              # Betreuer-Anmeldung
├── group.html              # Gruppenverwaltung
├── admin_overview.html     # Administrator-Übersicht
├── group_edit.html         # Kinderliste bearbeiten (Zukunft)
├── group_calc.html         # Anwesenheitsrechnung (Zukunft)
├── config.js               # Geteilte Konfiguration und Utilities
├── README.md               # Diese Dokumentation
└── assets/                 # CSS, Bilder, weitere Ressourcen
```

## 🚀 Installation und Setup

### 1. Repository klonen
```bash
git clone https://github.com/alex-lysenko-de/stadtranderholung.git
cd stadtranderholung
```

### 2. JSONBin.io Konfiguration
Das System nutzt JSONBin.io als Backend. Die Konfiguration ist bereits in `config.js` eingestellt:

```javascript
API: {
    BASE_URL: 'https://api.jsonbin.io/v3/b',
    BIN_ID: '68834e6e7b4b8670d8a712d0',
    MASTER_KEY: '...',
    ACCESS_KEY: '...'
}
```

### 3. Lokale Entwicklung
Da es sich um eine reine Frontend-Anwendung handelt, können Sie jeden lokalen Webserver verwenden:

```bash
# Mit Python 3
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
```

### 4. GitHub Pages Deployment
1. Repository zu GitHub pushen
2. In Repository Settings → Pages → Source: "Deploy from a branch"
3. Branch: `main`, Folder: `/ (root)`
4. Die Seite ist verfügbar unter: `https://alex-lysenko-de.github.io/stadtranderholung/`

## 💾 Datenstruktur

### JSONBin Datenformat
```json
{
  "2025-07-26": {
    "groups": {
      "1": {
        "Betreuer": ["Max Mustermann", "Anna Schmidt"],
        "KinderAnzahl": 10,
        "KinderAnzahlNow": 9
      },
      "2": {
        "Betreuer": ["Lisa Weber"],
        "KinderAnzahl": 8,
        "KinderAnzahlNow": 8
      }
    }
  }
}
```

### LocalStorage Struktur
```javascript
// Betreuer Name für Wiederverwendung
localStorage.setItem('betreuer_name', 'Max Mustermann');

// Zukünftige Erweiterung: Kinderlisten pro Gruppe
localStorage.setItem('group_1_children_2025-07-26', JSON.stringify([
  {
    id: 1,
    firstName: 'Emma',
    lastName: 'Schmidt',
    age: 8,
    parent: 'Maria Schmidt',
    present: true
  }
]));
```

## 📱 Benutzeranleitung

### Für Betreuer

1. **Anmeldung** (`login.html`)
   - Aktuelles Datum wird automatisch gesetzt
   - Namen eingeben (wird für nächstes Mal gespeichert)
   - Gruppe aus Dropdown wählen (1-15)
   - "Anmelden" klicken

2. **Gruppenverwaltung** (`group.html`)
   - **Anzahl Kinder am Morgen**: Einmalig am Tag eintragen (von Eltern erhalten)
   - **Aktuelle Anzahl**: Bei jeder Nachzählung aktualisieren
   - Zugewiesene Betreuer werden angezeigt
   - Automatische Aktualisierung alle 30 Sekunden

### Für Administratoren

1. **Übersicht** (`admin_overview.html`)
   - Gesamtübersicht aller 15 Gruppen
   - Automatische Aktualisierung alle 10 Sekunden
   - **Kinder nachzählen**: Setzt alle aktuellen Zahlen zurück
   - Rote Warnung bei fehlenden Kindern
   - Klick auf Gruppennummer führt zur Detailansicht

## 🔧 Konfiguration

### Anpassbare Einstellungen in `config.js`

```javascript
// Anzahl der Gruppen ändern
APP: {
    TOTAL_GROUPS: 15, // Auf gewünschte Anzahl anpassen
    MAX_CHILDREN_PER_GROUP: 20,
    AUTO_REFRESH_INTERVAL: 10000 // Aktualisierungsintervall
}

// API-Einstellungen
API: {
    TIMEOUT: 30000, // Request-Timeout
    // Weitere JSONBin.io Konfiguration
}
```

### Styling anpassen
Das System nutzt Bootstrap 5.3.3 mit benutzerdefinierten CSS-Überschreibungen:

```css
/* Farbschema anpassen */
.card-header {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
}

/* Mobile-optimierte Schriftgrößen */
.form-control {
    font-size: 18px; /* Größer für mobile Geräte */
}
```

## 🔒 Sicherheit und Datenschutz

### Implementierte Sicherheitsmaßnahmen
- **XSS-Schutz**: Alle Benutzereingaben werden sanitisiert
- **Input-Validierung**: Serverseitige und clientseitige Validierung
- **HTTPS**: Alle API-Calls über verschlüsselte Verbindung
- **Error Handling**: Umfassendes Fehlerbehandlungssystem

### Datenschutzhinweise
- **Keine personenbezogenen Daten**: System speichert nur Vornamen der Betreuer
- **Lokale Speicherung**: Sensitive Daten nur im Browser-LocalStorage
- **Temporäre Daten**: Daten werden täglich zurückgesetzt
- **DSGVO-konform**: Minimale Datenerfassung und -verarbeitung

## 🚧 Zukünftige Erweiterungen

### Phase 2: Vollständige Funktionalität
- [ ] `group_edit.html`: Vollständige Kinderlisten-Verwaltung
- [ ] `group_calc.html`: Interaktive Anwesenheitsprüfung
- [ ] Offline-Modus mit Synchronisation
- [ ] Push-Benachrichtigungen für Betreuer

### Phase 3: Erweiterte Features
- [ ] QR-Code-Generierung für schnellen Zugang
- [ ] Foto-Upload für Kinderidentifikation
- [ ] Export-Funktionen (PDF, CSV)
- [ ] Mehrsprachigkeit (English, Türkisch)

### Phase 4: Integration
- [ ] Eltern-Benachrichtigungssystem
- [ ] Notfall-Kontakt-Management
- [ ] Medizinische Informationen
- [ ] Statistiken und Berichte

## 🐛 Fehlerbehandlung und Debugging

### Logging-System
Das System verfügt über ein umfassendes Logging-System:

```javascript
// Verschiedene Log-Level verfügbar
SR_Logger.error('Kritischer Fehler', errorData);
SR_Logger.warn('Warnung', warnData);
SR_Logger.info('Information', infoData);
SR_Logger.debug('Debug-Info', debugData);

// Log-Level in Browser-Console einstellen
SR_Logger.setLevel(SR_Logger.LEVELS.DEBUG);
```

### Häufige Probleme und Lösungen

**Problem**: "Daten können nicht geladen werden"
- **Lösung**: Internetverbindung prüfen, JSONBin.io Status überprüfen
- **Debug**: Browser-Console für API-Fehler kontrollieren

**Problem**: "Gruppe nicht gefunden"
- **Lösung**: URL-Parameter überprüfen (`?gr=1` bis `?gr=15`)
- **Debug**: Über login.html korrekt zur Gruppe navigieren

**Problem**: "LocalStorage voll"
- **Lösung**: Browser-Cache leeren oder SR_Utils.storage.clearAll() ausführen

## 📊 Performance-Optimierung

### Bereits implementiert
- **Debouncing**: API-Calls werden verzögert um Server zu schonen
- **Caching**: Daten werden lokal zwischengespeichert
- **Lazy Loading**: Komponenten werden nur bei Bedarf geladen
- **Minimale DOM-Manipulation**: Vue.js für effiziente Updates

### Empfohlene Browser-Einstellungen
- **Cache aktivieren**: Für bessere Performance
- **JavaScript aktivieren**: Erforderlich für Funktionalität
- **Cookies zulassen**: Für LocalStorage-Funktionalität

## 🔄 API-Dokumentation

### JSONBin.io Endpoints

```javascript
// Daten abrufen
GET https://api.jsonbin.io/v3/b/{BIN_ID}/latest
Headers: {
  'X-Master-Key': 'YOUR_MASTER_KEY',
  'X-Access-Key': 'YOUR_ACCESS_KEY'
}

// Daten aktualisieren
PUT https://api.jsonbin.io/v3/b/{BIN_ID}
Headers: {
  'Content-Type': 'application/json',
  'X-Master-Key': 'YOUR_MASTER_KEY',
  'X-Access-Key': 'YOUR_ACCESS_KEY'
}
Body: JSON-Datenstruktur
```

### Rate Limits
- **Lesen**: 1000 Requests/Monat (kostenlos)
- **Schreiben**: 100 Requests/Monat (kostenlos)
- **Timeout**: 30 Sekunden pro Request

## 🧪 Testing

### Manuelle Tests
1. **Login-Flow testen**:
   - Verschiedene Browsern (Chrome, Firefox, Safari)
   - Mobile Geräte (Android, iOS)
   - Offline-Verhalten

2. **Datensynchronisation testen**:
   - Mehrere Browser gleichzeitig öffnen
   - Änderungen in einem Browser vornehmen
   - Aktualisierung in anderen Browsern prüfen

3. **Error-Handling testen**:
   - Internet-Verbindung unterbrechen
   - Ungültige Daten eingeben
   - API-Limits erreichen

### Automatisierte Tests (geplant)
```javascript
// Beispiel für zukünftige Unit Tests
describe('SR_Utils', () => {
  test('formatDate should return German date format', () => {
    expect(SR_Utils.formatDate('2025-07-26')).toContain('Juli');
  });
  
  test('isValidGroupNumber should validate group range', () => {
    expect(SR_Utils.isValidGroupNumber(1)).toBe(true);
    expect(SR_Utils.isValidGroupNumber(16)).toBe(false);
  });
});
```

## 📞 Support und Kontakt

### Bei Problemen
1. **Browser-Console prüfen**: F12 → Console → Nach Fehlern suchen
2. **Dokumentation lesen**: Alle Funktionen sind dokumentiert
3. **GitHub Issues**: Bugs und Feature-Requests melden

### Entwickler-Kontakt
- **Repository**: https://github.com/alex-lysenko-de/stadtranderholung
- **Issues**: GitHub Issues für Bug-Reports
- **Dokumentation**: Inline-Kommentare im Code

## 📜 Lizenz

Dieses Projekt wurde für die Stadtranderholung 2025 entwickelt und steht unter einer Open-Source-Lizenz. 

### Nutzungsbedingungen
- ✅ Kostenlose Nutzung für gemeinnützige Zwecke
- ✅ Anpassungen und Erweiterungen erlaubt
- ✅ Weitergabe an andere Organisationen gestattet
- ❌ Kommerzielle Nutzung ohne Rücksprache nicht gestattet

---

## 📝 Changelog

### Version 1.0.0 (2025-07-26)
- ✅ Grundlegende Architektur implementiert
- ✅ Login-System für Betreuer
- ✅ Gruppenverwaltung mit Kinderzählung
- ✅ Administrator-Übersicht mit Echtzeitdaten
- ✅ Responsive Design für mobile Geräte
- ✅ JSONBin.io Integration
- ✅ Umfassendes Error-Handling
- ✅ Basis-Struktur für zukünftige Erweiterungen

### Geplante Updates
- 🔄 Version 1.1.0: Vollständige group_edit.html Funktionalität
- 🔄 Version 1.2.0: Interaktive group_calc.html Implementation
- 🔄 Version 1.3.0: Offline-Modus und Synchronisation
- 🔄 Version 2.0.0: Erweiterte Features und Integrationen

---

*Entwickelt mit ❤️ für die Sicherheit unserer Kinder bei der Stadtranderholung 2025*
        