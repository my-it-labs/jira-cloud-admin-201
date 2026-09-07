# M07 — Preparación para el examen ACP-620 (boards)

[← Página anterior](M07-02-columnas-filtros.md) · [Siguiente página →](../M08-jql-dashboards-reports/README.md)

> Preguntas de escenario alineadas con **ACP-620: Managing Jira Projects for Cloud**. No es el examen oficial.
>
> Cubren **este módulo**, no el siguiente. En el [simulador](https://my-it-labs.github.io/jira-cloud-admin-201/) el modo por módulo sortea 5 del mismo temario; el cronometrado de 70 mezcla todo el curso.

Elige **una** respuesta. Luego abre la solución y lee el porqué, aunque hayas acertado.


---

## Pregunta 1

El board no muestra issues que sí salen en Search con el mismo JQL. Lo siguiente a mirar:

- A) Sub-filter Kanban y columnas unmapped
- B) El plan Free
- C) Confluence
- D) El nombre del site

<details>
<summary>Ver respuesta</summary>

**A.** Filter OK implica sub-filter o mapping. También swimlanes «hide done».

</details>

---

## Pregunta 2

Un board para tres equipos en tres proyectos. El filtro debe:

- A) `project = DEV` y ya
- B) Incluir los tres proyectos **y** cada usuario necesita Browse en esos proyectos
- C) Ser `assignee is EMPTY`
- D) Usar solo labels

<details>
<summary>Ver respuesta</summary>

**B.** Permisos ∩ filtro. Si no hay Browse, la issue no existe para ese usuario.

</details>

---

## Pregunta 3

Burndown de story points no baja al cerrar issues sin puntos:

- A) Bug de Jira
- B) La estimación está en story points y esas issues valen 0
- C) Falta Marketplace
- D) El sprint no existe

<details>
<summary>Ver respuesta</summary>

**B.** Estimation method. Time tracking produce otro informe.

</details>

---

## Pregunta 4

Kanban with backlog sirve para:

- A) Sustituir sprints de Scrum sin más
- B) Separar el trabajo aún no comprometido (backlog) del flujo WIP
- C) Solo TMP
- D) Solo JSM

<details>
<summary>Ver respuesta</summary>

**B.** Recomendación de tipo de board: escenario típico ACP-620.

</details>
