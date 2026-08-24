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

| `apple-design` | [emilkowalski/skills](https://github.com/emilkowalski/skills) — `skills/apple-design` |
| `banana` | [AgriciDaniel/banana-claude](https://github.com/AgriciDaniel/banana-claude) — `skills/banana` |
| `awesome-design-skills` | [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) — full 67-style registry, mirrored locally |

The four `resume-*` skills didn't ship with YAML frontmatter upstream; it was added here so Claude Code can discover them.

Some skills need extra setup before use:
- `elevenlabs-remotion-skill` — requires `ELEVENLABS_API_KEY` in `.env.local` and Node.js.
- `deep-research` — requires `GEMINI_API_KEY` and `pip install -r .claude/skills/deep-research/requirements.txt`.
- `banana` — requires the `@ycse/nanobanana-mcp` MCP server and a Google AI API key (run `/banana setup`).

Note: `taste-skill` (from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)) and `image-to-code` (an equivalent skill also sourced from Leonxlnx/taste-skill's `image-to-code-skill`) were already available system-wide before this PR and were left as-is rather than re-installed.
