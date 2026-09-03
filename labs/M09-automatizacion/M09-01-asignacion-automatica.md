# M09-01 — Asignación automática de incidencias

[← Página anterior](README.md) · [Siguiente página →](M09-02-aprobaciones-escalados.md)

### Objetivo

Una regla en SUP que, al crear un Bug, asigna al component lead o a un usuario fijo y pone una etiqueta.

### Prerrequisitos

- SUP CMP. Componentes o un usuario asignable. Jira admin o project admin con Automation.

### En qué consiste

Create rule en el proyecto (no global, para no comer cuota).

### 1 — Trigger

**Acción:** SUP → **Configuración del espacio** → **Automatización** → crear regla. Disparador: **Trabajo creado** / *Issue created*. Condición: campos → tipo = Bug.

**Por qué:** No quieres asignar las Tasks de la misma cola igual.

**Resultado esperado:** When + If en el editor.

### 2 — Acciones

**Acción:** Then:

1. **Edit issue**: Labels → añadir `auto-triaged`.
2. **Assign issue**: Component lead (si hay componente) **o** un usuario concreto de `nortech-soporte`.
3. Opcional: **Set priority** si Summary contiene `DOWN` (If: Advanced / JQL o summary contains).

Nombre de la regla: `NORTECH SUP Auto-assign bugs`. **Actívala**.

**Por qué:** Clasificación + priorización + asignación, como en la propuesta.

**Resultado esperado:** Regla enabled.

### 3 — Probar y audit log

**Acción:** **Crear** un Bug en SUP. Abre la regla → **Registro de auditoría**.

**Por qué:** Si FAIL, el mensaje (permiso, campo, actor) es el diagnóstico. No reescribas a ciegas.

**Resultado esperado:** SUCCESS y el Bug asignado / con label.

## Comprueba tu entendimiento

**Actor**
Rule details: actor.
→ Automation for Jira debe tener Assign Issues en el scheme NORTECH (a menudo vía role atlassian-addons o el permission «Assign Issues» para cualquier logged in user: revisa).

## Reto

### 1 — No pises el component lead nativo

Si ya usas Default assignee = component lead (M03), ¿hace falta esta regla?

<details>
<summary>Ver solución</summary>

No para la asignación simple. La regla aporta label, prioridad por texto y ramas. En examen: elige el mecanismo más simple que cumpla el requisito.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No corre | Scope, trigger, issue type condition | Audit log |
| FAIL assign | Actor sin permiso / usuario no Assignable | Permission scheme |
| Cuota | Plan Free | Desactiva reglas de demo |
