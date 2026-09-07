# M03 — Preparación para el examen ACP-620 (proyectos)

[← Página anterior](M03-02-componentes-versiones.md) · [Siguiente página →](../M04-esquemas-reutilizables/README.md)

> Preguntas de escenario alineadas con **ACP-620: Managing Jira Projects for Cloud**. No es el examen oficial.
>
> Cubren **este módulo**, no el siguiente. En el [simulador](https://my-it-labs.github.io/jira-cloud-admin-201/) el modo por módulo sortea 5 del mismo temario; el cronometrado de 70 mezcla todo el curso.

Elige **una** respuesta. Luego abre la solución y lee el porqué, aunque hayas acertado.


---

## Pregunta 1

Tres equipos deben **compartir** el mismo workflow y los mismos campos. Recomiendas:

- A) Tres proyectos team-managed
- B) Proyectos company-managed con schemes compartidos
- C) Un único tablero sin proyectos
- D) Un proyecto por issue type

<details>
<summary>Ver respuesta</summary>

**B.** Shared configuration es el caso de uso de CMP. TMP no comparte schemes entre proyectos.

</details>

---

## Pregunta 2

Un equipo pequeño quiere empezar hoy y no hay Jira admin disponible hasta el mes que viene. Recomiendas:

- A) Esperar
- B) Team-managed, sabiendo el coste de migrar a CMP después
- C) Company-managed igualmente
- D) Jira Data Center

<details>
<summary>Ver respuesta</summary>

**B.** ACP-620 pide recomendar TMP cuando el gobierno central no está. Hay que conocer el trade-off.

</details>

---

## Pregunta 3

Quieres que los bugs de la capa API caigan siempre en Marta. Lo más limpio:

- A) Automation global para todos los proyectos
- B) Componente `api` con lead Marta y default assignee = Component lead
- C) Un label `marta`
- D) Hacer a Marta org admin

<details>
<summary>Ver respuesta</summary>

**B.** Es el mecanismo nativo de asignación por componente. Automation es M09, para reglas más ricas.

</details>

---

## Pregunta 4

Quitar una issue de la versión `1.0.0` justo antes del release:

- A) No afecta a nadie
- B) Cambia el alcance de la versión (informes de release y lo que se entrega)
- C) Borra el workflow
- D) Cambia el permission scheme

<details>
<summary>Ver respuesta</summary>

**B.** Scope change. El examen pregunta el impacto de mover issues entre versiones/sprints.

</details>

---

## Pregunta 5

La clave del proyecto:

- A) Se puede cambiar siempre sin coste
- B) Es el prefijo de las issues (`DEV-12`); cambiarla es posible pero doloroso
- C) Debe ser un UUID
- D) Solo existe en TMP

<details>
<summary>Ver respuesta</summary>

**B.** Elige bien `DEV` / `SUP` el día 1.

</details>
