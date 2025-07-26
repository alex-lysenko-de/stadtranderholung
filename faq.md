


## Clarification Questions and Incomplete Points:
----
## 1.Data Flow for Initial KinderAnzahl vs. Recounts:

The group.html description states: "Allows the employee to input the initial number of children present in the group on the morning of the current day." This sounds like it sets KinderAnzahl.

It also states: "allows the employee to recalculate and enter the number of children at the current moment." This sounds like it sets KinderAnzahlNow.

** Question**: Is KinderAnzahl set only once per day (in the morning), and KinderAnzahlNow is updated multiple times throughout the day? Or can KinderAnzahl also be updated later? Please clarify the precise workflow and purpose of updating KinderAnzahl versus KinderAnzahlNow by the Betreuer.

** Answer **
 KinderAnzahl  is set at the beginning of the day and does not change throughout the day. This is the number of children that we took from their parents, the same number of children we must return


----
## 2."Liste der Kinder bearbeiten" (Edit Children List) and "Rechnen" (Calculate) buttons in group.html:

The description mentions these buttons are "for future extensions of functionality."

** Question:** Should these buttons be implemented in the initial development phase, even as placeholders, or can they be entirely omitted for now? If they should be placeholders, what, if any, minimal functionality or visual indication should they have?

** Answer **
"Liste der Kinder bearbeiten" (Edit Children List) must open "group_edit.html" with the list of all kinder in the group,  stored in localstorage. buttons "Add  a child" , "remove a child"
"Rechnen" (Calculate) button must open "group_calc.html" with the list of all kinder in the group,  stored in localstorage and checkboxes "anwesend"

----
## 3.Administrator Alarm System:

The workflow mentions: "In case of discrepancy, the administrator receives an alarm signal and starts the search process."

** Question:** What form does this "alarm signal" take within the web application? Is it a visual highlight, an audible notification, an email, or something else? How is the "search process" initiated or supported by the application? This needs to be defined for the technical implementation.

** Answer **  'Administrator Alarm System' is just a visual highlight and information: how much kinder are abwesend in welcher Group und names of Kinder and their Betreuers. "the search process" is out of scope of this application 

----
## 4. Initial State of KinderAnzahl and KinderAnzahlNow:

When a new day starts, and no data has been entered for a group, KinderAnzahl and KinderAnzahlNow are null.

** Question:** What is the expected initial display for groups in admin_overview.html if neither KinderAnzahl nor KinderAnzahlNow has been entered yet for the current day? The description mentions "groups... displayed in gray, indicating their 'inactive' status," and a spinner for "KinderAnzahlNow" if it's null. Clarify how KinderAnzahl being null is handled visually on the admin page.

** Answer **
Страница Admin Overview отображает текущее состояние подсчёта количества детей в группах.
При открытии страницы выполняется запрос к хранилищу данных (JSONBIN.io) для получения информации auf текущую дату.
 Если данные за сегодня отсутствуют, это означает, что процесс пересчёта ещё не запускался: ни один Betreuer ещё не заходил в своё приложение и не проходил авторизацию.
В этом случае система не располагает информацией:
о том, какой Betreuer отвечает за какую группу;
сколько детей присутствует в каждую группу;
сколько человек всего присутствует сегодня.
Поэтому на странице отображается только кнопка «Recount Children».
После нажатия на кнопку:
выполняется повторная проверка наличия данных в хранилище;
если данные всё ещё отсутствуют, отображается пустой список;
далее каждые 10 минут страница обновляется автоматически для отображения актуального состояния по группам.
кнопка «Recount Children» превращается в кнопку "стоп" которая оканчивает пересчёт  
----
## 5 "Recount Children" Button Functionality on admin_overview.html:

The description states this button "resets all KinderAnzahlNow fields in all groups" and then "the page starts refreshing every 10 seconds, monitoring the progress of the recalculation."

** Question:** Does "resets all KinderAnzahlNow fields in all groups" mean it sends a command to JSONBin.io to set all KinderAnzahlNow values for the current day to null? 
This is a critical backend interaction.
** Answer ** I dont know . Lets Think how to do it in the best way

** Question:** What is the expected user experience while the "recount" is in progress? 
Does the button change its state, or is there a global loading indicator?
** Answer ** I dont know . Lets Think how to do it in the best way
----
## 6. Navigation from admin_overview.html to group.html:

The description mentions "The number of each group in the table is a link, allowing you to go to the group.html page for this specific group."

** Question:** How precisely is the group number passed as a URL parameter? For example, is it group.html?group=1 or something similar?
 This detail is needed for frontend development.
** Answer ** group.html?gr=1

----
## 7. Error Handling and User Feedback:

The document doesn't explicitly detail error handling (e.g., if JSONBin.io is unreachable, or data submission fails).

** Question:** What kind of user feedback (e.g., success messages, error alerts) should be implemented for actions like logging in,
 submitting child counts, or initiating a recount?
** Answer ** I dont know . Lets Think how to do it in the best way