# M01 — Entorno y arquitectura Jira Cloud

[← Página anterior](../../README.md) · [Siguiente página →](M01-01-crear-trial.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Distinguir organización, site, producto y **espacio** (el *project* del examen ACP-620).
- Elegir un plan de Cloud (Free, Standard, Premium) según lo que vas a practicar.
- Crear tu instancia trial y llegar a Atlassian Administration.
- Reconocer los tres roles administrativos que vas a usar el resto del curso.

## Teoría

Jira Cloud no es un único interruptor. Hay **cuatro capas** y cada botón vive en una:

| Capa | Dónde se administra | Ejemplo de decisión |
|------|---------------------|---------------------|
| **Organización** | `admin.atlassian.com` | Usuarios, SSO, políticas de seguridad |
| **Site** | `https://nombre.atlassian.net` | Qué productos hay en esa URL |
| **Producto** | Jira, Confluence, … | Licencia, acceso a la aplicación |
| **Espacio** (*project*) | Dentro de Jira | Trabajo, workflows, tableros |

> [!NOTE]
> **Nombres de 2026.** En la UI en castellano, Atlassian llama **espacio** a lo que ACP-620 sigue llamando *project*, y **elemento de trabajo** / *work item* a lo que el examen llama *issue*. En la barra izquierda, **Proyectos** es *otro producto* (Atlassian Projects), no la lista de espacios de Jira. En este curso usamos el nombre de la pantalla y, entre paréntesis, el término del examen cuando hace falta.

> [!NOTE]
> **Org admin ≠ project admin.** El primero invita gente a la organización. El segundo configura *un* proyecto. ACP-620 pregunta sobre todo lo segundo; este curso cubre las dos porque un administrador de plataforma tiene que saber dónde termina cada una.

### Productos Jira en Cloud

Atlassian unifica la experiencia, pero el **tipo de proyecto** sigue importando:

| Producto / plantilla | Para qué |
|----------------------|----------|
| Jira (Software) | Desarrollo, sprints, releases |
| Jira Service Management | Cola de soporte, SLAs (si está licenciado) |
| Work Management / Business | Operaciones, PMO, RRHH (proyectos de negocio) |

En el trial de este curso usamos **Jira Software Premium**. Las plantillas de negocio también están disponibles: las usaremos en PMO.

### Planes (lo que cambia de verdad)

| | Free | Standard | Premium |
|---|------|----------|---------|
| Usuarios | hasta 10 | ilimitados (pagas por asiento) | ilimitados |
| Automation | muy limitada | más ejecuciones | cuota alta |
| Audit log avanzado / sandbox | no | básico | sí (sandbox en Premium+) |
| Advanced Roadmaps | no | no | sí |

El laboratorio usa **Premium trial (30 días, sin tarjeta)** para no chocar con los techos de Free en automation y gobierno. Si el alta Premium falla, Standard (14 días) cubre casi todo; Free cubre M01–M08 con recortes en M09–M10.

### Roles administrativos

| Rol | Qué puede hacer |
|-----|-----------------|
| **Organization admin** | Usuarios, grupos, seguridad de la org, billing |
| **Site / product admin** | Configuración global de Jira (workflows, campos, schemes) |
| **Project admin** | Roles, componentes, tablero, algunas pantallas *de ese* proyecto |
| **Jira admin** (global permission) | Lo mismo que product admin dentro de Jira |

> [!WARNING]
> En **team-managed** el project admin hace casi todo *dentro de su proyecto* y no comparte schemes. En **company-managed** los schemes son globales: ahí vive este curso.

## Demostración guiada

> Recorrido que hace el formador en vivo. Tono descriptivo, sin imperativos.

1. Al abrir el alta de Jira Cloud Premium aparece un formulario de correo de trabajo y la mención explícita al trial de 30 días sin tarjeta.

![Alta Premium](../img/M01-01-01-signup-premium.png)

2. Tras verificar el correo, el asistente pide un **nombre de site**. Ese nombre será la URL `https://nombre.atlassian.net` de todo el laboratorio.

![Nombre de site](../img/M01-01-03-signup-sitename.png)

3. Al aterrizar en Jira se ve **Para ti**. La barra tiene **Buscar**, **Crear** y **Configuración**. Desde el engranaje se sale hacia **Atlassian Administration**, no hacia la configuración de un espacio.

![Home de Jira](../img/M01-02-01-jira-home.png)

4. En `admin.atlassian.com` aparecen **Resumen**, **Aplicaciones de Atlassian** (con el plan **Premium**) y **Directorio** → **Usuarios** con el primer administrador.

![Admin overview](../img/M01-02-02-admin-overview.png)

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M01-01 | [Crear el trial](M01-01-crear-trial.md) | Alta de tu site Premium y anotar la URL |
| M01-02 | [Explorar la consola administrativa](M01-02-explorar-admin.md) | Recorrer org, aplicaciones, Directorio y Sistema |
| — | [Autoescuela M01](M01-autoescuela.md) | Preguntas tipo ACP-620 sobre arquitectura |

→ Empieza por **[M01-01 — Crear el trial](M01-01-crear-trial.md)**.
