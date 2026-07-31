---
title: "From Zero to Autonomous: How We Built Forge, a Terminal-First AI Coding Agent"
slug: "how-we-built-forge-ai-coding-agent"
date: "2026-07-29"
readTime: "7 min read"
tags: ["AI", "TypeScript", "Bun", "LLMs", "CLI", "NPM"]
coverImage: "/projects/forge.png"
summary: "Building a high-speed, provider-agnostic CLI agent in TypeScript and Bun — and the thrill of publishing my very first npm package, an autonomous AI coding agent."
---

# From Zero to Autonomous: How We Built Forge, a Terminal-First AI Coding Agent

*Building a high-speed, provider-agnostic CLI agent in TypeScript and Bun — and the thrill of publishing my very first npm package, an autonomous AI coding agent.*

---

## Act I: The Vision & The Spark

Every developer knows the flow state: your fingers are on the home row, the terminal is your canvas, and you're moving at the speed of thought. But as AI coding assistants exploded onto the scene, most of them forced us into sidebars, web apps, or heavyweight IDE extensions.

We wanted something different: **an agent that lives in your terminal**. 

It shouldn't lock you into a single LLM vendor. It shouldn't blindly rewrite your codebase without showing you what changed. And above all, it had to be fast, modular, and context-aware.

That was the spark behind **Forge** (`forge-code-ai`) — a terminal-first AI coding agent built with TypeScript and Bun.

---

## Act II: Architecture of a Terminal Agent

When building an AI agent that operates directly on your filesystem and local terminal environment, standard chat prompts aren't enough. You need a structured loop:

```bash
┌─────────────────────────────────────────────────────────────┐
│                      User Prompt                            │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Context Hydration                         │
│   (Auto-reads README.md, package.json, git state, FORGE.md)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    LLM Reasoning Loop                       │
│        (Parallel Tool Calling: read, patch, execute)        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Deny-by-Default Guardrail                   │
│   (Color-coded inline diff preview → Interactive approval)  │
└──────────────────────────────┬──────────────────────────────┘
```

### Key Architectural Pillars:

1. **Provider Agnostic**: Native support for 7+ LLM providers — OpenRouter, OpenAI, Anthropic (with native prompt caching), Groq, xAI Grok, Google Gemini, and local Ollama.
2. **Parallel Tool Execution**: When the model decides to inspect three files or run two independent searches, it doesn't wait in line. Tools run concurrently for maximum speed.
3. **Deny-by-Default Safety**: Read operations are safe. But file modifications (`apply_patch`, `write_to_file`) and shell execution (`run_command`) require explicit user approval with color-coded diff previews.

---

## Act III: The Context Window Struggle — Engineering for Long Sessions

Building a toy agent that answers a single prompt is easy. Building an agent that stays coherent through a 45-minute refactoring session is where real software engineering begins.

Here are the major context management hurdles we faced and how we solved them:

### 1. The "Token Bloat" Trap
As the agent reads files, executes shell commands, and analyzes logs, the token count explodes. A single `git status` or verbose `npm test` output can dump thousands of tokens into the conversation trajectory.

* **Solution: Smart Tool Summarization & Output Clipping.** We constrained tool responses to essential information, automatically truncating massive standard outputs while preserving structural tracebacks.

### 2. Context Degradation & "Loss in the Middle"
LLMs suffer from attention decay when context windows grow too large. Relevant instructions given at step 2 get buried under 20 reasoning steps of tool outputs.

* **Solution: System Prompt Anchoring & `/compact`.** We built an automatic context compression engine. When the trajectory grows dense, running `/compact` in the REPL synthesizes earlier conversation history into a structured summary while keeping the active workspace state and latest instructions pristine.

### 3. Session Persistence & Safety Rails
What happens when you need to pause work or when an experimental prompt goes off the rails?

* **Solution: Session JSON Logs & `/undo`.** Every session is automatically persisted under `.forge/sessions/<uuid>.json`. Developers can list (`forge sessions`) and resume (`forge agent --session <id>`) past work seamlessly. If an agent step produces an unwanted diff, the `/undo` slash command instantly rolls back the git workspace state.

---

## Act IV: Crafting the Showcase & Web Experience

To showcase Forge to the world, we built a modern landing page and documentation hub within our Bun monorepo.

Using **Vite 6**, **React 19**, **Tailwind CSS v4**, and **MDX**, we designed an aesthetic centered around the "molten amber" theme (`#f59e0b`).

### Standout UI Highlights:
* **Interactive Terminal Demo**: A typewriter animation in a terminal window showing real-time tool execution.
* **Video Showcase**: Embedding an actual video demo where Forge built a complete web-based 2D stickman game with a level editor, physics, and collision detection from a single prompt.
* **Build-Time MDX Documentation Pipeline**: All doc pages authored in `.mdx` with automatic table-of-contents extraction and code snippet copy buttons.

---

## Act V: Publishing My First NPM Package — An AI Agent on the Registry

There is something undeniably magical about publishing your very first package to npm. For years, I had run `npm install` for thousands of third-party libraries — but taking something I built from scratch and pushing it to the global npm registry was an incredible milestone.

And the fact that my first published package wasn't just a simple helper utility, but a **complete, autonomous AI coding agent**, made it ten times more thrilling!

```json
{
  "name": "forge-code-ai",
  "version": "1.0.0",
  "bin": {
    "forge": "./dist/cli.js"
  },
  "files": ["dist"],
  "scripts": {
    "build": "bun build ./src/cli.ts --target=bun --outdir=./dist"
  }
}
```

### Packaging & Executable Setup:
1. **The Shebang Header**: Ensuring `#!/usr/bin/env bun` or node compatibility so `npx forge-code-ai` or `forge` works out of the box on Linux, macOS, and Windows.
2. **Bundling Single Executable Output**: Compiling TypeScript source files into a lightweight, standalone distribution bundle with microsecond cold starts.
3. **The Registry Moment**: Running `npm publish --access public` and seeing `+ forge-code-ai@1.0.0` live on npmjs.com!

Anyone across the globe can now run:
```bash
npm i -g forge-code-ai
```
and instantly launch an AI pair-programmer directly inside their terminal.

---

## Act VI: The Result & Lessons Learned

Building Forge taught us that the future of developer tools isn't about replacing the terminal — it's about empowering it.

By keeping the permission model transparent, making LLM providers interchangeable, and maintaining strict control over context hydration, Forge delivers an agent experience that feels fast, safe, and deeply integrated into real development workflows.

### Give Forge a Spin Today!

```bash
# Install globally via npm
npm i -g forge-code-ai

# Interactive provider setup
forge setup

# Start coding with full permissions
forge chat --allow-write --allow-execute
```

* 🌐 **Website**: [forge.cytrus.me](https://forge.cytrus.me)
* ⭐ **GitHub**: [github.com/ayushwasnothere/forge](https://github.com/ayushwasnothere/forge)
* 📦 **npm**: [npmjs.com/package/forge-code-ai](https://www.npmjs.com/package/forge-code-ai)

---
*Happy hacking, and may your terminal always stay in flow!*
