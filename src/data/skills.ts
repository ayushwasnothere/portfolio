export interface SkillCategory {
  name: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    items: ["TypeScript", "Rust", "Go", "C/C++", "Python", "JavaScript", "Bash", "Lua"],
  },
  {
    name: "AI & Robotics",
    items: ["AI Coding Agents", "LLM Integration", "ROS 2", "MoveIt / MTC", "Gazebo"],
  },
  {
    name: "Frameworks & Runtime",
    items: ["React", "Next.js", "Express", "Tokio", "Actix Web", "Hono", "Bun"],
  },
  {
    name: "Infrastructure",
    items: ["PostgreSQL", "Redis", "Docker", "AWS", "Cloudflare Workers", "Nginx", "Linux"],
  },
];
