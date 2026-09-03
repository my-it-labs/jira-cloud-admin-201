# Infraestructura del laboratorio

Este curso no usa máquinas virtuales ni Docker. El laboratorio es un **site de Jira Cloud** que creas tú en el primer laboratorio.

## Qué vas a usar

| Recurso | Plan | Notas |
|---------|------|--------|
| Jira Cloud | **Premium trial** (30 días, sin tarjeta) | Alta en [M01-01](../labs/M01-entorno-arquitectura/M01-01-crear-trial.md) |
| Atlassian Administration | Incluido | `https://admin.atlassian.com` |
| Confluence Cloud | Trial opcional | Se activa en M10 si aún no lo tienes |

## URL que debes guardar

Tras el alta, tu site queda en:

```text
https://<tu-site>.atlassian.net
```

Sustituye `<tu-site>` por el nombre que hayas elegido (por ejemplo `nortech-ana`). Esa URL es tu laboratorio para todos los módulos.

## Si el trial Premium no está disponible

1. **Standard trial** (14 días): cubre casi todo el curso.
2. **Free** (hasta 10 usuarios): cubre lo fundamental; recorta automation, algunas funciones de gobierno y el número de usuarios.

## Datos que no van a git

No subas a ningún repositorio: contraseñas, tokens de API, capturas de facturación con datos reales de tu empresa, ni invitaciones con tokens.

## Opción empresa (solo si el formador lo indica)

Si vuestra organización ya tiene Jira Cloud y destina un **proyecto de formación**, puedes usar ese proyecto en lugar del trial. Lo verás el día 1; el resto de labs se adapta a las claves de proyecto que os den.
