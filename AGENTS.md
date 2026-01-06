# Agent Instructions

This project uses **bd** (beads) for issue tracking - a git-backed graph issue tracker optimized for AI agents.

## Quick Reference

```bash
bd ready              # Find available work (tasks with no open blockers)
bd show <id>          # View issue details and audit trail
bd create "Title" -p 0  # Create new task (priority: 0=P0, 1=P1, 2=P2, 3=P3)
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd dep add <child> <parent>  # Link tasks (blocks, related, parent-child)
bd sync               # Sync with git (export DB → JSONL → commit → push)
bd list               # List all issues
bd list --status open # Filter by status
```

## Beads Workflow

**Starting Work:**
1. Run `bd ready --json` to find available tasks
2. Choose a task and run `bd update <id> --status in_progress`
3. Work on the task, creating sub-tasks if needed
4. Run `bd sync` when done to commit and push changes

**Creating Tasks:**
```bash
# Create a simple task
bd create "Fix authentication bug" -p 0 -t task

# Create with description
bd create "Add payment retry logic" -p 1 -t task -d "Implement exponential backoff for failed Stripe payments"

# Create sub-task (hierarchical)
bd create "Write unit tests" -p 1 -t task --parent bd-abc123
```

**Dependency Management:**
```bash
# Task A blocks Task B (B can't start until A is done)
bd dep add bd-B bd-A --type blocks

# Related tasks
bd dep add bd-B bd-A --type related

# Parent-child hierarchy
bd dep add bd-child bd-parent --type parent
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
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

