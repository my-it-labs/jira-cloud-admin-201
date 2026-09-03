# M06 — Campos, pantallas y formularios

[← Página anterior](../M05-workflows-empresariales/M05-autoescuela.md) · [Siguiente página →](M06-01-formularios-departamento.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada** del
> formador, y después **practicas tú** en el/los laboratorio(s).

## Qué aprenderás

- Crear **custom fields** y **contextos**.
- Montar **pantallas** de create/edit/view.
- Hacer campos obligatorios u ocultos con **field configuration**.
- Formar formularios distintos por departamento sin duplicar Jira.

## Teoría

Tres capas (el «no me aparece el campo» vive aquí):

| Capa | Pregunta |
|------|----------|
| **Custom field + contexto** | ¿Existe el campo en este proyecto / tipo? |
| **Pantalla** | ¿Se muestra al crear / editar / ver? |
| **Field configuration** | ¿Es required, hidden, wiki renderer? |

> [!NOTE]
> En **team-managed** todo esto es la issue layout del proyecto. En **company-managed** son objetos globales. ACP-620 pregunta las dos.

Nortech: RRHH y Calidad necesitan datos que Desarrollo no debe ver en el Create de DEV.

## Demostración guiada

1. En **Campos personalizados** se crea `Departamento` (lista). El contexto se limita a PMO y SUP.

2. La pantalla de Create de SUP muestra ese campo; la de DEV no.

![Create](../img/M06-01-03-create-issue-hr.png)

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M06-01 | [Formularios por departamento](M06-01-formularios-departamento.md) | Campos y pantallas RRHH / Ops / Dev / Calidad |
| M06-02 | [Gestión avanzada de campos](M06-02-campos-avanzados.md) | Contextos, required, hidden |
| — | [Autoescuela M06](M06-autoescuela.md) | Diagnóstico «no aparece el campo» |

→ Empieza por **[M06-01](M06-01-formularios-departamento.md)**.
