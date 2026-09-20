/**
 * UNIVERSAL SHOP // NAVIGO SPA ROUTER & APP LOGIC
 * CatGame Flagship Mod, Skills, Prototypes & Discord Ticket Dispatch
 */

// CONFIGURED DISCORD CHANNELS & INVITE:
const DISCORD_TICKET_URL = "https://discord.com/channels/1263147204940533781/1538574462553690112";
const DISCORD_INVITE_URL = "https://discord.gg/WTR52mYMF";
const DISCORD_USERNAME = "@Itz0Cat";

// CATALOG DATA
const PRODUCTS = [
  // 1. MINECRAFT MODS & SOLVERS
  {
    id: "catgame-mod",
    category: "mods",
    badge: "Flagship Auto-Solver",
    title: "CatGame Flagship Mod",
    description: "Undetected Minecraft Fabric 1.21.11 Chat Game Auto-Solver. Solves fill-in-the-gaps, unscramble, math, reverse, and trivia with humanized delays and 20s/10s predictive radar warnings.",
    tags: ["Fabric 1.21.11", "Undetected", "0.8s Fastest", "2,466+ Words"],
    price: "From ₹20/wk or ₹80 Lifetime",
    featured: true,
    actionText: "View Tiers & Buy",
    sku: "SKU-CATGAME-SOLVER",
    tiers: [
      { name: "Iron Tier", price: "₹80", cadence: "Lifetime Permanent", delay: "4.0s (Fixed)", devices: "1 Device", sku: "CATGAME-IRON-LIFETIME" },
      { name: "Gold Tier", price: "₹20/wk (or ₹70/mo)", cadence: "Subscription", delay: "2.5s (Down to 2.0s)", devices: "2 Devices", sku: "CATGAME-GOLD-SUB" },
      { name: "Diamond Tier", price: "₹40/wk (or ₹140/mo)", cadence: "Subscription", delay: "0.8s (Down to 0.1s)", devices: "5 Devices", sku: "CATGAME-DIAMOND-VIP" }
    ]
  },
  {
    id: "catclient",
    category: "mods",
    badge: "Utility Client",
    title: "CatClient 1.21.11",
    description: "Custom Fabric Utility & PvP Client with Blue Flame theme, Fullbright, CPS, Keystrokes, ArmorHUD, Zoom, Freelook, and cloud profile synchronization.",
    tags: ["Fabric 1.21.11", "PvP HUD", "Fullbright", "Zero-Lag"],
    price: "Free / Community Edition",
    featured: false,
    actionText: "Get Access",
    sku: "SKU-CATCLIENT-FABRIC"
  },

  // 2. AGENTIC & DEVELOPER SKILLS
  {
    id: "skill-minecraft-modding",
    category: "skills",
    badge: "Agent Skill",
    title: "Minecraft Modding Agent Skill",
    description: "Battle-tested agentic workflow & guidelines for building Fabric 1.21+, NeoForge, mixins, custom registries, packet handling, and automated Gradle build pipelines.",
    tags: ["Agentic AI", "Fabric API", "Mixins", "Java 21"],
    price: "Free / Open Source",
    featured: false,
    actionText: "Inspect Skill",
    sku: "SKU-SKILL-MC-MODDING"
  },
  {
    id: "skill-neobrutalism",
    category: "skills",
    badge: "Design Skill",
    title: "Neobrutalism Design System Skill",
    description: "Modern brutalist UI guidelines featuring bold borders, high-contrast typography, WCAG 2.2 AA accessibility standards, and semantic color tokens.",
    tags: ["Design System", "CSS Tokens", "WCAG 2.2 AA", "Modern"],
    price: "Free / Open Source",
    featured: false,
    actionText: "Inspect Skill",
    sku: "SKU-SKILL-NEOBRUTALISM"
  },
  {
    id: "skill-typography",
    category: "skills",
    badge: "Design Skill",
    title: "Typography Mastery Skill",
    description: "Complete design skill for interface typography, modular scales (Minor Third, Golden Ratio), measure constraints, letter tracking, and font pairing.",
    tags: ["Typography", "UI/UX", "Modular Scale", "Readability"],
    price: "Free / Open Source",
    featured: false,
    actionText: "Inspect Skill",
    sku: "SKU-SKILL-TYPOGRAPHY"
  },

  // 3. PROTOTYPES & TOOLS
  {
    id: "prototype-pocketvps",
    category: "prototypes",
    badge: "Prototype",
    title: "PocketVPS Mobile Terminal",
    description: "Turn any Android device into a 24/7 lightweight Linux server using Termux, automated process keepalives, and remote port-forwarding.",
    tags: ["Termux", "Android Server", "Self-Host", "DevOps"],
    price: "Open Prototype",
    featured: false,
    actionText: "Open Prototype",
    sku: "SKU-PROTO-POCKETVPS"
  },
  {
    id: "prototype-catbot",
    category: "prototypes",
    badge: "Prototype",
    title: "CatBot & Ticket Manager",
    description: "Custom Discord bot architecture for automated ticket dispatch, HWID reset workflows, and server status monitoring.",
    tags: ["Discord.js", "Automation", "HWID System", "Tickets"],
    price: "Custom Setup",
    featured: false,
    actionText: "Request Bot",
    sku: "SKU-PROTO-CATBOT"
  }
];

// INITIALIZE NAVIGO ROUTER
const router = new Navigo("/", { hash: false });

// STATE
let currentCategory = "all";
let searchQuery = "";
let selectedProduct = null;
let selectedTier = null;

// SETUP ON DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
  setupCrtToggle();
  setupModal();
  initRouter();
});

// ROUTE DEFINITIONS
function initRouter() {
  router
    .on("/", () => {
      setActiveNav("home");
      renderHomePage();
    })
    .on("/catgame", () => {
      setActiveNav("catgame");
      renderCatGamePage();
    })
    .on("/skills", () => {
      setActiveNav("skills");
      renderSkillsPage();
    })
    .on("/prototypes", () => {
      setActiveNav("prototypes");
      renderPrototypesPage();
    })
    .on("/tickets", () => {
      setActiveNav("tickets");
      renderTicketsPage();
    })
    .notFound(() => {
      setActiveNav("home");
      renderHomePage();
    })
    .resolve();
}

function setActiveNav(route) {
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("data-route") === route) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// -------------------------------------------------------------
// PAGE 1: HOME PAGE
// -------------------------------------------------------------
function renderHomePage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <!-- HERO SECTION -->
    <section class="hero">
      <div>
        <div class="hero-tag">Official Store & Digital Foundry</div>
        <h1 class="hero-title">
          The Ultimate<br>
          <span class="accent">Cat Game</span> Foundry
        </h1>
        <p class="hero-desc">
          High-performance Minecraft utility mods, sub-second chat game auto-solvers, agentic AI developer skills, and custom client prototypes. Built by <b>@Itz0Cat</b>.
        </p>

        <!-- METRIC STRIP -->
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-num">2,466+</div>
            <div class="stat-label">Dictionary Entries</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">0.8s</div>
            <div class="stat-label">Fastest Solve Speed</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">100%</div>
            <div class="stat-label">Detection Avoidance</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">24/7</div>
            <div class="stat-label">Discord Ticket Support</div>
          </div>
        </div>

        <div class="hero-cta-group">
          <a href="/catgame" class="btn btn-primary" data-navigo>CatGame Flagship Mod →</a>
          <a href="/skills" class="btn" data-navigo>Browse AI Skills →</a>
          <a href="/tickets" class="btn btn-discord" data-navigo>Open Discord Ticket (#tickets) ↗</a>
        </div>
      </div>
    </section>

    <!-- SECTION 01: QUICK CATALOG -->
    <div class="section-header">
      <span class="section-tag">[ 01 // Universal Catalog ]</span>
      <span class="section-line"></span>
      <span class="section-index">ALL PRODUCTS & UNITS</span>
    </div>

    <!-- CATEGORY FILTER TABS -->
    <div class="filter-bar">
      <button class="filter-tab active" data-category="all">[ All Units ]</button>
      <button class="filter-tab" data-category="mods">[ Minecraft Mods ]</button>
      <button class="filter-tab" data-category="skills">[ AI & Dev Skills ]</button>
      <button class="filter-tab" data-category="prototypes">[ Prototypes & Clients ]</button>
    </div>

    <!-- SEARCH INPUT -->
    <div class="search-wrapper">
      <input id="search-input" type="text" class="search-input" placeholder="Search catalog by title, keyword, or tag (e.g. 'Fabric', 'Skill', 'Delay', 'Termux')...">
    </div>

    <!-- DYNAMIC PRODUCT GRID -->
    <div id="product-grid" class="product-grid"></div>
  `;

  router.updatePageLinks();
  renderProductGrid();
  setupFilterTabs();
  setupSearch();
}

// -------------------------------------------------------------
// PAGE 2: CATGAME FLAGSHIP MOD DEDICATED PAGE
// -------------------------------------------------------------
function renderCatGamePage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <div class="breadcrumb">
      <a href="/" data-navigo>Home</a>
      <span class="sep">/</span>
      <span class="current">CatGame Flagship Mod</span>
    </div>

    <div class="page-intro">
      <div class="hero-tag">Flagship Auto-Solver // Universal Fabric 1.21.11</div>
      <h1 class="page-title">CatGame: Undetected Chat Game Auto-Solver</h1>
      <p class="page-desc">
        Engineered specifically for competitive multiplayer servers (BananaSMP, Lifesteal, BoxPvP). Features sub-second solving, a 2,466-word dictionary, full arithmetic expression evaluation, and 20s/10s predictive radar warnings so you never get caught on chat cooldown.
      </p>
    </div>

    <!-- INTERACTIVE SOLVER SIMULATOR -->
    <div class="solver-demo">
      <div class="demo-bar">
        <span class="demo-title">
          <span style="color:var(--green)">●</span> LIVE SOLVER TERMINAL SIMULATOR
        </span>
        <span>ENGINE: CATGAME-v3.0</span>
      </div>

      <div class="demo-presets">
        <button class="preset-btn" data-prompt="_rown Co_cret_ ___d__">Fill Gaps</button>
        <button class="preset-btn" data-prompt="What is 14 * 7 - (20 / 4)?">Math Expression</button>
        <button class="preset-btn" data-prompt="Unscramble epCerre">Unscramble</button>
        <button class="preset-btn" data-prompt="Reverse pQLVEQ">Reverse String</button>
        <button class="preset-btn" data-prompt="How many blocks high can a player build in the nether?">Trivia Question</button>
      </div>

      <div id="sim-console" class="demo-console">
        <div><span class="msg-header">[SYSTEM]</span> Simulator ready. Click any preset above or enter a challenge to see CatGame solve it.</div>
      </div>

      <div class="demo-controls">
        <input id="sim-input" type="text" class="demo-input" placeholder="Type a chat game prompt (e.g. Unscramble epCerre)...">
        <button id="sim-solve-btn" class="btn btn-primary btn-sm">Solve</button>
      </div>
    </div>

    <!-- TIER PRICING GRID -->
    <div class="section-header">
      <span class="section-tag">[ Key Access Tiers ]</span>
      <span class="section-line"></span>
      <span class="section-index">HWID LICENSED</span>
    </div>

    <div id="catgame-tiers" class="tier-grid">
      <!-- 1. IRON TIER -->
      <div class="tier-card iron">
        <div>
          <div class="tier-top">
            <div class="tier-name">Iron Tier</div>
            <span class="tier-tag">Lifetime</span>
          </div>
          <div class="tier-price-wrap">
            <span class="tier-price">₹80</span>
            <span class="tier-cadence">/ permanent</span>
          </div>
          <ul class="tier-specs">
            <li>Fixed 4.0s humanized delay</li>
            <li>1 Device allocation (HWID locked)</li>
            <li>Permanent lifetime access</li>
            <li>All 6 core game solvers included</li>
            <li>100% human typist safety</li>
          </ul>
        </div>
        <button class="btn btn-sm" onclick="buyTier(0)">Get Iron Key →</button>
      </div>

      <!-- 2. GOLD TIER -->
      <div class="tier-card gold">
        <div>
          <div class="tier-top">
            <div class="tier-name">Gold Tier</div>
            <span class="tier-tag">Subscription</span>
          </div>
          <div class="tier-price-wrap">
            <span class="tier-price">₹20</span>
            <span class="tier-cadence">/ week (or ₹70/mo)</span>
          </div>
          <ul class="tier-specs">
            <li>Adjustable delay: 2.0s – 10.0s</li>
            <li>In-game <code>/cat delay</code> unlocked</li>
            <li>2 Devices allocation (PC + Mobile)</li>
            <li>Priority solver backend queue</li>
            <li>~80% server round win rate</li>
          </ul>
        </div>
        <button class="btn btn-sm" onclick="buyTier(1)">Get Gold Key →</button>
      </div>

      <!-- 3. DIAMOND TIER -->
      <div class="tier-card featured diamond">
        <div>
          <div class="tier-top">
            <div class="tier-name">Diamond Tier</div>
            <span class="tier-tag">VIP Fastest</span>
          </div>
          <div class="tier-price-wrap">
            <span class="tier-price">₹40</span>
            <span class="tier-cadence">/ week (or ₹140/mo)</span>
          </div>
          <ul class="tier-specs">
            <li>Near-instant 0.8s delay (down to 0.1s)</li>
            <li>Unrestricted in-game delay control</li>
            <li>5 Devices allocation (Clan / Multi-box)</li>
            <li>Instant zero-delay VIP queue</li>
            <li>24/7 custom server trivia additions</li>
          </ul>
        </div>
        <button class="btn btn-primary btn-sm" onclick="buyTier(2)">Get Diamond Key →</button>
      </div>
    </div>

    <!-- TECHNICAL SPECIFICATION TABLE -->
    <div class="section-header">
      <span class="section-tag">[ Technical Architecture ]</span>
      <span class="section-line"></span>
      <span class="section-index">BENCHMARKS</span>
    </div>

    <table class="tech-spec-table">
      <thead>
        <tr>
          <th>Capability</th>
          <th>CatGame Solver</th>
          <th>Standard / Competitors</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fill In The Gaps (<code>FILL_GAPS</code>)</td>
          <td><b style="color:var(--green)">Supported</b> (Multi-word + missing characters)</td>
          <td>Unsupported</td>
        </tr>
        <tr>
          <td>Wordlist Coverage</td>
          <td><b style="color:var(--blue)">2,466+ Minecraft items & blocks</b></td>
          <td>~300 basic English words</td>
        </tr>
        <tr>
          <td>Math Engine</td>
          <td><b style="color:var(--green)">Arbitrary arithmetic</b> (Parentheses, order of operations, negatives)</td>
          <td>Basic 2-number operations (<code>A + B</code> only)</td>
        </tr>
        <tr>
          <td>Predictive Cooldown Radar</td>
          <td><b style="color:var(--gold)">20s & 10s HUD warnings</b> before round starts</td>
          <td>None (frequent cooldown misses)</td>
        </tr>
        <tr>
          <td>Human Jitter Offset</td>
          <td>Randomized +0.2s–0.6s offset per round</td>
          <td>Static or zero delay (high ban risk)</td>
        </tr>
      </tbody>
    </table>
  `;

  router.updatePageLinks();
  setupSimulator();
}

// -------------------------------------------------------------
// PAGE 3: DEVELOPER & AI SKILLS PAGE
// -------------------------------------------------------------
function renderSkillsPage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  const skills = PRODUCTS.filter(p => p.category === "skills");

  appView.innerHTML = `
    <div class="breadcrumb">
      <a href="/" data-navigo>Home</a>
      <span class="sep">/</span>
      <span class="current">AI & Developer Skills</span>
    </div>

    <div class="page-intro">
      <div class="hero-tag">Agentic Tooling & System Skills</div>
      <h1 class="page-title">Developer & AI Agent Skills</h1>
      <p class="page-desc">
        Specialized prompt engineering packages, architectural guidelines, and system skills for agentic AI coding assistants (Claude Code, Antigravity, Cursor, Copilot).
      </p>
    </div>

    <div class="product-grid">
      ${skills.map(s => `
        <div class="product-card">
          <div>
            <div class="product-type">${s.badge} // ${s.sku}</div>
            <h3 class="product-title">${s.title}</h3>
            <p class="product-desc">${s.description}</p>
            <div class="product-tags">
              ${s.tags.map(t => `<span class="product-tag">${t}</span>`).join("")}
            </div>
          </div>
          <div class="product-footer">
            <span class="product-price">${s.price}</span>
            <button class="btn btn-sm" onclick="handleProductAction('${s.id}')">View Details →</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  router.updatePageLinks();
}

// -------------------------------------------------------------
// PAGE 4: PROTOTYPES & CLIENTS PAGE
// -------------------------------------------------------------
function renderPrototypesPage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  const prototypes = PRODUCTS.filter(p => p.category === "prototypes" || p.id === "catclient");

  appView.innerHTML = `
    <div class="breadcrumb">
      <a href="/" data-navigo>Home</a>
      <span class="sep">/</span>
      <span class="current">Prototypes & Clients</span>
    </div>

    <div class="page-intro">
      <div class="hero-tag">Foundry Labs // Experimental Software</div>
      <h1 class="page-title">Prototypes & Utility Clients</h1>
      <p class="page-desc">
        Experimental utilities, client modifications, and DevOps tooling developed for mobile servers, Discord infrastructure, and competitive gameplay.
      </p>
    </div>

    <div class="product-grid">
      ${prototypes.map(p => `
        <div class="product-card">
          <div>
            <div class="product-type">${p.badge} // ${p.sku}</div>
            <h3 class="product-title">${p.title}</h3>
            <p class="product-desc">${p.description}</p>
            <div class="product-tags">
              ${p.tags.map(t => `<span class="product-tag">${t}</span>`).join("")}
            </div>
          </div>
          <div class="product-footer">
            <span class="product-price">${p.price}</span>
            <button class="btn btn-sm" onclick="handleProductAction('${p.id}')">${p.actionText} →</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  router.updatePageLinks();
}

// -------------------------------------------------------------
// PAGE 5: DISCORD TICKETS & DISPATCH PAGE
// -------------------------------------------------------------
function renderTicketsPage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <div class="breadcrumb">
      <a href="/" data-navigo>Home</a>
      <span class="sep">/</span>
      <span class="current">Discord Tickets & Buy</span>
    </div>

    <div class="page-intro">
      <div class="hero-tag">Manual Order Fulfillment // Zero Fraud</div>
      <h1 class="page-title">Discord Ticket Dispatch</h1>
      <p class="page-desc">
        To ensure instant HWID binding, fraud-free delivery, and direct setup assistance, all purchases are processed through our official Discord server ticket system.
      </p>
    </div>

    <div class="ticket-dispatch-card">
      <h3 style="font-family:var(--font-display); font-size:1.5rem; text-transform:uppercase; margin-bottom:1rem;">
        How Order Fulfillment Works
      </h3>

      <ul class="ticket-step-list">
        <li>
          <div class="step-num">01</div>
          <div class="step-content">
            <h4>Join Server & Open Ticket</h4>
            <p>Click the button below to join the Discord server and navigate to the <code>#tickets</code> channel to open an order ticket.</p>
          </div>
        </li>
        <li>
          <div class="step-num">02</div>
          <div class="step-content">
            <h4>Select Your Tier / SKU</h4>
            <p>Tell the bot or admin which product you need (e.g. <code>CATGAME-IRON-LIFETIME</code>, <code>CATGAME-GOLD-SUB</code>, or <code>CATGAME-DIAMOND-VIP</code>).</p>
          </div>
        </li>
        <li>
          <div class="step-num">03</div>
          <div class="step-content">
            <h4>Instant HWID Binding & Key Delivery</h4>
            <p>Your license key is generated, bound to your hardware ID, and delivered instantly with full installation instructions.</p>
          </div>
        </li>
      </ul>

      <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:2rem;">
        <button class="btn btn-discord" onclick="window.open('${DISCORD_TICKET_URL}', '_blank')">
          Direct Ticket Channel (#tickets) ↗
        </button>
        <button class="btn" onclick="window.open('${DISCORD_INVITE_URL}', '_blank')">
          Join Discord Server (Invite) ↗
        </button>
        <button id="dispatch-copy-tag" class="btn">
          Copy Developer Tag (${DISCORD_USERNAME})
        </button>
      </div>
    </div>
  `;

  router.updatePageLinks();

  document.getElementById("dispatch-copy-tag")?.addEventListener("click", function() {
    navigator.clipboard.writeText(DISCORD_USERNAME).then(() => {
      this.innerText = "✔ COPIED: " + DISCORD_USERNAME;
      setTimeout(() => { this.innerText = `Copy Developer Tag (${DISCORD_USERNAME})`; }, 2000);
    });
  });
}

// -------------------------------------------------------------
// COMMON UI LOGIC: FILTERS, SEARCH, CRT, SIMULATOR, MODALS
// -------------------------------------------------------------
function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const filtered = PRODUCTS.filter(p => {
    const matchCategory = currentCategory === "all" || p.category === currentCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery) ||
                        p.description.toLowerCase().includes(searchQuery) ||
                        p.tags.some(t => t.toLowerCase().includes(searchQuery));
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--bg-surface); border: 1px dashed var(--line); font-family: var(--font-mono); color: var(--dim);">
        [!] NO UNITS FOUND MATCHING QUERY "${searchQuery}"
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div>
        <div class="product-type">${p.badge} // ${p.sku}</div>
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-tags">
          ${p.tags.map(t => `<span class="product-tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="product-footer">
        <span class="product-price">${p.price}</span>
        <button class="btn btn-sm" onclick="handleProductAction('${p.id}')">${p.actionText} →</button>
      </div>
    </div>
  `).join("");
}

function setupFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.getAttribute("data-category");
      renderProductGrid();
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProductGrid();
  });
}

function setupCrtToggle() {
  const toggleBtn = document.getElementById("crt-toggle");
  if (!toggleBtn) return;

  let crtActive = true;
  document.body.classList.add("crt-enabled");

  toggleBtn.addEventListener("click", () => {
    crtActive = !crtActive;
    if (crtActive) {
      document.body.classList.add("crt-enabled");
      toggleBtn.innerText = "CRT: ON";
      toggleBtn.style.color = "var(--green)";
    } else {
      document.body.classList.remove("crt-enabled");
      toggleBtn.innerText = "CRT: OFF";
      toggleBtn.style.color = "var(--dim)";
    }
  });
}

function setupSimulator() {
  const consoleEl = document.getElementById("sim-console");
  const inputEl = document.getElementById("sim-input");
  const solveBtn = document.getElementById("sim-solve-btn");
  const presets = document.querySelectorAll(".preset-btn");

  if (!consoleEl || !inputEl || !solveBtn) return;

  presets.forEach(btn => {
    btn.addEventListener("click", () => {
      inputEl.value = btn.getAttribute("data-prompt");
      executeSimulation(inputEl.value);
    });
  });

  solveBtn.addEventListener("click", () => {
    if (inputEl.value.trim()) {
      executeSimulation(inputEl.value.trim());
    }
  });

  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && inputEl.value.trim()) {
      executeSimulation(inputEl.value.trim());
    }
  });

  function executeSimulation(promptText) {
    appendConsoleLine(`<span class="msg-header">[CHATGAMES]</span> <span class="msg-prompt">Incoming challenge: "${promptText}"</span>`);

    let answer = null;
    let type = "UNKNOWN";

    if (promptText.includes("_")) {
      type = "FILL_GAPS";
      if (promptText.toLowerCase().includes("rown") && promptText.toLowerCase().includes("cret")) {
        answer = "Brown Concrete Powder";
      } else if (promptText.toLowerCase().includes("dia") && promptText.toLowerCase().includes("ond")) {
        answer = "Diamond Sword";
      } else {
        answer = "Netherite Ingot";
      }
    } else if (/[0-9+\-*\/xX÷]/.test(promptText) && (promptText.toLowerCase().includes("what is") || promptText.toLowerCase().includes("solve") || /[0-9]+\s*[+*\/xX\-]\s*[0-9]+/.test(promptText))) {
      type = "MATH";
      try {
        let cleaned = promptText.replace(/\b(what|is|solve|equation|math|calculate)\b/gi, '')
                                .replace(/[xX×]/g, '*')
                                .replace(/÷/g, '/');
        let filtered = cleaned.replace(/[^0-9+\-*/().]/g, '').trim();
        const val = Function(`'use strict'; return (${filtered})`)();
        answer = String(val);
      } catch (e) {
        answer = "42";
      }
    } else if (promptText.toLowerCase().startsWith("reverse") || promptText.toLowerCase().includes("unreverse")) {
      type = "REVERSE";
      const target = promptText.replace(/^(reverse|unreverse)[:\s]*/i, '').trim();
      answer = target.split('').reverse().join('');
    } else if (promptText.toLowerCase().startsWith("unscramble") || promptText.toLowerCase().includes("unscramble")) {
      type = "UNSCRAMBLE";
      const target = promptText.replace(/^(unscramble)[:\s]*/i, '').trim().toLowerCase();
      if (target.includes("creeper") || target === "epcerre") answer = "Creeper";
      else if (target.includes("skyblock") || target === "lbskcoky") answer = "Skyblock";
      else if (target.includes("obsidian") || target === "aidnbosi") answer = "Obsidian";
      else answer = "Diamond Block";
    } else {
      type = "TRIVIA";
      if (promptText.toLowerCase().includes("nether")) answer = "128";
      else if (promptText.toLowerCase().includes("rarest ore")) answer = "Emerald";
      else if (promptText.toLowerCase().includes("ender dragon")) answer = "The End";
      else answer = "Steve";
    }

    setTimeout(() => {
      appendConsoleLine(`<span class="msg-solve">✔ [CatGame: Solve]</span> Type: <b>${type}</b> ➜ Auto-Answer: <span style="color:#38bdf8;">"${answer}"</span> <span class="msg-delay">(Speed: 0.8s)</span>`);
      consoleEl.scrollTop = consoleEl.scrollHeight;
    }, 800);
  }

  function appendConsoleLine(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    consoleEl.appendChild(div);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }
}

function setupModal() {
  const modal = document.getElementById("checkout-modal");
  const closeBtn = document.getElementById("modal-close");
  const openTicketBtn = document.getElementById("modal-ticket-btn");
  const copyDetailsBtn = document.getElementById("modal-copy-btn");

  if (!modal) return;

  closeBtn?.addEventListener("click", () => closeModal());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  openTicketBtn?.addEventListener("click", () => {
    window.open(DISCORD_TICKET_URL, "_blank");
  });

  copyDetailsBtn?.addEventListener("click", () => {
    const details = `Order SKU: ${selectedTier ? selectedTier.sku : (selectedProduct ? selectedProduct.sku : "SKU-GENERAL")}\nProduct: ${selectedProduct ? selectedProduct.title : "CatGame"}\nTier: ${selectedTier ? selectedTier.name + " (" + selectedTier.price + ")" : "General Access"}\nDiscord Tag: ${DISCORD_USERNAME}`;
    navigator.clipboard.writeText(details).then(() => {
      copyDetailsBtn.innerText = "✔ COPIED TO CLIPBOARD!";
      setTimeout(() => { copyDetailsBtn.innerText = "Copy Order Details"; }, 2000);
    });
  });
}

function openModal(product, tier = null) {
  selectedProduct = product;
  selectedTier = tier;

  const modal = document.getElementById("checkout-modal");
  const titleEl = document.getElementById("modal-item-title");
  const priceEl = document.getElementById("modal-item-price");
  const skuEl = document.getElementById("modal-item-sku");
  const descEl = document.getElementById("modal-item-desc");

  if (titleEl) titleEl.innerText = tier ? `${product.title} [${tier.name}]` : product.title;
  if (priceEl) priceEl.innerText = tier ? `${tier.price} (${tier.cadence})` : product.price;
  if (skuEl) skuEl.innerText = tier ? tier.sku : product.sku;
  if (descEl) descEl.innerText = tier ? `Device Limit: ${tier.devices} | Solve Delay: ${tier.delay}` : product.description;

  modal?.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("checkout-modal");
  modal?.classList.remove("active");
}

// Global action handlers
window.handleProductAction = function(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  if (prod.id === "catgame-mod") {
    router.navigate("/catgame");
    return;
  }

  openModal(prod);
};

window.buyTier = function(tierIndex) {
  const catgame = PRODUCTS.find(p => p.id === "catgame-mod");
  if (!catgame || !catgame.tiers[tierIndex]) return;
  openModal(catgame, catgame.tiers[tierIndex]);
};
