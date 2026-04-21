import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game.css';

const LEVELS = [
  {
    name: 'Jardín Mágico',
    bg: ['#1a0a2e', '#2d1060', '#4a1a80'],
    ground: '#5a2d8a', platColor: '#8a4fcc',
    msg: '💛 Desde el primer día, tu sonrisa iluminó mi mundo como el sol que sos.\nCada momento a tu lado es el más hermoso de mi vida.',
    emoji: '🌸'
  },
  {
    name: 'Ciudad entre Nubes',
    bg: ['#0a1a3e', '#1a3060', '#2a4880'],
    ground: '#2a4880', platColor: '#4a7ac0',
    msg: '✨ Dos años de risas, de aventuras y de crecer juntos.\nNo cambiaría ni un solo segundo de todo lo que vivimos.',
    emoji: '☁️'
  },
  {
    name: 'Playa al Atardecer',
    bg: ['#3a1a00', '#7a3a00', '#c06010'],
    ground: '#c06010', platColor: '#e08830',
    msg: '🌅 Sol, sos la persona más especial que conocí.\nGracias por existir y por elegirme cada día.\n\n¡Felices 2 años, mi amor! 💕',
    emoji: '🌺'
  }
];

const MINI_MSGS = [
  'Sos la luz de mis días ☀️',
  'Me hacés la persona más feliz 🥰',
  'Cada día me enamoro más 💫',
  'Tu risa es mi canción favorita 🎵',
  'Gracias por existir, Sol 💛',
  'Mi persona favorita del mundo 🌍',
  'Mi corazón late por vos ❤️',
  'Juntos somos invencibles ✨',
  'Sos mi razón para sonreír 😊',
  'Para siempre sos vos 🌹',
];
const HEARTS_PER_LEVEL = 5;

const GamePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'levelend' | 'end'>('menu');
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [totalHearts, setTotalHearts] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [showHUD, setShowHUD] = useState(false);
  const msgTimeoutRef = useRef<any>(null);

  // Game references
  const gameRef = useRef({
    player: { x: 100, y: 0, w: 34, h: 46, vx: 0, vy: 0, onGround: false, facingRight: true, frame: 0, ft: 0 },
    platforms: [] as any[],
    hearts: [] as any[],
    particles: [] as any[],
    stars: [] as any[],
    clouds: [] as any[],
    decorations: [] as any[],
    keys: {} as Record<string, boolean>,
    controls: { left: false, right: false, jump: false },
    isMobile: false,
    cameraX: 0,
    heartsCollected: 0,
    totalHearts: 0,
    loopRunning: false,
    W: 0, H: 0,
    showingMsg: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const g = gameRef.current;

    const resize = () => {
      g.W = canvas.width = window.innerWidth;
      g.H = canvas.height = window.innerHeight;
      g.isMobile = g.W < 768;
      
      // Re-init background elements on resize
      if (gameState === 'menu') {
        g.stars = Array.from({ length: 90 }, () => ({
          x: Math.random() * g.W, y: Math.random() * g.H,
          r: Math.random() * 2 + 0.5, tw: Math.random() * Math.PI * 2, sp: 0.015
        }));
        g.clouds = Array.from({ length: 14 }, () => ({
          x: Math.random() * g.W, y: Math.random() * (g.H * 0.4) + 20,
          w: 90 + Math.random() * 130, h: 32 + Math.random() * 28, sp: 0.2
        }));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleKeyDown = (e: KeyboardEvent) => {
      g.keys[e.key] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    };
    const handleKeyUp = (e: KeyboardEvent) => g.keys[e.key] = false;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Initial background elements
    g.stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * g.W, y: Math.random() * g.H,
      r: Math.random() * 2 + 0.5, tw: Math.random() * Math.PI * 2, sp: 0.015
    }));
    g.clouds = Array.from({ length: 18 }, () => ({
      x: Math.random() * g.W, y: Math.random() * (g.H * 0.4) + 20,
      w: 90 + Math.random() * 130, h: 32 + Math.random() * 28, sp: 0.2
    }));

    let animationFrameId: number;

    const loop = () => {
      if (gameState === 'playing' || gameState === 'levelend' || gameState === 'end') {
        update();
      }
      draw(ctx);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, level]);

  const loadLevel = (lv: number) => {
    const g = gameRef.current;
    const WORLD_W = 2500;
    
    // Adjust ground and platform heights for mobile
    const gh = g.isMobile ? 160 : 70;

    g.player = { x: 100, y: 0, w: 34, h: 46, vx: 0, vy: 0, onGround: false, facingRight: true, frame: 0, ft: 0 };
    g.player.y = g.H - gh - g.player.h;

    // Richer platform structure - adjusted for new ground height
    g.platforms = [
      { x: 0, y: g.H - gh, w: WORLD_W, h: gh, ground: true },
      // Level start
      { x: 220, y: g.H - gh - 100, w: 180, h: 18 },
      { x: 460, y: g.H - gh - 190, w: 160, h: 18 },
      { x: 700, y: g.H - gh - 100, w: 160, h: 18 },
      // Multi-layer middle
      { x: 920, y: g.H - gh - 180, w: 140, h: 18 },
      { x: 920, y: g.H - gh - 330, w: 140, h: 18 },
      { x: 1150, y: g.H - gh - 250, w: 200, h: 18 },
      { x: 1450, y: g.H - gh - 130, w: 160, h: 18 },
      { x: 1550, y: g.H - gh - 310, w: 120, h: 18 },
      // Path to end
      { x: 1750, y: g.H - gh - 180, w: 180, h: 18 },
      { x: 2050, y: g.H - gh - 250, w: 150, h: 18 },
      { x: 2280, y: g.H - gh - 150, w: 180, h: 18 },
    ];

    // Decorations
    g.decorations = [];
    // Random scenery
    for (let i = 0; i < 30; i++) {
        const type = lv === 0 ? 'flower' : lv === 1 ? 'window' : 'starfish';
        g.decorations.push({
            x: Math.random() * WORLD_W,
            y: lv === 1 ? (Math.random() * (g.H * 0.6)) : (g.H - gh - 15),
            type: type,
            offset: Math.random() * 10
        });
    }
    // Specific decorations on platforms
    g.platforms.forEach(p => {
        if (!p.ground && p.w > 120) {
            const decType = lv === 0 ? 'bush' : lv === 1 ? 'sign' : 'palm';
            g.decorations.push({ x: p.x + 20, y: p.y, type: decType, onPlatform: true });
        }
    });

    const levelHearts = [];
    g.platforms.forEach((p, i) => {
      if (!p.ground) {
        levelHearts.push({
          x: p.x + p.w / 2, y: p.y - 38,
          collected: false, float: i * 0.8,
          msg: MINI_MSGS[i % MINI_MSGS.length]
        });
      }
    });
    // Extra hearts
    levelHearts.push({ x: 500, y: g.H - gh - 50, collected: false, float: 2.1, msg: MINI_MSGS[7] });
    levelHearts.push({ x: 1200, y: g.H - gh - 50, collected: false, float: 4.3, msg: MINI_MSGS[8] });
    levelHearts.push({ x: 1900, y: g.H - gh - 50, collected: false, float: 1.5, msg: MINI_MSGS[9] });
    g.hearts = levelHearts.slice(0, HEARTS_PER_LEVEL);

    g.heartsCollected = 0;
    g.totalHearts = g.hearts.length;
    setScore(0);
    setTotalHearts(g.totalHearts);
    
    g.particles = [];
    g.stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * WORLD_W, y: Math.random() * (g.H * 0.7),
      r: Math.random() * 2 + 0.5, tw: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.025 + 0.008
    }));
    g.clouds = Array.from({ length: 18 }, () => ({
      x: Math.random() * WORLD_W, y: Math.random() * (g.H * 0.38) + 20,
      w: 90 + Math.random() * 130, h: 32 + Math.random() * 28, sp: 0.18 + Math.random() * 0.18
    }));

    g.cameraX = 0;
  };

  const startGame = () => {
    loadLevel(0);
    setLevel(0);
    setGameState('playing');
    setShowHUD(true);
  };

  const update = () => {
    const g = gameRef.current;
    if (gameState !== 'playing') {
      if (gameState === 'end') {
        g.particles.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life--;
        });
        g.particles = g.particles.filter(p => p.life > 0);
      }
      return;
    };

    const WORLD_W = 2500;
    const left = g.keys['ArrowLeft'] || g.keys['a'] || g.keys['A'] || g.controls.left;
    const right = g.keys['ArrowRight'] || g.keys['d'] || g.keys['D'] || g.controls.right;
    const jump = g.keys['ArrowUp'] || g.keys['w'] || g.keys['W'] || g.keys[' '] || g.controls.jump;

    const speed = 5.2;
    if (left) { g.player.vx = -speed; g.player.facingRight = false; }
    else if (right) { g.player.vx = speed; g.player.facingRight = true; }
    else g.player.vx *= 0.75;

    if (jump && g.player.onGround) { g.player.vy = -12; g.player.onGround = false; }

    g.player.vy = Math.min(g.player.vy + 0.52, 18);
    g.player.x += g.player.vx;
    g.player.y += g.player.vy;

    g.player.ft++;
    if (g.player.ft > 7) { g.player.frame = (g.player.frame + 1) % 4; g.player.ft = 0; }

    g.player.onGround = false;
    g.platforms.forEach(p => {
      if (g.player.x + g.player.w > p.x && g.player.x < p.x + p.w &&
          g.player.y + g.player.h > p.y && g.player.y + g.player.h < p.y + p.h + 18 && g.player.vy >= 0) {
        g.player.y = p.y - g.player.h; g.player.vy = 0; g.player.onGround = true;
      }
    });

    g.player.x = Math.max(0, Math.min(g.player.x, WORLD_W - g.player.w));
    if (g.player.y > g.H + 60) { g.player.y = g.platforms[0].y - g.player.h; g.player.x = 100; g.player.vx = 0; g.player.vy = 0; }

    const targetCam = g.player.x - g.W / 3;
    g.cameraX += (targetCam - g.cameraX) * 0.1;
    g.cameraX = Math.max(0, Math.min(g.cameraX, WORLD_W - g.W));

    g.hearts.forEach((h) => {
      if (h.collected) return;
      h.float += 0.045;
      const hy = h.y + Math.sin(h.float) * 6;
      if (g.player.x < h.x + 22 && g.player.x + g.player.w > h.x - 22 &&
          g.player.y < hy + 22 && g.player.y + g.player.h > hy - 22) {
        h.collected = true;
        g.heartsCollected++;
        setScore(g.heartsCollected);
        spawnParticles(h.x - g.cameraX, hy, '#ff4499', 18);
        if (g.heartsCollected < g.totalHearts) {
          showMsg(h.msg);
        }
      }
    });

    g.clouds.forEach(c => { c.x -= c.sp; if (c.x + c.w < 0) c.x = WORLD_W; });
    g.stars.forEach(s => s.tw += s.sp);
    g.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.life--;
    });
    g.particles = g.particles.filter(p => p.life > 0);

    if (g.heartsCollected >= g.totalHearts && g.totalHearts > 0) {
      g.totalHearts = 0;
      setGameState('levelend');
    }
  };

  const spawnParticles = (x: number, y: number, color: string, n: number) => {
    const g = gameRef.current;
    for (let i = 0; i < n; i++) g.particles.push({
      x, y, vx: (Math.random() - 0.5) * 6, vy: Math.random() * -7 - 1,
      life: 45 + Math.random() * 20, color, r: 4 + Math.random() * 5
    });
  };

  const showMsg = (txt: string) => {
    if (msgTimeoutRef.current) clearTimeout(msgTimeoutRef.current);
    setMsg(txt);
    msgTimeoutRef.current = setTimeout(() => {
      setMsg(null);
      msgTimeoutRef.current = null;
    }, 3200);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    const g = gameRef.current;
    ctx.clearRect(0, 0, g.W, g.H);
    const ld = LEVELS[Math.min(level, LEVELS.length - 1)];

    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, g.H);
    sky.addColorStop(0, ld.bg[0]); sky.addColorStop(0.5, ld.bg[1]); sky.addColorStop(1, ld.bg[2]);
    ctx.fillStyle = sky; ctx.fillRect(0, 0, g.W, g.H);

    // Stars
    g.stars.forEach(s => {
      const a = 0.35 + 0.65 * Math.abs(Math.sin(s.tw));
      ctx.fillStyle = `rgba(255,255,220,${a})`;
      ctx.beginPath(); ctx.arc(s.x - g.cameraX * 0.1, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });

    // Clouds
    g.clouds.forEach(c => {
      ctx.fillStyle = 'rgba(255,255,255,0.13)';
      const cx = c.x - g.cameraX * 0.3;
      ctx.beginPath();
      ctx.ellipse(cx, c.y, c.w * 0.55, c.h * 0.5, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + c.w * 0.18, c.y - c.h * 0.2, c.w * 0.38, c.h * 0.42, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - c.w * 0.22, c.y - c.h * 0.15, c.w * 0.32, c.h * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Decorations (Back)
    g.decorations.forEach(d => {
        if (d.onPlatform) return;
        const dx = d.x - g.cameraX;
        drawDecoration(ctx, dx, d.y, d.type);
    });

    // Platforms
    g.platforms.forEach(p => {
      const px = p.x - g.cameraX;
      if (p.ground) {
        ctx.fillStyle = ld.ground; ctx.fillRect(px, p.y, p.w, p.h);
        ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(px, p.y, p.w, 4);
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        // @ts-ignore
        if (ctx.roundRect) ctx.roundRect(px + 4, p.y + 6, p.w, p.h, 9);
        else ctx.rect(px+4, p.y+6, p.w, p.h);
        ctx.fill();

        ctx.fillStyle = ld.platColor;
        ctx.beginPath();
        // @ts-ignore
        if (ctx.roundRect) ctx.roundRect(px, p.y, p.w, p.h, 9);
        else ctx.rect(px, p.y, p.w, p.h);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.beginPath();
        // @ts-ignore
        if (ctx.roundRect) ctx.roundRect(px + 6, p.y + 3, p.w - 12, 5, 4);
        else ctx.rect(px+6, p.y+3, p.w-12, 5);
        ctx.fill();
      }
    });

    // Decorations (On platform)
    g.decorations.forEach(d => {
        if (!d.onPlatform) return;
        const dx = d.x - g.cameraX;
        drawDecoration(ctx, dx, d.y, d.type);
    });

    // Hearts
    g.hearts.forEach((h, i) => {
      if (h.collected) return;
      const hx = h.x - g.cameraX;
      const pulse = Math.sin(Date.now() * 0.005) * 2;
      const hy = h.y + Math.sin(h.float) * 6;
      drawBigHeart(ctx, hx, hy, 26 + pulse);
    });

    // Player
    if (gameState === 'playing' || gameState === 'levelend') {
      drawPlayer(ctx);
    }

    // Particles
    g.particles.forEach(p => {
      ctx.globalAlpha = Math.min(1, p.life / 40);
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
  };

  const drawDecoration = (ctx: CanvasRenderingContext2D, x: number, y: number, type: string) => {
      if (type === 'flower') {
          ctx.fillStyle = '#ff80cc';
          ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#ffcc00';
          ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      } else if (type === 'bush') {
          ctx.fillStyle = 'rgba(40, 160, 80, 0.6)';
          ctx.beginPath(); 
          ctx.ellipse(x, y - 10, 20, 15, 0, 0, Math.PI * 2);
          ctx.fill();
      } else if (type === 'palm') {
          ctx.fillStyle = '#663300';
          ctx.fillRect(x - 4, y - 40, 8, 40);
          ctx.fillStyle = '#228822';
          for(let i=0; i<4; i++) {
              ctx.beginPath();
              ctx.ellipse(x, y - 40, 20, 6, i * Math.PI/2, 0, Math.PI * 2);
              ctx.fill();
          }
      } else if (type === 'window') {
          ctx.fillStyle = 'rgba(200, 230, 255, 0.4)';
          ctx.fillRect(x, y, 20, 25);
          ctx.strokeStyle = 'white';
          ctx.strokeRect(x,y,20,25);
      } else if (type === 'sign') {
          ctx.fillStyle = '#aaa';
          ctx.fillRect(x, y-30, 2, 30);
          ctx.fillStyle = '#ff4444';
          ctx.fillRect(x-10, y-30, 20, 12);
      }
  };

  const drawBigHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number) => {
    ctx.save();
    ctx.shadowColor = '#ff2277';
    ctx.shadowBlur = 18;

    const grad = ctx.createRadialGradient(x, y - s * 0.1, s * 0.2, x, y, s * 1.2);
    grad.addColorStop(0, '#ff88cc');
    grad.addColorStop(0.5, '#ff2277');
    grad.addColorStop(1, '#aa0044');
    ctx.fillStyle = grad;

    const hs = s;
    ctx.beginPath();
    ctx.moveTo(x, y + hs * 0.35);
    ctx.bezierCurveTo(x, y + hs * 0.05, x - hs * 0.5, y - hs * 0.55, x - hs, y - hs * 0.1);
    ctx.bezierCurveTo(x - hs * 1.5, y + hs * 0.35, x - hs * 0.9, y + hs * 1.0, x, y + hs * 1.4);
    ctx.bezierCurveTo(x + hs * 0.9, y + hs * 1.0, x + hs * 1.5, y + hs * 0.35, x + hs, y - hs * 0.1);
    ctx.bezierCurveTo(x + hs * 0.5, y - hs * 0.55, x, y + hs * 0.05, x, y + hs * 0.35);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    ctx.ellipse(x - hs * 0.28, y - hs * 0.02, hs * 0.22, hs * 0.13, -0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    const t = Date.now() * 0.002;
    for (let i = 0; i < 4; i++) {
      const ang = t + i * Math.PI * 0.5;
      const rx = x + Math.cos(ang) * (s * 1.7);
      const ry = y + Math.sin(ang) * (s * 1.4);
      const sa = 0.5 + 0.5 * Math.sin(t * 3 + i);
      ctx.fillStyle = `rgba(255,220,100,${sa})`;
      ctx.beginPath(); ctx.arc(rx, ry, 2.5, 0, Math.PI * 2); ctx.fill();
    }
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D) => {
    const g = gameRef.current;
    const p = g.player;
    const px = p.x - g.cameraX, py = p.y;
    const bob = p.onGround ? Math.sin(p.frame * 1.6) * 2 : 0;
    const moving = Math.abs(p.vx) > 0.5;
    const legSwing = moving && p.onGround ? Math.sin(p.frame * 1.6) * 10 : 0;

    ctx.save();
    if (!p.facingRight) {
      ctx.translate(px + p.w / 2, py + p.h / 2 + bob);
      ctx.scale(-1, 1);
      ctx.translate(-(px + p.w / 2), -(py + p.h / 2 + bob));
    }

    const cx = px + p.w / 2, cy = py + bob;

    // Tag above head
    ctx.font = 'bold 13px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;
    ctx.fillStyle = 'white';
    ctx.fillText('Solcito', cx, cy - 25);
    ctx.shadowBlur = 0; // Reset shadow

    // Legs
    ctx.fillStyle = '#993377';
    ctx.beginPath(); 
    // @ts-ignore
    if (ctx.roundRect) ctx.roundRect(cx - 13, cy + 32, 11, 16 + legSwing * 0.4, 5);
    else ctx.rect(cx-13, cy+32, 11, 16+legSwing*0.4);
    ctx.fill();
    ctx.beginPath(); 
    // @ts-ignore
    if (ctx.roundRect) ctx.roundRect(cx + 2, cy + 32, 11, 16 - legSwing * 0.4, 5);
    else ctx.rect(cx+2, cy+32, 11, 16-legSwing*0.4);
    ctx.fill();

    // Shoes
    ctx.fillStyle = '#ff3388';
    ctx.beginPath(); 
    // @ts-ignore
    if (ctx.roundRect) ctx.roundRect(cx - 15, cy + 46 + legSwing * 0.4, 14, 7, 4);
    else ctx.rect(cx-15, cy+46+legSwing*0.4, 14, 7);
    ctx.fill();
    ctx.beginPath(); 
    // @ts-ignore
    if (ctx.roundRect) ctx.roundRect(cx, cy + 46 - legSwing * 0.4, 14, 7, 4);
    else ctx.rect(cx, cy+46-legSwing*0.4, 14, 7);
    ctx.fill();

    // Dress
    const dg = ctx.createLinearGradient(cx - 14, cy + 14, cx + 14, cy + 32);
    dg.addColorStop(0, '#ff80cc'); dg.addColorStop(1, '#cc44aa');
    ctx.fillStyle = dg;
    ctx.beginPath(); 
    // @ts-ignore
    if (ctx.roundRect) ctx.roundRect(cx - 14, cy + 14, 28, 22, 8);
    else ctx.rect(cx-14, cy+14, 28, 22);
    ctx.fill();

    ctx.fillStyle = '#ff80cc';
    ctx.beginPath();
    ctx.moveTo(cx - 14, cy + 28); ctx.lineTo(cx - 18, cy + 40); ctx.lineTo(cx + 18, cy + 40); ctx.lineTo(cx + 14, cy + 28);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath(); ctx.ellipse(cx, cy + 16, 9, 4, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffe0b0';
    ctx.beginPath(); 
    // @ts-ignore
    if (ctx.roundRect) ctx.roundRect(cx - 20, cy + 16, 7, 18, 4);
    else ctx.rect(cx-20, cy+16, 7, 18);
    ctx.fill();
    ctx.beginPath(); 
    // @ts-ignore
    if (ctx.roundRect) ctx.roundRect(cx + 13, cy + 16, 7, 18, 4);
    else ctx.rect(cx+13, cy+16, 7, 18);
    ctx.fill();

    ctx.fillStyle = '#ffe0b0';
    ctx.beginPath(); 
    // @ts-ignore
    if (ctx.roundRect) ctx.roundRect(cx - 5, cy + 8, 10, 10, 3);
    else ctx.rect(cx-5, cy+8, 10, 10);
    ctx.fill();

    ctx.fillStyle = '#ffe0b0';
    ctx.beginPath(); ctx.arc(cx, cy + 2, 15, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#2a1a00';
    ctx.beginPath();
    ctx.ellipse(cx, cy - 9, 16, 9, 0, Math.PI, 0); ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 12, cy - 2, 7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 12, cy - 2, 7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 6, cy - 10, 6, Math.PI, 0); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 6, cy - 10, 6, Math.PI, 0); ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 14, cy + 2);
    ctx.bezierCurveTo(cx - 18, cy + 12, cx - 20, cy + 28, cx - 18, cy + 40);
    ctx.lineWidth = 7; ctx.strokeStyle = '#2a1a00'; ctx.stroke();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + 14, cy + 2);
    ctx.bezierCurveTo(cx + 18, cy + 12, cx + 20, cy + 28, cx + 18, cy + 40);
    ctx.lineWidth = 7; ctx.strokeStyle = '#2a1a00'; ctx.stroke();
    ctx.lineWidth = 1;

    ctx.fillStyle = 'rgba(120,80,0,0.35)';
    ctx.beginPath(); ctx.ellipse(cx + 3, cy - 11, 7, 3, -0.4, 0, Math.PI * 2); ctx.fill();

    // Eyes (Kawaii Style)
    ctx.fillStyle = '#2a1a00';
    const ey = cy + 2.5;
    ctx.beginPath(); ctx.ellipse(cx - 6, ey, 4.5, 5.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 6, ey, 4.5, 5.5, 0, 0, Math.PI * 2); ctx.fill();

    // Eyelashes
    ctx.strokeStyle = '#2a1a00'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - 9, ey - 3); ctx.lineTo(cx - 12, ey - 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 9, ey - 3); ctx.lineTo(cx + 12, ey - 5); ctx.stroke();

    // Eye Sparks
    ctx.fillStyle = 'white';
    ctx.beginPath(); ctx.arc(cx - 5, ey - 2.5, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 7, ey - 2.5, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx - 7, ey + 1, 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 5, ey + 1, 0.8, 0, Math.PI * 2); ctx.fill();

    // Blush (Hearts)
    ctx.fillStyle = 'rgba(255,100,120,0.45)';
    const drawBlush = (bx: number, by: number) => {
        ctx.beginPath(); ctx.arc(bx - 1.5, by, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(bx + 1.5, by, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(bx - 3.5, by); ctx.lineTo(bx, by + 4); ctx.lineTo(bx + 3.5, by); ctx.fill();
    };
    drawBlush(cx - 10, cy + 8);
    drawBlush(cx + 10, cy + 8);

    // Mouth
    ctx.strokeStyle = '#cc5566'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.arc(cx, cy + 7, 4, 0.2, Math.PI - 0.2); ctx.stroke();
    ctx.lineWidth = 1;

    ctx.restore();
  };

  const nextLevel = () => {
    loadLevel(level + 1);
    setLevel(level + 1);
    setGameState('playing');
  };

  const finalScreen = () => {
    setGameState('end');
    setShowHUD(false);
    launchConfetti();
  };

  const launchConfetti = () => {
    const g = gameRef.current;
    const cols = ['#ff80c0', '#c44dff', '#ffcc00', '#ff6060', '#80ffcc', '#6699ff'];
    for (let i = 0; i < 180; i++) g.particles.push({
      x: Math.random() * g.W, y: -10,
      vx: (Math.random() - 0.5) * 5, vy: Math.random() * 3 + 1.5,
      life: 200 + Math.random() * 80, color: cols[Math.floor(Math.random() * cols.length)], r: 5 + Math.random() * 5
    });
    setTimeout(() => {
      if (document.visibilityState === 'visible') launchConfetti();
    }, 2000);
  };

  const navigate = useNavigate();
  const g = gameRef.current;

  return (
    <div className="game-container">
      <canvas ref={canvasRef} className="game-canvas" />
      
      <div className="game-ui">
        {showHUD && (
          <div className="game-hud">
            <span className="level-label">{LEVELS[level].name}</span>
            <span>💛 <span>{score}</span> / <span>{totalHearts}</span></span>
          </div>
        )}

        {gameState === 'menu' && (
          <div className="game-screen">
            <div className="screen-box">
              <div style={{fontSize:'2.8rem', marginBottom:'12px'}}>💛</div>
              <h1>El Mundo de Sol</h1>
              <p style={{fontSize:'0.95rem', marginBottom:'6px'}}>Un regalo especial para vos,<br />por nuestros 2 años juntos ✨</p>
              <p>Recolectá los corazones en cada nivel<br />para descubrir mensajes especiales.</p>
              <p style={{fontSize:'0.82rem', color:'#c090e0'}}>← → para moverse &nbsp;•&nbsp; ↑ o Espacio para saltar</p>
              <div className="flex flex-col gap-3">
                <button className="game-btn" onClick={startGame}>Comenzar aventura 💕</button>
              </div>
            </div>
          </div>
        )}

        {gameState === 'levelend' && (
          <div className="game-screen">
            <div className="screen-box">
              <div style={{fontSize:'2.4rem', marginBottom:'10px'}}>{LEVELS[level].emoji}</div>
              <div className="level-name">{LEVELS[level].name} completado</div>
              <h2 style={{margin:'12px 0 16px'}}>¡Nivel completado! ✨</h2>
              <p dangerouslySetInnerHTML={{ __html: LEVELS[level].msg.replace(/\n/g, '<br>') }} />
              {level < LEVELS.length - 1 ? (
                <button className="game-btn" onClick={nextLevel}>Siguiente nivel 💕</button>
              ) : (
                <button className="game-btn" onClick={finalScreen}>Ver dedicatoria final 💛</button>
              )}
            </div>
          </div>
        )}

        {gameState === 'end' && (
          <div className="game-screen">
            <div className="screen-box" style={{maxWidth:'520px'}}>
              <div style={{fontSize:'3rem', marginBottom:'12px'}}>💛</div>
              <h1 style={{fontSize:'1.8rem', marginBottom:'16px'}}>Para Sol, con todo mi amor</h1>
              <p style={{fontSize:'1.05rem', lineHeight:'1.8'}}>
                Dos años a tu lado fueron los mejores de mi vida.<br /><br />
                Cada día que pasa, me convenzo más de lo afortunado que soy<br />
                de tenerte a vos. Tu luz, tu risa, tu forma de ser<br />
                hacen que todo sea más bonito.<br /><br />
                Gracias por elegirme cada día, Sol. 🌸<br /><br />
                <strong style={{color:'#ffb3d9', fontSize:'1.2rem'}}>¡Felices 2 años, mi amor! 🎉💕</strong>
              </p>
              <button className="game-btn" style={{marginTop:'20px'}} onClick={() => navigate('/')}>Ver nuestra historia 💖</button>
            </div>
          </div>
        )}

        {msg && (
          <div className="msg-overlay">
            <div className="msg-box" dangerouslySetInnerHTML={{ __html: msg.replace(/\n/g, '<br>') }} />
          </div>
        )}

        {gameState === 'playing' && (
          <div className="controls-hint hidden md:block">↑ / Espacio = saltar &nbsp;|&nbsp; ← → = moverse</div>
        )}

        {gameState === 'playing' && (
          <div className="mobile-controls md:hidden">
            <div className="move-btns">
              <button 
                className={`control-btn ${gameState === 'playing' && g.controls.left ? 'active' : ''}`}
                onPointerDown={(e) => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); g.controls.left = true; }}
                onPointerUp={(e) => { e.preventDefault(); g.controls.left = false; }}
                onPointerCancel={(e) => { e.preventDefault(); g.controls.left = false; }}
              >←</button>
              <button 
                className={`control-btn ${gameState === 'playing' && g.controls.right ? 'active' : ''}`}
                onPointerDown={(e) => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); g.controls.right = true; }}
                onPointerUp={(e) => { e.preventDefault(); g.controls.right = false; }}
                onPointerCancel={(e) => { e.preventDefault(); g.controls.right = false; }}
              >→</button>
            </div>
            <button 
              className={`control-btn jump-btn ${gameState === 'playing' && g.controls.jump ? 'active' : ''}`}
              onPointerDown={(e) => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); g.controls.jump = true; }}
              onPointerUp={(e) => { e.preventDefault(); g.controls.jump = false; }}
              onPointerCancel={(e) => { e.preventDefault(); g.controls.jump = false; }}
            >SALTAR</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
