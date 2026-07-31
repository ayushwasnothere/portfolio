import { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, Play, Sparkles, RefreshCw, Gamepad2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface LogEntry {
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  text: string;
}

// ── Dino Game Constants ──
const CANVAS_W = 700;
const CANVAS_H = 200;
const GROUND_Y = 165;
const DINO_W = 30;
const DINO_H = 36;
const GRAVITY = 0.55;
const JUMP_FORCE = -10.5;
const OBSTACLE_SPEED_START = 4;
const OBSTACLE_SPEED_INCREASE = 0.0008;

interface Obstacle {
  x: number;
  w: number;
  h: number;
}

export default function MiniTerminal() {
  const container = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'system', text: 'Welcome to Ayush Shell (v2.5.0)' },
    { type: 'system', text: 'Type `/help` or click a quick command below to begin.' },
  ]);
  const [isDinoMode, setIsDinoMode] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // ── Dino Game State (refs for animation loop) ──
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dinoY = useRef(GROUND_Y - DINO_H);
  const dinoVel = useRef(0);
  const isJumping = useRef(false);
  const obstacles = useRef<Obstacle[]>([]);
  const score = useRef(0);
  const highScore = useRef(0);
  const speed = useRef(OBSTACLE_SPEED_START);
  const frameId = useRef(0);
  const gameOver = useRef(false);
  const spawnTimer = useRef(0);
  const gameStarted = useRef(false);
  const isGoldenTheme = useRef(false);
  const [isGoldenActive, setIsGoldenActive] = useState(false);

  useGSAP(() => {
    const element = container.current?.querySelector('.terminal-card');
    if (!element) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 0.5,
      },
    });

    tl.fromTo(
      element,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power1.out' }
    ).to(
      element,
      { y: -120, opacity: 0, duration: 1, ease: 'power1.in' },
      '>+1.2'
    );
  }, { scope: container });

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // ── Dino Game Logic ──
  const resetGame = useCallback((forceGold = false) => {
    dinoY.current = GROUND_Y - DINO_H;
    dinoVel.current = 0;
    isJumping.current = false;
    obstacles.current = [];
    score.current = 0;
    speed.current = OBSTACLE_SPEED_START;
    gameOver.current = false;
    spawnTimer.current = 0;
    gameStarted.current = false;

    // 1 in 50 chance (2% probability) for Royal Golden Theme, or forced
    const isGold = forceGold || Math.random() < 0.02;
    isGoldenTheme.current = isGold;
    setIsGoldenActive(isGold);
  }, []);

  const jump = useCallback(() => {
    if (!isJumping.current && !gameOver.current) {
      gameStarted.current = true;
      dinoVel.current = JUMP_FORCE;
      isJumping.current = true;
    }
    if (gameOver.current) {
      // Golden mode lasts for 1 turn only; restart evaluates standard reset
      resetGame(false);
    }
  }, [resetGame]);

  // Draw a single frame
  const drawFrame = useCallback((ctx: CanvasRenderingContext2D) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const isGold = isGoldenTheme.current;

    // Clear
    ctx.fillStyle = isGold ? '#161206' : '#0a0a0a';
    ctx.fillRect(0, 0, w, h);

    // Ground line
    ctx.strokeStyle = isGold ? '#d97706' : '#333';
    ctx.lineWidth = isGold ? 1.5 : 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(w, GROUND_Y);
    ctx.stroke();

    // Ground texture dots
    ctx.fillStyle = isGold ? '#92400e' : '#222';
    for (let i = 0; i < w; i += 20) {
      ctx.fillRect(i + ((score.current * 2) % 20), GROUND_Y + 4, 2, 1);
      ctx.fillRect(i + 10 + ((score.current * 3) % 20), GROUND_Y + 10, 3, 1);
    }

    if (gameStarted.current && !gameOver.current) {
      // Update dino physics
      dinoVel.current += GRAVITY;
      dinoY.current += dinoVel.current;

      if (dinoY.current >= GROUND_Y - DINO_H) {
        dinoY.current = GROUND_Y - DINO_H;
        dinoVel.current = 0;
        isJumping.current = false;
      }

      // Spawn obstacles
      spawnTimer.current++;
      const spawnInterval = Math.max(60, 120 - score.current / 5);
      if (spawnTimer.current >= spawnInterval) {
        spawnTimer.current = 0;
        const h = 20 + Math.random() * 25;
        obstacles.current.push({
          x: w + 20,
          w: 12 + Math.random() * 12,
          h,
        });
      }

      // Update obstacles
      speed.current = OBSTACLE_SPEED_START + score.current * OBSTACLE_SPEED_INCREASE;
      obstacles.current = obstacles.current.filter((o) => {
        o.x -= speed.current;
        return o.x + o.w > -20;
      });

      // Collision detection
      const dinoBox = { x: 50 + 4, y: dinoY.current + 4, w: DINO_W - 8, h: DINO_H - 4 };
      for (const o of obstacles.current) {
        const obsBox = { x: o.x + 2, y: GROUND_Y - o.h, w: o.w - 4, h: o.h };
        if (
          dinoBox.x < obsBox.x + obsBox.w &&
          dinoBox.x + dinoBox.w > obsBox.x &&
          dinoBox.y < obsBox.y + obsBox.h &&
          dinoBox.y + dinoBox.h > obsBox.y
        ) {
          gameOver.current = true;
          if (score.current > highScore.current) {
            highScore.current = score.current;
          }
        }
      }

      if (!gameOver.current) {
        score.current++;
      }
    }

    // ── Draw Dino (pixel-art style) ──
    const dx = 50;
    const dy = dinoY.current;
    const dinoColor = gameOver.current ? '#ef4444' : '#e2e8f0';
    ctx.fillStyle = dinoColor;

    // Body
    ctx.fillRect(dx + 6, dy + 8, 18, 20);
    // Head
    ctx.fillRect(dx + 14, dy, 16, 14);
    // Crown (if Golden theme active!)
    if (isGold && !gameOver.current) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(dx + 16, dy - 5, 4, 5);
      ctx.fillRect(dx + 22, dy - 7, 4, 7);
      ctx.fillRect(dx + 28, dy - 5, 4, 5);
      ctx.fillStyle = dinoColor;
    }
    // Eye
    ctx.fillStyle = gameOver.current ? '#ffffff' : isGold ? '#451a03' : '#818cf8';
    ctx.fillRect(dx + 24, dy + 3, 3, 3);
    ctx.fillStyle = dinoColor;
    // Mouth notch
    ctx.fillStyle = isGold ? '#161206' : '#0a0a0a';
    ctx.fillRect(dx + 26, dy + 10, 4, 2);
    ctx.fillStyle = dinoColor;
    // Tail
    ctx.fillRect(dx, dy + 10, 8, 6);
    ctx.fillRect(dx - 4, dy + 10, 6, 3);
    // Legs (alternate for running animation)
    if (!isJumping.current && gameStarted.current && !gameOver.current) {
      if (Math.floor(score.current / 5) % 2 === 0) {
        ctx.fillRect(dx + 8, dy + 28, 5, 8);
        ctx.fillRect(dx + 18, dy + 28, 5, 6);
      } else {
        ctx.fillRect(dx + 8, dy + 28, 5, 6);
        ctx.fillRect(dx + 18, dy + 28, 5, 8);
      }
    } else {
      ctx.fillRect(dx + 8, dy + 28, 5, 7);
      ctx.fillRect(dx + 18, dy + 28, 5, 7);
    }
    // Arm
    ctx.fillRect(dx + 14, dy + 16, 3, 8);

    // ── Draw Obstacles (cacti) ──
    ctx.fillStyle = isGold ? '#f59e0b' : '#4ade80';
    for (const o of obstacles.current) {
      const ox = o.x;
      const oy = GROUND_Y - o.h;
      // Main trunk
      ctx.fillRect(ox, oy, o.w, o.h);
      // Top thorns
      ctx.fillRect(ox - 2, oy, 3, 5);
      ctx.fillRect(ox + o.w - 1, oy, 3, 5);
      // Side arms (on taller cacti)
      if (o.h > 30) {
        ctx.fillRect(ox - 5, oy + 8, 7, 4);
        ctx.fillRect(ox + o.w - 2, oy + 14, 7, 4);
      }
    }

    // ── Score Display ──
    ctx.fillStyle = isGold ? '#b45309' : '#888';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`HI ${String(highScore.current).padStart(5, '0')}`, w - 20, 25);
    ctx.fillStyle = isGold ? '#fbbf24' : '#ccc';
    ctx.fillText(String(score.current).padStart(5, '0'), w - 20, 42);

    // ── Game State Overlays ──
    if (!gameStarted.current) {
      ctx.fillStyle = isGold ? '#fbbf24' : '#888';
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      if (isGold) {
        ctx.fillText('👑 ROYAL GOLDEN RUN UNLOCKED 👑', w / 2, h / 2 - 25);
      }
      ctx.fillStyle = isGold ? '#fef08a' : '#888';
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillText('PRESS SPACE OR TAP TO START', w / 2, h / 2 - 5);
      ctx.fillStyle = isGold ? '#d97706' : '#555';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('↑ / SPACE = JUMP', w / 2, h / 2 + 15);
    }

    if (gameOver.current) {
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', w / 2, h / 2 - 15);
      ctx.fillStyle = isGold ? '#fbbf24' : '#888';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText(`SCORE: ${score.current}`, w / 2, h / 2 + 8);
      ctx.fillText('PRESS SPACE TO RESTART', w / 2, h / 2 + 28);
    }
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawFrame(ctx);
    frameId.current = requestAnimationFrame(gameLoop);
  }, [drawFrame]);

  const isGoldPending = useRef(false);

  // Start/stop game loop when dino mode toggles
  useEffect(() => {
    if (isDinoMode) {
      resetGame(isGoldPending.current);
      isGoldPending.current = false;
      // Small delay for canvas to mount
      const startTimeout = setTimeout(() => {
        frameId.current = requestAnimationFrame(gameLoop);
      }, 50);
      return () => {
        clearTimeout(startTimeout);
        cancelAnimationFrame(frameId.current);
      };
    } else {
      cancelAnimationFrame(frameId.current);
    }
  }, [isDinoMode, gameLoop, resetGame]);

  // Keyboard handler for dino game
  useEffect(() => {
    if (!isDinoMode) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
      if (e.code === 'Escape') {
        setIsDinoMode(false);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDinoMode, jump]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLogs: LogEntry[] = [...logs, { type: 'input', text: `$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    if (lower === '/clear' || lower === 'clear') {
      setLogs([]);
      setInput('');
      return;
    }

    if (lower === '/help' || lower === 'help') {
      newLogs.push(
        { type: 'output', text: 'Available Commands:' },
        { type: 'output', text: '  /projects  - List all featured projects' },
        { type: 'output', text: '  /skills    - Display technical skills & stack' },
        { type: 'output', text: '  /about     - Display Ayush\'s bio' },
        { type: 'output', text: '  /dino      - 🦕 Play the Dino game!' },
        { type: 'output', text: '  /sudo hire - Trigger Instant Hire protocol' },
        { type: 'output', text: '  /clear     - Clear terminal screen' }
      );
    } else if (lower === '/projects' || lower === 'projects') {
      newLogs.push({ type: 'output', text: '--- FEATURED REPOSITORIES ---' });
      projects.forEach((p, i) => {
        newLogs.push({ type: 'output', text: `[${i + 1}] ${p.name.padEnd(12)} | ${p.category.padEnd(16)} | ${p.stack.join(', ')}` });
      });
    } else if (lower === '/skills' || lower === 'skills') {
      newLogs.push(
        { type: 'output', text: 'Languages:   Rust, Go, C/C++, TypeScript, Python, Bash, Lua' },
        { type: 'output', text: 'Frameworks:  React, Next.js, Tokio, Actix Web, Express' },
        { type: 'output', text: 'Robotics:    ROS 2, MoveIt Task Constructor, Gazebo, Docker' },
        { type: 'output', text: 'Cloud:       AWS, PostgreSQL, Redis, Cloudflare, Nginx' }
      );
    } else if (lower === '/about' || lower === 'about') {
      newLogs.push(
        { type: 'output', text: 'Ayush Shah — Software Engineer' },
        { type: 'output', text: 'Specializes in AI agents, high-performance systems, and ROS 2 robotics.' },
        { type: 'output', text: 'Currently Interning @ Roboparadigm (Pick-and-place manipulation).' }
      );
    } else if (lower === '/sudo hire' || lower.includes('hire')) {
      newLogs.push(
        { type: 'success', text: '⚡ EXECUTING: /sudo hire ayush' },
        { type: 'success', text: '✔ Credentials Verified: 100% Match for Senior Software / Systems / AI Role' },
        { type: 'success', text: '📩 Contact Email: ayushwasnothere@gmail.com' }
      );
    } else if (lower === '/dino' || lower === 'dino' || lower === '/dino gold' || lower === '/gold') {
      const isGoldForce = lower.includes('gold');
      isGoldPending.current = isGoldForce;
      newLogs.push(
        { type: 'success', text: isGoldForce ? '👑 Launching Royal Golden Dino Runner...' : '🦕 Launching Dino Runner...' },
        { type: 'system', text: 'Controls: SPACE / ↑ to jump, ESC to exit' }
      );
      setLogs(newLogs);
      setInput('');
      setTimeout(() => {
        setIsDinoMode(true);
      }, 200);
      return;
    } else {
      newLogs.push({ type: 'error', text: `Command not recognized: '${trimmed}'. Type /help for assistance.` });
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <section id="terminal" className="pb-section" ref={container}>
      <div className="container">
        <div className={`terminal-card max-w-4xl mx-auto rounded-2xl overflow-hidden border transition-colors ${
          isGoldenActive ? 'border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'border-border/60'
        } bg-background-light/40 backdrop-blur-xl shadow-2xl`}>
          {/* Terminal Window Header */}
          <div className="bg-background-light/90 px-5 py-3.5 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono flex items-center gap-2">
                {isDinoMode ? (
                  isGoldenActive ? (
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                      👑 ROYAL DINO RUNNER — GOLDEN EDITION
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" /> dino-runner — PLAYING
                    </span>
                  )
                ) : (
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" /> ayush-shell@portfolio:~ (bash)
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {isDinoMode && (
                <button
                  onClick={() => setIsDinoMode(false)}
                  className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  ✕ Exit Game
                </button>
              )}
              <button
                onClick={() => { setIsDinoMode(false); handleCommand('/clear'); }}
                className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Clear
              </button>
            </div>
          </div>

          {/* Terminal Body — either logs or dino game canvas */}
          {isDinoMode ? (
            <div className="flex items-center justify-center bg-[#0a0a0a] p-4" style={{ minHeight: 260 }}>
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                onClick={jump}
                onTouchStart={jump}
                className="block rounded-lg border border-border/30 cursor-pointer w-full max-w-[700px]"
                style={{ imageRendering: 'pixelated', aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
              />
            </div>
          ) : (
            <div className="p-6 h-[320px] overflow-y-auto font-mono text-sm space-y-2 bg-black/40">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`leading-relaxed ${
                    log.type === 'input'
                      ? 'text-primary font-semibold'
                      : log.type === 'system'
                      ? 'text-muted-foreground'
                      : log.type === 'success'
                      ? 'text-emerald-400 font-semibold'
                      : log.type === 'error'
                      ? 'text-red-400'
                      : 'text-foreground/90'
                  }`}
                >
                  {log.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          )}

          {/* Quick Command Buttons */}
          {!isDinoMode && (
            <div className="px-6 py-3 bg-background-light/30 border-t border-border/30 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-mono text-muted-foreground mr-1">Quick:</span>
              {['/projects', '/skills', '/dino', '/sudo hire'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 border border-border/40 hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  {cmd === '/dino' ? (
                    <Gamepad2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Sparkles className="w-3 h-3 text-primary" />
                  )}
                  {cmd}
                </button>
              ))}
            </div>
          )}

          {/* Terminal Input Form */}
          {!isDinoMode && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(input);
              }}
              className="px-6 py-3.5 bg-background-light/70 border-t border-border/40 flex items-center gap-3"
            >
              <span className="font-mono text-primary font-bold">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command (e.g. /help, /dino, /projects)..."
                className="grow bg-transparent border-none outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-1.5 rounded-lg bg-primary text-background disabled:opacity-30 hover:bg-primary-hover transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
