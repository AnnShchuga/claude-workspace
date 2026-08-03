# Claude Code Skills

Project skills for Claude Code, installed from public open-source skill repositories.

| Skill | Source |
|-------|--------|
| `remotion` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) — `remotion-best-practices` |
| `elevenlabs-remotion-skill` | [Maartenlouis/elevenlabs-remotion-skill](https://github.com/Maartenlouis/elevenlabs-remotion-skill) |
| `competitive-ads-extractor` | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) |
| `deep-research` | [sanjay3290/ai-skills](https://github.com/sanjay3290/ai-skills) |
| `voice-dna-creator` | [az9713/ai-co-writing-claude-skills](https://github.com/az9713/ai-co-writing-claude-skills) |
| `content-research-writer` | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) |
| `resume-diagnoser` | [hohowin/misc-skills](https://github.com/hohowin/misc-skills) |
| `resume-recruiter` | [hohowin/misc-skills](https://github.com/hohowin/misc-skills) |
| `resume-rewriter` | [hohowin/misc-skills](https://github.com/hohowin/misc-skills) |
| `resume-hiring-manager` | [hohowin/misc-skills](https://github.com/hohowin/misc-skills) |

The four `resume-*` skills didn't ship with YAML frontmatter upstream; it was added here so Claude Code can discover them.

Some skills need extra setup before use:
- `elevenlabs-remotion-skill` — requires `ELEVENLABS_API_KEY` in `.env.local` and Node.js.
- `deep-research` — requires `GEMINI_API_KEY` and `pip install -r .claude/skills/deep-research/requirements.txt`.
