# M03 — Proyectos corporativos

[← Página anterior](../M02-usuarios-seguridad/M02-autoescuela.md) · [Siguiente página →](M03-01-crear-proyectos.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Elegir **gestionado por la empresa** (*company-managed*) frente a **gestionado por el equipo** (*team-managed*).
- Crear los cuatro espacios Nortech (DEV, SUP, OPS, PMO).
- Organizar el trabajo con **componentes**, **versiones** y categorías.

## Teoría

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

### Templates

- **Scrum** → DEV (sprints, backlog).
- **Kanban** (bug tracking / IT) → SUP.
- **Business / Project management** → OPS y PMO.

## Demostración guiada

1. En **Crear espacio** el formador elige plantilla Scrum y, en el siguiente paso, **Gestionado por la empresa**.

![Company-managed](../img/M03-01-02-company-managed.png)

2. El espacio DEV queda con clave `DEV` y se ve en **Más espacios** junto a SUP, OPS y PMO.

![Lista](../img/M03-01-04-projects-list.png)

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M03-01 | [Crear proyectos corporativos](M03-01-crear-proyectos.md) | DEV, SUP, OPS, PMO gestionados por la empresa |
| M03-02 | [Componentes y versiones](M03-02-componentes-versiones.md) | Component leads y una release |
| — | [Autoescuela M03](M03-autoescuela.md) | Project creation ACP-620 |

→ Empieza por **[M03-01 — Crear proyectos](M03-01-crear-proyectos.md)**.
