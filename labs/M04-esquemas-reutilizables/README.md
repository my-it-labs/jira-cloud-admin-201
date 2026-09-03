# M04 — Esquemas reutilizables

[← Página anterior](../M03-proyectos-corporativos/M03-autoescuela.md) · [Siguiente página →](M04-01-plantilla-corporativa.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Qué es un **scheme** y por qué es la palanca de escala en company-managed.
- Montar una plantilla `NORTECH-*` y asociarla a varios proyectos.
- Anticipar el impacto de editar un scheme compartido.

## Teoría

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

## Demostración guiada

1. En **Configuración de Jira** → **Elementos de trabajo** aparecen las familias de esquemas. El formador abre **Esquemas de permisos** y se ve el predeterminado y el que se va a copiar.

2. En un espacio, **Configuración del espacio** → **Esquemas** muestra qué paquetes usa DEV. Tras el lab, varios nombres empiezan por `NORTECH`.

![Schemes del proyecto](../img/M04-01-04-project-schemes.png)

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M04-01 | [Plantilla corporativa](M04-01-plantilla-corporativa.md) | Copiar, nombrar y asociar schemes NORTECH |
| — | [Autoescuela M04](M04-autoescuela.md) | Impacto de schemes compartidos |

→ Empieza por **[M04-01 — Plantilla corporativa](M04-01-plantilla-corporativa.md)**.
