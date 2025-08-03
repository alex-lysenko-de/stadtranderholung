https://raw.githack.com/alex-lysenko-de/stadtranderholung/main/index.html

# Stadtranderholung App

Ein webbasiertes System zur **Sicherheitsüberwachung von Kindergruppen während Ausflügen und Ferienprogrammen**.

---

## 📌 Beschreibung

Diese Anwendung unterstützt **Betreuer:innen** und **Leiter:innen** bei der Organisation und Überwachung von Kindergruppen – insbesondere bei An- und Abreise mit dem Bus. Ziel ist es, durch regelmäßige Zählungen eine erhöhte Sicherheit zu gewährleisten.

---

## 🧭 Inhaltsverzeichnis

- [🎯 Zielgruppe](#-zielgruppe)
- [🛠️ Technologie-Stack](#️-technologie-stack)
- [🚀 Erste Schritte (Einrichtung)](#-erste-schritte-einrichtung)
- [👤 Betreuer-Login & Gruppenüberwachung](#-betreuer-login--gruppenüberwachung)
- [🚌 Bus-Überwachung](#-bus-überwachung)
- [📊 Leiter-Übersicht](#-leiter-übersicht)
- [📂 Modulübersicht](#-modulübersicht)
- [🌐 Live-Demo](#-live-demo)
- [📸 Screenshots](#-screenshots)
- [🧑‍💻 Autor](#-autor)

---

## 🎯 Zielgruppe

- **Betreuer:innen** – verantwortlich für je ~10 Kinder
- **Leiter:innen (Hauptbetreuer / Leitungspersonal)** – mit Gesamtübersicht und Kontrollfunktionen

---

## 🛠️ Technologie-Stack

- **HTML5 / CSS (Bootstrap 5.3.3)** – Struktur & Gestaltung
- **Vue.js 3** – dynamische Interaktionen & Zustandverwaltung
- **JSONBin.io** – externe Speicherung von Zähldaten
- **qrcode.js** – QR-Code-Generierung
- **Hosting**: GitHub Pages via [githack.com](https://githack.com)

---

## 🚀 Erste Schritte (Einrichtung)

1. **Indexseite öffnen**  
   Öffne die Datei [index.html](https://raw.githack.com/alex-lysenko-de/stadtranderholung/main/index.html) im Browser.

   📸 [img/setup_index.png](img/setup_index.png)

2. **Konfiguration eingeben**  
   Gib folgende Daten ein:

   - **Jahr** (z. B. `2025`)
   - **Anzahl Gruppen** (z. B. `15`)
   - **Anzahl Busse** (z. B. `3`)
   - **Master Key** & **Access Key**  
     Diese erhältst du nach kostenloser Registrierung bei **[jsonbin.io](https://jsonbin.io)**

   📸 ![img/1.png](img/1.png)

3. **Einstellungen speichern**  
   Drücke **"Einstellungen speichern"**, um die Daten im lokalen Browser-Speicher zu sichern.


4. **Login-Links generieren**  
   Nutze die Buttons:

   - **Admin (Leiter) Login URL anzeigen**
   - **Betreuer Login URL anzeigen**

   Die generierten Links kannst du:

   - per WhatsApp oder E-Mail teilen
   - als QR-Code verteilen
   - in die Zwischenablage kopieren

	![img/2.png](img/2.png)
	![img/3.png](img/3.png)
---

## 👤 Betreuer-Login & Gruppenüberwachung

### 🔐 Login (`b_login.html`)

- Betreuer gibt seinen Namen ein
- Wählt Gruppennummer
- Datum wird automatisch gesetzt
- Nach dem Login gelangt man zu `b_group.html`

	![img/4.png](img/4.png)

---

### 👥 Gruppenmodul (`b_group.html`)

- **Morgenzählung** eintragen (`KinderAnzahl`)
- **Aktueller Stand** nach Ausflügen, Transfers, etc. eintragen (`KinderAnzahlNow`)
- Bei Abweichung wird die Leitung automatisch gewarnt

Optional:
- Kinderliste bearbeiten (`group_edit.html`)
- Differenzanalyse starten (`group_calc.html`)

	![img/5.png](img/5.png)
	![img/6.png](img/6.png)
	![img/7.png](img/7.png)
---

## 🚌 Bus-Überwachung (`b_bus.html`)

- Betreuer gibt an:
  - Busnummer
  - Kinderanzahl
  - Anzahl Betreuer:innen
- Alle Werte werden an JSONBin.io übertragen

	![img/8.png](img/8.png)

---

## 📊 Leiter-Übersicht

### 🔐 Login (`a_login.html`)

- Zugang zu allen Leitungsfunktionen
- Navigation zu Gruppen- und Busübersicht

	![img/9.png](img/9.png)

---


### 🚌 Busübersicht (`a_bus.html`)

- Tagesübersicht aller Busse
- Anzahl Kinder & Betreuer:innen pro Bus

	![img/10.png](img/10.png)

---

### 📋 Gruppenübersicht (`a_overview.html`)

- Übersicht über alle Gruppen
- Vergleich von Morgen- und Abendzählung
- Visuelle Warnung bei Abweichungen
- Button **"Überprüfung durchgeführt"** setzt Abendzählung zurück

	![img/12.png](img/12.png)
	![img/13.png](img/13.png)	

---

## 📂 Modulübersicht

| Datei             | Beschreibung                          |
|------------------|----------------------------------------|
| `index.html`      | Konfiguration & Link-Generierung       |
| `b_login.html`    | Betreuer-Login & Gruppenzuordnung      |
| `b_group.html`    | Kinderzählung (Start & aktuell)        |
| `b_bus.html`      | Eingabe der Busdaten                   |
| `a_login.html`    | Login für Leitungspersonal             |
| `a_overview.html` | Gruppen-Statusübersicht                |
| `a_bus.html`      | Bus-Statusübersicht                    |
| `group_edit.html` | Kinderliste einer Gruppe bearbeiten    |
| `group_calc.html` | Differenzberechnung der Kinderzahlen   |

---

## 🌐 Live-Demo

👉 **[Jetzt starten](https://raw.githack.com/alex-lysenko-de/stadtranderholung/main/index.html)**

---

## 📸 Screenshots

| Bereich                   | Bild                       |
|--------------------------|----------------------------|
| Konfiguration             | `img/setup_index.png`      |
| Betreuer-Login            | `img/betreuer_login.png`   |
| Gruppenzählung            | `img/b_group_start.png`    |
| Busdaten-Eingabe          | `img/bus_input.png`        |
| Gruppenübersicht (Leiter) | `img/overview_groups.png`  |
| Busübersicht (Leiter)     | `img/overview_buses.png`   |


---

## 🧑‍💻 Autor

**Alex Lysenko**  
📎 [GitHub-Profil](https://github.com/alex-lysenko-de)

---

> Dieses Projekt entstand zur Verbesserung der Sicherheit bei Stadtranderholungen und ähnlichen Events. Es steht als Open Source zur Verfügung.
