# M10-04 — Examen simulado ACP-620

[← Página anterior](M10-03-auditoria-operacion.md)

> Batería final. 15 escenarios. No cronometres salvo que quieras simular el examen (70 min en el oficial, más o menos: confirma en Atlassian University). Una respuesta por pregunta.

Trabaja en papel o a pantalla. Abre las soluciones **al final**, no pregunta a pregunta.

---

## 1

Un equipo de 6 personas, sin Jira admin hasta dentro de un mes, quiere Kanban ya. Recomiendas:

- A) Company-managed
- B) Team-managed Kanban
- C) Jira Data Center
- D) Solo Confluence

## 2

El burndown de story points no se mueve al registrar horas. Estimation del board está en:

- A) Story points
- B) Original time estimate
- C) Issue count
- D) No se puede saber

## 3

Filtro del board: `project = DEV AND issuetype != Sub-task`. Las subtareas:

- A) Salen igual
- B) No alimentan el board (pueden verse en la issue padre)
- C) Rompen el sprint
- D) Exigen Premium

## 4

Quick filter vs board filter:

- A) Son lo mismo
- B) El board filter define el universo; el quick filter lo reduce temporalmente
- C) El quick filter es global de la org
- D) El quick filter cambia el workflow

## 5

Default assignee del componente = Component lead. Marta es lead de `api` pero no Assignable User. Al crear un Bug `api`:

- A) Se asigna a Marta igual
- B) Falla o cae al project default / unassigned
- C) Se borra el componente
- D) Se crea un proyecto nuevo

## 6

Gadget Filter Results con filtro privado en dashboard compartido:

- A) Todos ven los datos
- B) Otros ven error de permisos
- C) Jira comparte el filtro solo
- D) Se convierte en report ágil

## 7

Identifica el report: barras de velocidad por sprint.

- A) CFD
- B) Velocity
- C) Created vs Resolved
- D) Control chart

## 8

Regla: When issue created, Then create issue (mismo proyecto, mismo tipo). Riesgo:

- A) Ninguno
- B) Loop / explosión de issues
- C) Solo falla en Kanban
- D) Obliga a Premium

## 9

Manage sprints permission falta. El usuario:

- A) Puede Start sprint igual
- B) No gestiona sprints (completar, iniciar, editar)
- C) No puede Create issue
- D) Pierde product access

## 10

Issue security nivel `Cliente` sin el reporter. El cliente:

- A) Siempre ve el ticket
- B) Puede no ver ni el que abrió
- C) Se convierte en admin
- D) El nivel se ignora en Cloud

## 11

Company-managed: ¿quién crea un custom field global?

- A) Cualquier project admin
- B) Jira administrator
- C) Cualquier Developer
- D) El gadget Assigned to Me

## 12

Kanban sub-filter `status = "To Do"`. El efecto:

- A) El tablero muestra todo el workflow
- B) Solo To Do (columnas In Progress/Done vacías salvo que el sub-filter mienta)
- C) Crea sprints
- D) Comparte el dashboard

## 13

`fixVersion = 1.0.0 AND statusCategory != Done` sirve para:

- A) SSO
- B) Trabajo pendiente de una release
- C) Instalar apps
- D) Crear la org

## 14

Bulk change no aparece. Suele faltar:

- A) Global permission Make bulk changes + permisos de issue
- B) Confluence
- C) Un board Scrum
- D) Issue security

## 15

Agile at scale en el temario ACP-620: Jira facilita varios equipos sobre todo con:

- A) Un proyecto TMP por persona y nada compartido
- B) Boards/filtros multi-proyecto, versions, (si el plan) planes/roadmaps — siempre respetando permisos
- C) Desactivar JQL
- D) Un único usuario admin para todos los clics

---

<details>
<summary>Soluciones</summary>

1. **B** — TMP cuando no hay admin de schemes.  
2. **A** — Si estima en puntos, las horas no queman ese burndown. (Si la pregunta dijera que SÍ registra horas y el board está en time, sería B.) El enunciado dice que las horas no mueven el burndown → el board no está en time tracking, suele ser story points.  
3. **B**  
4. **B**  
5. **B**  
6. **B**  
7. **B**  
8. **B**  
9. **B**  
10. **B**  
11. **B**  
12. **B**  
13. **B**  
14. **A**  
15. **B**

Si fallaste boards (2, 3, 4, 12) o reporting (6, 7, 13), repasa M07–M08. Si fallaste permissions/security (5, 9, 10, 14), M02–M04 y M10-01. Automation: 8 y M09.

</details>

## Cierre

El examen oficial se reserva en Atlassian. Este kit imita **formato y dominios**, no sustituye ASB-905 ni el Exam Success de Atlassian University. Tu instancia trial es el mejor simulador: cambia una cosa, predice el efecto, comprueba.
