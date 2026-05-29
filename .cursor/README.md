# Cursor project configuration

## Agent Skills (local only)

Project skills follow the [Cursor Agent Skills layout](https://cursor.com/docs):

```
.cursor/skills/
└── <skill-name>/
    ├── SKILL.md       # required — YAML frontmatter + instructions
    ├── references/    # optional
    ├── scripts/       # optional
    └── resources/     # optional
```

- Skills in `.cursor/skills/` are **gitignored** and must not be pushed to the remote.
- To refresh from [7deer_skills](https://github.com/kennyzir/7deer_skills), copy skill folders into `.cursor/skills/` (each directory must contain `SKILL.md`).
- Index of installed skills: `.cursor/skills/README.md` (local).

## Rules

Add committed team rules under `.cursor/rules/` if needed (not gitignored by default).
