# claude-workspace

Выделенный рабочий репозиторий для задач, которые Anastasiya (AnnShchuga) делает вместе с Claude.

Ранее рабочие файлы попадали в `AnnShchuga/AnnShchuga` — специальный репозиторий, README которого показывается на странице профиля GitHub. Это неправильное место для рабочих материалов, поэтому все такие файлы перенесены сюда, а профильный репозиторий очищен.

## Структура

- `projects/` — отдельные проекты/задачи, каждый в своей папке. Если проект вырастает настолько, что ему нужна отдельная история коммитов, свой CI или независимый релизный цикл — для него можно завести отдельный git-репозиторий (суб-репозиторий) внутри `AnnShchuga`, а здесь оставить ссылку.
- `archive/` — старые черновики и материалы, которые не относятся к текущим проектам, но жалко удалять.
- `.claude/skills/`, `.agents/skills/`, `agent/skills/`, `skills-lock.json` — установленные Claude Code скиллы (marketing, remotion, ui-ux-pro-max, resume-коучинг, deep-research и др.), перенесённые из накопившихся веток в `AnnShchuga/AnnShchuga`. `.claude/skills/*` — симлинки на `.agents/skills/*`.
- `.claude/settings.json` — подключает маркетплейсы [`alirezarezvani/claude-skills`](https://github.com/alirezarezvani/claude-skills) (88 плагинов), [`Owl-Listener/designer-skills`](https://github.com/Owl-Listener/designer-skills) (9 design-плагинов) и [`bencium/bencium-claude-code-design-skill`](https://github.com/bencium/bencium-claude-code-design-skill) (2 UX-designer плагина), и включает плагины `telegram`, `apple-hig-expert` и др.

## Текущие проекты

- [`projects/business-requirement-diagram`](projects/business-requirement-diagram) — BPMN-диаграмма бизнес-требований (draw.io).
- [`projects/telegram-bot-mcp`](projects/telegram-bot-mcp) — прототип MCP-сервера для Telegram Bot API.
- [`projects/agency-agents-zh`](projects/agency-agents-zh) — копия стороннего репозитория [jnMetaCode/agency-agents-zh](https://github.com/jnMetaCode/agency-agents-zh) (агентские роли/промпты).

## Скиллы

Перенесены из веток `install-taste-remotion-skills`, `install-skills`, `install-frontend-design-skill`, `install-claude-skills` (маркетплейс) и `telegram-plugin-install` репозитория `AnnShchuga/AnnShchuga`. Более ранние частичные PR (`ui-ux-pro-max`-only, `stop-slop`-only, `marketing-skills`-only и т.п.) не переносились — их содержимое целиком входит в перенесённый набор.

Примечание: `agent/skills/` и `.agents/skills/` частично дублируют друг друга по содержимому (два разных механизма вендоринга одних и тех же marketing-скиллов из исходной ветки) — оставлено как было, без дедупликации.

### UI/UX-дизайн скиллы (подключены из подборки "18 лучших скиллов Claude Code для UI/UX дизайна")

Провендорены в `.agents/skills/` + `.claude/skills/` (симлинки) + `skills-lock.json`, каждый прошёл ручную проверку на prompt injection и небезопасные side-эффекты (исходящие сетевые вызовы, скрытые инструкции, телеметрию) перед подключением:

| Скилл | Источник |
|-------|----------|
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — только `SKILL.md` + `reference/`. Директория `scripts/` (Live Mode) сознательно исключена: по умолчанию обращается к `impeccable.style` (проверка обновлений + телеметрия) и ставит Claude Code hooks, перехватывающие правки файлов — вне периметра "просто скилл". |
| `hallmark` | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) — у скилла есть встроенная защита от prompt injection через `design.md` (см. SKILL.md, раздел "design.md safety"). |
| `scroll-world` | [oso95/scroll-world](https://github.com/oso95/scroll-world) |
| `interface-design` | [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) |
| `emil-design-eng` | [emilkowalski/skills](https://github.com/emilkowalski/skills) — "Emil Kowalski Design" |
| `frontend-design-pro` | [claudekit/frontend-design-pro-demo](https://github.com/claudekit/frontend-design-pro-demo) — "Frontend Design Pro Demo" |
| `ui-refactor` | [LovroPodobnik/refactoring-ui-skill](https://github.com/LovroPodobnik/refactoring-ui-skill) — "Refactoring UI" |
| `ux-heuristics` | [wondelai/skills](https://github.com/wondelai/skills) (`ux-heuristics/`) |
| `hooked-ux` | [wondelai/skills](https://github.com/wondelai/skills) (`hooked-ux/`) — применяет Hook Model Нира Эяля |
| `app-store-screenshots` | [adamlyttleapps/claude-skill-aso-appstore-screenshots](https://github.com/adamlyttleapps/claude-skill-aso-appstore-screenshots) |
| `figma-to-react` | [Properly-DEV/figma-to-code-skills](https://github.com/Properly-DEV/figma-to-code-skills) (`ds-figma-to-react-tw/`) — "Figma to Code" |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (`skills/web-design-guidelines/`) — "Vercel Agent Skills" |
| `design-taste-frontend` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — "Taste Skill", уже был подключён ранее |

Плюс через маркетплейсы в `.claude/settings.json`: `Owl-Listener/designer-skills` (241 скилл design-практики: research, systems, UI, interaction, ops, critique) и `bencium/bencium-claude-code-design-skill` → `bencium-innovative-ux-designer` / `bencium-controlled-ux-designer` ("Bencium UX Designer").

**Уже было в подборке, но не добавлено отдельно** — совпадает с уже подключёнными скиллами: `frontend-design` (платформенный, = "Anthropic Frontend Design"), `ui-ux-pro-max` (уже вендорился), `theme-factory`, `brand-guidelines`, `canvas-design`, `skill-creator` (платформенные), `apple-hig-expert` (плагин, = "iOS HIG Design").

**Сознательно не подключено — GStack** ([garrytan/gstack](https://github.com/garrytan/gstack)): это не портативный скилл, а целый CLI-фреймворк (23 инструмента) с собственными bin-скриптами, состоянием в `~/.gstack` и телеметрией, которая по умолчанию синхронизируется с Supabase-бэкендом проекта. Не было безопасного способа "выдернуть" из него один design-скилл без остальной инфраструктуры — при необходимости ставится отдельно через собственный установщик автора.

## Архив

- [`archive/profile-readme-draft.md`](archive/profile-readme-draft.md) — черновик README профиля (дубликат текста, который сейчас используется в `AnnShchuga/AnnShchuga`).
