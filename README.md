# StreamCore TV - Technische Dokumentation

Diese Dokumentation bietet einen technischen Überblick über die Architektur, die verwendeten Technologien und die Funktionalitäten der StreamCore TV-Plattform. Es handelt sich um eine moderne Single-Page-Application (SPA), die eine IPTV- und VOD-Umgebung (Video on Demand) simuliert.

---

## 1. Technologie-Stack & Abhängigkeiten

Die Applikation wurde als reine Frontend-Lösung konzipiert und nutzt moderne JavaScript-Frameworks und UI-Bibliotheken.

**Kern-Technologien:**

* **React 18:** Für den deklarativen Aufbau der Benutzeroberfläche und die komponentenbasierte Architektur.
* **Vite:** Als extrem schnelles Build-Tool und lokaler Entwicklungsserver.
* **React Router DOM (v6):** Für das clientseitige Routing und die Verwaltung des Navigationsverlaufs (inkl. State-Übergabe via `useLocation`).

**UI & Styling:**

* **Bootstrap 5:** Das Grid-System und grundlegende UI-Komponenten (Dropdowns, Cards, Badges, Toasts) werden über das Bootstrap CSS/JS-Bundle aus dem CDN (eingebunden in der `index.html`) gesteuert.
* **Bootstrap Icons:** Für die vektorbasierte Ikonografie.
* **Custom CSS:** Spezifische Anpassungen (wie das Verbergen der Standard-Scrollbars, benutzerdefinierte Drag-to-Scroll-Bereiche und globale Textselektions-Sperren via `user-select: none`) befinden sich in der `index.css` sowie als Inline-Styles für hochdynamische Elemente.

**State Management:**

* **React Context API:** Ein globaler Zustand (`AppContext.jsx`) fungiert als Mock-Datenbank. Hier werden Benutzerdaten, Cloud-Speicher-Kapazitäten, ein dynamisches Content-Array (Filme, Serien, Live-TV) und der genaue Status der Abonnements verwaltet.

---

## 2. Installation & Start

Um die Applikation lokal auszuführen, müssen **Node.js** und ein Paketmanager (wie `npm` oder `yarn`) auf dem System installiert sein.

**Schritt 1: Abhängigkeiten installieren**
Navigiere im Terminal in das Stammverzeichnis des Projekts und führe folgenden Befehl aus:

```bash
npm install

```

**Schritt 2: Entwicklungsserver starten**
Starte den Vite-Server mit:

```bash
npm run dev

```

Der Terminal gibt anschließend eine lokale URL (in der Regel `http://localhost:5173`) aus, die du im Browser öffnen kannst.

---

## 3. Architektur & Funktionsumfang

Die Anwendung ist in vier logische Hauptrouten (`/`, `/home`, `/userprofile`, `/payment`) unterteilt. Die Architektur ist stark auf bedingtes Rendering (Conditional Rendering) und dynamische Datenbindung angewiesen.

### A. Globale Zustandsverwaltung (`AppContext`)

Der Kern der Datenlogik liegt im Context.

* **Abonnement-Logik:** Abonnements durchlaufen ein 3-State-Modell (`active`, `expiring`, `inactive`).
* **Dynamische Filterung:** Das Content-Array enthält Metadaten (`sourceId`, `isRecording`, `progress`, `emoji`). Alle Views filtern diese globale Liste in Echtzeit basierend auf dem ausgewählten TV-Paket.

### B. Haupt-Interface (`/home`)

Das Dashboard ist das Herzstück der UX und simuliert Plattformen wie Netflix oder Apple TV.

* **Hero-Komponente:** Ein dynamischer Header, der sich an den aktuell fokussierten Inhalt anpasst. Das Rendering des Badges (Live, Stream, Cloud) wird algorithmisch anhand der Metadaten bestimmt.
* **Grab-to-Scroll Mechanik (`ScrollRow`):** Eine benutzerdefinierte React-Komponente, die native Maus-Events (`onMouseDown`, `onMouseMove`, `onMouseUp`) abfängt, um horizontales Wischen zu ermöglichen. Ein komplexer `onClickCapture`-Handler verhindert versehentliche Klicks während des Dragging-Vorgangs.
* **Kategorisierung:** Das Array wird durch `Set`-Funktionen iteriert, um einzigartige Kategorien zu extrahieren und dedizierte Render-Schleifen für "Weiterschauen", "Zuletzt angesehen" und "Gesperrt" (Inhalte aus inaktiven Paketen) zu generieren.

### C. Benutzerprofil & Abrechnung (`/userprofile`)

Diese Route verwaltet die Account-Metriken.

* **Dynamische Kostenevaluierung:** Die monatlichen Gesamtkosten werden durch eine `.reduce()`-Funktion berechnet, die ausschließlich Abonnements mit dem Status `active` summiert.
* **Speicherverwaltung:** Eine visuelle Fortschrittsleiste (Progress Bar) berechnet asynchron die Auslastung der Cloud (in Prozent) basierend auf `cloudUsed` und `cloudTotal`.
* **Lifecycle-Management der Pakete:** Über diese Schnittstelle können Pakete gekündigt (Statuswechsel zu `expiring`), reaktiviert oder endgültig gelöscht (Statuswechsel zu `inactive`) werden.

### D. Checkout & Routing Flow (`/payment`)

* **Mock-Checkout:** Eine dedizierte UI für Kreditkarten, Apple Pay und Google Pay.
* **State-Passing Routing:** Nach erfolgreicher Transaktion mutiert die App den Context (Aktivierung des Pakets) und nutzt `Maps('/home', { state: { showSuccessToast: true } })`, um versteckte Parameter an die Startseite zu übergeben.
* **Auto-Unmount Toasts:** Ein `useEffect`-Hook auf der Home-Seite fängt diesen State ab, rendert eine Erfolgsmeldung und zerstört diese nach exakt 3000ms via `setTimeout` und `window.history.replaceState`, um den Browser-Verlauf zu bereinigen.