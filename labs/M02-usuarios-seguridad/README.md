# M02 — Usuarios y seguridad

[← Página anterior](../M01-entorno-arquitectura/M01-preparacion-examen.md) · [Siguiente página →](M02-01-grupos-departamentos.md)

## Qué aprenderás

- Invitar usuarios y darles **acceso a la aplicación** Jira.
- Modelar departamentos con **grupos** de organización.
- Distinguir grupo, rol de espacio y esquema de permisos.
- Dejar un modelo mínimo de acceso para Nortech.

## Explicación

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

## Demostración

1. En `admin.atlassian.com` abre **Directorio** → **Usuarios**. Pulsa **Invitar a usuarios**: el diálogo pide correo y aplicaciones (Jira). No hace falta enviar ahora si vas a repetirlo en el laboratorio.

![Invitar personas](../img/M02-01-02-invite-user.png)

2. Abre **Directorio** → **Grupos**. Crea `nortech-dev` y añade tu usuario.

![Grupos Nortech](../img/M02-01-03-groups-list.png)

3. Abre **Aplicaciones** → **Aplicaciones de Atlassian**. Ahí está Jira (Premium) y el resto de apps del site. El acceso fino se ajusta en **Configuración de acceso a la aplicación**.

![Aplicaciones de Atlassian](../img/M02-02-01-product-access.png)

## Laboratorio

Te toca a ti.

| Lab | Título |
|-----|--------|
| M02-01 | [Grupos corporativos](M02-01-grupos-departamentos.md) |
| M02-02 | [Modelo de seguridad](M02-02-modelo-seguridad.md) |
| — | [Preparación para el examen ACP-620](M02-preparacion-examen.md) |

→ **[M02-01 — Grupos corporativos](M02-01-grupos-departamentos.md)**
