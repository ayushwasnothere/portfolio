export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  stack: string[];
  repoLink: string;
  liveLink?: string;
  accent: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    slug: "forge",
    name: "Forge",
    tagline: "AI Terminal Coding Agent",
    category: "AI / Developer Tools",
    year: "2026",
    description:
      "An autonomous CLI AI agent capable of multi-file code editing, AST context building, shell execution, and pair programming — powered by Bun.",
    longDescription:
      "Forge is an autonomous AI coding agent that lives in your terminal. It understands codebases through AST-based context building, edits multiple files simultaneously, executes shell commands, and pair programs with you in real-time. Built with TypeScript and Bun runtime for microsecond execution, it integrates with modern LLMs to provide a seamless AI-assisted development experience.",
    stack: ["TypeScript", "Bun", "LLMs", "CLI"],
    repoLink: "https://github.com/ayushwasnothere/forge",
    liveLink: "https://forge.cytrus.me",
    accent: "#a855f7",
    images: ["/projects/forge.png"],
  },
  {
    slug: "7dof-mtc",
    name: "7DOF MTC",
    tagline: "Robotic Arm Motion Planning",
    category: "Robotics",
    year: "2025",
    description:
      "A MoveIt Task Constructor package for 7-degree-of-freedom manipulators — multi-stage trajectory planning, collision avoidance, and containerized ROS 2 simulations.",
    longDescription:
      "A complete MoveIt Task Constructor package designed for 7-degree-of-freedom robotic manipulators. Implements multi-stage trajectory planning with collision avoidance, Cartesian path planning, and pick-and-place task pipelines. The entire system runs in containerized ROS 2 environments with Gazebo simulation, enabling rapid prototyping and testing of complex manipulation sequences.",
    stack: ["C/C++", "ROS 2", "MoveIt", "Gazebo", "Docker"],
    repoLink: "https://github.com/ayushwasnothere/7dof_mtc",
    accent: "#06b6d4",
    images: ["/projects/mtc_flowchart.jpg"],
  },
  {
    slug: "cloud-it",
    name: "Cloud-It",
    tagline: "Cloud Infrastructure Automation",
    category: "Infrastructure",
    year: "2025",
    description:
      "A Bun-powered TypeScript automation utility for streamlining cloud workload deployment, container orchestration, and environment configuration across AWS services.",
    longDescription:
      "Cloud-It is a Bun and TypeScript automation utility that streamlines cloud workload deployment across AWS services. It handles container orchestration, environment configuration, and infrastructure provisioning through a clean CLI interface. Built to eliminate repetitive manual steps in cloud deployment workflows.",
    stack: ["TypeScript", "Bun", "AWS", "Docker"],
    repoLink: "https://github.com/ayushwasnothere/cloud-it",
    accent: "#f97316",
    images: ["/projects/cloudit.jpeg"],
  },
  {
    slug: "raven",
    name: "Raven",
    tagline: "Real-Time Chat Platform",
    category: "Full-Stack",
    year: "2024",
    description:
      "A scalable real-time messaging platform combining WebSockets for instant data propagation with Redis pub/sub for multi-instance, sub-100ms latency updates.",
    longDescription:
      "Raven is a scalable real-time messaging platform built with Next.js and TypeScript. It combines WebSocket connections for instant message propagation with Redis pub/sub for horizontal scaling across multiple server instances. The architecture delivers sub-100ms latency updates while maintaining data consistency through PostgreSQL persistence.",
    stack: ["Next.js", "TypeScript", "WebSockets", "Redis", "PostgreSQL"],
    repoLink: "https://github.com/ayushwasnothere/chat-app",
    liveLink: "https://raven.cytrus.me",
    accent: "#10b981",
  },
  {
    slug: "rust-smtp",
    name: "rust-smtp",
    tagline: "Async SMTP Mail Server",
    category: "Systems",
    year: "2025",
    description:
      "A high-throughput, asynchronous SMTP server built from scratch in Rust using Tokio — handles raw SMTP protocol, MIME parsing, and powers the TempMail platform.",
    longDescription:
      "A high-throughput SMTP mail server written from scratch in Rust using the Tokio async runtime. It implements the raw SMTP protocol with MIME parsing, envelope handling, and concurrent connection management. The server powers the TempMail disposable email platform, processing thousands of incoming emails with minimal resource usage.",
    stack: ["Rust", "Tokio", "PostgreSQL", "Docker"],
    repoLink: "https://github.com/ayushwasnothere/rust-smtp",
    liveLink: "https://tmail.cytrus.me",
    accent: "#ec4899",
    images: ["/projects/temp_mail.png"],
  },
  {
    slug: "ts-chess",
    name: "ts-chess",
    tagline: "Multiplayer Web Chess",
    category: "Full-Stack",
    year: "2024",
    description:
      "A full chess implementation for the web with local play, online multiplayer via WebSockets, and Stockfish AI engine integration.",
    longDescription:
      "A complete chess game for the web featuring local play, real-time online multiplayer via WebSockets, and AI opponents powered by the Stockfish engine. Built entirely in TypeScript with React, it implements all standard chess rules including castling, en passant, and promotion. The multiplayer system handles matchmaking, move validation, and game state synchronization.",
    stack: ["React", "TypeScript", "WebSockets", "Stockfish"],
    repoLink: "https://github.com/ayushwasnothere/ts-chess",
    liveLink: "https://chess.cytrus.me",
    accent: "#8b5cf6",
    images: ["/projects/chess.png"],
  },
  {
    slug: "pwmgr",
    name: "pwmgr",
    tagline: "Encrypted Password Manager",
    category: "Security",
    year: "2025",
    description:
      "A privacy-first, Bitwarden-like password manager Chrome extension with client-side encryption and zero-knowledge architecture.",
    longDescription:
      "A privacy-first password manager built as a Chrome extension with Bitwarden-like functionality. Implements client-side AES-256 encryption ensuring zero-knowledge architecture — the server never sees plaintext passwords. Features include auto-fill, password generation, secure notes, and encrypted vault sync across devices.",
    stack: ["React", "TypeScript", "Chrome API"],
    repoLink: "https://github.com/ayushwasnothere/pwmgr",
    accent: "#14b8a6",
  },
];
