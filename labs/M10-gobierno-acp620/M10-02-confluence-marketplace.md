# M10-02 — Integración Jira-Confluence y Marketplace

[← Página anterior](M10-01-seguridad-multiempresa.md) · [Siguiente página →](M10-03-auditoria-operacion.md)

### Objetivo

Una página de Confluence enlazada a una issue, y una revisión consciente del Marketplace **sin** dejar apps de pago instaladas.

### Prerrequisitos

- Site Jira. Para Confluence: activa el trial del producto si no está (Products en Administration). Puede pedir confirmación / captcha.

### En qué consiste

Alta breve de Confluence → espacio → página → enlace desde Jira. Luego Explore apps.

### 1 — Confluence trial

**Acción:** `admin.atlassian.com` → **Aplicaciones** → **Añadir aplicación** → Confluence (trial). Espera a que el producto aparezca. Abre Confluence del mismo site.

**Por qué:** Mismo `*.atlassian.net`. No hace falta otro correo.

**Resultado esperado:** Confluence carga (wizard Skip).

### 2 — Página y vínculo

**Acción:** Crea un espacio `Nortech Docs` y una página `Runbook SUP`. En un Bug de SUP, **Link** → Confluence page → esa página. Desde la página, inserta un Jira issue macro si el editor lo ofrece.

**Por qué:** Conocimiento ligado al ticket: propuesta formativa.

**Resultado esperado:** La issue muestra el enlace; la página, el issue.

### 3 — Marketplace (gobernado)

**Acción:** **Aplicaciones** → explorar más. Busca `Timesheet` o automatización extra. Abre **una** ficha: permisos que pide, Free vs de pago. **No instales** nada de pago. Si instalas una app Free de prueba, **desinstálala** al terminar.

**Por qué:** Cada app es identidad, datos y factura.

**Resultado esperado:** Has leído permisos de una ficha.

## Comprueba tu entendimiento

**Quién instala**
Settings → Apps / Manage apps. Solo admins.
→ Un project admin no debería poder instalar a ciegas en un site gobernado.

## Reto

### 1 — Evaluación de impacto

Lista tres preguntas antes de instalar una app en Atos.

<details>
<summary>Ver solución</summary>

¿Datos que sale de la UE? ¿Permisos de issue/admin? ¿Coste al caducar el trial? ¿Quién la opera? ¿Hay nativo (automation, JQL) que baste?

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No sale Confluence | Producto no añadido | Add product; espera minutos |
| Macro Jira no resuelve | Permisos de la issue (security level) | M10-01 |
| App de pago en trial silencioso | Instalar sin leer | Uninstall ahora |
