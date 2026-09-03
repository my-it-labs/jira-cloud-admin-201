# M10 — Gobierno, integraciones y ACP-620

[← Página anterior](../M09-automatizacion/M09-autoescuela.md) · [Siguiente página →](M10-01-seguridad-multiempresa.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Proteger issues con **issue security** (multiempresa / departamentos).
- Enlazar **Confluence** y mirar el **Marketplace** con criterio.
- Diagnosticar accesos, permisos, workflows y automation.
- Hacer un **examen simulado** ACP-620.

## Teoría

**Permission scheme** = quién entra al proyecto y qué botones tiene.  
**Issue security scheme** = quién ve *esa* issue aunque tenga Browse Projects.

Niveles típicos: `Interno`, `Cliente A`, `Dirección`. El reporter puede no verse a sí mismo si el nivel no lo incluye: trampa clásica.

Integraciones: Confluence (conocimiento), Marketplace (superficie de ataque y de coste). Gobierno: quién puede instalar apps, revisión de permisos de la app, desinstalar al terminar el lab.

Operación: audit log, límites de automation, no editar Default schemes, change management (copia de scheme, no «pruebo en producción»).

## Demostración guiada

1. Issue security scheme con dos niveles. Una issue en `Cliente` que el usuario de soporte interno no ve.

2. Marketplace abierto en Explore apps, **sin** instalar nada de pago.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M10-01 | [Entorno multiempresa](M10-01-seguridad-multiempresa.md) | Issue security |
| M10-02 | [Confluence y apps](M10-02-confluence-marketplace.md) | Enlace documental + revisión de apps |
| M10-03 | [Auditoría y operación](M10-03-auditoria-operacion.md) | Incidentes admin + checklist |
| M10-04 | [Examen simulado ACP-620](M10-04-examen-simulado.md) | Batería final tipo autoescuela |

→ Empieza por **[M10-01](M10-01-seguridad-multiempresa.md)**.
