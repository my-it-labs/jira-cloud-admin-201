# M09 — Automatización

[← Página anterior](../M08-jql-dashboards-reports/M08-autoescuela.md) · [Siguiente página →](M09-01-asignacion-automatica.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Elegir entre bulk change, workflow y **Automation**.
- Montar reglas: trigger, condition, action, branch, smart values.
- Leer el **registro de auditoría** de la regla y evitar bucles.
- Cubrir los tres labs de la propuesta: asignación, escalados, tareas derivadas.

## Teoría

| Vía | Cuándo |
|-----|--------|
| **Bulk change** | Una vez, muchas issues, humano al volante |
| **Workflow** (post function) | Siempre que se transita, sin ifs ricos |
| **Automation** | Eventos, JQL, branches, varios proyectos |
| **Apps** | Lo que nativo no cubre (gobierno Marketplace en M10) |

Anatomía: **When** (trigger) → **If** (conditions) → **Then** (actions). **For each** = branch (subtasks, linked issues). Smart values: `{{issue.key}}`, `{{issue.assignee.displayName}}`.

> [!WARNING]
> La regla se ejecuta como un **actor** (Automation for Jira o un usuario). Si el actor no tiene Assign Issues, la acción falla. El audit log lo dice.

Scope: proyecto vs múltiple vs global. En trial, respeta los **límites de ejecuciones** del plan.

## Demostración guiada

1. **Configuración del espacio** → **Automatización** → crear regla. Disparador: trabajo creado.

2. Tras una issue de prueba, el audit log muestra SUCCESS o el error de permiso.

![Audit](../img/M09-01-02-rule-assign.png)

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M09-01 | [Asignación automática](M09-01-asignacion-automatica.md) | Clasificar y asignar |
| M09-02 | [Aprobaciones y escalados](M09-02-aprobaciones-escalados.md) | Comentar y subir prioridad |
| M09-03 | [Tareas derivadas](M09-03-tareas-derivadas.md) | Subtareas al transitar |
| — | [Autoescuela M09](M09-autoescuela.md) | Troubleshoot de reglas |

→ Empieza por **[M09-01](M09-01-asignacion-automatica.md)**.
