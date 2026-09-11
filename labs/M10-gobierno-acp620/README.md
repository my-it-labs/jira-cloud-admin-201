# M10 — Gobierno, integraciones y ACP-620

[← Página anterior](../M09-automatizacion/M09-preparacion-examen.md) · [Siguiente página →](M10-01-seguridad-multiempresa.md)

## Qué aprenderás

- Proteger work items con **issue security** (multiempresa / departamentos).
- Enlazar **Confluence** y mirar el **Marketplace** con criterio.
- Diagnosticar accesos, permisos, workflows y automation.
- Hacer un **examen simulado** ACP-620 ([simulador en GitHub Pages](https://my-it-labs.github.io/jira-cloud-admin-201/)).

## Explicación

**Permission scheme** = quién entra al espacio y qué botones tiene (**Browse**, **Create**, **Assign**…).

**Issue security scheme** = quién ve *esa* work item aunque tenga **Browse Projects**.

Niveles típicos: `Interno`, `Cliente A`, `Dirección`. El **Reporter** puede no verse a sí mismo si el nivel no lo incluye: trampa clásica del examen.

Integraciones: Confluence (conocimiento), Marketplace (superficie de ataque y de coste). Gobierno: quién puede instalar apps, revisión de permisos, desinstalar al terminar el lab.

Operación:

| Log | Dónde |
|-----|--------|
| Auditoría del **site** Jira | **Jira settings → System → Audit log** → `/auditing/view` |
| Auditoría de un **flujo** | Space **Automation → Audit log** |
| Cuota automation | **Automation → Usage** (espacio o global) |

---

## Demostración

### 1 — Issue security schemes

**Acción:** Icono **Settings** (⚙️) → **Jira settings** → **Work items** → **Work item security schemes** (URL clásica: `/secure/admin/ViewIssueSecuritySchemes.jspa`).

**Por qué:** No confundir con **Permission schemes** (M04). Aquí se ocultan issues concretas, no el espacio entero.

**Resultado esperado:** Tabla con `NORTECH Security` (o la creas en M10-01).

![Lista de esquemas](../img/M10-01-01-security-schemes-list.png)

---

### 2 — Marketplace (sin instalar de pago)

**Acción:** **Settings → Apps** o `/plugins/servlet/upm/marketplace`. Abre **una** ficha. Lee permisos y precio. **No instales** apps de pago en el trial del curso.

**Resultado esperado:** Has visto categoría, vendor y *Paid via Atlassian* vs Free.

![Marketplace](../img/M10-02-02-marketplace-home.png)

---

## Laboratorio

Te toca a ti.

| Lab | Título |
|-----|--------|
| M10-01 | [Entorno multiempresa](M10-01-seguridad-multiempresa.md) |
| M10-02 | [Confluence y apps](M10-02-confluence-marketplace.md) |
| M10-03 | [Auditoría y operación](M10-03-auditoria-operacion.md) |
| M10-04 | [Examen simulado ACP-620](M10-04-examen-simulado.md) |

→ **[M10-01](M10-01-seguridad-multiempresa.md)**
