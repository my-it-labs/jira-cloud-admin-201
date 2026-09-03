# M08 — JQL, dashboards y reports

[← Página anterior](../M07-tableros-agiles/M07-autoescuela.md) · [Siguiente página →](M08-01-jql-filtros.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Escribir **JQL** útil (no solo `project = DEV`).
- Guardar **filtros** personales y compartidos.
- Montar un **dashboard** con gadgets.
- Distinguir gadgets de **reports** ágiles y de análisis.

Este bloque cubre el dominio **Reporting** de ACP-620 (15–20 %) y lo que Atos pidió explícito en el temario.

## Teoría

| Artefacto | Qué es |
|-----------|--------|
| **JQL** | Pregunta (`statusCategory != Done AND priority = Highest`) |
| **Filtro** | JQL guardado; se comparte con roles/grupos |
| **Gadget** | Widget de dashboard (Filter Results, Pie Chart, Assigned to Me) |
| **Agile report** | Burndown, Velocity, CFD, Control chart — viven en el **board** |
| **Issue analysis** | Created vs Resolved, Average age, Pie chart report — viven en **Reports** del proyecto |

> [!WARNING]
> Un dashboard **compartido** con un filtro **privado** muestra error a los demás. Comparte el filtro primero (Viewers = group / project).

JQL que sale en examen: `currentUser()`, `endOfDay()`, `WAS`, `CHANGED`, `sprint in openSprints()`, `fixVersion`, `component`, `statusCategory`.

## Demostración guiada

1. Issue search en modo JQL: `project = DEV AND statusCategory != Done ORDER BY priority DESC`.

2. Save as `NORTECH DEV Abiertas`, viewers: proyecto DEV.

3. Dashboard `NORTECH PMO` con Filter Results sobre ese filtro.

![Gadgets](../img/M08-02-02-gadgets.png)

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M08-01 | [JQL y filtros](M08-01-jql-filtros.md) | Consultas y filtros compartidos |
| M08-02 | [Dashboards](M08-02-dashboards-gadgets.md) | Panel PMO con gadgets |
| M08-03 | [Reports](M08-03-reports.md) | Sprint report, CFD, created vs resolved |
| — | [Autoescuela M08](M08-autoescuela.md) | JQL y «qué informe es este» |

→ Empieza por **[M08-01](M08-01-jql-filtros.md)**.
