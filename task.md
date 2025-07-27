## Technical Documentation: Group Management and Activity Monitoring System (Updated)

### 1\. Introduction

This document outlines the technical specifications for a web application designed to manage groups and monitor the daily activity of children participating in organized off-site events (e.g., camps, excursions, holiday trips). The primary goal of this application is to enhance child safety by systematically controlling their numbers at all stages of a trip, including bus transportation.

### 2\. Stakeholders

* **Administrator:** The main responsible party who receives information from Betreuers and monitors the overall number of children. The Administrator is alerted in case of discrepancies in child counts.
* **Betreuer (Supervisor):** Staff members responsible for individual groups of children (approximately 10 children per group) and for supervising children on buses. Each Betreuer is assigned to a specific group, performs recounts, and submits data to the Administrator via the application.

### 3\. System Overview

The system provides a simplified method for collecting and displaying summarized group and bus information. It supports:

* **Staff Registration:** Betreuers can log in to a specific group for the current day, providing their name.
* **Child Count Tracking:** The system records the number of children present in each group and on each bus for the current day.
* **Administrative Oversight:** Administrators have a consolidated view of all groups and buses, including assigned Betreuers and child counts, with activity tracking and automatic data updates.

### 4\. System Structure and Organization

* **Total Children:** Approximately 150 children, divided into 15 groups.
* **Group Size:** Each group consists of approximately 10 children.
* **Group Tracking:** Each group is tracked individually and is assigned a Betreuer. Recounts are performed at each movement point.
* **Bus Tracking:** Children are also tracked by bus during transportation.

### 5\. Workflow

The application supports a continuous monitoring process throughout the event:

* **Before Departure:**
    * Betreuers count children in their groups before boarding the bus.
    * The count is submitted to the Administrator via the application, setting the `KinderAnzahl` for their group for the day.
    * Betreuers responsible for buses count children and other Betreuers on their assigned bus and submit this data via the `b_bus.html` module.
* **Upon Arrival:**
    * A recount is performed upon disembarking the bus.
    * Betreuers submit the group data again, updating `KinderAnzahlNow`.
    * Betreuers responsible for buses update the child and Betreuer counts for their bus.
* **Evening / End of Day:**
    * A final recount of all children is performed.
    * Data is reconciled with the morning's `KinderAnzahl`.
    * In case of discrepancies (`KinderAnzahl` != `KinderAnzahlNow`), the Administrator receives an alarm signal (visual highlight) and can view information on missing children and their Betreuers. The "search process" itself is outside the scope of this application.

### 6\. Technical Requirements

* **Target Audience:** German-speaking staff responsible for child safety during group events.
* **Platform:** Exclusively adapted for use on Android and iOS mobile phones.
* **Language:** User interface must be in German.
* **User Experience:** User-friendly and adapted UI for smartphone screens, ensuring ease of use for all participants, including non-technical individuals.

### 7\. Technologies Used

* **HTML5:** Provides the foundational structure for all web pages.
* **CSS (Bootstrap 5.3.3):** Utilized for a modern, responsive, and visually appealing user interface, including styling for forms, buttons, tables, navigation, and spinners.
* **JavaScript (Vue.js 3):** A progressive framework for frontend development, enabling:
    * **Data Binding:** Automatic synchronization between the data model and the view.
    * **Event Handling:** Responding to user interactions (e.g., button clicks, data input).
    * **State Management:** Efficient client-side application data management.
    * **Dynamic Content Updates:** Updating parts of the page without full reloads.
* **Deployment:** The application is distributed as a website link, which can be presented as a QR code for convenience.
* **Hosting:** Hosted via GitHub ([https://github.com/alex-lysenko-de/stadtranderholung.git](https://github.com/alex-lysenko-de/stadtranderholung.git)).

### 8\. Application Modules (File Names)

The project comprises several core HTML files and additional files for future extensions, each with distinct functionalities. All pages, except `a_login.html` and `b_login.html`, must include a "Zurück" (Back) button at the very bottom that triggers `history.back()`.


### `index.html` (Страница конфигурации)

**Назначение:** Этот модуль служит точкой входа для настройки приложения. Он позволяет администраторам или ответственным лицам установить ключевые параметры, необходимые для работы других частей приложения, включая подключение к базе данных JSONBin.io и базовый URL приложения.

**Функциональность:**

* **Поля ввода:**
    * `Jahr` (Год): Текстовое поле для указания текущего года (по умолчанию - текущий год). Используется для организации данных в JSONBin.io по годам.
    * `Bin Collection Name (JSONBin.io)`: Текстовое поле для ввода имени коллекции (или "библиотеки") в JSONBin.io, где будут храниться данные. Например, "SR2025".
    * `Master Key (JSONBin.io)`: Текстовое поле для ввода Master Key вашего аккаунта JSONBin.io. Это ключ с полными правами доступа.
    * `Access Key (JSONBin.io)`: Текстовое поле для ввода Access Key вашего аккаунта JSONBin.io. Этот ключ обычно используется для чтения/записи данных.
    * `Basis-URL (ohne Dateinamen)`: Текстовое поле для указания базового URL, по которому развернуты файлы приложения (`a_login.html`, `b_login.html` и т.д.). По умолчанию: `https://raw.githack.com/alex-lysenko-de/stadtranderholung/main/`.
* **Сохранение в Local Storage:** При нажатии кнопки "Einstellungen Speichern" все введенные данные сохраняются в локальном хранилище браузера. Это позволяет приложению запоминать настройки между сессиями.
* **Загрузка из Local Storage:** При открытии страницы `index.html` приложение автоматически пытается загрузить сохраненные настройки из локального хранилища, если они доступны.
* **Генерация URL для входа:**
    * **"Admin Login URL anzeigen"**: Генерирует полный URL для страницы входа администратора (`a_login.html`), включая все настроенные параметры в качестве параметров запроса (query parameters).
    * **"Betreuer Login URL anzeigen"**: Генерирует полный URL для страницы входа воспитателя (`b_login.html`), также включая все настроенные параметры.
* **Отображение URL и QR-кода:** Сгенерированный URL отображается в специальном блоке "Ergebnisse" вместе с соответствующим QR-кодом для удобного доступа с мобильных устройств.
* **Функции распространения URL:**
    * **"Verteilen (Whatsapp, E-Mail, Zwischenablage)"**: Позволяет поделиться сгенерированным URL через стандартный механизм обмена в браузере (если поддерживается) или скопировать его в буфер обмена.
    * **"In Zwischenablage kopieren"**: Копирует сгенерированный URL непосредственно в буфер обмена.


#### 8.1. `b_login.html`

* **Purpose:** The entry point for Betreuers. Users input the current date, their name (Betreuer), and group number.
* **Functionality:**
    * Automatically sets the current date in the input field.
    * Saves the Betreuer's name in the browser's local storage for future convenience.
    * Sends Betreuer assignment data to the central JSON storage (JSONBin.io), linking the Betreuer to a specific group for the current day.
    * Upon successful data submission, redirects the user to `b_group.html`, passing the group number as a URL parameter.
* **Navigation:** Contains links to `b_bus.html` and `b_group.html`.

#### 8.2. `b_group.html`

* **Purpose:** Designed for interacting with a specific group's data.
* **Functionality:**
    * Automatically determines the group number from the URL parameters (`?gr=X`) used for redirection from `b_login.html`.
    * Allows the Betreuer to input the initial number of children present in the group for the current morning (`KinderAnzahl`). This value is (usually) set once at the beginning of the day and represents the number of children received from parents, and is expected to be the number returned.
    * Allows the Betreuer to recalculate and enter the number of children at the current moment (`KinderAnzahlNow`). This value can be updated multiple times throughout the day.
    * Sends the entered child counts (`KinderAnzahl` and `KinderAnzahlNow`) to the JSON storage.
    * Includes "Liste der Kinder bearbeiten" (Edit Children List) and "Rechnen" (Calculate) buttons.
* **Navigation:** Includes a "Zurück" button.

#### 8.3. `b_bus.html`

* **Purpose:** Designed for recording and updating the number of children and Betreuers on a specific bus. This module follows similar rules to `b_group.html`.
* **Functionality:**
    * Provides a form for inputting the following data:
        * **Bus Number (`bus_number`):** An integer from 1 to `BUS_COUNT` (where `const BUS_COUNT = 3;`). This should be a dropdown list for selection.
        * **Number of Children (`kinder_count`):** An integer from 0 to 100.
        * **Number of Betreuers (`betreuer_count`):** An integer from 0 to 100.
    * A "Senden" (Send) button submits the information to JSONBin.io.
    * The `betreuer_name` (name of the Betreuer submitting the bus data) is retrieved from the browser's local storage, where it was saved from `b_login.html`.
* **Navigation:** Includes a "Zurück" button.

#### 8.4. `a_overview.html`

* **Purpose:** Provides Administrators with a centralized overview of all groups and their current status.
* **Functionality:**
    * Loads and displays summarized information for all groups in an interactive table.
    * **Initial State Handling:**
        * Upon opening, the page queries JSONBin.io for data for the current date.
        * If no data is found (meaning no Betreuer has logged in yet for the day), only the "Recount Children" button is displayed.
        * After clicking "Recount Children," if data is still absent, an empty list is displayed.
        * The page then automatically refreshes every 10 seconds to show the current status.
    * **Total Child Count Display:** Prominently displays the total number of children across all groups for `KinderAnzahl` (morning count) and `KinderAnzahlNow` (current count) at the very beginning of the page. If these two values do not match, the discrepancy should be highlighted in red, along with information on how many children are absent, in which groups, and the names of the children and their Betreuers.
    * **"Recount Children" Button:**
        * A large button at the top of the page.
        * **Functionality (Proposed):** Clicking this button triggers a call to JSONBin.io to set all `KinderAnzahlNow` values for the current day to `null` for all groups. This signals Betreuers to perform a new recount.
        * **User Experience (Proposed):** While a recount is active, the button's text should change to "Recount in Progress..." or "Stop Recount" and be disabled to prevent multiple clicks. A spinner icon could be added next to the text.
    * For each group, displays: group number, `KinderAnzahl` (morning count), `KinderAnzahlNow` (current recount, if available), and a list of assigned Betreuers for the current day.
    * **Status Visualization:** Groups for which data (e.g., `KinderAnzahl` or `Betreuer` list) has not yet been entered are displayed in gray, indicating an "inactive" status for the current day.
    * **Loading Indicator:** If the `KinderAnzahlNow` for a group is unknown (data is absent/null), a spinner with the message "Berechnung läuft..." (Calculation in progress...) is displayed, simulating data retrieval.
    * **Periodic Update:** The page automatically polls JSONBin.io every 10 seconds to retrieve the latest data and update the display in real-time, ensuring information accuracy without manual page reloads.
    * **Navigation:** Each group number in the table serves as a link to navigate to the `b_group.html` page for that specific group using the URL parameter `b_group.html?gr=X` (e.g., `b_group.html?gr=1`).
* **Navigation:** Includes a "Zurück" button.

#### 8.5. `a_login.html`

* **Purpose:** The entry point for Administrators.
* **Functionality:** This page serves as a landing page for administrators, providing links to various administrative views and the Betreuer login page. No direct data input or submission is performed on this page.
* **Navigation:** Contains links to:
    * `a_bus.html` (Administrator's bus overview)
    * `a_overview.html` (Administrator's group overview)
    * `b_login.html` (Betreuer login, for administrative testing or direct access if needed).

#### 8.6. `a_bus.html`

* **Purpose:** Provides Administrators with a consolidated view of all bus data for the current day.
* **Functionality:**
    * Loads and displays summarized information for all buses in an interactive table or list format.
    * For each bus, displays: bus number, `kinder_count` (number of children on the bus), `betreuer_count` (number of Betreuers on the bus), and the `betreuer_name` (name of the Betreuer who last submitted the data for that bus).
    * The page automatically polls JSONBin.io every 10 seconds to retrieve the latest bus data and update the display in real-time.
* **Navigation:** Includes a "Zurück" button.

#### 8.7. `group_edit.html` (Future Extension - Initial Implementation Required)

* **Purpose:** To manage the list of individual children within a group.
* **Functionality:**
    * Accessed via the "Liste der Kinder bearbeiten" button on `b_group.html`.
    * Displays a list of all children in the group, stored in local storage.
    * Includes "Add a child" and "Remove a child" buttons.
    * **Minimal Implementation:** In the initial phase, this page can be a simple HTML structure with headings and placeholder buttons, without full functionality, to satisfy the requirement for its existence.
* **Navigation:** Includes a "Zurück" button.

#### 8.8. `group_calc.html` (Future Extension - Initial Implementation Required)

* **Purpose:** To facilitate the detailed recount of children within a group.
* **Functionality:**
    * Accessed via the "Rechnen" button on `b_group.html`.
    * Displays a list of all children in the group, stored in local storage.
    * Includes checkboxes next to each child's name, labeled "anwesend" (present).
    * **Minimal Implementation:** Similar to `group_edit.html`, this can be a simple HTML structure with headings, a list of placeholder children, and checkboxes, without full functionality, for the initial phase.
* **Navigation:** Includes a "Zurück" button.

## Хранение данных

Проект использует **JSONBin.io** в качестве облачного хранилища данных. Это позволяет централизованно хранить информацию о количестве детей и воспитателей по автобусам и группам.

Дополнительно, для временного хранения настроек и последних введенных данных, используется **Local Storage** браузера. Это обеспечивает удобство использования и запоминание предпочтений пользователя.

## Зависимости

* **Bootstrap 5.3.3:** Для стилизации и адаптивного дизайна.
* **Vue 3.4.21:** Для реактивного пользовательского интерфейса.
* **Bootstrap Icons 1.11.3:** Для иконок.
* **qrcode.js 1.0.0:** Для генерации QR-кодов на стороне клиента.

## Развертывание

Файлы HTML и JavaScript могут быть размещены на любом веб-сервере или CDN (например, GitHub Pages, Netlify, Vercel) и доступны через HTTP/HTTPS.


### 9\. JSON Data Storage Service

* **Service:** JSONBin.io is used as the cloud-based JSON data storage service. It provides a simple RESTful API for storing, retrieving, and updating JSON documents, suitable for small projects and prototypes.

### 10\. JSON Data Structure

Data in JSONBin.io is stored as a single root JSON object, organized by date. Each date contains information about the groups and buses active on that day.

**Example Structure:**

```json
{
  "YYYY-MM-DD": { // Key: Date in "Year-Month-Day" format
    "groups": {
      "1": { // Key: Group number (string)
        "Betreuer": [ // Array of names of staff assigned to this group
          "Name_Employee_1",
          "Name_Employee_2"
        ],
        "KinderAnzahl": 15, // Number of children in the group for this date (morning count)
        "KinderAnzahlNow": 15 // Number of children in the group after recalculation (current count)
      },
      "2": {
        "Betreuer": [
          "Name_Employee_3"
        ],
        "KinderAnzahl": 10,
        "KinderAnzahlNow": 9 // (!) 10 - 9 = 1 child is lost; administrator needs to be informed
      },
      "3": {
        "Betreuer": [], // Empty array if no Betreuer assigned
        "KinderAnzahl": null, // null if child count not specified
        "KinderAnzahlNow": null
      },
      "4": {
        "Betreuer": ["Name_Employee_4"],
        "KinderAnzahl": 10,
        "KinderAnzahlNow": null // Recalculation data not yet received, but likely to be soon
      }
      // ... other groups with their data
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
      // ... other buses with their data
    }
  },
  "YYYY-MM-DD_another_date": {
    "groups": {
      // ... data for another date
    },
    "buses": {
      // ... data for another date
    }
  }
  // ... other entries for other dates
}

Structure Explanation:

Root Object: Container for all data. Keys are dates in "YYYY-MM-DD" format (e.g., "2025-07-26").

Date Object: For each specific date, nested objects with the keys "groups" and "buses" are contained.

Groups Object: Contains a set of keys, each representing a string version of the group number (e.g., "1", "2", "15").

Group Object: For each group on a specific date, three fields are stored:

Betreuer (Array of Strings): An array containing the names (strings) of all staff who have "logged in" to this group on the specified date. Can be empty if no one has logged in.

KinderAnzahl (Number or null): A numerical value representing the number of children registered in this group for this date (morning count). This value is expected to be set once at the start of the day and remain constant. Can be null if the initial child count has not been entered.

KinderAnzahlNow (Number or null): The actual number of children currently available, obtained as a result of a recount during the day. This figure may differ from KinderAnzahl, typically downwards. When the Administrator clicks the "recount children" button, this value is reset to null for all groups, prompting Betreuers to initiate a recount. By comparing KinderAnzahl and KinderAnzahlNow, the Administrator can determine if any children are missing or if all are present.

Buses Object: Contains a set of keys, each representing a string version of the bus number (e.g., "1", "2").

Bus Object: For each bus on a specific date, three fields are stored:

kinder_count (Number): The number of children on the bus.

betreuer_count (Number): The number of Betreuers on the bus.

betreuer_name (String): The name of the Betreuer who submitted the data for this bus.

11. JSONBin.io Access Information
MASTER_KEY: 2a10$Yxp3iL9EqLkbpNRwKv0et.hXwFYAtyN3wkFpYhkyiCmD8riOLllqm

ACCESS_KEY: 2a10$25EbEOOZQFXGw/T2PkMKm.EELC/3G9sFCI7TNaAxpkawvjEUhAYCu

BIN_ID: 68834e6e7b4b8670d8a712d0 (This is the ID for Bin "Days" in Collection "SR2025")

12. Proposed Technical Solutions for Unresolved Points
12.1. "Recount Children" Button Functionality on a_overview.html
Action for Resetting KinderAnzahlNow:

When the "Recount Children" button is clicked, the a_overview.html frontend will perform a PUT request to JSONBin.io for the BIN_ID (representing the entire Days bin).

The PUT request will send the current JSON data structure, but with all KinderAnzahlNow values for the current day's groups explicitly set to null.

This approach requires fetching the entire bin, modifying the relevant part, and then sending the modified bin back. Given the "simple web application" nature, this is a pragmatic solution. For very large datasets, a more granular update mechanism would be needed, but for 15 groups, this should be acceptable.

User Experience during Recount:

Button State: When the "Recount Children" button is clicked, its text should immediately change to "Recount in Progress..." or "Stop Recount" and be disabled to prevent multiple clicks. A spinner icon could be added next to the text.

Global Loading Indicator: A small, unobtrusive loading spinner or message could appear at the top of the page (e.g., "Recount initiated. Waiting for Betreuers...") to indicate a global process.

Table Display: For each group in the table, the KinderAnzahlNow column should immediately show the "Berechnung läuft..." spinner until new data for that specific group is received through the 10-second polling.

12.2. Error Handling and User Feedback
General Approach: Implement a simple alert or toast notification system (e.g., using Bootstrap's alert components or a lightweight notification library).

Login Page (b_login.html):

Success: Upon successful login and data submission, a brief "Anmeldung erfolgreich!" (Login successful!) message could appear before redirection.

Error: If data submission to JSONBin.io fails (e.g., network error, API issue), a prominent "Fehler bei der Anmeldung. Bitte versuchen Sie es erneut." (Error during login. Please try again.) message should be displayed.

Group Page (b_group.html) and Bus Page (b_bus.html):

Success: After submitting KinderAnzahl or KinderAnzahlNow (for groups) or bus data, a small "Daten gespeichert!" (Data saved!) message.

Error: If data submission fails, an "Fehler beim Speichern der Daten." (Error saving data.) message.

Admin Overview Page (a_overview.html):

Success (Recount Initiation): After successfully sending the reset command to JSONBin.io, a "Neuer Zählvorgang gestartet!" (New recount initiated!) notification.

Error (Recount Initiation): If the reset command fails, an "Fehler beim Starten des Zählvorgangs." (Error starting recount.) message.

Data Loading Errors: If polling JSONBin.io fails, a discreet "Datenaktualisierung fehlgeschlagen. Netzwerkproblem?" (Data refresh failed. Network issue?) message could appear without interrupting the user too much.