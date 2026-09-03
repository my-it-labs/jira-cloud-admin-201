# M08-01 — JQL y filtros

[← Página anterior](README.md) · [Siguiente página →](M08-02-dashboards-gadgets.md)

### Objetivo

Tres filtros nombrados `NORTECH *`, uno de ellos compartido con el proyecto.

### Prerrequisitos

- Issues en DEV y SUP. Sprint en DEV (M07) ayuda.

### En qué consiste

Búsqueda avanzada de trabajo → JQL → Guardar como → detalles (quién puede ver).

### 1 — Search JQL

**Acción:** **Filtros** → **Búsqueda avanzada** → cambia a **JQL**. Ejecuta:

```jql
project = DEV AND statusCategory != Done ORDER BY priority DESC, updated DESC
```

**Por qué:** `statusCategory` sobrevive a cambios de nombre de estado.

**Resultado esperado:** Lista de abiertas de DEV.

![JQL](../img/M08-01-01-search-jql.png)

### 2 — Más consultas

**Acción:** Prueba, una a una:

```jql
assignee = currentUser() AND updated >= -7d
```

```jql
project = SUP AND issuetype = Bug AND component is EMPTY
```

```jql
project = DEV AND sprint in openSprints()
```

**Por qué:** Son patrones de examen y de PMO.

**Resultado esperado:** Cada una devuelve un conjunto coherente (puede ser vacío: entonces crea datos).

### 3 — Guardar y compartir

**Acción:** Guarda la primera como `NORTECH DEV Abiertas`. Detalles → **Añadir visualizadores** → espacio DEV (o grupo `nortech-pmo`). Guarda también `NORTECH Mis actualizadas` (personal, sin compartir) con la de `currentUser()`.

**Por qué:** El dashboard de M08-02 usará la compartida.

**Resultado esperado:** Filtro visible en ver todos los filtros.

![Filtro](../img/M08-01-02-saved-filter.png)

## Comprueba tu entendimiento

**Viewers**
Abre el filtro con el usuario invitado (si tiene Browse en DEV).
→ Ve resultados. Si el filtro es privado, no.

## Reto

### 1 — WAS

```jql
status WAS "In Progress" AND status = Done AND resolved >= -14d
```

¿Qué preguntas de negocio responde?

<details>
<summary>Ver solución</summary>

Issues que pasaron por In Progress y ahora están Done, resueltas en 14 días. Útil para flujo; exige historial (funciona en Cloud).

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Error de JQL | Campo o nombre con espacio sin comillas | `"In Progress"` |
| Filtro no sale al invitado | Viewers = only me | Add viewers |
| `sprint in openSprints()` vacío | No hay sprint activo | M07-01 |
