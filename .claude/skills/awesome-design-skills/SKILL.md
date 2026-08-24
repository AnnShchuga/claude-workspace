---
name: awesome-design-skills
description: Local registry of 67 themed visual-design systems (Brutalism, Glassmorphism, Minimal, Neumorphism, Material, Shadcn, Retro, Neon, Editorial, Corporate, and more), each with a SKILL.md of AI-agent rules (tokens, component rules, accessibility, quality gates) and a DESIGN.md of human-readable rationale. Use when the user names one of these styles for a UI/site, asks to browse design-system options, or wants a specific aesthetic direction applied consistently.
---

# Awesome Design Skills (registry)

Source: [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills), mirrored locally in full (reviewed, no prompt injection found). Upstream distributes each style via `npx typeui.sh pull <slug>`; here all 67 are already present under `skills/` so no network pull is needed.

## How to use this

1. Match the user's request to a style slug below (or ask which one fits if ambiguous).
2. Read `skills/<slug>/SKILL.md` for the concrete rules to apply (tokens, component patterns, accessibility constraints, quality gates).
3. Read `skills/<slug>/DESIGN.md` for the rationale/intent behind those rules, if useful context for the user.
4. Apply the rules directly when building or reviewing the UI — these are design-system specs, not general advice.

Full index (name → slug directory under `skills/`): `skills/index.json`.

## Available styles

Agentic, Ant, Artistic, Basic, Bento, Bold, Brutalism, Cafe, Claude, Claymorphism, Clean, Codex, Colorful, Contemporary, Corporate, Cosmic, Creative, Dithered, Doodle, Dramatic, Editorial, Enterprise, Expressive, Fantasy, Fiction, Flat, Friendly, Futuristic, Geometric, Glassmorphism, Gradient, Immersive, Impeccable, Levels, Lingo, Material, Matrix, Minimal, Modern, Mono, Neobrutalism, Neon, Neumorphism, Pacman, Paper, Perspective, Power, Premium, Professional, Pulse, Refined, Retro, Riso, Roku, Sega, Shadcn, Sketch, Skeumorphism, Sleek, Spacious, Square, Stitch, Storytelling, Terracotta, Tetris, Vibrant, Vintage

Each slug is lowercase and matches its directory name under `skills/` (e.g. "Brutalism" → `skills/brutalism/`).

See `UPSTREAM-README.md` for the original repo's full README (style previews, links to typeui.sh).
