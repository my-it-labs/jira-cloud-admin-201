# M08 — Autoescuela ACP-620 (reporting)

[← Página anterior](M08-03-reports.md) · [Siguiente página →](../M09-automatizacion/README.md)

---

## Pregunta 1

La PMO quiere «issues abiertas de DEV por persona» en una página que se abre cada mañana. ¿Qué montas?

- A) Solo un sprint report
- B) Filtro JQL + gadget Two Dimensional o Filter Results en un dashboard
- C) Issue security
- D) Un workflow nuevo

<details>
<summary>Ver respuesta</summary>

**B.** Dashboard + filtro. El sprint report es de un sprint concreto, no la pared diaria.

</details>

---

## Pregunta 2

`assignee = currentUser()` en un filtro compartido:

- A) Muestra siempre las issues de Ana
- B) Es dinámico: cada viewer ve las suyas
- C) Es JQL ilegal
- D) Solo funciona en TMP

<details>
<summary>Ver respuesta</summary>

**B.** Por eso es el quick filter y gadget Assigned to Me.

</details>

---

## Pregunta 3

Te muestran un gráfico de áreas apiladas por estado a lo largo del tiempo. Es:

- A) Velocity
- B) Cumulative Flow Diagram
- C) Created vs Resolved
- D) Pie chart gadget

<details>
<summary>Ver respuesta</summary>

**B.** Identificar el report por la forma es típico de ACP-620.

</details>

---

## Pregunta 4

El gadget del dashboard falla para el director y a ti te funciona:

- A) Jira caído
- B) El filtro no está compartido con él / no tiene Browse
- C) Falta Premium
- D) El board es Kanban

<details>
<summary>Ver respuesta</summary>

**B.** Permisos del filtro ∩ permisos del proyecto.

</details>
