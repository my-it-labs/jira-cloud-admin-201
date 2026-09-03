# M04 — Esquemas reutilizables

[← Página anterior](../M03-proyectos-corporativos/M03-preparacion-examen.md) · [Siguiente página →](M04-01-plantilla-corporativa.md)

## Qué aprenderás

- Qué es un **scheme** y por qué es la palanca de escala en company-managed.
- Montar una plantilla `NORTECH-*` y asociarla a varios proyectos.
- Anticipar el impacto de editar un scheme compartido.

## Explicación

Un scheme es un **paquete nombrado** que un proyecto CMP **apunta**. Cambias el paquete: cambian todos los apuntadores.

| Scheme | Controla |
|--------|----------|
| Issue type scheme | Qué tipos hay (Bug, Story, Task, …) |
| Workflow scheme | Qué workflow usa cada tipo |
| Screen scheme / Issue type screen scheme | Qué pantallas al crear/editar/ver |
| Field configuration scheme | Required, hidden, renderers |
| Permission scheme | Quién puede hacer qué |
| Notification scheme | Quién recibe eventos |
| Issue security scheme | Niveles de visibilidad por issue (M10) |

> [!WARNING]
> Editar el scheme **por defecto** del site afecta a proyectos futuros (y a veces a los que aún lo usan). Trabaja con copias `NORTECH-*`.

## Demostración

1. **Configuración** → **Elementos de trabajo**. Recorre las familias de esquemas. Abre **Esquemas de permisos**: verás el predeterminado y, más adelante, la copia `NORTECH`.

![Esquemas de permisos](../img/M04-01-02-permission-scheme.png)

2. Entra en DEV → **Configuración del espacio** → **Resumen**. Aquí se ve qué paquetes usa el espacio. Tras el laboratorio, varios nombres empiezan por `NORTECH`.

![Resumen de esquemas de DEV](../img/M04-01-04-project-schemes.png)

## Laboratorio

Turno de los alumnos.

| Lab | Título |
|-----|--------|
| M04-01 | [Plantilla corporativa](M04-01-plantilla-corporativa.md) |
| — | [Preparación para el examen ACP-620](M04-preparacion-examen.md) |

→ **[M04-01 — Plantilla corporativa](M04-01-plantilla-corporativa.md)**
