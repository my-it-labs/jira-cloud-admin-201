# M06-01 — Formularios por departamento

[← Página anterior](README.md) · [Siguiente página →](M06-02-campos-avanzados.md)

### Objetivo

Cuatro formularios distintos (DEV, SUP, OPS, PMO) **sin tocar el Default**. Cada espacio apunta a su paquete `NORTECH`.

### Prerrequisitos

- Proyectos CMP. Jira admin.

### En qué consiste

Campos nuevos → **copiar** 4 pantallas → **crear 4 esquemas de pantallas** → **crear 4 esquemas de pantallas por tipo** → asociar cada uno a su espacio.

> [!WARNING]
> No añadas campos a *Default Screen* ni edites *Default Screen Scheme*. Eso cambia **todos** los espacios que aún apuntan al predeterminado. El Create de DEV y el de SUP se volverían iguales.

Inventario (cuatro de cada; nombres exactos):

| Espacio | Pantalla (copia) | Esquema de pantallas | Esquema de pantallas por tipo → asócialo al espacio |
|---------|------------------|----------------------|-----------------------------------------------------|
| DEV | `NORTECH DEV Create/Edit` | `NORTECH DEV Screens` | `NORTECH DEV Issue Type Screens` |
| SUP | `NORTECH SUP Create/Edit` | `NORTECH SUP Screens` | `NORTECH SUP Issue Type Screens` |
| OPS | `NORTECH OPS Create/Edit` | `NORTECH OPS Screens` | `NORTECH OPS Issue Type Screens` |
| PMO | `NORTECH PMO Create/Edit` | `NORTECH PMO Screens` | `NORTECH PMO Issue Type Screens` |

El espacio **no** se engancha a una pantalla. Se engancha al **esquema de pantallas por tipo**.

### 1 — Custom fields

**Acción:** **Elementos de trabajo** → **Campos personalizados** → crear.

| Campo | Tipo | Uso |
|-------|------|-----|
| `Departamento` | Select list (single) | RRHH / PMO. Opciones: RRHH, Finanzas, Legal |
| `Cambio estándar` | Checkbox / Select Sí-No | OPS |
| `Story points` | (si no existe) Number | DEV — o usa el campo nativo |
| `Severidad QA` | Select: Bloqueante, Mayor, Menor | Calidad / SUP |

**Por qué:** Cada departamento tiene *una* pregunta extra, no un proyecto distinto.

**Resultado esperado:** Los campos existen en la lista.

![Campos personalizados](../img/M06-01-01-custom-fields.png)

### 2 — Cuatro pantallas (copia, no Default)

**Acción:** **Elementos de trabajo** → **Pantallas**. En la que usa DEV: **Copiar** (no Editar). Repite hasta tener las cuatro del inventario. En cada copia, añade solo los campos de su departamento:

| Pantalla | Campos extra |
|----------|----------------|
| DEV | `Story points` (si no es nativo) |
| SUP | `Severidad QA` |
| OPS | `Cambio estándar` |
| PMO | `Departamento` |

No pongas `Severidad QA` ni `Departamento` en la de DEV.

**Por qué:** La pantalla es el formulario. Cuatro copias = cuatro formularios.

**Resultado esperado:** En la lista ves las cuatro `NORTECH …`. El Default **sigue igual**.

![Pantallas](../img/M06-01-02-screens.png)

### 3 — Cuatro esquemas de pantallas

El paso 2 era el menú **Screens** / **Pantallas** (el formulario). Este paso es el de **abajo**: **Screen schemes** / **Esquemas de pantallas**. Si sigues en Pantallas y pulsas Editar, estás otra vez en Default.

**Acción:**

1. Engranaje de Jira → **Work items** / **Elementos de trabajo**. Barra izquierda, bloque **Screens**: entra en **Screen schemes** (no en *Screens*, no en *Work type screen schemes*).
2. Arriba a la derecha: **Add screen scheme** / **Añadir esquema de pantalla**. **No** abras los `…` del *Default Screen Scheme*.
3. **Name:** `NORTECH DEV Screens`. **Default Screen:** elige `NORTECH DEV Create/Edit` (la copia del paso 2). Nunca *Default Screen*. **Add**.
4. Repite tres veces: `NORTECH SUP Screens` → pantalla SUP, OPS → OPS, PMO → PMO.

Hoy Create, Edit y View pueden ir todos a esa misma pantalla (el *Default Screen* del scheme cubre las operaciones sin mapear). Si quieres ver el mapeo: `…` de **tu** esquema `NORTECH DEV Screens` → **Configure**. Si el título dice *Default Screen Scheme*, saliste al sitio equivocado.

**Por qué:** El screen scheme no es el formulario: dice *qué* pantalla sale al crear / editar / ver. Aún **no** está pegado al espacio (eso es el paso 4).

**Resultado esperado:** En la lista hay cuatro `NORTECH * Screens`. El *Default Screen Scheme* no lista tus campos nuevos.

![Lista: Screen schemes, no Screens](../img/M06-01-04-screen-schemes.png)

![Add screen scheme: Name + Default Screen = tu copia NORTECH](../img/M06-01-05-add-screen-scheme.png)

![Configure: operaciones → pantalla. Hazlo en NORTECH DEV Screens, no en este Default](../img/M06-01-06-configure-screen-scheme.png)

### 4 — Cuatro esquemas por tipo y asociar

Sin este paso, Create sigue usando el Default aunque hayas hecho el 3.

**Acción:**

1. Misma barra, el tercer enlace: **Work type screen schemes** / **Esquemas de pantalla de tipo de actividad** (a veces *Issue type screen schemes*).
2. **Add work type screen scheme**. **Name:** `NORTECH DEV Issue Type Screens`. **Default Screen Scheme:** `NORTECH DEV Screens` (el del paso 3, no el Default). **Add**.
3. Igual para SUP, OPS y PMO (cada ITSS apunta a **su** screen scheme).
4. En la fila de `NORTECH DEV Issue Type Screens` → `…` → **Associate** / asociar espacios → **Nortech Development**. Repite: SUP, OPS, PMO cada uno a su ITSS. Comprueba que DEV ya no usa `DEV: Scrum Issue Type Screen Scheme` ni el Default.

**Por qué:** El espacio solo entiende este último paquete. Por eso meter el campo en Default «funcionaba»: el espacio aún apuntaba ahí.

**Resultado esperado:** En la columna **Spaces** cada `NORTECH … Issue Type Screens` tiene **un** espacio. Create en SUP muestra `Severidad QA`. Create en DEV **no**. Create en PMO muestra `Departamento`.

![Work type screen schemes: aquí se asocia el espacio](../img/M06-01-07-issue-type-screen-schemes.png)

![Add ITSS: Name + Default Screen Scheme = tu NORTECH … Screens](../img/M06-01-08-add-itss.png)

![Crear en SUP](../img/M06-01-03-create-issue-hr.png)

## Comprueba tu entendimiento

**Create en DEV vs SUP**
Abre Create en ambos.
→ Campos distintos. Si son iguales, o editaste Default, o los cuatro espacios siguen en el mismo issue type screen scheme.

## Reto

### 1 — View screen

Deja `Severidad QA` en View de SUP pero **no** en Create, y créalo solo en Edit. ¿Cuándo lo rellena el agente?

<details>
<summary>Ver solución</summary>

Tras crear la issue, en Edit. Útil para datos que no debe pedir al reporter externo.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Campo no sale | Contexto, pantalla o field config hidden | M06-02 checklist |
| Campo duplicado | Lo creaste dos veces | Busca por nombre exacto; no clones |
| DEV y SUP muestran los mismos campos | Editaste **Default** o no asociaste los 4 ITSS | Quita el campo del Default; asocia cada espacio a `NORTECH … Issue Type Screens` |
| Solo creaste pantallas | El espacio no apunta a una pantalla | Faltan **4 screen schemes** y **4 issue type screen schemes** (pasos 3 y 4) |
| Editaste *Default Screen Scheme* | Estabas en Configure del Default | Crea `NORTECH DEV Screens` con **Add screen scheme**; Default Screen = tu copia |
