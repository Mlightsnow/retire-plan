# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

退休规划助手 — a personal retirement planning tool for Chinese citizens aged 45-62. Calculates precise retirement dates under the 2025 gradual delay policy, provides policy knowledge, and generates action checklists. All data stored locally (no backend/auth).

## Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run test         # Vitest in watch mode
npm run test:run     # Vitest single run (CI)
npm run lint         # ESLint
```

Run a single test file: `npx vitest run src/__tests__/retirement.test.ts`

## Architecture

**Stack**: Next.js 15 (App Router) + Tailwind CSS v4 + Zustand + Radix UI primitives + Vitest

**Design system**: "墨金" (Ink & Gold) — CSS variables in `globals.css` define the full theme. Gold (#B8860B) is the primary accent, cream (#FAF7F2) background in light mode. Dark mode overrides in `.dark` class. All components reference `--gold`, `--cream`, etc. via CSS variables.

**Data flow**:
- `src/lib/retirement.ts` — pure calculation engine. `calculateRetirement(profile)` → `RetirementResult`. `getCurrentPhase(profile)` → phase string. **`calculateDelayMonths` currently returns 0 — awaiting user-provided policy parameters.**
- `src/store/useProfileStore.ts` — Zustand store with `persist` middleware (LocalStorage). Holds `profile: UserProfile` and `planProgress: Record<string, boolean>`. Also exports `DEFAULT_PLAN_ITEMS` (12 items across 3 phases).
- `src/data/policies.json` — static policy data, imported as `PolicyCard[]` via type assertion.
- `src/app/page.tsx` — single-page shell with bottom tab navigation (calculator / policy / plan). All rendering is client-side (`"use client"`).

**Component hierarchy**:
```
page.tsx
├── calculator/ProfileForm     → sets profile in store
├── calculator/RetirementResult → reads result from calculateRetirement()
├── policy/PolicyList          → reads policies.json
└── plan/PlanChecklist         → reads planProgress from store
```

**UI components** (`src/components/ui/`) are hand-built on Radix UI primitives, not shadcn CLI-generated. They follow the Ink & Gold design tokens.

## Key Conventions

- All pages are `"use client"` — no server components yet
- Path alias: `@/` maps to `src/`
- Chinese UI text throughout (面向中文用户)
- Accessibility-first for older users: min 18px font, 48px+ touch targets, WCAG AA contrast
- No comments in code unless the WHY is non-obvious

## Pending

- `calculateDelayMonths` in `retirement.ts` is a stub (returns 0). User will provide the gradual delay formula parameters.
