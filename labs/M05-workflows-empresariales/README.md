# M05 — Workflows empresariales

[← Página anterior](../M04-esquemas-reutilizables/M04-autoescuela.md) · [Siguiente página →](M05-01-workflow-incidencias.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Diseñar estados y transiciones.
- Usar **condiciones**, **validadores** y **post functions**.
- Publicar un workflow y asociarlo por issue type.
- Montar un flujo de **aprobación**.

## Teoría

| Pieza | Función |
|-------|---------|
| **Estado** | Dónde está la issue (`statusCategory`: To Do / In Progress / Done) |
| **Transición** | Puerta entre estados (puede ser *global*) |
| **Condición** | ¿Puede este usuario ver/usar la transición? |
| **Validador** | ¿Van los datos bien? Si no, no transita |
| **Post function** | Efectos al transitar (assignee, resolución, evento) |
| **Resolución** | Campo que suele ponerse al cerrar; vacío = no resuelta |

> [!NOTE]
> El **tablero** (M07) solo **muestra** estados. Si un estado no tiene columna, la issue «desaparece» del board, no del proyecto.

El workflow **no es** el board. Puedes tener un flujo rico y un Kanban de tres columnas.

## Demostración guiada

1. En el diagrama del workflow se ven estados y flechas. Al pulsar una transición aparecen Conditions, Validators, Post functions.

![Editor](../img/M05-01-01-workflow-editor.png)

2. En el flujo de aprobación aparecen estados `En revisión`, `Aprobado` y `Rechazado`.

![Aprobación](../img/M05-02-01-approval-diagram.png)

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M05-01 | [Workflow de incidencias](M05-01-workflow-incidencias.md) | Flujo Bug/Story con condición de rol |
| M05-02 | [Workflow de aprobación](M05-02-workflow-aprobacion.md) | Solicitud → revisión → cierre |
| — | [Autoescuela M05](M05-autoescuela.md) | Condiciones vs validadores |

→ Empieza por **[M05-01](M05-01-workflow-incidencias.md)**.
