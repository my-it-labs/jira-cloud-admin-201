# Simulador ACP-620

App React (Vite) de autoevaluación. Carga preguntas desde JSON en `public/data/` y genera **cada intento distinto**: sortea ítems por dominio, baraja el orden y reetiqueta las opciones.

No es el examen oficial ni un dump. Las preguntas son originales del curso.

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
