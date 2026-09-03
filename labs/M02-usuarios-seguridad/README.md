# M02 — Usuarios y seguridad

[← Página anterior](../M01-entorno-arquitectura/M01-autoescuela.md) · [Siguiente página →](M02-01-grupos-departamentos.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Invitar usuarios y darles **acceso a la aplicación** Jira.
- Modelar departamentos con **grupos** de organización.
- Distinguir grupo, rol de espacio y esquema de permisos.
- Dejar un modelo mínimo de acceso para Nortech.

## Teoría

Tres palancas que la gente mezcla:

| Palanca | Dónde | Pregunta que responde |
|---------|-------|------------------------|
| **Acceso a la aplicación** | `admin.atlassian.com` → **Aplicaciones** | ¿Puede abrir Jira? |
| **Grupo** | **Directorio** → **Grupos** | ¿A qué departamento pertenece? |
| **Rol de espacio** | Configuración del espacio → **Personas** | ¿Qué papel tiene *en este* espacio? |
| **Esquema de permisos** | Esquema global asociado al espacio | ¿Qué acciones puede hacer ese rol? |

> [!NOTE]
> El grupo no da permisos de trabajo por sí solo. El esquema de permisos dice: «el rol Developers puede transicionar». Tú metes el grupo `nortech-dev` en el rol Developers.

### Delegación

- **Administrador de organización**: puede nombrar otros admins de org (con cuidado).
- **Trusted / user access admin** (si el plan lo ofrece): invita usuarios sin ser org admin total.
- **Administrador de espacio**: gestiona Personas y mucha config del espacio CMP; no invita a la org.

### Auditoría básica

Premium/Standard muestran más eventos que Free. En M10 se usa el registro de auditoría para incidentes. Hoy basta con saber **dónde** está (Administration → **Seguridad**, y Jira → **Sistema** → **Registro de auditoría**).

## Demostración guiada

> Recorrido del formador en vivo.

1. En **Directorio** → **Usuarios** se invita a un colaborador. El diálogo pide correo y aplicaciones (Jira).

![Invitar](../img/M02-01-02-invite-user.png)

2. En **Directorio** → **Grupos** se crea `nortech-dev` y se añade el usuario.

![Grupos](../img/M02-01-03-groups-list.png)

3. En **Configuración de acceso a la aplicación** se comprueba que solo los grupos previstos tienen Jira.

![Product access](../img/M02-02-01-product-access.png)

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M02-01 | [Grupos corporativos](M02-01-grupos-departamentos.md) | Invitar y crear grupos Nortech |
| M02-02 | [Modelo de seguridad](M02-02-modelo-seguridad.md) | Acceso a la aplicación y validar quién entra |
| — | [Autoescuela M02](M02-autoescuela.md) | Permisos y roles tipo ACP-620 |

→ Empieza por **[M02-01 — Grupos corporativos](M02-01-grupos-departamentos.md)**.
