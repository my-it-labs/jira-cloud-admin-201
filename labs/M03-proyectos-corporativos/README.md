# M03 — Proyectos corporativos

[← Página anterior](../M02-usuarios-seguridad/M02-preparacion-examen.md) · [Siguiente página →](M03-01-crear-proyectos.md)

## Qué aprenderás

- Elegir **gestionado por la empresa** (*company-managed*) frente a **gestionado por el equipo** (*team-managed*).
- Crear los cuatro espacios Nortech (DEV, SUP, OPS, PMO).
- Organizar el trabajo con **componentes**, **versiones** y categorías.

## Explicación

| | Gestionado por la empresa (CMP) | Gestionado por el equipo (TMP) |
|---|--------------------------------|--------------------------------|
| Esquemas | Compartidos a nivel site | Config local al espacio |
| Público de este curso | Gobierno, PMO, varios equipos | Un equipo autónomo |
| ACP-620 | Pregunta **ambos** | Hay que saber recomendar |

> [!WARNING]
> El asistente de Cloud a menudo **destaca** el tipo gestionado por el equipo. Si lo eliges, M04 (esquemas) no se comporta igual. En este curso: **Crear espacio** → **Gestionado por la empresa**.

### Cómo subcategorizar issues (dominio ACP-620)

| Mecanismo | Cuándo |
|-----------|--------|
| **Componentes** | Dueño técnico (component lead, asignación automática) |
| **Labels** | Etiquetas ad hoc, sin gobernanza fuerte |
| **Custom fields** | Dato de negocio que debe informarse (M06) |
| **Versiones** | Releases: qué entra en 1.2.0 |

### Plantillas

- **Scrum** → DEV (sprints, backlog).
- **Kanban** (bug tracking / IT) → SUP.
- **Business / Project management** → OPS y PMO.

## Demostración

1. En Jira, **Crear espacio**. Elige plantilla **Scrum**. En el tipo, marca **Gestionado por la empresa**. Nombre `Nortech Development`, clave `DEV`.

![Plantillas de espacios](../img/M03-01-01-create-project-templates.png)

![Plantilla Scrum](../img/M03-01-02-company-managed.png)

2. Repite la idea para SUP, OPS y PMO (el resto lo haces en el laboratorio). Abre **Más espacios**: deben verse las claves junto a Sample Scrum.

![Lista de espacios](../img/M03-01-04-projects-list.png)

## Laboratorio

Te toca a ti.

| Lab | Título |
|-----|--------|
| M03-01 | [Crear proyectos corporativos](M03-01-crear-proyectos.md) |
| M03-02 | [Componentes y versiones](M03-02-componentes-versiones.md) |
| — | [Preparación para el examen ACP-620](M03-preparacion-examen.md) |

→ **[M03-01 — Crear proyectos](M03-01-crear-proyectos.md)**
