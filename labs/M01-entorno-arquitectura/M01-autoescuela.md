# M01 — Autoescuela ACP-620 (arquitectura y acceso)

[← Página anterior](M01-02-explorar-admin.md) · [Siguiente página →](../M02-usuarios-seguridad/README.md)

> Kit de autoevaluación. Preguntas de escenario, en la línea del examen **ACP-620**. No es el examen oficial.

Elige **una** respuesta. Luego abre la solución y lee el porqué, aunque hayas acertado.

---

## Pregunta 1

Un equipo pide que *ellos* puedan cambiar el workflow sin pasar por el administrador de Jira. ¿Qué tipo de proyecto encaja?

- A) Company-managed, porque los schemes se editan en el proyecto
- B) Team-managed, porque el project admin configura el proceso dentro de su proyecto
- C) Cualquiera: el workflow siempre es global
- D) Un proyecto de Jira Service Management, obligatorio

<details>
<summary>Ver respuesta</summary>

**B.** En team-managed el alcance es el proyecto. En company-managed el workflow vive en un scheme global (o compartido) y lo toca un Jira admin. ACP-620 espera que sepas recomendar TMP vs CMP.

</details>

---

## Pregunta 2

Necesitas invitar a 12 personas al site. Estás en plan **Free**. ¿Qué ocurre?

- A) Puedes invitarlas; Free no tiene límite de usuarios
- B) Free limita a 10 usuarios: o subes de plan o no entran todas
- C) Entran como clientes de JSM sin contar
- D) Solo entran si las pones en un grupo

<details>
<summary>Ver respuesta</summary>

**B.** Free = máximo 10 usuarios. Por eso el curso usa trial Premium/Standard para no chocar con invitaciones de práctica.

</details>

---

## Pregunta 3

Un project admin no encuentra **Custom fields** en Project settings de un proyecto **company-managed**. ¿Es normal?

- A) No: siempre están en Project settings
- B) Sí: los custom fields globales se administran en Jira settings → Issues
- C) Solo existen en team-managed
- D) Hay que instalar una app del Marketplace

<details>
<summary>Ver respuesta</summary>

**B.** En CMP los campos son de site. El project admin no crea campos globales. En TMP sí hay campos a nivel de proyecto.

</details>

---

## Pregunta 4

¿Dónde se decide quién tiene **product access** a Jira (puede entrar al producto)?

- A) Permission scheme del proyecto
- B) Board filter
- C) Atlassian Administration → product access / Directory
- D) Notification scheme

<details>
<summary>Ver respuesta</summary>

**C.** Sin product access el usuario ni llega a Jira. El permission scheme actúa *después*, dentro de los proyectos.

</details>

---

## Pregunta 5

Tu organización tiene dos sites (`acme.atlassian.net` y `acme-sandbox.atlassian.net`). Un grupo creado en Directory:

- A) Existe solo en el site donde lo creaste
- B) Es de la organización y puede usarse para product access de los sites
- C) Se replica automáticamente a Confluence on-prem
- D) Solo sirve para tableros

<details>
<summary>Ver respuesta</summary>

**B.** Los grupos viven en la org. Luego se asignan a productos/sites. No confundir con *project roles*.

</details>

---

## Pregunta 6

ACP-620 evalúa principalmente a:

- A) Organization admin que configura SSO
- B) Quien **gestiona proyectos** en Cloud (project admin / Jira admin de proyecto)
- C) Desarrolladores Forge
- D) Agentes de Jira Service Management exclusivamente

<details>
<summary>Ver respuesta</summary>

**B.** Dominios: creación de proyectos, tableros, gestión de proyectos, automation, reporting. SSO y org policies son más de administrador de Cloud (otro examen). Este curso cubre ambos, pero la autoescuela prioriza ACP-620.

</details>
