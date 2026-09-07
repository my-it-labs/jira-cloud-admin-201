# Simulador ACP-620

Cada JSON de módulo (`public/data/bancos/`) tiene **50 ítems**. Modos:

| Modo | Qué sortea | Tiempo |
|------|------------|--------|
| Examen cronometrado | **70** preguntas (pesos de dominios ACP-620) | 180 min |
| Práctica rápida | 15 del banco completo | proporcional |
| Por módulo | **5 de 50** de **ese** módulo (solo su temario) | proporcional |

No es el examen oficial ni un dump. Las preguntas son originales del curso. Cada JSON cubre **solo el laboratorio de ese módulo**; el cronometrado mezcla M01–M10.

El progreso de cada alumno se guarda en **localStorage de su navegador** (pregunta actual, respuestas, marcas, temporizador y último resultado). No hay servidor ni cuenta: otro dispositivo o un borrado de datos del sitio lo pierde. En la app hay **Borrar progreso** para dejarlo a cero.

## Local

```bash
cd simulador
npm install
npm run dev
```

Build estático:

```bash
npm run build
npm run preview
```

## Añadir preguntas

1. Crea o edita un fichero en `public/data/bancos/` (un JSON por módulo o tema).
2. Si es un banco nuevo, apúntalo en `public/data/index.json`.
3. Cada pregunta:

```json
{
  "id": "m07-q12",
  "dominio": "board-configuration",
  "tipo": "single",
  "stem": "Enunciado…",
  "opciones": [
    { "id": "A", "texto": "…" },
    { "id": "B", "texto": "…" },
    { "id": "C", "texto": "…" },
    { "id": "D", "texto": "…" }
  ],
  "correctas": ["B"],
  "explicacion": "Por qué."
}
```

- `tipo`: `single` (una correcta) o `multi` (varias en `correctas`).
- `dominio`: `project-creation` | `board-configuration` | `managing-projects` | `automation` | `reporting`.
- No hace falta rebuild de datos: el build copia `public/` tal cual. Tras el push, GitHub Actions publica Pages.

## Despliegue

GitHub Actions (`.github/workflows/pages.yml`) construye `simulador/` y publica GitHub Pages. La URL del project site es:

`https://my-it-labs.github.io/jira-cloud-admin-201/`
