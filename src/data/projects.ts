export interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  repoLink: string;
  liveLink?: string;
  accent: string;
}

export const projects: Project[] = [
  {
    name: "Forge",
    tagline: "AI Terminal Coding Agent",
    description:
      "An autonomous CLI AI agent capable of multi-file code editing, AST context building, shell execution, and pair programming — all from inside your terminal.",
    stack: ["TypeScript", "Node.js", "LLMs", "CLI"],
    repoLink: "https://github.com/ayushwasnothere/forge",
    liveLink: "https://forge.citxruzz.tech",
    accent: "#a855f7",
  },
  {
    name: "7DOF MTC",
    tagline: "Robotic Arm Motion Planning",
    description:
      "A MoveIt Task Constructor package for 7-degree-of-freedom manipulators — multi-stage trajectory planning, collision avoidance, and containerized ROS 2 simulations.",
    stack: ["C++", "ROS 2", "MoveIt", "Gazebo", "Docker"],
    repoLink: "https://github.com/ayushwasnothere/7dof_mtc",
    accent: "#06b6d4",
  },
  {
    name: "Cloud-It",
    tagline: "Cloud Infrastructure Automation",
    description:
      "A TypeScript automation utility for streamlining cloud workload deployment, container orchestration, and environment configuration across AWS services.",
    stack: ["TypeScript", "Node.js", "AWS", "Docker"],
    repoLink: "https://github.com/ayushwasnothere/cloud-it",
    accent: "#f97316",
  },
  {
    name: "rust-smtp",
    tagline: "Async SMTP Mail Server",
    description:
      "A high-throughput, asynchronous SMTP server built from scratch in Rust using Tokio — handles raw SMTP protocol, MIME parsing, and powers the TempMail platform.",
    stack: ["Rust", "Tokio", "PostgreSQL", "Docker"],
    repoLink: "https://github.com/ayushwasnothere/rust-smtp",
    liveLink: "https://tmail.citxruzz.tech",
    accent: "#ec4899",
  },
  {
    name: "Raven",
    tagline: "Real-Time Chat Platform",
    description:
      "A scalable real-time messaging platform combining WebSockets for instant data propagation with Redis pub/sub for multi-instance, sub-100ms latency updates.",
    stack: ["Next.js", "TypeScript", "WebSockets", "Redis", "PostgreSQL"],
    repoLink: "https://github.com/ayushwasnothere/chat-app",
    liveLink: "https://raven.citxruzz.tech",
    accent: "#10b981",
  },
  {
    name: "shrty",
    tagline: "Link Shortener Microservice",
    description:
      "A microsecond-latency URL shortening microservice using Go and optimized PostgreSQL indexing, secured with Cloudflare Turnstile bot protection.",
    stack: ["Go", "PostgreSQL", "React", "Cloudflare"],
    repoLink: "https://github.com/ayushwasnothere/shrty",
    liveLink: "https://shrty.citxruzz.tech",
    accent: "#eab308",
  },
  {
    name: "ts-chess",
    tagline: "Multiplayer Web Chess",
    description:
      "A full chess implementation for the web with local play, online multiplayer via WebSockets, and Stockfish AI engine integration.",
    stack: ["React", "TypeScript", "WebSockets", "Stockfish"],
    repoLink: "https://github.com/ayushwasnothere/ts-chess",
    liveLink: "https://chess.citxruzz.tech",
    accent: "#8b5cf6",
  },
  {
    name: "pwmgr",
    tagline: "Encrypted Password Manager",
    description:
      "A privacy-first, Bitwarden-like password manager Chrome extension with client-side encryption and zero-knowledge architecture.",
    stack: ["React", "TypeScript", "Chrome API"],
    repoLink: "https://github.com/ayushwasnothere/pwmgr",
    accent: "#14b8a6",
  },
];
