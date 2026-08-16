# claude-workspace

Выделенный рабочий репозиторий для задач, которые Anastasiya (AnnShchuga) делает вместе с Claude.

Ранее рабочие файлы попадали в `AnnShchuga/AnnShchuga` — специальный репозиторий, README которого показывается на странице профиля GitHub. Это неправильное место для рабочих материалов, поэтому все такие файлы перенесены сюда, а профильный репозиторий очищен.

## Структура

- `projects/` — отдельные проекты/задачи, каждый в своей папке. Если проект вырастает настолько, что ему нужна отдельная история коммитов, свой CI или независимый релизный цикл — для него можно завести отдельный git-репозиторий (суб-репозиторий) внутри `AnnShchuga`, а здесь оставить ссылку.
- `archive/` — старые черновики и материалы, которые не относятся к текущим проектам, но жалко удалять.
- `.claude/skills/`, `.agents/skills/`, `agent/skills/`, `skills-lock.json` — установленные Claude Code скиллы (marketing, remotion, ui-ux-pro-max, resume-коучинг, deep-research и др.), перенесённые из накопившихся веток в `AnnShchuga/AnnShchuga`. `.claude/skills/*` — симлинки на `.agents/skills/*`.
- `.claude/settings.json` — подключает маркетплейсы [`alirezarezvani/claude-skills`](https://github.com/alirezarezvani/claude-skills) (88 плагинов) и [`multica-ai/andrej-karpathy-skills`](https://github.com/multica-ai/andrej-karpathy-skills), и включает плагины `telegram` и `andrej-karpathy-skills` (поведенческие гайдлайны для кода на основе наблюдений Andrej Karpathy: думать перед кодингом, простота, точечные правки, цели с критериями проверки).

## Текущие проекты

- [`projects/business-requirement-diagram`](projects/business-requirement-diagram) — BPMN-диаграмма бизнес-требований (draw.io).
- [`projects/telegram-bot-mcp`](projects/telegram-bot-mcp) — прототип MCP-сервера для Telegram Bot API.
- [`projects/agency-agents-zh`](projects/agency-agents-zh) — копия стороннего репозитория [jnMetaCode/agency-agents-zh](https://github.com/jnMetaCode/agency-agents-zh) (агентские роли/промпты).

## Скиллы

Перенесены из веток `install-taste-remotion-skills`, `install-skills`, `install-frontend-design-skill`, `install-claude-skills` (маркетплейс) и `telegram-plugin-install` репозитория `AnnShchuga/AnnShchuga`. Более ранние частичные PR (`ui-ux-pro-max`-only, `stop-slop`-only, `marketing-skills`-only и т.п.) не переносились — их содержимое целиком входит в перенесённый набор.

Примечание: `agent/skills/` и `.agents/skills/` частично дублируют друг друга по содержимому (два разных механизма вендоринга одних и тех же marketing-скиллов из исходной ветки) — оставлено как было, без дедупликации.

## Архив

- [`archive/profile-readme-draft.md`](archive/profile-readme-draft.md) — черновик README профиля (дубликат текста, который сейчас используется в `AnnShchuga/AnnShchuga`).
