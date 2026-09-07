# M09 — Preparación para el examen ACP-620 (automation)

[← Página anterior](M09-03-tareas-derivadas.md) · [Siguiente página →](../M10-gobierno-acp620/README.md)

> Preguntas de escenario alineadas con **ACP-620: Managing Jira Projects for Cloud**. No es el examen oficial.
>
> Cubren **este módulo**, no el siguiente. En el [simulador](https://my-it-labs.github.io/jira-cloud-admin-201/) el modo por módulo sortea 5 del mismo temario; el cronometrado de 70 mezcla todo el curso.

Elige **una** respuesta. Luego abre la solución y lee el porqué, aunque hayas acertado.


---

## Pregunta 1

La regla debería asignar y el audit log dice que el usuario no tiene permiso. Actúas sobre:

- A) El board filter
- B) Permission scheme / Assignable User / actor de la regla
- C) El nombre del sprint
- D) Confluence

<details>
<summary>Ver respuesta</summary>

**B.** Automation es un usuario más.

</details>

---

## Pregunta 2

Necesitas cambiar el assignee de 80 issues **una vez**. Lo más adecuado:

- A) Una regla scheduled eterna
- B) Bulk change
- C) Un nuevo proyecto
- D) Issue security

<details>
<summary>Ver respuesta</summary>

**B.** Identificar la vía: bulk vs automation vs workflow.

</details>

---

## Pregunta 3

Una regla con trigger Issue updated y action Edit issue (misma issue) sin condición:

- A) Es óptima
- B) Riesgo de loop
- C) Obligatoria en Scrum
- D) Solo en Free

<details>
<summary>Ver respuesta</summary>

**B.** Hay que acotar (campo concreto, «ignore issues in this rule»).

</details>
