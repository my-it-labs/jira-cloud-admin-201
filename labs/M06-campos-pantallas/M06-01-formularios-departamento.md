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

**Acción:** **Elementos de trabajo** → **Esquemas de pantallas** (*Screen schemes*). **Añadir** (o copiar el predeterminado y renombrar). Crea **cuatro**: `NORTECH DEV Screens`, `NORTECH SUP Screens`, `NORTECH OPS Screens`, `NORTECH PMO Screens`. En cada uno: Create, Edit y View apuntan a **su** pantalla del paso 2 (las tres operaciones pueden usar la misma pantalla hoy).

**Por qué:** El scheme dice qué pantalla sale al crear / editar / ver. Aún no está ligado al espacio.

**Resultado esperado:** Cuatro esquemas `NORTECH * Screens` en la lista. El Default no tiene tus campos nuevos.

### 4 — Cuatro esquemas por tipo y asociar

**Acción:** **Esquemas de pantallas de tipos de elemento** (*Issue type screen schemes*). Crea **cuatro** (`NORTECH DEV Issue Type Screens`, …). En cada uno, el esquema de pantallas por defecto es el del paso 3 de ese espacio. Luego **asocia**:

- desde la lista del esquema → el espacio, o
- el espacio → **Configuración** → **Pantallas** / **Esquemas** → usar ese *issue type screen scheme*.

DEV → su ITSS, SUP → el suyo, OPS y PMO igual. **No** dejes los cuatro en el Default.

**Por qué:** El espacio solo entiende este último paquete. Sin asociar, Create sigue usando Default y parecería que «hay que meter el campo ahí».

**Resultado esperado:** Create en SUP muestra `Severidad QA`. Create en DEV **no**. Create en PMO muestra `Departamento`.

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
