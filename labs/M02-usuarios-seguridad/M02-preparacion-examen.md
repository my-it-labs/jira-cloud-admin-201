# M02 — Preparación para el examen ACP-620 (permisos y roles)

[← Página anterior](M02-02-modelo-seguridad.md) · [Siguiente página →](../M03-proyectos-corporativos/README.md)

> Preguntas de escenario alineadas con **ACP-620: Managing Jira Projects for Cloud**. No es el examen oficial.
>
> Cubren **este módulo**, no el siguiente. En el [simulador](https://my-it-labs.github.io/jira-cloud-admin-201/) el modo por módulo sortea 5 del mismo temario; el cronometrado de 70 mezcla todo el curso.

Elige **una** respuesta. Luego abre la solución y lee el porqué, aunque hayas acertado.


---

## Pregunta 1

Un desarrollador puede abrir Jira pero no ve el proyecto DEV. ¿Qué miras primero?

- A) Product access
- B) Browse Projects en el permission scheme / rol del proyecto
- C) El SMTP
- D) El nombre del tablero

<details>
<summary>Ver respuesta</summary>

**B.** Ya abre Jira (product access OK). Falta permiso de proyecto (rol + scheme). Si no abriera Jira, entonces A.

</details>

---

## Pregunta 2

¿Cuál es la forma más escalable de dar a todo Desarrollo el rol Developers en 15 proyectos?

- A) Añadir cada usuario a cada proyecto
- B) Meter usuarios en el grupo `nortech-dev` y asignar **ese grupo** al rol Developers
- C) Hacerlos a todos Jira admin
- D) Compartir el dashboard

<details>
<summary>Ver respuesta</summary>

**B.** Grupo en Directory + rol de proyecto. Es el modelo corporativo. C es un agujero de seguridad.

</details>

---

## Pregunta 3

La global permission **Make bulk changes** afecta a:

- A) Solo un proyecto
- B) Usuarios/grupos a nivel de site (pueden bulk change donde ya tengan permiso de issue)
- C) Solo team-managed
- D) Solo Confluence

<details>
<summary>Ver respuesta</summary>

**B.** Global permissions (Jira settings → System) son de site. Siguen necesitando los permisos de issue en cada proyecto.

</details>

---

## Pregunta 4

Un project admin puede invitar a la **organización** a un proveedor externo.

- A) Siempre
- B) Nunca: invitar a la org es de org/site admin (o user access admin)
- C) Solo si el proyecto es Scrum
- D) Solo desde el board

<details>
<summary>Ver respuesta</summary>

**B.** People del proyecto asigna roles a usuarios que **ya** existen. El alta en la org es otra consola.

</details>

---

## Pregunta 5

Assign Issues vs Assignable User: un usuario no sale en el desplegable de Assignee. Suele faltar:

- A) Assign Issues (quien asigna)
- B) Assignable User (quién puede *ser* asignado)
- C) Create Issues
- D) Un gadget

<details>
<summary>Ver respuesta</summary>

**B.** Assignable User controla el desplegable. Assign Issues controla quién puede cambiar el assignee.

</details>
