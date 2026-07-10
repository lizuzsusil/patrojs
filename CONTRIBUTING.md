# Contributing to PatroJS

Thanks for your interest in contributing to PatroJS! We welcome contributions of all kinds — bug reports, feature requests, documentation improvements, and code changes.

## Development Setup

PatroJS uses a **pnpm workspace** monorepo with **Turborepo**.

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 11

### Project structure

```
patro/
├── packages/
│   ├── core/          # @patrojs/core — business logic (no UI)
│   └── react/         # @patrojs/react — React component
├── docs/              # Documentation website (Nextra/Next.js)
└── patches/           # pnpm patch files
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages via Turborepo |
| `pnpm build:core` | Build `@patrojs/core` only |
| `pnpm build:react` | Build `@patrojs/react` only |
| `pnpm dev` | Watch mode for all packages |
| `pnpm test` | Run all tests via Turborepo |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format code with Prettier |
| `pnpm typecheck` | Type-check with `tsc --noEmit` |
| `pnpm docs:dev` | Start docs development server |

## Code Conventions

- **TypeScript** — all code must be typed. Avoid `any` where possible.
- **Core stays pure** — `@patrojs/core` must not import framework-specific code.
- **Thin wrappers** — framework packages should only contain UI bindings, no business logic.
- **Prettier** — run `pnpm format` before committing.
- **Tests** — `@patrojs/core` uses Vitest. Run `pnpm test` before submitting a PR.

## Pull Request Process

1. Fork the repository and create a feature branch from `main`.
2. Make your changes with clear, descriptive commits.
3. Ensure all tests pass (`pnpm test`).
4. Run the type checker (`pnpm typecheck`).
5. Submit a PR with a clear title and description of the change.

### Commit style

Use clear, imperative commit messages:

- `feat: add Nepali numeral support to formatter`
- `fix: handle edge case in BS→AD conversion`
- `docs: update getting-started example`

## Reporting Issues

Open a GitHub issue with:

- A clear, descriptive title
- Steps to reproduce (for bugs)
- Expected vs actual behaviour
- Environment details (Node version, browser, etc.)

---

Thank you for helping make Nepali date picking better for everyone! 🇳🇵
