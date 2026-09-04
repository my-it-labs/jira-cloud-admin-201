# M07 — Tableros ágiles

[← Página anterior](../M06-campos-pantallas/M06-preparacion-examen.md) · [Siguiente página →](M07-01-scrum-kanban.md)

## Qué aprenderás

- Elegir Scrum, Kanban o Kanban con backlog.
- Entender que el board es un **filtro JQL** + columnas.
- Mapear columnas a estados, filtros rápidos, calles, estimación.

Este es el dominio más pesado de **ACP-620** (25–35 %).

## Explicación

| Tipo | Cuándo |
|------|--------|
| **Scrum** | Sprints, backlog, estimación, velocity |
| **Kanban** | Flujo continuo; WIP |
| **Kanban + backlog** | Kanban con una bandeja de compromiso |

| Pieza | Qué es |
|-------|--------|
| **Board filter** | JQL que alimenta el tablero (`project = DEV`) |
| **Sub-filter** (Kanban) | JQL extra (a menudo oculta Done antiguo) |
| **Quick filter** | Botones temporales (`assignee = currentUser()`) |
| **Columnas** | Una o más **estados** por columna |
| **Swimlanes** | Filas (assignee, stories, queries) |

> [!WARNING]
> Un sub-filter `status != Done` mal pensado vacía el tablero. Diagnóstico: configuración del tablero → Filtro + Columnas + permiso Browse.

Los tableros **multi-proyecto** usan un filtro `project in (DEV, SUP)` y permisos en ambos. Cuidado con fugas de datos si el filtro es demasiado amplio.

## Demostración

1. Entra en DEV y abre el **Backlog** Scrum. En SUP, abre el Kanban.

![Backlog Scrum de DEV](../img/M07-01-01-scrum-board.png)

![Kanban de SUP](../img/M07-01-02-kanban-board.png)

2. Configuración del tablero DEV → **Columnas**. El estado `In Review` (M05) debe tener columna propia; nada en «sin asignar».

![Columnas del tablero](../img/M07-02-01-columns.png)

## Laboratorio

Te toca a ti.

| Lab | Título |
|-----|--------|
| M07-01 | [Scrum y Kanban](M07-01-scrum-kanban.md) |
| M07-02 | [Columnas y filtros](M07-02-columnas-filtros.md) |
| — | [Preparación para el examen ACP-620](M07-preparacion-examen.md) |

→ **[M07-01](M07-01-scrum-kanban.md)**
