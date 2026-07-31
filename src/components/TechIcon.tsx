import TechStackIcon from 'tech-stack-icons';
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiRust,
  SiGo,
  SiCplusplus,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiRedis,
  SiRos,
  SiLinux,
  SiGnubash,
  SiLua,
  SiBun,
  SiNodedotjs,
  SiExpress,
  SiCloudflare,
  SiNginx,
  SiSocketdotio,
  SiGooglechrome,
  SiTailwindcss,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { Sparkles } from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = 'w-6 h-6' }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  switch (normalized) {
    case 'bun':
    case 'bunjs':
      return <SiBun className={`${className} text-[#FBF0DF]`} />;
    case 'typescript':
    case 'ts':
      return <SiTypescript className={`${className} text-[#3178C6]`} />;
    case 'javascript':
    case 'js':
      return <SiJavascript className={`${className} text-[#F7DF1E]`} />;
    case 'react':
    case 'reactjs':
      return <SiReact className={`${className} text-[#61DAFB]`} />;
    case 'next.js':
    case 'nextjs':
      return <SiNextdotjs className={`${className} text-white`} />;
    case 'rust':
    case 'tokio':
    case 'actix web':
      return <SiRust className={`${className} text-[#DEA584]`} />;
    case 'go':
    case 'golang':
      return <SiGo className={`${className} text-[#00ADD8]`} />;
    case 'c/c++':
    case 'c++':
    case 'cpp':
      return <SiCplusplus className={`${className} text-[#00599C]`} />;
    case 'python':
      return <SiPython className={`${className} text-[#3776AB]`} />;
    case 'docker':
      return <SiDocker className={`${className} text-[#2496ED]`} />;
    case 'postgresql':
    case 'postgres':
      return <SiPostgresql className={`${className} text-[#4169E1]`} />;
    case 'redis':
      return <SiRedis className={`${className} text-[#DC382D]`} />;
    case 'ros 2':
    case 'ros':
    case 'ros2':
    case 'moveit / mtc':
    case 'gazebo':
    case 'moveit':
      return <SiRos className={`${className} text-[#22314E] bg-white rounded-full p-0.5`} />;
    case 'aws':
      return <FaAws className={`${className} text-[#FF9900]`} />;
    case 'linux':
    case 'tux':
      return <SiLinux className={`${className} text-[#FCC624]`} />;
    case 'bash':
    case 'cli':
      return <SiGnubash className={`${className} text-[#4EAA25]`} />;
    case 'lua':
      return <SiLua className={`${className} text-[#000080]`} />;
    case 'node.js':
    case 'node':
    case 'nodejs':
      return <SiNodedotjs className={`${className} text-[#5FA04E]`} />;
    case 'express':
    case 'expressjs':
      return <SiExpress className={`${className} text-white`} />;
    case 'cloudflare':
    case 'cloudflare workers':
      return <SiCloudflare className={`${className} text-[#F38020]`} />;
    case 'nginx':
      return <SiNginx className={`${className} text-[#009639]`} />;
    case 'ai coding agents':
    case 'llm integration':
    case 'llms':
      return <Sparkles className={`${className} text-[#818CF8]`} />;
    case 'websockets':
    case 'stockfish':
      return <SiSocketdotio className={`${className} text-white`} />;
    case 'chrome api':
    case 'aes-256':
      return <SiGooglechrome className={`${className} text-[#4285F4]`} />;
    case 'tailwind css':
      return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
    default:
      return <TechStackIcon name={normalized} className={className} />;
  }
}
