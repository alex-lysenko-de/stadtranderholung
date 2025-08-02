## Technical Documentation: Group Management and Activity Monitoring System (Updated)

### 1. Introduction

This document contains technical specifications for a web application designed to manage groups and monitor the daily activities of children participating in organized outings (e.g., camps, excursions, holiday trips). The main goal of this application is to enhance child safety through systematic headcounts at all stages of the trip, including transportation by bus.

### 2. Stakeholders

* **Administrator:** The main responsible person who receives information from caretakers and monitors the total number of children. The administrator receives alerts in case of discrepancies in child counts.
* **Caretaker (Betreuer):** Staff responsible for individual groups of children (about 10 children per group) and for monitoring them on the bus. Each caretaker is assigned to a specific group, performs headcounts, and sends data to the administrator through the app.

### 3. System Overview

The system provides a simplified method for collecting and displaying summary information about groups and buses. It supports:

* **Staff Registration:** Caretakers can log in to the system to work with a specific group for the day, entering their name.
* **Child Count Tracking:** The system records the number of children present in each group and in each bus for the current day.
* **Administrative Oversight:** Administrators have an overview of all groups and buses, including assigned caretakers and the number of children, with activity tracking and automatic data updates.

### 4. System Structure and Organization

* **Total Number of Children:** Approximately 150 children divided into 15 groups.
* **Group Size:** Each group consists of around 10 children.
* **Group Tracking:** Each group is tracked individually and is assigned a caretaker. Headcounts are performed at each point of movement.
* **Bus Tracking:** Children are also tracked by buses during transportation.


---

### 5. Workflow

The application supports a continuous monitoring process throughout the entire event:

* **Before Departure:**

  * Caretakers count the children in their groups before boarding the bus.
  * The data is sent to the Administrator via the application by setting `KinderAnzahl` for their group for the day.
  * Caretakers responsible for buses count the children and fellow caretakers on their assigned bus and submit this data via the `b_bus.html` module.

* **Upon Arrival:**

  * A headcount is conducted upon exiting the bus.
  * Caretakers again send updated group data by setting `KinderAnzahlNow`.

* **Evening / End of Day:**

  * A final headcount is conducted.
  * Data is compared to the morning count `KinderAnzahl`.
  * If there are discrepancies (`KinderAnzahl` ≠ `KinderAnzahlNow`), the Administrator receives an alert (visual highlighting) and can review information about the missing children and their caretakers. The actual "search process" is outside the scope of this application.

---

### 6. Technical Requirements

* **Target Audience:** German-speaking staff responsible for children's safety during group activities.
* **Platform:** Exclusively adapted for use on Android and iOS mobile phones.
* **Language:** The user interface must be in German. (Important!!!)
* **User Experience:** A user-friendly, mobile-optimized interface designed for ease of use by all participants, including non-technical users.

---

### 7. Technologies Used

* **HTML5:** Provides the basic structure for all web pages.
* **CSS (Bootstrap 5.3.3):** Used to create a modern, responsive, and visually appealing user interface, including styled forms, buttons, tables, navigation, and spinners.
* **JavaScript (Vue.js 3):** A progressive framework for frontend development, enabling:

  * **Data Binding:** Automatic synchronization between the data model and the view.
  * **Event Handling:** Reacting to user interactions (e.g., button clicks, data entry).
  * **State Management:** Efficient management of the application's client-side data.
  * **Dynamic Content Updating:** Updating parts of the page without a full reload.
* **Deployment:** The application is distributed as a website link, which can optionally be provided as a QR code for ease of access.
* **Hosting:** Hosted on GitHub:
  [https://github.com/alex-lysenko-de/stadtranderholung.git](https://github.com/alex-lysenko-de/stadtranderholung.git)


---

### 8. Application Modules (file names)

The project consists of several core HTML files and additional files for future extensions, each with unique functionality. All pages, except `a_login.html` and `b_login.html`, must include a **"Zurück" (Back)** button at the bottom, which triggers `history.back()`.

---

#### `index.html` (Configuration Page)

**Purpose:**
This module serves as the entry point for configuring the application. It allows administrators or responsible personnel to set key parameters required by other parts of the application, including connection to JSONBin.io, base app URL, number of buses, and number of groups.

**Functionality:**

* **Input Fields:**

  * `Jahr` (Year): Text field to specify the current year (default = current year). Used to organize data in JSONBin.io by year.
  * `TOTAL_GROUPS`: Total number of child groups (input type = "number", min=1, default=15).
  * `TOTAL_BUSES`: Total number of buses (input type = "number", min=1, default=3).
  * `Master Key (JSONBin.io)`: Text field to enter your JSONBin.io Master Key (full access key).
    Default value: `$2a$10$Yxp3iL9EqLkbpNRwKv0et.hXwFYAtyN3wkFpYhkyiCmD8riOLllqm`
  * `Access Key (JSONBin.io)`: Text field to enter your JSONBin.io Access Key (read/write key).
    Default value: `$2a$10$25EbEOOZQFXGw/T2PkMKm.EELC/3G9sFCI7TNaAxpkawvjEUhAYCu`
  * `Basis-URL (without filename)`: Text field for the base URL where the application files (`a_login.html`, `b_login.html`, etc.) are hosted.
    Default: `https://raw.githack.com/alex-lysenko-de/stadtranderholung/main/`

* **Local Storage:**

  * On clicking "Einstellungen Speichern", all entered data is saved to browser local storage, allowing settings to persist across sessions.
  * On page load, the app attempts to auto-load saved settings from local storage (if available).

* **Login URL Generation:**

  * **"Admin Login URL anzeigen"**: Generates the full URL to the administrator login page (`a_login.html`), including all settings as query parameters.
  * **"Betreuer Login URL anzeigen"**: Generates the full URL to the caretaker login page (`b_login.html`), also including all parameters.

* **Displaying URL and QR Code:**

  * The generated URL is displayed in a dedicated "Ergebnisse" section along with a QR code for easy access via mobile.

* **URL Sharing Options:**

  * **"Verteilen (Whatsapp, E-Mail, Zwischenablage)"**: Allows sharing the URL via the browser's native share feature (if supported), or copies it to the clipboard.
  * **"In Zwischenablage kopieren"**: Copies the generated URL to the clipboard.

---

#### 8.1. `b_login.html`

**Purpose:**
Entry point for caretakers. Users enter the current date, their name (Betreuer), and group number.

**Functionality:**

* Automatically sets the current date in the input field.

* Saves the caretaker's name in local storage for future convenience.

* Sends data (name and group) to the central JSON storage (JSONBin.io), linking the caretaker to a specific group for the day.

* Upon successful submission, redirects the user to `b_group.html`, passing the group number as a URL parameter.

* **Navigation:**
  Includes links to `b_bus.html` and `b_group.html`.

* **Parameter Handling:**
  This module also retrieves and stores the following parameters in local storage:

  * `TOTAL_GROUPS`
  * `TOTAL_BUSES`
  * `MASTER_KEY`
  * `ACCESS_KEY`
  * `BIN_ID`

  These parameters are passed at least on first launch from `index.html` as GET parameters, e.g.:
  `https://example.com/b_login.html?TOTAL_GROUPS=15&TOTAL_BUSES=3&BIN_ID=&MASTER_KEY=&ACCESS_KEY=`

  If any of the key parameters are missing from local storage, the module cannot function correctly and shows a corresponding error message.

---

#### 8.2. `b_group.html`

**Purpose:**
Designed for interaction with the data of a specific group.

**Functionality:**

* Automatically extracts the group number from the URL (`?gr=X`), passed via redirection from `b_login.html`.

* Allows the caretaker to input the **initial number of children** present in the group in the morning (`KinderAnzahl`). This value is usually set once and represents the number expected to return.

* Allows updating the **current number of children** (`KinderAnzahlNow`) — this can be updated multiple times during the day.

* Sends both `KinderAnzahl` and `KinderAnzahlNow` to JSONBin.io for the specified group and date.

* Includes buttons for future extensions:

  * "Liste der Kinder bearbeiten" (Edit Child List)
  * "Rechnen" (Recalculate)

* **Navigation:**
  Includes a "Zurück" button.

---

#### 8.3. `b_bus.html`

**Purpose:**
Records and updates the number of children and caretakers on a specific bus. Follows similar rules to `b_group.html`.

**Functionality:**

* Provides a form for entering:

  * **Bus Number (`bus_number`)**: Integer between 1 and `TOTAL_BUSES` (as a dropdown list).
  * **Number of Children (`kinder_count`)**: Integer between 0 and 200.
  * **Number of Caretakers (`betreuer_count`)**: Integer between 0 and 200.

* The "Senden" (Submit) button sends the data to JSONBin.io.

* The `betreuer_name` is pulled from local storage (saved in `b_login.html`).

* **Navigation:**
  Includes a "Zurück" button.


---

#### 8.4. `a_login.html`

**Purpose:**
Entry point for administrators.

**Functionality:**
This page serves as a dashboard for administrators, providing links to various admin views and to the caretaker login page. No direct data entry or submission occurs here.

* **Navigation:**
  Contains links to:

  * `a_bus.html` (Admin Bus Overview)
  * `a_overview.html` (Admin Group Overview)
  * `b_login.html` (Caretaker Login, for administrative testing or quick access if needed)

* **Parameter Handling:**
  This module also retrieves and stores the following values in LocalStorage:

  * `TOTAL_GROUPS`
  * `TOTAL_BUSES`
  * `MASTER_KEY`
  * `ACCESS_KEY`
  * `BIN_ID`

  These parameters are passed (at least on first launch) via GET parameters from `index.html`, for example:
  `https://example.com/a_login.html?TOTAL_GROUPS=15&TOTAL_BUSES=3&BIN_ID=&MASTER_KEY=&ACCESS_KEY=`

  These settings are required for this and other modules (`a_bus.html`, `a_overview.html`). If any are missing, the module will display a warning and will not function properly.

---

#### 8.5. `a_overview.html`

**Purpose:**
Provides administrators with a centralized overview of all groups and their current status.

**Functionality:**

* Loads and displays summary data for all groups in an interactive table.

* **Initial State Handling:**

  * On load, it queries JSONBin.io for the current date.
  * If no data is found (i.e., no caretakers logged in for the day), it shows only basic controls.
  * Clicking "Aktualisieren" triggers another fetch from JSONBin.io. If still no data, an empty list is displayed.

* **Total Child Count Display:**
  Shows the total number of children across all groups for both:

  * `KinderAnzahl` (morning count)
  * `KinderAnzahlNow` (current count)

  If these values don’t match, a red warning is shown indicating the number of missing children, affected groups, and their caretakers.

* **"Überprüfung durchgeführt" Button:**

  * A large button at the top of the page.
  * **Function:** When clicked, it sets all `KinderAnzahlNow` values for the current day to `null` in JSONBin.io. This signals that the final check is complete and allows for future recounting.

* **Per Group Info:**
  For each group, it shows:

  * Group number
  * `KinderAnzahl` (morning count)
  * `KinderAnzahlNow` (current count, if available)
  * List of assigned caretakers

* **Visual Status Indicators:**

  * Groups with missing data (e.g., no `KinderAnzahl` or caretakers) are shown in gray as "inactive" for the current day.
  * If `KinderAnzahlNow` is unknown or `null`, a spinner is shown with the message "Berechnung läuft..." (Calculation in progress), simulating data retrieval.

* **Navigation:**
  Each group number in the table is a clickable link to `b_group.html?gr=X` (e.g., `b_group.html?gr=1`).
  Includes a "Zurück" button.

* **Parameter Handling:**
  Retrieves required parameters (`TOTAL_GROUPS`, `TOTAL_BUSES`, `MASTER_KEY`, `ACCESS_KEY`, `BIN_ID`) from LocalStorage. If anything is missing, an error is displayed.

---

#### 8.6. `a_bus.html`

**Purpose:**
Provides administrators with a summary view of all bus-related data for the current day.

**Functionality:**

* Loads and displays summary data for all buses in a table or list.

* For each bus, the following data is shown:

  * Bus number
  * `kinder_count` (number of children)
  * `betreuer_count` (number of caretakers)
  * `betreuer_name` (name of last caretaker who submitted data for this bus)

* **Manual Data Refresh:**
  The page updates by querying JSONBin.io when the user presses "Aktualisieren".

* **Navigation:**
  Includes a "Zurück" button.

* **Parameter Handling:**
  Like other admin modules, it reads the necessary parameters from LocalStorage and shows a warning if any are missing.

---

#### 8.7. `group_edit.html` (Edit Children List)

**Purpose:**
Manages the list of individual children (names) in a group.

**Functionality:**

* Accessed via the "Liste der Kinder bearbeiten" button on `b_group.html`.

* Loads the list of children for a group from JSONBin.io.

* Allows adding and removing children's names.

* Only names are required — no other info is collected.

* After modifying the list, changes are saved to JSONBin.io under `groups[groupNumber].Kinder`.

* **Navigation:**
  Includes a "Zurück" button.

---

#### 8.8. `group_calc.html` (View and Calculate Child Count)

**Purpose:**
Displays and compares the group’s morning and current child counts.

**Functionality:**

* Accessed via the "Rechnen" button on `b_group.html`.

* Loads and displays both:

  * `KinderAnzahl` (morning count)
  * `KinderAnzahlNow` (current count)

* Calculates and shows the difference between the two.

* If any data is missing (`null`), a message is displayed.

* **Navigation:**
  Includes a "Zurück" button.

---

Продолжаю перевод. Ниже — **разделы 9–13** документа, включая описание работы с JSONBin.io, структуру хранимых данных и взаимодействие модулей.

---

### 9. JSON Data Storage Service

* **Service:**
  JSONBin.io is used as a cloud-based JSON storage service. It provides a simple RESTful API for storing, retrieving, and updating JSON documents — ideal for small projects and prototypes.

---

### 10. JSON Data Structure

Data is stored in JSONBin.io as a single root JSON object organized by date. Each date contains information about the groups and buses active on that day.

**Example Structure:**

```json
{
  "YYYY-MM-DD": {
    "groups": {
      "1": {
        "Betreuer": ["Name_Employee_1", "Name_Employee_2"],
        "KinderAnzahl": 15,
        "KinderAnzahlNow": 15,
        "Kinder": ["Child A", "Child B", "Child C"]
      },
      "2": {
        "Betreuer": ["Name_Employee_3"],
        "KinderAnzahl": 10,
        "KinderAnzahlNow": 9,
        "Kinder": ["Child D", "Child E"]
      },
      "3": {
        "Betreuer": [],
        "KinderAnzahl": null,
        "KinderAnzahlNow": null,
        "Kinder": []
      },
      "4": {
        "Betreuer": ["Name_Employee_4"],
        "KinderAnzahl": 10,
        "KinderAnzahlNow": null,
        "Kinder": ["Child F", "Child G"]
      }
    },
    "buses": {
      "1": {
        "kinder_count": 51,
        "betreuer_count": 8,
        "betreuer_name": "John Doe"
      },
      "2": {
        "kinder_count": 41,
        "betreuer_count": 3,
        "betreuer_name": "Jane Roe"
      }
    }
  }
}
```

**Explanation of Structure:**

* **Root Object:**
  Container for all data. Keys are dates in `YYYY-MM-DD` format.

* **Date Object:**
  Contains two nested objects:

  * `"groups"`: Info for each group
  * `"buses"`: Info for each bus

* **Group Object:**

  * `Betreuer`: Array of staff names assigned to the group
  * `KinderAnzahl`: Morning child count (number or `null`)
  * `KinderAnzahlNow`: Current headcount (number or `null`)
  * `Kinder`: Array of children’s names

* **Bus Object:**

  * `kinder_count`: Number of children in the bus
  * `betreuer_count`: Number of caretakers in the bus
  * `betreuer_name`: Name of the last caretaker who submitted data for the bus

---

### 11. JSONBin.io Access Credentials

* **MASTER\_KEY:**
  `2a10$Yxp3iL9EqLkbpNRwKv0et.hXwFYAtyN3wkFpYhkyiCmD8riOLllqm`

* **ACCESS\_KEY:**
  `2a10$25EbEOOZQFXGw/T2PkMKm.EELC/3G9sFCI7TNaAxpkawvjEUhAYCu`

* **BIN\_ID:**
  `68834e6e7b4b8670d8a712d0`
  (This is the ID for the "Days" bin in the "SR2025" collection)

---

### 12. Proposed Technical Solutions for Unresolved Issues

#### 12.2. Error Handling and User Feedback

**General Approach:**
Implement a simple alert or toast-notification system (e.g., using Bootstrap alerts or a lightweight notification library).

**Login Page (`b_login.html`):**

* **Success:**
  Show a short message like “Anmeldung erfolgreich!” (Login successful!) before redirecting.

* **Error:**
  Show a visible message like “Fehler bei der Anmeldung. Bitte versuchen Sie es erneut.” (Login failed. Please try again.)

**Group Page (`b_group.html`) and Bus Page (`b_bus.html`):**

* **Success:**
  After submission of data (`KinderAnzahl`, `KinderAnzahlNow`, or bus info), show “Daten gespeichert!” (Data saved!).

* **Error:**
  If submission fails: “Fehler beim Speichern der Daten.” (Failed to save data.)

**Admin Overview Page (`a_overview.html`):**

* **Data Loading Errors:**
  If the request to JSONBin.io fails, show a discreet message:
  “Datenaktualisierung fehlgeschlagen. Netzwerkproblem?” (Data update failed. Network issue?)

---

### 13. Module Interaction and Data Storage

**Centralized Data Storage (JSONBin.io):**

JSONBin.io is the single source of truth for all application data. All modules that require persistent data or access to current group/child/bus information interact with this service.

| Module            | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `b_login.html`    | Sends caretaker assignment (name, group, date) to JSONBin.io                 |
| `b_group.html`    | Sends `KinderAnzahl` and `KinderAnzahlNow` for a group on a given day        |
| `b_bus.html`      | Sends child and caretaker counts for a bus on a given day                    |
| `a_overview.html` | Loads group summaries and resets `KinderAnzahlNow` when verification is done |
| `a_bus.html`      | Loads bus summaries for the current day                                      |

**Browser Local Storage:**

Used for saving user settings and session-persistent values.

| Module            | Data Stored                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `index.html`      | Stores config values (year, collection name, API keys, base URL)         |
| `b_login.html`    | Stores caretaker name                                                    |
| `b_bus.html`      | Retrieves caretaker name for bus data submission                         |
| `group_edit.html` | (future) Stores group child list, which rarely changes during the season |
| `group_calc.html` | (future) Uses child list from local storage for recalculations           |

---

**Data Flow and Interactions:**

1. **Setup (`index.html`):**
   Admin sets key parameters and generates login URLs, which are distributed to participants.

2. **Caretaker Login (`b_login.html`):**
   Caretaker logs in and links themselves to a group. Name is saved locally. Assignment is stored in JSONBin.

3. **Group Management (`b_group.html`):**
   Caretaker enters child counts for their group. Buttons lead to child list (`group_edit.html`) and calculation tools (`group_calc.html`).

4. **Bus Management (`b_bus.html`):**
   Caretaker submits bus data using their name stored locally.

5. **Admin Login (`a_login.html`):**
   Acts as navigation center for admin, offering access to various tools.

6. **Admin Overview - Groups (`a_overview.html`):**
   Admin views summaries and discrepancies. Clicking “Überprüfung durchgeführt” resets `KinderAnzahlNow` to `null`.

7. **Admin Overview - Buses (`a_bus.html`):**
   Admin views bus summaries.

---

**Frontend Module Dependencies:**

* `index.html` → Generates login links for `a_login.html` and `b_login.html`
* `b_login.html` → Redirects to `b_group.html`; links to `b_bus.html`
* `b_group.html` → Links to `group_edit.html`, `group_calc.html`
* `a_login.html` → Links to `a_overview.html`, `a_bus.html`, and `b_login.html`
* `a_overview.html` → Links to `b_group.html?gr=X` by group number

All modules use **Vue.js** for state management and dynamic UI updates, **Bootstrap** for styling, and **qrcode.js** to generate QR codes on `index.html`.

---
