(() => {
  if (window.__autoScrollerLoaded) return;
  window.__autoScrollerLoaded = true;

  // ─── Themes ──────────────────────────────────────────────────────────────
  const THEMES = [
    // ── Dark classics
    { id:'purple',        name:'Purple',       sw:['#1a1a2e','#a78bfa'],
      v:{'--asc-bg':'#1a1a2e','--asc-sf':'#2d2d4e','--asc-br':'#4a4a7a','--asc-tx':'#e0e0e0','--asc-ac':'#a78bfa','--asc-bt':'#4f46e5','--asc-bh':'#6366f1','--asc-sh':'0 4px 24px rgba(0,0,0,.5)','--asc-bd':'none'},
      p:{img:'radial-gradient(circle,rgba(200,180,255,.22) 1px,transparent 1px),radial-gradient(circle,rgba(167,139,250,.14) 1px,transparent 1px),radial-gradient(ellipse 80px 40px at 30% 60%,rgba(139,92,246,.07) 0,transparent 100%),radial-gradient(ellipse 60px 80px at 75% 30%,rgba(109,40,217,.07) 0,transparent 100%)',size:'28px 28px,14px 14px,100% 100%,100% 100%'}},
    { id:'midnight',      name:'Midnight',     sw:['#0d1117','#58a6ff'],
      v:{'--asc-bg':'#0d1117','--asc-sf':'#161b22','--asc-br':'#30363d','--asc-tx':'#c9d1d9','--asc-ac':'#58a6ff','--asc-bt':'#1f6feb','--asc-bh':'#388bfd','--asc-sh':'0 4px 24px rgba(0,0,0,.6)','--asc-bd':'none'},
      p:{img:'radial-gradient(circle,rgba(255,255,255,.4) 1px,transparent 1px),radial-gradient(circle,rgba(255,255,255,.2) 1px,transparent 1px),repeating-linear-gradient(118deg,rgba(147,210,255,.04) 0 50px,transparent 50px 100px)',size:'40px 30px,20px 15px,auto'}},
    { id:'obsidian',      name:'Obsidian',     sw:['#1c1c1e','#94a3b8'],
      v:{'--asc-bg':'#1c1c1e','--asc-sf':'#2c2c2e','--asc-br':'#3a3a3c','--asc-tx':'#f2f2f7','--asc-ac':'#94a3b8','--asc-bt':'#3a3a3c','--asc-bh':'#4a4a4c','--asc-sh':'0 4px 24px rgba(0,0,0,.7)','--asc-bd':'none'},
      p:{img:'radial-gradient(ellipse 200px 80px at 20% 80%,rgba(148,163,184,.06) 0,transparent 100%),radial-gradient(ellipse 150px 200px at 80% 20%,rgba(148,163,184,.05) 0,transparent 100%),repeating-linear-gradient(135deg,rgba(100,120,140,.04) 0 1px,transparent 1px 30px)',size:'100% 100%,100% 100%,auto'}},
    { id:'charcoal',      name:'Charcoal',     sw:['#212121','#bdbdbd'],
      v:{'--asc-bg':'#212121','--asc-sf':'#2e2e2e','--asc-br':'#424242','--asc-tx':'#eeeeee','--asc-ac':'#bdbdbd','--asc-bt':'#424242','--asc-bh':'#616161','--asc-sh':'0 4px 20px rgba(0,0,0,.5)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(35deg,rgba(100,100,100,.07) 0 1px,transparent 1px 8px),repeating-linear-gradient(125deg,rgba(80,80,80,.05) 0 1px,transparent 1px 12px),repeating-linear-gradient(175deg,rgba(120,120,120,.04) 0 1px,transparent 1px 18px)'}},
    { id:'onyx',          name:'Onyx',         sw:['#0a0a0a','#fbbf24'],
      v:{'--asc-bg':'#0a0a0a','--asc-sf':'#1a1a1a','--asc-br':'#2a2a2a','--asc-tx':'#f5f5f5','--asc-ac':'#fbbf24','--asc-bt':'#92400e','--asc-bh':'#b45309','--asc-sh':'0 4px 24px rgba(0,0,0,.8)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(140deg,rgba(251,191,36,.1) 0 2px,rgba(251,191,36,.03) 2px 4px,transparent 4px 80px),repeating-linear-gradient(40deg,rgba(245,158,11,.07) 0 1px,transparent 1px 60px),repeating-linear-gradient(100deg,rgba(251,191,36,.05) 0 1px,transparent 1px 40px)'}},

    // ── Glass / Transparent
    { id:'glass-dark',    name:'Glass Dark',   sw:['#0f0f1e','#a78bfa'],
      v:{'--asc-bg':'rgba(15,15,30,.65)','--asc-sf':'rgba(255,255,255,.06)','--asc-br':'rgba(255,255,255,.12)','--asc-tx':'#e0e0f0','--asc-ac':'#a78bfa','--asc-bt':'rgba(79,70,229,.7)','--asc-bh':'rgba(99,102,241,.85)','--asc-sh':'0 8px 32px rgba(0,0,0,.4)','--asc-bd':'blur(16px) saturate(1.5)'},
      p:{img:'repeating-linear-gradient(55deg,rgba(255,255,255,.04) 0 1px,rgba(200,180,255,.02) 1px 6px,transparent 6px 40px),repeating-linear-gradient(-35deg,rgba(180,200,255,.03) 0 1px,transparent 1px 50px),radial-gradient(circle,rgba(255,255,255,.1) 1px,transparent 1px)',size:'auto,auto,30px 30px'}},
    { id:'glass-light',   name:'Glass Light',  sw:['rgba(255,255,255,.5)','#6366f1'],
      v:{'--asc-bg':'rgba(255,255,255,.55)','--asc-sf':'rgba(255,255,255,.3)','--asc-br':'rgba(255,255,255,.6)','--asc-tx':'#1e1e2e','--asc-ac':'#6366f1','--asc-bt':'#4f46e5','--asc-bh':'#6366f1','--asc-sh':'0 8px 32px rgba(31,38,135,.2)','--asc-bd':'blur(20px) saturate(1.8)'},
      p:{img:'linear-gradient(135deg,rgba(255,160,180,.08),rgba(255,220,140,.07),rgba(140,255,200,.06),rgba(140,180,255,.07),rgba(200,140,255,.07))',size:'400% 400%',anim:'asc-anim-aurora'}},
    { id:'glass-frost',   name:'Glass Frost',  sw:['#d8e8ff','#3b82f6'],
      v:{'--asc-bg':'rgba(200,220,255,.38)','--asc-sf':'rgba(255,255,255,.2)','--asc-br':'rgba(255,255,255,.5)','--asc-tx':'#1e3a5f','--asc-ac':'#3b82f6','--asc-bt':'#2563eb','--asc-bh':'#3b82f6','--asc-sh':'0 8px 32px rgba(59,130,246,.2)','--asc-bd':'blur(24px) saturate(2)'},
      p:{img:'repeating-linear-gradient(30deg,rgba(186,230,253,.12) 0 1px,transparent 1px 20px),repeating-linear-gradient(90deg,rgba(186,230,253,.1) 0 1px,transparent 1px 20px),repeating-linear-gradient(150deg,rgba(186,230,253,.12) 0 1px,transparent 1px 20px),radial-gradient(circle,rgba(255,255,255,.22) 1.5px,transparent 1.5px)',size:'20px 35px,20px 35px,20px 35px,40px 40px'}},
    { id:'glass-aurora',  name:'Glass Aurora', sw:['#0a1e28','#34d399'],
      v:{'--asc-bg':'rgba(10,30,40,.6)','--asc-sf':'rgba(52,211,153,.08)','--asc-br':'rgba(52,211,153,.2)','--asc-tx':'#e0faf4','--asc-ac':'#34d399','--asc-bt':'rgba(5,150,105,.7)','--asc-bh':'rgba(16,185,129,.85)','--asc-sh':'0 8px 32px rgba(0,0,0,.4)','--asc-bd':'blur(16px) saturate(1.8)'},
      p:{img:'repeating-linear-gradient(92deg,rgba(52,211,153,.12) 0 2px,rgba(16,185,129,.07) 2px 8px,rgba(56,189,248,.05) 8px 18px,transparent 18px 50px)',anim:'asc-anim-drift'}},
    { id:'glass-smoke',   name:'Glass Smoke',  sw:['#323232','#cbd5e1'],
      v:{'--asc-bg':'rgba(50,50,50,.55)','--asc-sf':'rgba(255,255,255,.07)','--asc-br':'rgba(255,255,255,.15)','--asc-tx':'#f1f5f9','--asc-ac':'#cbd5e1','--asc-bt':'rgba(71,85,105,.8)','--asc-bh':'rgba(100,116,139,.9)','--asc-sh':'0 8px 32px rgba(0,0,0,.3)','--asc-bd':'blur(20px) grayscale(.2)'},
      p:{img:'repeating-linear-gradient(78deg,rgba(203,213,225,.08) 0 2px,rgba(241,245,249,.04) 2px 20px,transparent 20px 70px),repeating-linear-gradient(-72deg,rgba(148,163,184,.06) 0 1px,transparent 1px 90px)'}},

    // ── Neon / Cyberpunk
    { id:'neon-pink',     name:'Neon Pink',    sw:['#0d0014','#f72585'],
      v:{'--asc-bg':'#0d0014','--asc-sf':'#1a0026','--asc-br':'#3d0060','--asc-tx':'#fff0ff','--asc-ac':'#f72585','--asc-bt':'#b5179e','--asc-bh':'#f72585','--asc-sh':'0 4px 24px rgba(247,37,133,.3)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(0deg,transparent 0 3px,rgba(247,37,133,.1) 3px 4px),repeating-linear-gradient(90deg,transparent 0 59px,rgba(247,37,133,.05) 59px 60px),radial-gradient(circle,rgba(247,37,133,.18) 1.5px,transparent 1.5px)',size:'auto,auto,48px 48px',anim:'asc-anim-scan'}},
    { id:'neon-cyan',     name:'Neon Cyan',    sw:['#001020','#00f5ff'],
      v:{'--asc-bg':'#001020','--asc-sf':'#002040','--asc-br':'#004060','--asc-tx':'#e0faff','--asc-ac':'#00f5ff','--asc-bt':'#006080','--asc-bh':'#00a0c0','--asc-sh':'0 4px 24px rgba(0,245,255,.25)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(0deg,transparent 0 3px,rgba(0,245,255,.08) 3px 4px),repeating-linear-gradient(90deg,transparent 0 24px,rgba(0,245,255,.04) 24px 25px),radial-gradient(circle,rgba(0,245,255,.16) 1.5px,transparent 1.5px)',size:'auto,auto,24px 16px',anim:'asc-anim-scan'}},
    { id:'neon-green',    name:'Matrix',       sw:['#000d00','#00ff41'],
      v:{'--asc-bg':'#000d00','--asc-sf':'#001500','--asc-br':'#003300','--asc-tx':'#00ff41','--asc-ac':'#00ff41','--asc-bt':'#003300','--asc-bh':'#004d00','--asc-sh':'0 4px 24px rgba(0,255,65,.2)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(0deg,transparent 0 2px,rgba(0,255,65,.06) 2px 3px),repeating-linear-gradient(90deg,transparent 0 16px,rgba(0,255,65,.05) 16px 17px),radial-gradient(circle,rgba(0,255,65,.25) 1px,transparent 1px)',size:'auto,auto,16px 32px',anim:'asc-anim-scan'}},
    { id:'cyberpunk',     name:'Cyberpunk',    sw:['#0d0d0d','#ffe600'],
      v:{'--asc-bg':'#0d0d0d','--asc-sf':'#1a1a00','--asc-br':'#333300','--asc-tx':'#fff9e6','--asc-ac':'#ffe600','--asc-bt':'#cc0066','--asc-bh':'#ff0080','--asc-sh':'0 4px 24px rgba(255,230,0,.2)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(90deg,rgba(255,230,0,.08) 0 1px,transparent 1px 60px),repeating-linear-gradient(0deg,rgba(255,0,128,.06) 0 1px,transparent 1px 40px),radial-gradient(circle,rgba(255,230,0,.2) 2px,rgba(255,230,0,.06) 3px,transparent 4px)',size:'auto,auto,60px 40px'}},
    { id:'synthwave',     name:'Synthwave',    sw:['#1a0533','#ff6ad5'],
      v:{'--asc-bg':'#1a0533','--asc-sf':'#2d0a52','--asc-br':'#5a1a8a','--asc-tx':'#f0e6ff','--asc-ac':'#ff6ad5','--asc-bt':'#7b2fbe','--asc-bh':'#9b4fe8','--asc-sh':'0 4px 24px rgba(255,106,213,.25)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,106,213,.1) 3px 4px),linear-gradient(180deg,rgba(255,106,213,.0) 40%,rgba(138,43,226,.18) 75%,rgba(255,106,213,.22) 100%),repeating-linear-gradient(90deg,rgba(138,43,226,.05) 0 1px,transparent 1px 40px)',anim:'asc-anim-scan'}},

    // ── Nature
    { id:'forest',        name:'Forest',       sw:['#0d1f0d','#4ade80'],
      v:{'--asc-bg':'#0d1f0d','--asc-sf':'#1a2e1a','--asc-br':'#2d4a2d','--asc-tx':'#d1fae5','--asc-ac':'#4ade80','--asc-bt':'#166534','--asc-bh':'#15803d','--asc-sh':'0 4px 24px rgba(0,0,0,.5)','--asc-bd':'none'},
      p:{img:'radial-gradient(ellipse 120px 60px at 20% 30%,rgba(74,222,128,.09) 0,transparent 100%),radial-gradient(ellipse 80px 100px at 70% 60%,rgba(34,197,94,.07) 0,transparent 100%),radial-gradient(ellipse 60px 40px at 45% 80%,rgba(74,222,128,.08) 0,transparent 100%),radial-gradient(circle,rgba(74,222,128,.12) 1px,transparent 1px)',size:'100% 100%,100% 100%,100% 100%,22px 18px'}},
    { id:'ocean',         name:'Ocean Deep',   sw:['#020e1c','#38bdf8'],
      v:{'--asc-bg':'#020e1c','--asc-sf':'#0c2340','--asc-br':'#1e4060','--asc-tx':'#e0f2fe','--asc-ac':'#38bdf8','--asc-bt':'#0369a1','--asc-bh':'#0284c7','--asc-sh':'0 4px 24px rgba(2,14,28,.7)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(-45deg,rgba(56,189,248,.12) 0 2px,transparent 2px 20px),repeating-linear-gradient(45deg,rgba(56,189,248,.07) 0 1px,transparent 1px 20px),radial-gradient(circle,rgba(56,189,248,.2) 1px,transparent 1px)',size:'28px 28px,28px 28px,36px 24px',anim:'asc-anim-wave'}},
    { id:'desert',        name:'Desert',       sw:['#2c1810','#fb923c'],
      v:{'--asc-bg':'#2c1810','--asc-sf':'#3d2415','--asc-br':'#5a3820','--asc-tx':'#fde8c8','--asc-ac':'#fb923c','--asc-bt':'#92400e','--asc-bh':'#b45309','--asc-sh':'0 4px 24px rgba(0,0,0,.5)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(8deg,rgba(251,146,60,.07) 0 1px,transparent 1px 12px),repeating-linear-gradient(0deg,rgba(251,146,60,.04) 0 1px,transparent 1px 8px),radial-gradient(ellipse 200px 100px at 80% 20%,rgba(251,191,36,.1) 0,transparent 100%),radial-gradient(ellipse 150px 80px at 20% 70%,rgba(251,146,60,.08) 0,transparent 100%)',size:'auto,auto,100% 100%,100% 100%'}},
    { id:'aurora',        name:'Aurora',       sw:['#020b18','#a78bfa'],
      v:{'--asc-bg':'#020b18','--asc-sf':'#0a1628','--asc-br':'#1e3a5f','--asc-tx':'#e8f4f8','--asc-ac':'#a78bfa','--asc-bt':'#5b21b6','--asc-bh':'#7c3aed','--asc-sh':'0 4px 32px rgba(167,139,250,.2)','--asc-bd':'none'},
      p:{img:'linear-gradient(180deg,rgba(167,139,250,.2) 0%,transparent 40%,rgba(52,211,153,.15) 50%,transparent 70%,rgba(56,189,248,.2) 100%),linear-gradient(135deg,rgba(167,139,250,.3),rgba(52,211,153,.25),rgba(56,189,248,.3),rgba(252,211,77,.2),rgba(167,139,250,.3))',size:'100% 100%,400% 400%',anim:'asc-anim-aurora'}},
    { id:'volcano',       name:'Volcano',      sw:['#1a0500','#f97316'],
      v:{'--asc-bg':'#1a0500','--asc-sf':'#2d0a00','--asc-br':'#5c1500','--asc-tx':'#fff1ec','--asc-ac':'#f97316','--asc-bt':'#c2410c','--asc-bh':'#ea580c','--asc-sh':'0 4px 24px rgba(249,115,22,.25)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(70deg,rgba(249,115,22,.12) 0 1px,transparent 1px 16px),repeating-linear-gradient(-70deg,rgba(239,68,68,.08) 0 1px,transparent 1px 22px),radial-gradient(ellipse 180px 60px at 30% 90%,rgba(249,115,22,.15) 0,transparent 100%),radial-gradient(ellipse 120px 40px at 80% 75%,rgba(239,68,68,.12) 0,transparent 100%)',size:'auto,auto,100% 100%,100% 100%',anim:'asc-anim-flow'}},

    // ── Pastel / Soft
    { id:'cotton-candy',  name:'Cotton Candy', sw:['#2a1a2e','#f9a8d4'],
      v:{'--asc-bg':'#2a1a2e','--asc-sf':'#3d2545','--asc-br':'#6b3f7a','--asc-tx':'#fce7f3','--asc-ac':'#f9a8d4','--asc-bt':'#9d174d','--asc-bh':'#be185d','--asc-sh':'0 4px 24px rgba(249,168,212,.2)','--asc-bd':'none'},
      p:{img:'radial-gradient(ellipse 120px 60px at 25% 35%,rgba(249,168,212,.18) 0,transparent 70%),radial-gradient(ellipse 80px 120px at 70% 65%,rgba(196,181,253,.14) 0,transparent 70%),radial-gradient(circle,rgba(249,168,212,.22) 1.5px,transparent 1.5px),radial-gradient(circle,rgba(216,180,254,.15) 1px,transparent 1px)',size:'100% 100%,100% 100%,28px 28px,14px 14px'}},
    { id:'mint',          name:'Mint',         sw:['#0f2318','#6ee7b7'],
      v:{'--asc-bg':'#0f2318','--asc-sf':'#1a3326','--asc-br':'#2d5040','--asc-tx':'#d1fae5','--asc-ac':'#6ee7b7','--asc-bt':'#065f46','--asc-bh':'#047857','--asc-sh':'0 4px 24px rgba(0,0,0,.4)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(120deg,rgba(110,231,183,.1) 0 1px,transparent 1px 20px),repeating-linear-gradient(60deg,rgba(110,231,183,.06) 0 1px,transparent 1px 20px),radial-gradient(ellipse 100px 50px at 15% 25%,rgba(110,231,183,.1) 0,transparent 100%),radial-gradient(ellipse 80px 100px at 80% 70%,rgba(52,211,153,.08) 0,transparent 100%)',size:'20px 35px,20px 35px,100% 100%,100% 100%'}},
    { id:'lavender',      name:'Lavender',     sw:['#1e1a2e','#c4b5fd'],
      v:{'--asc-bg':'#1e1a2e','--asc-sf':'#2e2845','--asc-br':'#5046a0','--asc-tx':'#ede9fe','--asc-ac':'#c4b5fd','--asc-bt':'#6d28d9','--asc-bh':'#7c3aed','--asc-sh':'0 4px 24px rgba(0,0,0,.4)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(45deg,rgba(196,181,253,.1) 0 1px,transparent 1px 14px),repeating-linear-gradient(-45deg,rgba(196,181,253,.1) 0 1px,transparent 1px 14px),radial-gradient(ellipse 160px 80px at 35% 40%,rgba(196,181,253,.12) 0,transparent 100%),radial-gradient(ellipse 100px 160px at 75% 70%,rgba(167,139,250,.1) 0,transparent 100%)',size:'20px 20px,20px 20px,100% 100%,100% 100%'}},
    { id:'peach',         name:'Peach',        sw:['#2c1a14','#fdba74'],
      v:{'--asc-bg':'#2c1a14','--asc-sf':'#3e2418','--asc-br':'#703b28','--asc-tx':'#fff7ed','--asc-ac':'#fdba74','--asc-bt':'#9a3412','--asc-bh':'#c2410c','--asc-sh':'0 4px 24px rgba(0,0,0,.4)','--asc-bd':'none'},
      p:{img:'radial-gradient(ellipse 200px 120px at 15% 35%,rgba(253,186,116,.2) 0,transparent 70%),radial-gradient(ellipse 150px 200px at 80% 60%,rgba(251,146,60,.12) 0,transparent 70%),radial-gradient(ellipse 100px 60px at 50% 85%,rgba(253,186,116,.15) 0,transparent 70%)'}},
    { id:'sky',           name:'Sky',          sw:['#0c1929','#7dd3fc'],
      v:{'--asc-bg':'#0c1929','--asc-sf':'#152536','--asc-br':'#1e3a52','--asc-tx':'#e0f2fe','--asc-ac':'#7dd3fc','--asc-bt':'#0369a1','--asc-bh':'#0284c7','--asc-sh':'0 4px 24px rgba(0,0,0,.4)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(173deg,rgba(125,211,252,.09) 0 2px,transparent 2px 44px),repeating-linear-gradient(168deg,rgba(125,211,252,.05) 0 1px,transparent 1px 66px),radial-gradient(ellipse 200px 60px at 30% 40%,rgba(125,211,252,.1) 0,transparent 100%),radial-gradient(ellipse 150px 40px at 75% 65%,rgba(186,230,253,.08) 0,transparent 100%)',size:'auto,auto,100% 100%,100% 100%',anim:'asc-anim-drift'}},

    // ── Vibrant / Bold
    { id:'cherry',        name:'Cherry',       sw:['#1a0a0a','#fb7185'],
      v:{'--asc-bg':'#1a0a0a','--asc-sf':'#2e1010','--asc-br':'#5c1a1a','--asc-tx':'#ffe4e6','--asc-ac':'#fb7185','--asc-bt':'#9f1239','--asc-bh':'#be123c','--asc-sh':'0 4px 24px rgba(251,113,133,.2)','--asc-bd':'none'},
      p:{img:'radial-gradient(ellipse 3px 2px at 18% 28%,rgba(251,113,133,.3) 0,transparent 100%),radial-gradient(ellipse 2px 3px at 48% 62%,rgba(251,113,133,.24) 0,transparent 100%),radial-gradient(ellipse 3px 2px at 74% 18%,rgba(251,113,133,.26) 0,transparent 100%),radial-gradient(ellipse 2px 3px at 32% 78%,rgba(251,113,133,.2) 0,transparent 100%),radial-gradient(ellipse 3px 2px at 86% 52%,rgba(251,113,133,.22) 0,transparent 100%)'}},
    { id:'electric',      name:'Electric',     sw:['#00001a','#60a5fa'],
      v:{'--asc-bg':'#00001a','--asc-sf':'#000833','--asc-br':'#001a66','--asc-tx':'#eff6ff','--asc-ac':'#60a5fa','--asc-bt':'#1d4ed8','--asc-bh':'#2563eb','--asc-sh':'0 4px 24px rgba(96,165,250,.25)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(60deg,rgba(96,165,250,.09) 0 1px,transparent 1px 14px),repeating-linear-gradient(-60deg,rgba(96,165,250,.09) 0 1px,transparent 1px 14px),radial-gradient(circle,rgba(96,165,250,.22) 1.5px,rgba(96,165,250,.06) 2.5px,transparent 4px)',size:'24px 24px,24px 24px,48px 48px',anim:'asc-anim-wave'}},
    { id:'tangerine',     name:'Tangerine',    sw:['#1a0d00','#fb923c'],
      v:{'--asc-bg':'#1a0d00','--asc-sf':'#2e1800','--asc-br':'#5c3200','--asc-tx':'#fff7ed','--asc-ac':'#fb923c','--asc-bt':'#c2410c','--asc-bh':'#ea580c','--asc-sh':'0 4px 24px rgba(251,146,60,.25)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(30deg,rgba(251,146,60,.1) 0 1px,transparent 1px 18px),repeating-linear-gradient(90deg,rgba(251,146,60,.06) 0 1px,transparent 1px 18px),repeating-linear-gradient(150deg,rgba(251,146,60,.06) 0 1px,transparent 1px 18px),radial-gradient(ellipse 120px 80px at 20% 60%,rgba(251,146,60,.1) 0,transparent 100%)',size:'18px 31px,18px 31px,18px 31px,100% 100%'}},
    { id:'emerald',       name:'Emerald',      sw:['#001a0a','#34d399'],
      v:{'--asc-bg':'#001a0a','--asc-sf':'#002d14','--asc-br':'#005c28','--asc-tx':'#ecfdf5','--asc-ac':'#34d399','--asc-bt':'#047857','--asc-bh':'#059669','--asc-sh':'0 4px 24px rgba(52,211,153,.2)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(45deg,rgba(52,211,153,.09) 0 1px,transparent 1px 12px),repeating-linear-gradient(-45deg,rgba(52,211,153,.09) 0 1px,transparent 1px 12px),radial-gradient(circle,rgba(52,211,153,.22) 1.5px,transparent 1.5px)',size:'17px 17px,17px 17px,34px 34px'}},
    { id:'royal',         name:'Royal',        sw:['#0c0014','#e9b849'],
      v:{'--asc-bg':'#0c0014','--asc-sf':'#1a0028','--asc-br':'#4b0082','--asc-tx':'#f5e6ff','--asc-ac':'#e9b849','--asc-bt':'#6b21a8','--asc-bh':'#7e22ce','--asc-sh':'0 4px 24px rgba(107,33,168,.4)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(45deg,rgba(233,184,73,.08) 0 2px,transparent 2px 24px),repeating-linear-gradient(-45deg,rgba(233,184,73,.06) 0 1px,transparent 1px 24px),radial-gradient(circle,rgba(233,184,73,.12) 1.5px,transparent 1.5px)',size:'24px 24px,24px 24px,36px 36px'}},

    // ── Neumorphism
    { id:'neumorph-dark', name:'Soft Dark',    sw:['#1e2028','#7c8cf8'],
      v:{'--asc-bg':'#1e2028','--asc-sf':'#252832','--asc-br':'#31343e','--asc-tx':'#c8ccdf','--asc-ac':'#7c8cf8','--asc-bt':'#3a3f52','--asc-bh':'#4a4f64','--asc-sh':'6px 6px 12px #141619,-6px -6px 12px #282c37','--asc-bd':'none'},
      p:{img:'radial-gradient(ellipse 200px 100px at 20% 25%,rgba(124,140,248,.06) 0,transparent 100%),radial-gradient(ellipse 150px 200px at 75% 70%,rgba(99,102,241,.05) 0,transparent 100%),radial-gradient(circle,rgba(124,140,248,.09) 1px,transparent 1px)',size:'100% 100%,100% 100%,20px 20px'}},
    { id:'neumorph-light',name:'Soft Light',   sw:['#e8ecf0','#6366f1'],
      v:{'--asc-bg':'#e8ecf0','--asc-sf':'#dde1e5','--asc-br':'#c8ccd0','--asc-tx':'#2d3748','--asc-ac':'#6366f1','--asc-bt':'#4f46e5','--asc-bh':'#6366f1','--asc-sh':'6px 6px 12px #c5c9cd,-6px -6px 12px #ffffff','--asc-bd':'none'},
      p:{img:'radial-gradient(ellipse 200px 100px at 25% 30%,rgba(99,102,241,.06) 0,transparent 100%),radial-gradient(ellipse 150px 200px at 70% 65%,rgba(79,70,229,.04) 0,transparent 100%),radial-gradient(circle,rgba(99,102,241,.07) 1px,transparent 1px)',size:'100% 100%,100% 100%,20px 20px'}},

    // ── Light themes
    { id:'paper',         name:'Paper',        sw:['#fafafa','#4f46e5'],
      v:{'--asc-bg':'#fafafa','--asc-sf':'#f0f0f0','--asc-br':'#d0d0d0','--asc-tx':'#1a1a2e','--asc-ac':'#4f46e5','--asc-bt':'#4f46e5','--asc-bh':'#6366f1','--asc-sh':'0 4px 20px rgba(0,0,0,.12)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(0deg,rgba(79,70,229,.07) 0 1px,transparent 1px 22px),repeating-linear-gradient(90deg,rgba(79,70,229,.03) 0 1px,transparent 1px 80px),radial-gradient(ellipse 200px 100px at 60% 30%,rgba(79,70,229,.04) 0,transparent 100%)'}},
    { id:'cream',         name:'Cream',        sw:['#fdf6e3','#8b6914'],
      v:{'--asc-bg':'#fdf6e3','--asc-sf':'#f5ead0','--asc-br':'#d4b896','--asc-tx':'#3d2b1f','--asc-ac':'#8b6914','--asc-bt':'#92400e','--asc-bh':'#b45309','--asc-sh':'0 4px 20px rgba(0,0,0,.1)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(30deg,rgba(139,105,20,.05) 0 1px,transparent 1px 16px),repeating-linear-gradient(-30deg,rgba(139,105,20,.04) 0 1px,transparent 1px 22px),radial-gradient(ellipse 180px 120px at 70% 40%,rgba(215,180,80,.08) 0,transparent 100%),radial-gradient(ellipse 120px 180px at 25% 70%,rgba(180,140,60,.06) 0,transparent 100%)'}},
    { id:'material',      name:'Material',     sw:['#ffffff','#6200ee'],
      v:{'--asc-bg':'#ffffff','--asc-sf':'#f5f5f5','--asc-br':'#e0e0e0','--asc-tx':'#212121','--asc-ac':'#6200ee','--asc-bt':'#6200ee','--asc-bh':'#3700b3','--asc-sh':'0 2px 8px rgba(0,0,0,.14),0 4px 16px rgba(0,0,0,.1)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(0deg,rgba(98,0,238,.04) 0 1px,transparent 1px 24px),repeating-linear-gradient(90deg,rgba(98,0,238,.04) 0 1px,transparent 1px 24px),radial-gradient(ellipse 200px 100px at 80% 20%,rgba(98,0,238,.05) 0,transparent 100%)',size:'24px 24px,24px 24px,100% 100%'}},

    // ── Special FX
    { id:'galaxy',        name:'Galaxy',       sw:['#050a1f','#818cf8'],
      v:{'--asc-bg':'#050a1f','--asc-sf':'#0e1535','--asc-br':'#1e2d6a','--asc-tx':'#e0e7ff','--asc-ac':'#818cf8','--asc-bt':'#3730a3','--asc-bh':'#4338ca','--asc-sh':'0 4px 32px rgba(79,70,229,.3)','--asc-bd':'none'},
      p:{img:'radial-gradient(1.5px 1.5px at 8% 12%,rgba(255,255,255,.5) 0,transparent 100%),radial-gradient(1px 1px at 22% 38%,rgba(255,255,255,.4) 0,transparent 100%),radial-gradient(2px 2px at 38% 18%,rgba(129,140,248,.5) 0,transparent 100%),radial-gradient(1px 1px at 52% 72%,rgba(255,255,255,.5) 0,transparent 100%),radial-gradient(1.5px 1.5px at 68% 28%,rgba(165,243,252,.4) 0,transparent 100%),radial-gradient(1px 1px at 78% 62%,rgba(255,255,255,.4) 0,transparent 100%),radial-gradient(2px 2px at 88% 15%,rgba(255,255,255,.3) 0,transparent 100%),radial-gradient(1px 1px at 14% 80%,rgba(255,255,255,.4) 0,transparent 100%),radial-gradient(1px 1px at 44% 90%,rgba(165,243,252,.3) 0,transparent 100%),radial-gradient(1.5px 1.5px at 92% 50%,rgba(255,255,255,.4) 0,transparent 100%)',anim:'asc-anim-blink'}},
    { id:'sunset',        name:'Sunset',       sw:['#1a0a1e','#f97316'],
      v:{'--asc-bg':'#1a0a1e','--asc-sf':'#2a1028','--asc-br':'#5a2060','--asc-tx':'#ffe4cc','--asc-ac':'#f97316','--asc-bt':'#9333ea','--asc-bh':'#a855f7','--asc-sh':'0 4px 24px rgba(249,115,22,.2)','--asc-bd':'none'},
      p:{img:'linear-gradient(180deg,rgba(147,51,234,.25) 0%,rgba(249,115,22,.2) 60%,rgba(239,68,68,.2) 100%),radial-gradient(circle,rgba(249,115,22,.18) 1.5px,transparent 1.5px)',size:'100% 100%,30px 20px'}},
    { id:'nordic',        name:'Nordic',       sw:['#2e3440','#88c0d0'],
      v:{'--asc-bg':'#2e3440','--asc-sf':'#3b4252','--asc-br':'#4c566a','--asc-tx':'#eceff4','--asc-ac':'#88c0d0','--asc-bt':'#5e81ac','--asc-bh':'#81a1c1','--asc-sh':'0 4px 24px rgba(0,0,0,.4)','--asc-bd':'none'},
      p:{img:'radial-gradient(circle,rgba(136,192,208,.12) 1px,transparent 1px),radial-gradient(ellipse 200px 80px at 30% 60%,rgba(136,192,208,.08) 0,transparent 100%),radial-gradient(ellipse 150px 200px at 75% 30%,rgba(94,129,172,.06) 0,transparent 100%)',size:'20px 20px,100% 100%,100% 100%'}},
    { id:'rose-gold',     name:'Rose Gold',    sw:['#1f0f14','#f4a4b8'],
      v:{'--asc-bg':'#1f0f14','--asc-sf':'#2e1820','--asc-br':'#6b3045','--asc-tx':'#ffe4ec','--asc-ac':'#f4a4b8','--asc-bt':'#9f1239','--asc-bh':'#be185d','--asc-sh':'0 4px 24px rgba(244,164,184,.2)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(105deg,rgba(244,164,184,.15) 0 1px,rgba(255,215,180,.08) 1px 6px,transparent 6px 20px),radial-gradient(ellipse 150px 80px at 25% 35%,rgba(244,164,184,.12) 0,transparent 100%),radial-gradient(ellipse 100px 150px at 75% 65%,rgba(255,185,145,.1) 0,transparent 100%)',anim:'asc-anim-shimmer'}},
    { id:'copper',        name:'Copper',       sw:['#1a0e08','#cd7c2f'],
      v:{'--asc-bg':'#1a0e08','--asc-sf':'#2a1c10','--asc-br':'#5a3c20','--asc-tx':'#fdf0e6','--asc-ac':'#cd7c2f','--asc-bt':'#92400e','--asc-bh':'#b45309','--asc-sh':'0 4px 24px rgba(205,124,47,.2)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(0deg,rgba(205,124,47,.1) 0 1px,transparent 1px 4px),repeating-linear-gradient(3deg,rgba(205,124,47,.05) 0 1px,transparent 1px 8px),radial-gradient(ellipse 180px 80px at 30% 70%,rgba(205,124,47,.12) 0,transparent 100%)',anim:'asc-anim-drift'}},

    // ── Monochrome
    { id:'mono-dark',     name:'Mono Dark',    sw:['#000000','#ffffff'],
      v:{'--asc-bg':'#000000','--asc-sf':'#1a1a1a','--asc-br':'#333333','--asc-tx':'#ffffff','--asc-ac':'#ffffff','--asc-bt':'#333333','--asc-bh':'#555555','--asc-sh':'0 4px 20px rgba(255,255,255,.05)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 1px,transparent 1px 20px),radial-gradient(ellipse 200px 100px at 25% 35%,rgba(255,255,255,.03) 0,transparent 100%)',size:'20px 20px,20px 20px,100% 100%'}},
    { id:'mono-light',    name:'Mono Light',   sw:['#ffffff','#000000'],
      v:{'--asc-bg':'#ffffff','--asc-sf':'#e0e0e0','--asc-br':'#999999','--asc-tx':'#000000','--asc-ac':'#000000','--asc-bt':'#000000','--asc-bh':'#333333','--asc-sh':'0 4px 20px rgba(0,0,0,.15)','--asc-bd':'none'},
      p:{img:'radial-gradient(circle,rgba(0,0,0,.08) 1px,transparent 1px),radial-gradient(ellipse 200px 100px at 70% 30%,rgba(0,0,0,.04) 0,transparent 100%)',size:'12px 12px,100% 100%'}},
    { id:'sepia',         name:'Sepia',        sw:['#1c1408','#c8a96e'],
      v:{'--asc-bg':'#1c1408','--asc-sf':'#2c2010','--asc-br':'#5c4020','--asc-tx':'#f5e6c8','--asc-ac':'#c8a96e','--asc-bt':'#6b4c20','--asc-bh':'#8b6030','--asc-sh':'0 4px 24px rgba(0,0,0,.5)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(160deg,rgba(200,169,110,.07) 0 1px,transparent 1px 18px),repeating-linear-gradient(-160deg,rgba(200,169,110,.05) 0 1px,transparent 1px 24px),radial-gradient(ellipse 120px 120px at 75% 25%,rgba(200,169,110,.08) 0,transparent 100%),radial-gradient(ellipse 80px 80px at 35% 70%,rgba(180,140,80,.06) 0,transparent 100%)'}},

    // ── Aesthetic
    { id:'vapor',         name:'Vaporwave',    sw:['#1a0a2e','#ff71ce'],
      v:{'--asc-bg':'#1a0a2e','--asc-sf':'#2a1048','--asc-br':'#6a2090','--asc-tx':'#fffaff','--asc-ac':'#ff71ce','--asc-bt':'#05ffa1','--asc-bh':'#01f090','--asc-sh':'0 4px 24px rgba(255,113,206,.3)','--asc-bd':'none'},
      p:{img:'linear-gradient(rgba(255,113,206,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(5,255,161,.12) 1px,transparent 1px),radial-gradient(ellipse 200px 100px at 50% 70%,rgba(255,113,206,.15) 0,transparent 100%)',size:'100% 28px,28px 100%,100% 100%'}},
    { id:'holo',          name:'Holo',         sw:['#0a0a1a','#a5f3fc'],
      v:{'--asc-bg':'#0a0a1a','--asc-sf':'rgba(165,243,252,.06)','--asc-br':'rgba(165,243,252,.2)','--asc-tx':'#e0faff','--asc-ac':'#a5f3fc','--asc-bt':'rgba(165,243,252,.15)','--asc-bh':'rgba(165,243,252,.28)','--asc-sh':'0 4px 32px rgba(165,243,252,.15)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(45deg,rgba(165,243,252,.06) 0 4px,rgba(167,139,250,.06) 4px 8px,rgba(52,211,153,.05) 8px 12px,rgba(248,113,113,.04) 12px 16px,transparent 16px 24px)',anim:'asc-anim-holo'}},

    // ── Cultural
    { id:'sakura',        name:'Sakura',       sw:['#1c0e14','#fda4af'],
      v:{'--asc-bg':'#1c0e14','--asc-sf':'#2c1820','--asc-br':'#6b3050','--asc-tx':'#ffe4ec','--asc-ac':'#fda4af','--asc-bt':'#9f1239','--asc-bh':'#be185d','--asc-sh':'0 4px 24px rgba(253,164,175,.2)','--asc-bd':'none'},
      p:{img:'radial-gradient(ellipse 4px 2px at 12% 18%,rgba(253,164,175,.35) 0,transparent 100%),radial-gradient(ellipse 2px 4px at 38% 42%,rgba(253,164,175,.28) 0,transparent 100%),radial-gradient(ellipse 4px 2px at 63% 22%,rgba(251,207,232,.3) 0,transparent 100%),radial-gradient(ellipse 3px 2px at 22% 65%,rgba(253,164,175,.25) 0,transparent 100%),radial-gradient(ellipse 2px 3px at 78% 55%,rgba(253,164,175,.32) 0,transparent 100%),radial-gradient(ellipse 4px 2px at 88% 30%,rgba(251,207,232,.22) 0,transparent 100%),radial-gradient(ellipse 3px 2px at 50% 80%,rgba(253,164,175,.28) 0,transparent 100%),radial-gradient(ellipse 2px 3px at 5% 85%,rgba(251,207,232,.2) 0,transparent 100%)',anim:'asc-anim-float'}},
    { id:'matcha',        name:'Matcha',       sw:['#0a1a0a','#86efac'],
      v:{'--asc-bg':'#0a1a0a','--asc-sf':'#142014','--asc-br':'#2d4a2d','--asc-tx':'#f0fdf4','--asc-ac':'#86efac','--asc-bt':'#15803d','--asc-bh':'#16a34a','--asc-sh':'0 4px 24px rgba(0,0,0,.4)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(160deg,rgba(134,239,172,.07) 0 1px,transparent 1px 22px),repeating-linear-gradient(70deg,rgba(134,239,172,.05) 0 1px,transparent 1px 40px),radial-gradient(ellipse 180px 90px at 40% 65%,rgba(134,239,172,.06) 0,transparent 100%),radial-gradient(circle,rgba(240,253,244,.07) 1px,transparent 1px)',size:'auto,auto,100% 100%,6px 6px'}},
    { id:'deep-sea',      name:'Deep Sea',     sw:['#020d18','#22d3ee'],
      v:{'--asc-bg':'#020d18','--asc-sf':'#071e35','--asc-br':'#0e3d5f','--asc-tx':'#cffafe','--asc-ac':'#22d3ee','--asc-bt':'#0e7490','--asc-bh':'#0891b2','--asc-sh':'0 4px 32px rgba(34,211,238,.15)','--asc-bd':'none'},
      p:{img:'radial-gradient(circle,rgba(34,211,238,.15) 1.5px,transparent 1.5px),radial-gradient(circle,rgba(56,189,248,.1) 1px,transparent 1px),repeating-linear-gradient(0deg,rgba(34,211,238,.04) 0 1px,transparent 1px 30px)',size:'28px 20px,14px 10px,auto'}},
    { id:'firefly',       name:'Firefly',      sw:['#0c1006','#fde047'],
      v:{'--asc-bg':'#0c1006','--asc-sf':'#141c0a','--asc-br':'#2d3c14','--asc-tx':'#fefce8','--asc-ac':'#fde047','--asc-bt':'#854d0e','--asc-bh':'#a16207','--asc-sh':'0 4px 24px rgba(253,224,71,.15)','--asc-bd':'none'},
      p:{img:'radial-gradient(2px 2px at 15% 20%,rgba(253,224,71,.25) 0,transparent 100%),radial-gradient(1.5px 1.5px at 35% 55%,rgba(253,224,71,.2) 0,transparent 100%),radial-gradient(2px 2px at 60% 30%,rgba(253,224,71,.3) 0,transparent 100%),radial-gradient(1px 1px at 75% 70%,rgba(253,224,71,.2) 0,transparent 100%),radial-gradient(1.5px 1.5px at 90% 45%,rgba(253,224,71,.25) 0,transparent 100%),radial-gradient(1px 1px at 20% 80%,rgba(253,224,71,.15) 0,transparent 100%),radial-gradient(2px 2px at 50% 85%,rgba(253,224,71,.2) 0,transparent 100%)',anim:'asc-anim-blink'}},
    { id:'arctic',        name:'Arctic',       sw:['#e8f0f8','#3b82f6'],
      v:{'--asc-bg':'#e8f0f8','--asc-sf':'#d8e8f4','--asc-br':'#a0c4e0','--asc-tx':'#0f172a','--asc-ac':'#3b82f6','--asc-bt':'#2563eb','--asc-bh':'#3b82f6','--asc-sh':'0 4px 20px rgba(59,130,246,.15)','--asc-bd':'none'},
      p:{img:'repeating-linear-gradient(30deg,rgba(59,130,246,.1) 0 1px,transparent 1px 16px),repeating-linear-gradient(150deg,rgba(59,130,246,.1) 0 1px,transparent 1px 16px),repeating-linear-gradient(90deg,rgba(59,130,246,.06) 0 1px,transparent 1px 16px),radial-gradient(circle,rgba(255,255,255,.8) 1px,transparent 1px)',size:'16px 28px,16px 28px,16px 28px,40px 28px'}},
  ];

  // ─── Defaults ────────────────────────────────────────────────────────────
  const DEFAULTS = {
    speed:     2,
    startKey:  'Delete',
    pauseKey:  'End',
    autoPopup: false,
    scale:     1.0,
    theme:     'purple',
  };

  // ─── State ───────────────────────────────────────────────────────────────
  let scrolling         = false;
  let speed             = DEFAULTS.speed;
  let startKey          = DEFAULTS.startKey;
  let pauseKey          = DEFAULTS.pauseKey;
  let autoPopup         = DEFAULTS.autoPopup;
  let scale             = DEFAULTS.scale;
  let theme             = DEFAULTS.theme;
  let capturingFor      = null;
  let rafId             = null;
  let scrollTarget      = null;
  let hoveredScrollable = null;

  // ─── Cross-site storage via bridge (chrome.storage.sync) ─────────────────
  function storageGet(keys) {
    return new Promise(resolve => {
      const handler = (e) => {
        clearTimeout(timer);
        window.removeEventListener('asc-storage-result', handler);
        resolve(e.detail);
      };
      const timer = setTimeout(() => {
        window.removeEventListener('asc-storage-result', handler);
        resolve({});
      }, 1000);
      window.addEventListener('asc-storage-result', handler);
      window.dispatchEvent(new CustomEvent('asc-storage-get', { detail: keys }));
    });
  }

  function storageSet(obj) {
    window.dispatchEvent(new CustomEvent('asc-storage-set', { detail: obj }));
  }

  function storageClear() {
    window.dispatchEvent(new CustomEvent('asc-storage-clear'));
  }

  // ─── HTML escape (prevent XSS from stored key names) ─────────────────────
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─── Apply theme ──────────────────────────────────────────────────────────
  function applyTheme(id) {
    theme = id;
    const t = THEMES.find(t => t.id === id) || THEMES[0];
    const overlay = document.getElementById('auto-scroller-overlay');
    if (!overlay) return;
    // Remove animation classes before switching themes
    overlay.classList.remove('asc-anim-scan','asc-anim-aurora','asc-anim-holo','asc-anim-wave','asc-anim-drift','asc-anim-flow','asc-anim-shimmer');
    // Apply colour vars
    Object.entries(t.v).forEach(([k, v]) => overlay.style.setProperty(k, v));
    const bd = t.v['--asc-bd'] || 'none';
    overlay.style.backdropFilter = bd;
    overlay.style.webkitBackdropFilter = bd;
    // Apply backdrop pattern / animation (set final values directly, no intermediate 'none' flash)
    overlay.style.setProperty('--asc-bg-img', t.p ? t.p.img : 'none');
    overlay.style.setProperty('--asc-bg-size', (t.p && t.p.size) ? t.p.size : 'auto');
    if (t.p && t.p.anim) overlay.classList.add(t.p.anim);
    // Update active swatch indicator
    document.querySelectorAll('.asc-swatch').forEach(s =>
      s.classList.toggle('asc-swatch-active', s.dataset.id === id)
    );
    const nameEl = document.getElementById('asc-theme-name');
    if (nameEl) nameEl.textContent = t.name;
  }

  // ─── Keydown — registered IMMEDIATELY before any page script ─────────────
  window.addEventListener('keydown', (e) => {
    if (capturingFor) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const key = e.key;
      const btn = capturingFor === 'start' ? startKeyBtn() : pauseKeyBtn();
      if (capturingFor === 'start') {
        startKey = key;
        storageSet({ startKey: key });
        if (btn) { btn.textContent = key; btn.classList.remove('capturing'); }
      } else {
        pauseKey = key;
        storageSet({ pauseKey: key });
        if (btn) { btn.textContent = key; btn.classList.remove('capturing'); }
      }
      capturingFor = null;
      if (btn) btn.blur();
      return;
    }

    if (startKey === pauseKey && e.key === startKey) {
      e.preventDefault();
      scrolling ? pauseScroll() : startScroll();
    } else if (e.key === startKey) {
      e.preventDefault();
      startScroll();
    } else if (e.key === pauseKey) {
      e.preventDefault();
      pauseScroll();
    }
  }, true);

  // ─── Icon click from bridge ───────────────────────────────────────────────
  window.addEventListener('asc-toggle-overlay', () => {
    const existing = document.getElementById('auto-scroller-overlay');
    if (existing) existing.__ascRemove();
    else buildOverlay();
  });

  // ─── Element refs ─────────────────────────────────────────────────────────
  const startKeyBtn = () => document.getElementById('asc-start-key');
  const pauseKeyBtn = () => document.getElementById('asc-pause-key');

  // ─── Scroll target helpers ────────────────────────────────────────────────
  function findScrollable(el) {
    while (el && el !== document.documentElement) {
      const oy = window.getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return el;
      el = el.parentElement;
    }
    return null;
  }

  function findMainScrollable() {
    let best = null, bestArea = 0;
    document.querySelectorAll('*').forEach(el => {
      const oy = window.getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) {
        const area = el.clientWidth * el.clientHeight;
        if (area > bestArea) { bestArea = area; best = el; }
      }
    });
    return best;
  }

  function describeTarget(el) {
    if (!el) return 'window';
    return el.id ? `#${el.id}` : el.className ? `.${String(el.className).trim().split(' ')[0]}` : el.tagName.toLowerCase();
  }

  // ─── Scroll ──────────────────────────────────────────────────────────────
  function startScroll() {
    if (scrolling) return;
    scrollTarget = hoveredScrollable || findMainScrollable();
    scrolling = true;
    updateUI();
    loop();
  }

  function pauseScroll() {
    if (!scrolling) return;
    scrolling = false;
    cancelAnimationFrame(rafId);
    updateUI();
  }

  function loop() {
    if (!scrolling) return;
    if (scrollTarget) scrollTarget.scrollTop += speed;
    else window.scrollBy(0, speed);
    rafId = requestAnimationFrame(loop);
  }

  function updateUI() {
    const statusEl  = document.getElementById('asc-status');
    const toggleBtn = document.getElementById('asc-toggle-btn');
    const targetLbl = document.getElementById('asc-target-label');
    if (!statusEl) return;
    if (scrolling) {
      statusEl.textContent = 'Running';
      statusEl.classList.add('running');
      toggleBtn.textContent = '⏸ Pause';
      toggleBtn.classList.add('running');
      if (targetLbl) targetLbl.textContent = `Target: ${describeTarget(scrollTarget)}`;
    } else {
      statusEl.textContent = 'Stopped';
      statusEl.classList.remove('running');
      toggleBtn.textContent = '▶ Start';
      toggleBtn.classList.remove('running');
    }
  }

  // ─── Build overlay ───────────────────────────────────────────────────────
  function buildOverlay() {
    if (document.getElementById('auto-scroller-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'auto-scroller-overlay';
    overlay.innerHTML = `
      <div id="asc-header">⬇ Auto Scroller <span id="asc-close">✕</span></div>
      <div id="asc-status">Stopped</div>
      <div id="asc-target-label">Target: window</div>

      <div class="asc-section-label">CONTROLS</div>
      <div class="asc-row">
        <label>Speed (px/frame)</label>
        <input id="asc-speed" type="number" min="1" max="100" value="${esc(speed)}" />
      </div>
      <div class="asc-row">
        <label>Start key</label>
        <button class="asc-keybind" id="asc-start-key">${esc(startKey)}</button>
      </div>
      <div class="asc-row">
        <label>Pause key</label>
        <button class="asc-keybind" id="asc-pause-key">${esc(pauseKey)}</button>
      </div>
      <div class="asc-row">
        <button id="asc-toggle-btn">▶ Start</button>
      </div>

      <div class="asc-divider"></div>
      <div class="asc-section-label">PREFERENCES</div>
      <div class="asc-row">
        <label>Auto popup</label>
        <label class="asc-switch">
          <input type="checkbox" id="asc-auto-popup" ${autoPopup ? 'checked' : ''} />
          <span class="asc-slider"></span>
        </label>
      </div>
      <div class="asc-row">
        <label>Size</label>
        <div style="display:flex;align-items:center;gap:5px;">
          <input id="asc-scale" type="number" min="0.5" max="2.0" step="0.1" value="${esc(scale.toFixed(1))}" />
          <span style="font-size:11px;opacity:0.5;">×</span>
        </div>
      </div>

      <div class="asc-divider"></div>
      <div class="asc-section-label">THEME</div>
      <div id="asc-theme-grid"></div>
      <div id="asc-theme-name"></div>

      <div class="asc-divider"></div>
      <div class="asc-row">
        <button id="asc-reset" class="asc-reset-btn">↺ Reset to defaults</button>
      </div>

      <div class="asc-divider"></div>
      <div id="asc-footer">
        <a id="asc-privacy-link" href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        &nbsp;·&nbsp; v1.2
      </div>
    `;

    const style = document.createElement('style');
    style.id = 'asc-style';
    style.textContent = `
      #auto-scroller-overlay {
        position: fixed; top: 20px; right: 20px; z-index: 2147483647;
        background-color: var(--asc-bg, #1a1a2e);
        background-image: var(--asc-bg-img, none);
        background-size: var(--asc-bg-size, auto);
        color: var(--asc-tx, #e0e0e0);
        border-radius: 10px;
        padding: 12px 14px; width: 220px;
        font-family: system-ui, sans-serif; font-size: 13px;
        box-shadow: var(--asc-sh, 0 4px 24px rgba(0,0,0,.5));
        backdrop-filter: var(--asc-bd, none);
        -webkit-backdrop-filter: var(--asc-bd, none);
        user-select: none; transform-origin: top right;
        will-change: transform;
        transition: background-color .25s, box-shadow .25s, color .25s;
      }
      #asc-header {
        display: flex; justify-content: space-between; align-items: center;
        font-weight: 700; font-size: 14px; margin-bottom: 6px;
        cursor: move; color: var(--asc-ac, #a78bfa);
      }
      #asc-close { cursor: pointer; opacity: 0.6; font-size: 13px; }
      #asc-close:hover { opacity: 1; }
      #asc-status {
        text-align: center; font-size: 11px; letter-spacing: 0.05em;
        padding: 2px 0; color: #f87171; font-weight: 600;
      }
      #asc-status.running { color: #4ade80; }
      #asc-target-label {
        text-align: center; font-size: 10px; opacity: 0.45;
        margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .asc-divider { border-top: 1px solid var(--asc-br, #2d2d4e); margin: 8px 0 6px; }
      .asc-section-label {
        font-size: 9px; letter-spacing: 0.1em; opacity: 0.4;
        margin-bottom: 4px; font-weight: 700;
      }
      .asc-row { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; }
      .asc-row label { opacity: 0.75; }
      #asc-speed, #asc-scale {
        width: 58px;
        background: var(--asc-sf, #2d2d4e);
        color: var(--asc-tx, #e0e0e0);
        border: 1px solid var(--asc-br, #4a4a7a);
        border-radius: 5px; padding: 3px 6px; font-size: 13px; text-align: center;
      }
      .asc-keybind {
        background: var(--asc-sf, #2d2d4e);
        color: var(--asc-tx, #e0e0e0);
        border: 1px solid var(--asc-br, #4a4a7a);
        border-radius: 5px; padding: 3px 8px; font-size: 12px;
        cursor: pointer; min-width: 70px; text-align: center;
      }
      .asc-keybind.capturing {
        border-color: var(--asc-ac, #a78bfa);
        color: var(--asc-ac, #a78bfa);
        animation: asc-pulse 0.8s infinite;
      }
      @keyframes asc-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      #asc-toggle-btn {
        width: 100%;
        background: var(--asc-bt, #4f46e5);
        color: #fff; border: none;
        border-radius: 6px; padding: 6px 0; font-size: 13px;
        font-weight: 600; cursor: pointer; margin-top: 2px;
      }
      #asc-toggle-btn:hover { background: var(--asc-bh, #6366f1); }
      #asc-toggle-btn.running { background: #dc2626; }
      #asc-toggle-btn.running:hover { background: #ef4444; }
      .asc-switch { position: relative; display: inline-block; width: 36px; height: 20px; }
      .asc-switch input { opacity: 0; width: 0; height: 0; }
      .asc-slider {
        position: absolute; cursor: pointer; inset: 0;
        background: var(--asc-sf, #2d2d4e);
        border: 1px solid var(--asc-br, #4a4a7a);
        border-radius: 20px; transition: background 0.2s;
      }
      .asc-slider:before {
        content: ''; position: absolute; height: 12px; width: 12px;
        left: 3px; bottom: 3px;
        background: var(--asc-tx, #e0e0e0);
        border-radius: 50%; transition: transform 0.2s;
      }
      .asc-switch input:checked + .asc-slider {
        background: var(--asc-bt, #4f46e5);
        border-color: var(--asc-bt, #4f46e5);
      }
      .asc-switch input:checked + .asc-slider:before { transform: translateX(16px); }
      .asc-reset-btn {
        width: 100%; background: transparent; color: #f87171;
        border: 1px solid #f87171; border-radius: 6px;
        padding: 5px 0; font-size: 12px; cursor: pointer; margin-top: 2px; opacity: 0.8;
      }
      .asc-reset-btn:hover { opacity: 1; background: rgba(248,113,113,0.1); }
      #asc-footer { text-align: center; font-size: 10px; opacity: 0.35; margin-top: 8px; }
      #asc-privacy-link {
        color: var(--asc-ac, #a78bfa); text-decoration: none; opacity: 0.7;
      }
      #asc-privacy-link:hover { opacity: 1; text-decoration: underline; }

      /* Theme picker */
      #asc-theme-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 5px;
        margin-top: 6px;
        max-height: 135px;
        overflow-y: auto;
        padding-right: 2px;
      }
      #asc-theme-grid::-webkit-scrollbar { width: 3px; }
      #asc-theme-grid::-webkit-scrollbar-track { background: transparent; }
      #asc-theme-grid::-webkit-scrollbar-thumb { background: var(--asc-br,#4a4a7a); border-radius: 3px; }
      .asc-swatch {
        aspect-ratio: 1; border-radius: 50%; cursor: pointer;
        border: 2px solid transparent;
        position: relative; transition: transform .15s, border-color .15s;
        box-sizing: border-box;
      }
      .asc-swatch::after {
        content: ''; position: absolute;
        width: 38%; height: 38%; border-radius: 50%;
        top: 50%; left: 50%; transform: translate(-50%,-50%);
        background: var(--sw-ac);
      }
      .asc-swatch:hover { transform: scale(1.18); z-index: 1; }
      .asc-swatch-active {
        border-color: #fff !important;
        box-shadow: 0 0 0 1px rgba(0,0,0,.4);
      }
      #asc-theme-name {
        text-align: center; font-size: 10px; opacity: 0.5;
        margin-top: 5px; letter-spacing: .03em;
      }

      /* Pattern / animation themes */
      @keyframes asc-scan { to { background-position: 0 40px; } }
      @keyframes asc-aurora { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
      @keyframes asc-holo { to { background-position: 24px 24px; } }
      @keyframes asc-wave { to { background-position: 28px 28px; } }
      @keyframes asc-drift { to { background-position: 60px 0; } }
      @keyframes asc-flow { to { background-position: -30px 30px; } }
      @keyframes asc-shimmer { to { background-position: 40px -40px; } }
      @keyframes asc-blink { 0%,100%{opacity:.3} 50%{opacity:1} }
      @keyframes asc-float { to { background-position: -18px 56px; } }
      .asc-anim-scan { animation: asc-scan 4s linear infinite; }
      .asc-anim-aurora { animation: asc-aurora 10s ease infinite; }
      .asc-anim-holo { animation: asc-holo 3s linear infinite; }
      .asc-anim-wave { animation: asc-wave 6s linear infinite; }
      .asc-anim-drift { animation: asc-drift 12s linear infinite; }
      .asc-anim-flow { animation: asc-flow 5s linear infinite; }
      .asc-anim-shimmer { animation: asc-shimmer 4s linear infinite; }
      .asc-anim-blink { animation: asc-blink 3s ease-in-out infinite; }
      .asc-anim-float { animation: asc-float 9s linear infinite; }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    // Build theme swatches
    const grid = document.getElementById('asc-theme-grid');
    THEMES.forEach(t => {
      const sw = document.createElement('div');
      sw.className = 'asc-swatch';
      sw.dataset.id = t.id;
      sw.title = t.name;
      sw.style.background = t.sw[0];
      sw.style.setProperty('--sw-ac', t.sw[1]);
      sw.addEventListener('click', () => {
        applyTheme(t.id);
        storageSet({ theme: t.id });
      });
      grid.appendChild(sw);
    });

    // Apply current theme (sets CSS vars + marks active swatch)
    applyTheme(theme);
    applyScale(scale);

    document.getElementById('asc-privacy-link').href = 'https://IT08-byte.github.io/auto-scroller-privacy/';

    overlay.__ascRemove = () => {
      pauseScroll();
      document.removeEventListener('mousemove', onMouseMove, { capture: true });
      overlay.remove();
      style.remove();
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true, capture: true });

    // Controls
    document.getElementById('asc-toggle-btn').addEventListener('click', () =>
      scrolling ? pauseScroll() : startScroll()
    );

    document.getElementById('asc-speed').addEventListener('change', (e) => {
      speed = Math.max(1, Math.min(100, parseInt(e.target.value) || DEFAULTS.speed));
      e.target.value = speed;
      storageSet({ speed });
    });

    document.getElementById('asc-start-key').addEventListener('click', () => {
      capturingFor = 'start';
      const btn = startKeyBtn();
      btn.textContent = 'Press a key…';
      btn.classList.add('capturing');
    });

    document.getElementById('asc-pause-key').addEventListener('click', () => {
      capturingFor = 'pause';
      const btn = pauseKeyBtn();
      btn.textContent = 'Press a key…';
      btn.classList.add('capturing');
    });

    // Preferences
    document.getElementById('asc-auto-popup').addEventListener('change', (e) => {
      autoPopup = e.target.checked;
      storageSet({ autoPopup });
    });

    document.getElementById('asc-scale').addEventListener('change', (e) => {
      scale = Math.max(0.5, Math.min(2.0, parseFloat(e.target.value) || DEFAULTS.scale));
      e.target.value = scale.toFixed(1);
      storageSet({ scale });
      applyScale(scale);
    });

    document.getElementById('asc-reset').addEventListener('click', () => {
      speed     = DEFAULTS.speed;
      startKey  = DEFAULTS.startKey;
      pauseKey  = DEFAULTS.pauseKey;
      autoPopup = DEFAULTS.autoPopup;
      scale     = DEFAULTS.scale;
      storageClear();
      document.getElementById('asc-speed').value        = speed;
      startKeyBtn().textContent                          = startKey;
      pauseKeyBtn().textContent                          = pauseKey;
      document.getElementById('asc-auto-popup').checked = autoPopup;
      document.getElementById('asc-scale').value        = scale.toFixed(1);
      applyScale(scale);
      applyTheme(DEFAULTS.theme);
      storageSet({ theme: DEFAULTS.theme });
    });

    // Drag
    let dragging = false, dragOffX = 0, dragOffY = 0;
    document.getElementById('asc-header').addEventListener('mousedown', (e) => {
      if (e.target.id === 'asc-close') return;
      dragging = true;
      const rect = overlay.getBoundingClientRect();
      dragOffX = e.clientX - rect.left;
      dragOffY = e.clientY - rect.top;
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      overlay.style.right = 'auto';
      overlay.style.left = (e.clientX - dragOffX) + 'px';
      overlay.style.top  = (e.clientY - dragOffY) + 'px';
    });
    document.addEventListener('mouseup', () => { dragging = false; });

    // Close
    document.getElementById('asc-close').addEventListener('click', () => overlay.__ascRemove());
  }

  function applyScale(s) {
    const overlay = document.getElementById('auto-scroller-overlay');
    if (overlay) overlay.style.transform = `scale(${s})`;
  }

  function onMouseMove(e) {
    const overlay = document.getElementById('auto-scroller-overlay');
    if (overlay && overlay.contains(e.target)) return;
    hoveredScrollable = findScrollable(e.target);
  }

  // ─── Init ────────────────────────────────────────────────────────────────
  async function init() {
    const saved = await storageGet(['speed', 'startKey', 'pauseKey', 'autoPopup', 'scale', 'theme']);
    if (saved.speed     !== undefined) speed     = saved.speed;
    if (saved.startKey  !== undefined) startKey  = saved.startKey;
    if (saved.pauseKey  !== undefined) pauseKey  = saved.pauseKey;
    if (saved.autoPopup !== undefined) autoPopup = saved.autoPopup;
    if (saved.scale     !== undefined) scale     = saved.scale;
    if (saved.theme     !== undefined) theme     = saved.theme;

    if (autoPopup) buildOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
