# M05-01 — Workflow de gestión de incidencias

[← Página anterior](README.md) · [Siguiente página →](M05-02-workflow-aprobacion.md)

### Objetivo

Publicar un workflow `NORTECH Incidencias` con estados To Do → In Progress → In Review → Done y una condición de rol al cerrar.

### Prerrequisitos

- Scheme `NORTECH Workflows` (M04). Proyecto DEV.

### En qué consiste

Copy del workflow por defecto → editar diagrama → condición → publicar → mapear Bug (y Story) en el scheme.

### 1 — Copiar y abrir el editor

**Acción:** **Configuración de Jira** → **Flujos de trabajo**. Copia «Software Simplified» o el que use DEV. Nombre: `NORTECH Incidencias`. Editar (diagrama).

**Por qué:** Nunca edites el workflow por defecto del site.

**Resultado esperado:** Diagrama editable.

![Flujos de trabajo](../img/M05-01-01-workflow-editor.png)

### 2 — Estados y transiciones

**Acción:** Asegura estados `To Do`, `In Progress`, `In Review`, `Done` (nombres equivalentes en español si la UI está en ES). Añade transiciones:

- To Do → In Progress (`Start`)
- In Progress → In Review (`Review`)
- In Review → Done (`Done`)
- In Review → In Progress (`Rework`)
- Global a To Do opcional (`Reopen` desde Done)

**Por qué:** `In Review` es el estado que luego tendrá columna propia en M07.

**Resultado esperado:** El diagrama muestra el ciclo completo.

![Lista de flujos](../img/M05-01-02-transition-conditions.png)

### 3 — Condición al cerrar

**Acción:** Pulsa la **flecha** `Done` (En revisión / In Review → Listo / Done), no el estado. Panel derecho → **Rules** → **Add**. Izquierda: **Restrict transition**. Baja hasta **Restrict who can move a work item** → **Select**. **Restrict to** → rol **Administrators**. Publica / **Update workflow**.

No existe la pestaña **Condiciones** con «el usuario está en el rol del espacio»: esa frase es el editor clásico.

**Por qué:** Condición = quién **ve** la transición. El reporter no cierra si no está en Administrators.

**Resultado esperado:** El panel dice *Only Administrators can see this transition*. Tú la sigues viendo (eres admin).

![Add rule: Restrict who can move a work item](../img/M05-02-03-restrict-who.png)

> [!TIP]
> Post function por defecto ya pone Resolution en transiciones a Done. Comprueba que Done tiene `statusCategory` Done.

### 4 — Asociar al scheme

**Acción:** **Esquemas de flujo de trabajo** → `NORTECH Workflows` → asigna `NORTECH Incidencias` a Bug y Story. Publica. Los espacios que usan el esquema se actualizan.

**Por qué:** El scheme es el interruptor por tipo.

**Resultado esperado:** Scheme muestra el mapeo.

![Esquemas de flujo de trabajo](../img/M05-01-03-workflow-scheme.png)

### 5 — Probar

**Acción:** En DEV, crea un Bug. Transita Start → Review. Intenta Done con tu usuario (admin: debe dejar). 

**Por qué:** Validar el proceso de verdad, no solo el dibujo.

**Resultado esperado:** El Bug llega a Done. La resolución no queda vacía.

## Comprueba tu entendimiento

**Draft vs publicado**
Si el editor sigue en «Draft», las issues nuevas no usan los cambios.
→ Publish / Publish draft.

## Reto

### 1 — Validador de comentario

En `Rework`, añade un validador que exija comentario (si el plan/UI lo ofrece: «Field Required Validator» o «Comment required»).

<details>
<summary>Ver solución</summary>

Transición Rework → Validators → Add. Si no hay validador de comentario nativo, usa Field Required en un campo o una condición de permiso. Lo importante es: validador bloquea la transición con error; condición oculta el botón.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No ves In Review en el board | No hay columna para ese estado | M07; mientras, busca la issue por JQL |
| Nadie puede Done | Condición demasiado estricta | Añade Developers o quita la regla |
| No ves la pestaña Condiciones | Editor de reglas 2026 | **Rules** → **Add** → **Restrict who can move a work item** |
| Resolution vacía en Done | Post function ausente | Add post function Set Resolution |
