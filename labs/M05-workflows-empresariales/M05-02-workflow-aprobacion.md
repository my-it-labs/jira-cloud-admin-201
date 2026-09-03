# M05-02 — Workflow de aprobación

[← Página anterior](M05-01-workflow-incidencias.md) · [Siguiente página →](M05-preparacion-examen.md)

### Objetivo

Un flujo de solicitud con revisión y dos salidas (aprobado / rechazado) publicado y asociado a un tipo en PMO u OPS.

### Prerrequisitos

- M05-01 hecho (sabes publicar). Proyecto PMO o OPS CMP.

### En qué consiste

Nuevo workflow `NORTECH Aprobación` + issue type `Solicitud` (o Task) mapeado solo en PMO.

### 1 — Issue type Solicitud

**Acción:** **Elementos de trabajo** → **Tipos** → añadir `Solicitud` (tipo Task/estándar). Añádelo al esquema de tipos de PMO (copia el esquema a `NORTECH PMO Types` si PMO aún usa el predeterminado, para no contaminar DEV).

**Por qué:** El flujo de aprobación no debe comerse los Bug de DEV.

**Resultado esperado:** PMO puede crear `Solicitud`.

### 2 — Diagrama

**Acción:** **Flujos de trabajo** → añadir `NORTECH Aprobación`. Estados: `Open` → `In Review` → `Approved` → `Closed`, y `In Review` → `Rejected` → `Closed`. Transiciones: `Submit`, `Approve`, `Reject`, `Close`.

**Por qué:** Dos salidas desde revisión: es el patrón de la propuesta formativa.

**Resultado esperado:** Diagrama con bifurcación.

### 3 — Quién aprueba

**Acción:** Transición `Approve` → condición: el usuario está en el rol **Administrators**. `Reject` igual. Publica.

**Por qué:** El solicitante (Users) no se autoaprueba.

**Resultado esperado:** Conditions en ambas transiciones.

### 4 — Validador

**Acción:** En `Approve`, Validators → Field required: un campo que ya exista (p. ej. **Comment** si está disponible, o **Fix Version** no: mejor **Description** ya relleno; usa **Attachment required** solo si tiene sentido). Alternativa sólida: validador **Permission** (Modify Reporter no). Lo habitual: **Field Required Validator** en un custom field que crearás en M06; hoy usa **Comment Required** si aparece, si no, **Validators → Field has been changed** no. **Práctico hoy:** Validators → *Field Required* → **Assignee**.

**Por qué:** Un validador demuestra la diferencia con la condición: el botón se ve, pero falla si falta el dato.

**Resultado esperado:** Approve exige Assignee (o comentario).

### 5 — Scheme y prueba

**Acción:** El esquema de flujo de PMO: `Solicitud` → `NORTECH Aprobación`. Publica. Crea una Solicitud, Submit, intenta Approve sin asignatario (debe fallar), asigna, Approve, Close.

**Por qué:** Cierre del proceso de la propuesta.

**Resultado esperado:** Issue en Closed con resolución.

## Comprueba tu entendimiento

**Bifurcación**
Desde In Review ves Approve y Reject.
→ Dos transiciones, no un campo «sí/no» mágico.

## Reto

### 1 — Post function de resolución

En Reject, post function: Resolution = `Won't Do` (o equivalente). En Approve, `Done`.

<details>
<summary>Ver solución</summary>

Cada transición a Closed/Approved puede setear Resolution distinta. Así los reports distinguen aprobado vs rechazado.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Solicitud usa el workflow de Bug | Scheme no mapeó el tipo | Workflow scheme → Assign |
| Approve no aparece | Condición de rol | Métete en Administrators de PMO |
| Validador no dispara | Draft sin publicar | Publish |
