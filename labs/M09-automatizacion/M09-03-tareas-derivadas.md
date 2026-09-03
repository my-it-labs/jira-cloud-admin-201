# M09-03 — Creación automática de tareas

[← Página anterior](M09-02-aprobaciones-escalados.md) · [Siguiente página →](M09-preparacion-examen.md)

### Objetivo

Al pasar una Story de DEV a In Progress, crear dos subtareas (QA y Docs) sin entrar en bucle.

### Prerrequisitos

- DEV con Story y Sub-task. Automation.

### En qué consiste

Trigger Issue transitioned → Create sub-tasks (o Create issue + parent).

### 1 — Regla

**Acción:** DEV → **Automatización** → `NORTECH DEV Subtasks on start`.

- When: **Issue transitioned** → In Progress
- If: Issue type = Story
- Then: **Create sub-tasks** (o dos veces **Create issue** type Sub-task):
  - `QA — {{issue.key}}`
  - `Docs — {{issue.key}}`
- Condition extra: `subtasks is EMPTY` o «Issue type != Sub-task» ya cubre el padre.

**Por qué:** Tareas derivadas de la propuesta. Smart value en el summary.

**Resultado esperado:** Regla on.

### 2 — Probar

**Acción:** Story en To Do → Start. Abre la Story.

**Por qué:** Ver parent/child. Si se crean 20 subtareas, hay loop (la subtarea transita y vuelve a disparar: por eso If type = Story).

**Resultado esperado:** Dos subtareas.

### 3 — Branch (opcional)

**Acción:** Añade un **Related issues branch** → Sub-tasks → Action **Assign** al current user. Guarda.

**Por qué:** El examen pregunta branches.

**Resultado esperado:** Las subtareas salen asignadas.

## Comprueba tu entendimiento

**Por qué no explota**
La condition Issue type = Story.
→ Las subtareas no vuelven a crear nietos.

## Reto

### 1 — Linked issue en vez de subtask

Crea un Task en OPS vinculado `blocks` al transitar a Done una Story.

<details>
<summary>Ver solución</summary>

Action Create issue (project OPS) + Link issues (blocks). Scope de la regla: múltiple proyecto o global. Más cuota y más permisos.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Cientos de issues | Loop | Type condition; turn off rule |
| No crea subtask | Tipo no permitido en el issue type scheme | Scheme NORTECH incluye Sub-task |
| Smart value literal | Mal escrito | `{{issue.key}}` sin espacios raros |
