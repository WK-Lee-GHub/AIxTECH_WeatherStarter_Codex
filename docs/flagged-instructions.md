# Flagged Instructions - Redundant, Vague, or Obvious

These items from the original AGENTS.md were identified as redundant, too vague, or overly obvious. They are NOT included in the new structure.

## Redundant (Agent Already Knows)

| Original Instruction | Reason |
|---------------------|--------|
| "Use functional components with hooks" | Standard React practice |
| "Tailwind CSS for styling" | Already in package.json, obvious from codebase |
| "TypeScript strict mode" | Standard for modern TS projects |
| "Handle errors with try/catch" | Basic programming practice |
| "Use async/await for promises" | Standard JS/TS pattern |
| "Import types from types.ts" | Standard TS project structure |

## Too Vague to Be Actionable

| Original Instruction | Issue |
|---------------------|-------|
| "Write clean code" | Subjective, not actionable |
| "Follow best practices" | Too generic |
| "Keep components small" | No specific guidance |
| "Use meaningful variable names" | Subjective |
| "Organize code logically" | Vague |

## Overly Obvious

| Original Instruction | Reason |
|---------------------|--------|
| "Run npm install before dev" | Standard Node.js workflow |
| "Check console for errors" | Basic debugging |
| "Read README for more info" | Self-evident |
| "Tests use Vitest" | Already in package.json and vitest.config.ts |
| "Drizzle for database" | Already in schema.ts and package.json |

## Duplicated Across Sections

| Content | Appeared In |
|---------|-------------|
| Portless URL (http://weather-starter.localhost:1355) | Project Overview, Quick Start, Pitfalls |
| Snapshot pattern description | Architecture, Data Flow, Pitfalls |
| Coordinate bounds (Singapore) | Validation, Pitfalls |
| ES modules with .js extensions | Backend Conventions, Pitfalls |
| Database path uses process.cwd() | Database, Pitfalls |

## Recommendation

The new modular structure (AGENTS.md + docs/*.md) eliminates these issues by:
1. **Linking** to detailed docs instead of embedding
2. **Grouping** related conventions together
3. **Focusing** each file on actionable, specific patterns
4. **Removing** generic advice that applies to any project