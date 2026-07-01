# AGENTS.md

This file serves the purpose of guiding the AI agents working on this repository.

## Repository Overview

Booking Calendar is a visitor-booking app: guests pick a free day and request a
visit, and admins confirm or block dates.

It is a **pnpm + Turborepo monorepo**. Workspace packages are published under the
`@repo/*` scope.

```
apps/
  web/        # Next.js 16 app (React 19) — the only app today
packages/
  config/     # @repo/config — shared tsconfig / tooling config
  db/         # @repo/db — Prisma client (MongoDB)
  ui/         # @repo/ui — shared React components
```

### Running it

```bash
pnpm install
pnpm db:generate    # generate the Prisma client (also runs on postinstall)
pnpm dev            # turbo dev — starts the web app on http://localhost:3000
```

Other useful scripts (run from the repo root): `pnpm build`, `pnpm lint`,
`pnpm typecheck`, `pnpm test`, `pnpm format:write`, and `pnpm format:check`. The
database layer is **Prisma on MongoDB**; `pnpm db:generate` regenerates the
client and `pnpm db:push` syncs the schema. A `DATABASE_URL` env var is required.

### Next.js docs

`next` is a dependency of `apps/web`, so the version-pinned docs referenced below
live at **`apps/web/node_modules/next/dist/docs/`**.

## Skills structure

Skills live in the `.claude/skills/` directory. Each skill is a self-contained
module named after the skill:

```
.claude/skills/{skill-name}/
├── SKILL.md           # Main skill definition (REQUIRED — must not be empty)
└── references/        # Optional additional context
    └── topic.md
```

Current skills: `code-commit`, `frontend-design`.

### Skill File Format

`SKILL.md` must start with YAML frontmatter, followed by the instruction body:

```yaml
---
name: skill-name
description: When to use this skill (AI reads this to auto-load)
---
```

Skills are auto-invoked based on a match between their `description` and the
current context. An empty `SKILL.md` will register the skill by name but it will
not load or do anything.

## Session/Task start

**When starting a session or a task**, you MUST pull the latest changes from main,
and branch off the main branch given the feature or changes you are given.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT
complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all
differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
