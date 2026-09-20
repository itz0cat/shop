/**
 * ITZ0CAT DEV PROFILE // NAVIGO SPA ROUTER & APP LOGIC
 */

const DISCORD_TICKET_URL = "https://discord.com/channels/1263147204940533781/1538574462553690112";
const DISCORD_INVITE_URL = "https://discord.gg/WTR52mYMF";
const DISCORD_USERNAME = "@Itz0Cat";
const GITHUB_URL = "https://github.com/itz0cat";

const PROFILE = {
  name: "Itz0Cat",
  tagline: "Minecraft Fabric modder & solo indie dev.",
  bio: "Building Fabric mods, self-hosted backends, and dev tooling — mostly from a phone via Termux. Currently shipping CatTags (team-identity mod) and Cat Client (QoL/PvP client), both targeting Java Edition 1.21.11.",
  stack: ["Java / Fabric API", "Node.js", "PostgreSQL", "Render", "GitHub Actions", "Antigravity CLI (agy)"]
};

// CATGAME STORE — flagship product, sold via Discord ticket
const CATGAME = {
  id: "catgame-mod",
  title: "CatGame Flagship Mod",
  badge: "Flagship Auto-Solver",
  description: "Undetected Minecraft Fabric 1.21.11 chat-game auto-solver. Solves fill-in-the-gaps, unscramble, math, reverse, and trivia with humanized delays and predictive radar warnings.",
  tags: ["Fabric 1.21.11", "0.8s Fastest", "2,466+ Words"],
  sku: "SKU-CATGAME-SOLVER",
  tiers: [
    { name: "Iron Tier", price: "₹80", cadence: "Lifetime Permanent", delay: "4.0s (Fixed)", devices: "1 Device", sku: "CATGAME-IRON-LIFETIME", specs: ["Fixed 4.0s humanized delay", "1 Device allocation (HWID locked)", "Permanent lifetime access", "All 6 core game solvers included"] },
    { name: "Gold Tier", price: "₹20/wk (or ₹70/mo)", cadence: "Subscription", delay: "2.5s (Down to 2.0s)", devices: "2 Devices", sku: "CATGAME-GOLD-SUB", specs: ["Adjustable delay: 2.5s down to 2.0s", "In-game /cat delay unlocked", "2 Devices allocation (PC + Mobile)", "Priority solver backend queue"] },
    { name: "Diamond Tier", price: "₹40/wk (or ₹140/mo)", cadence: "Subscription", delay: "0.8s (Down to 0.1s)", devices: "5 Devices", sku: "CATGAME-DIAMOND-VIP", specs: ["Near-instant 0.8s delay (down to 0.1s)", "Unrestricted in-game delay control", "5 Devices allocation (Clan / Multi-box)", "24/7 custom server trivia additions"] }
  ]
};

// PROJECTS — free/open, link out to GitHub, no checkout
const PROJECTS = [
  { id: "cattags", badge: "Fabric Mod", title: "CatTags", description: "Team-identity/tag Fabric mod with a Render-hosted Node + PostgreSQL backend, Better Auth, and Discord OAuth sign-in.", tags: ["Fabric 1.21.11", "Render Backend", "Better Auth"], link: "https://cattags-api.onrender.com" },
  { id: "catclient", badge: "Utility Client", title: "Cat Client", description: "Custom Fabric QoL/PvP client — fullbright, zoom, freelook, ArmorHUD, cloud profile sync, in-game badges for other Cat Client users.", tags: ["Fabric 1.21.11", "PvP HUD", "Fullbright"], link: GITHUB_URL },
  { id: "pocketvps", badge: "Prototype", title: "PocketVPS", description: "Turns an Android device into a 24/7 lightweight Linux server via Termux, process keepalives, and remote port-forwarding.", tags: ["Termux", "Android Server", "DevOps"], link: GITHUB_URL },
  { id: "catbot", badge: "Prototype", title: "CatBot & Ticket Manager", description: "Discord bot architecture for automated ticket dispatch, HWID resets, and server status monitoring.", tags: ["Discord.js", "Automation"], link: GITHUB_URL }
];

// SKILLS — agentic/dev-workflow skills, link out
const SKILLS = [
  { id: "skill-minecraft-modding", badge: "Agent Skill", title: "Minecraft Modding Agent Skill", description: "Agentic workflow for Fabric 1.21+, mixins, custom registries, packet handling, and automated Gradle/CI pipelines.", tags: ["Fabric API", "Mixins", "Java 21"], link: GITHUB_URL },
  { id: "skill-neobrutalism", badge: "Design Skill", title: "Neobrutalism Design System Skill", description: "Bold borders, high-contrast type, WCAG 2.2 AA accessibility, semantic color tokens.", tags: ["Design System", "WCAG 2.2 AA"], link: GITHUB_URL },
  { id: "skill-typography", badge: "Design Skill", title: "Typography Mastery Skill", description: "Modular type scales, measure constraints, letter tracking, and font pairing for interfaces.", tags: ["Typography", "Modular Scale"], link: GITHUB_URL }
];

const router = new Navigo("/", { hash: false });

// PROJECTS/SKILLS page filter+search state — scoped per page, reset on entry
let listCategory = "all";
let listQuery = "";
let selectedTier = null;

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  setupCrtToggle();
  setupModal();
  initRouter();
});

function initRouter() {
  router
    .on("/", () => { setActiveNav("home"); renderProfilePage(); })
    .on("/store", () => { setActiveNav("store"); renderStorePage(); })
    .on("/projects", () => { setActiveNav("projects"); renderListPage("projects", PROJECTS, "Projects", "Shipped Minecraft mods, clients, and infrastructure prototypes."); })
    .on("/skills", () => { setActiveNav("skills"); renderListPage("skills", SKILLS, "Dev Skills", "Agentic-coding and design skills used across my projects."); })
    .on("/tickets", () => { setActiveNav("tickets"); renderTicketsPage(); })
    .notFound(() => { setActiveNav("home"); renderProfilePage(); })
    .resolve();
}

function setActiveNav(route) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("data-route") === route);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// -------------------------------------------------------------
// PAGE: DEV PROFILE (home)
// -------------------------------------------------------------
function renderProfilePage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <section class="hero">
      <div>
        <div class="hero-tag">Dev Profile</div>
        <h1 class="hero-title">${escapeHtml(PROFILE.name)}</h1>
        <p class="hero-desc"><b>${escapeHtml(PROFILE.tagline)}</b><br>${escapeHtml(PROFILE.bio)}</p>

        <div class="product-tags" style="margin-bottom:2rem;">
          ${PROFILE.stack.map(s => `<span class="product-tag">${escapeHtml(s)}</span>`).join("")}
        </div>

        <div class="hero-cta-group">
          <a href="/store" class="btn btn-primary" data-navigo>CatGame Store →</a>
          <a href="/projects" class="btn" data-navigo>View Projects →</a>
          <a href="${GITHUB_URL}" class="btn" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="/tickets" class="btn btn-discord" data-navigo>Open Discord Ticket ↗</a>
        </div>
      </div>
    </section>

    <div class="section-header">
      <span class="section-tag">[ 01 // Flagship ]</span>
      <span class="section-line"></span>
      <span class="section-index">CATGAME STORE</span>
    </div>

    <div class="flagship-showcase">
      <div class="flagship-header">
        <div>
          <div class="flagship-badge">${escapeHtml(CATGAME.badge)}</div>
          <h2 class="flagship-title">${escapeHtml(CATGAME.title)}</h2>
        </div>
      </div>
      <p class="flagship-desc">${escapeHtml(CATGAME.description)}</p>
      <a href="/store" class="btn btn-primary btn-sm" data-navigo>View Tiers & Buy →</a>
    </div>

    <div class="section-header">
      <span class="section-tag">[ 02 // Projects ]</span>
      <span class="section-line"></span>
      <span class="section-index">FEATURED</span>
    </div>

    <div class="product-grid">
      ${PROJECTS.slice(0, 3).map(p => productCardHtml(p)).join("")}
    </div>
  `;

  router.updatePageLinks();
}

// -------------------------------------------------------------
// PAGE: CATGAME STORE
// -------------------------------------------------------------
function renderStorePage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <div class="breadcrumb">
      <a href="/" data-navigo>Profile</a><span class="sep">/</span><span class="current">CatGame Store</span>
    </div>

    <div class="page-intro">
      <div class="hero-tag">Flagship Auto-Solver // Fabric 1.21.11</div>
      <h1 class="page-title">CatGame: Undetected Chat Game Auto-Solver</h1>
      <p class="page-desc">${escapeHtml(CATGAME.description)}</p>
    </div>

    <div class="solver-demo">
      <div class="demo-bar">
        <span class="demo-title"><span style="color:var(--green)">●</span> LIVE SOLVER TERMINAL SIMULATOR</span>
        <span>ENGINE: CATGAME-v4.0</span>
      </div>
      <div class="demo-presets">
        <button class="preset-btn" data-prompt="_rown Co_cret_ ___d__">Fill Gaps</button>
        <button class="preset-btn" data-prompt="What is 14 * 7 - (20 / 4)?">Math Expression</button>
        <button class="preset-btn" data-prompt="Unscramble epCerre">Unscramble</button>
        <button class="preset-btn" data-prompt="Reverse pQLVEQ">Reverse String</button>
        <button class="preset-btn" data-prompt="How many blocks high can a player build in the nether?">Trivia Question</button>
      </div>
      <div id="sim-console" class="demo-console">
        <div><span class="msg-header">[SYSTEM]</span> Simulator ready. Click a preset or type a challenge.</div>
      </div>
      <div class="demo-controls">
        <input id="sim-input" type="text" class="demo-input" placeholder="Type a chat game prompt...">
        <button id="sim-solve-btn" class="btn btn-primary btn-sm">Solve</button>
      </div>
    </div>

    <div class="section-header">
      <span class="section-tag">[ Key Access Tiers ]</span>
      <span class="section-line"></span>
      <span class="section-index">HWID LICENSED</span>
    </div>

    <div id="catgame-tiers" class="tier-grid">
      ${CATGAME.tiers.map((t, i) => tierCardHtml(t, i)).join("")}
    </div>
  `;

  router.updatePageLinks();
  setupSimulator();
}

function tierCardHtml(tier, index) {
  const cls = tier.name.split(" ")[0].toLowerCase();
  const featured = cls === "diamond" ? " featured" : "";
  return `
    <div class="tier-card ${cls}${featured}">
      <div>
        <div class="tier-top">
          <div class="tier-name">${escapeHtml(tier.name)}</div>
          <span class="tier-tag">${escapeHtml(tier.cadence)}</span>
        </div>
        <div class="tier-price-wrap">
          <span class="tier-price">${escapeHtml(tier.price.split(" ")[0])}</span>
          <span class="tier-cadence">${escapeHtml(tier.price.replace(tier.price.split(" ")[0], "").trim())}</span>
        </div>
        <ul class="tier-specs">
          ${tier.specs.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
        </ul>
      </div>
      <button class="btn btn-sm${cls === "diamond" ? " btn-primary" : ""}" onclick="buyTier(${index})">Get ${escapeHtml(tier.name.split(" ")[0])} Key →</button>
    </div>
  `;
}

// -------------------------------------------------------------
// PAGE: PROJECTS / SKILLS (shared list renderer, free items — no checkout)
// -------------------------------------------------------------
function renderListPage(key, items, title, desc) {
  listCategory = "all";
  listQuery = "";

  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <div class="breadcrumb">
      <a href="/" data-navigo>Profile</a><span class="sep">/</span><span class="current">${escapeHtml(title)}</span>
    </div>
    <div class="page-intro">
      <h1 class="page-title">${escapeHtml(title)}</h1>
      <p class="page-desc">${escapeHtml(desc)}</p>
    </div>
    <div class="search-wrapper">
      <input id="search-input" type="text" class="search-input" placeholder="Search ${escapeHtml(title.toLowerCase())} by title, keyword, or tag...">
    </div>
    <div id="product-grid" class="product-grid"></div>
  `;

  router.updatePageLinks();
  renderGrid(items);
  setupSearch(items);
}

function renderGrid(items) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const filtered = items.filter(p => {
    const q = listQuery;
    return p.title.toLowerCase().includes(q) ||
           p.description.toLowerCase().includes(q) ||
           p.tags.some(t => t.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--bg-surface); border: 1px dashed var(--line); font-family: var(--font-mono); color: var(--dim);">[!] NO RESULTS FOR "${escapeHtml(listQuery)}"</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => productCardHtml(p)).join("");
}

function productCardHtml(p) {
  return `
    <div class="product-card">
      <div>
        <div class="product-type">${escapeHtml(p.badge)}</div>
        <h3 class="product-title">${escapeHtml(p.title)}</h3>
        <p class="product-desc">${escapeHtml(p.description)}</p>
        <div class="product-tags">${p.tags.map(t => `<span class="product-tag">${escapeHtml(t)}</span>`).join("")}</div>
      </div>
      <div class="product-footer">
        <span class="product-price">Open Source</span>
        <a class="btn btn-sm" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">View →</a>
      </div>
    </div>
  `;
}

function setupSearch(items) {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;
  searchInput.addEventListener("input", (e) => {
    listQuery = e.target.value.toLowerCase().trim();
    renderGrid(items);
  });
}

function setupCrtToggle() {
  const toggleBtn = document.getElementById("crt-toggle");
  if (!toggleBtn) return;
  let crtActive = true;
  document.body.classList.add("crt-enabled");
  toggleBtn.addEventListener("click", () => {
    crtActive = !crtActive;
    document.body.classList.toggle("crt-enabled", crtActive);
    toggleBtn.innerText = crtActive ? "CRT: ON" : "CRT: OFF";
    toggleBtn.style.color = crtActive ? "var(--green)" : "var(--dim)";
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
    if (inputEl.value.trim()) executeSimulation(inputEl.value.trim());
  });
  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && inputEl.value.trim()) executeSimulation(inputEl.value.trim());
  });

  function executeSimulation(promptText) {
    appendConsoleLine(`<span class="msg-header">[CHATGAMES]</span> <span class="msg-prompt">Incoming challenge: "${escapeHtml(promptText)}"</span>`);

    let answer = null;
    let type = "UNKNOWN";

    if (promptText.includes("_")) {
      type = "FILL_GAPS";
      if (promptText.toLowerCase().includes("rown") && promptText.toLowerCase().includes("cret")) answer = "Brown Concrete Powder";
      else if (promptText.toLowerCase().includes("dia") && promptText.toLowerCase().includes("ond")) answer = "Diamond Sword";
      else answer = "Netherite Ingot";
    } else if (/[0-9+\-*\/xX÷]/.test(promptText) && (promptText.toLowerCase().includes("what is") || promptText.toLowerCase().includes("solve") || /[0-9]+\s*[+*\/xX\-]\s*[0-9]+/.test(promptText))) {
      type = "MATH";
      try {
        let cleaned = promptText.replace(/\b(what|is|solve|equation|math|calculate)\b/gi, '').replace(/[xX×]/g, '*').replace(/÷/g, '/');
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
    } else if (promptText.toLowerCase().includes("unscramble")) {
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
      appendConsoleLine(`<span class="msg-solve">✔ [CatGame: Solve]</span> Type: <b>${escapeHtml(type)}</b> ➜ Auto-Answer: <span style="color:#38bdf8;">"${escapeHtml(answer)}"</span> <span class="msg-delay">(Speed: 0.8s)</span>`);
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
  const openInviteBtn = document.getElementById("modal-invite-btn");
  const copyDetailsBtn = document.getElementById("modal-copy-btn");
  if (!modal) return;

  closeBtn?.addEventListener("click", () => closeModal());
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  openTicketBtn?.addEventListener("click", () => window.open(DISCORD_TICKET_URL, "_blank"));
  openInviteBtn?.addEventListener("click", () => window.open(DISCORD_INVITE_URL, "_blank"));

  copyDetailsBtn?.addEventListener("click", () => {
    const details = `Order SKU: ${selectedTier ? selectedTier.sku : "SKU-GENERAL"}\nProduct: CatGame\nTier: ${selectedTier ? selectedTier.name + " (" + selectedTier.price + ")" : "General Access"}\nDiscord Tag: ${DISCORD_USERNAME}`;
    navigator.clipboard.writeText(details).then(() => {
      copyDetailsBtn.innerText = "✔ COPIED TO CLIPBOARD!";
      setTimeout(() => { copyDetailsBtn.innerText = "Copy Order Details"; }, 2000);
    });
  });
}

function openModal(tier) {
  selectedTier = tier;
  const modal = document.getElementById("checkout-modal");
  document.getElementById("modal-item-title").innerText = `${CATGAME.title} [${tier.name}]`;
  document.getElementById("modal-item-price").innerText = `${tier.price} (${tier.cadence})`;
  document.getElementById("modal-item-sku").innerText = tier.sku;
  document.getElementById("modal-item-desc").innerText = `Device Limit: ${tier.devices} | Solve Delay: ${tier.delay}`;
  modal?.classList.add("active");
}

function closeModal() {
  document.getElementById("checkout-modal")?.classList.remove("active");
}

window.buyTier = function (tierIndex) {
  const tier = CATGAME.tiers[tierIndex];
  if (!tier) return;
  openModal(tier);
};

// -------------------------------------------------------------
// PAGE: TICKETS
// -------------------------------------------------------------
function renderTicketsPage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <div class="breadcrumb"><a href="/" data-navigo>Profile</a><span class="sep">/</span><span class="current">Tickets</span></div>

    <div class="page-intro">
      <div class="hero-tag">Manual Order Fulfillment // Zero Fraud</div>
      <h1 class="page-title">Discord Ticket Dispatch</h1>
      <p class="page-desc">To ensure instant HWID binding and direct setup assistance, all CatGame key purchases are processed through the Discord ticket system.</p>
    </div>

    <div class="ticket-dispatch-card">
      <h3 style="font-family:var(--font-display); font-size:1.5rem; text-transform:uppercase; margin-bottom:1rem;">How Order Fulfillment Works</h3>
      <ul class="ticket-step-list">
        <li><div class="step-num">01</div><div class="step-content"><h4>Join Server & Open Ticket</h4><p>Join the Discord server and open a ticket in <code>#tickets</code>.</p></div></li>
        <li><div class="step-num">02</div><div class="step-content"><h4>Select Your Tier / SKU</h4><p>Tell the bot or admin which key you need (e.g. <code>CATGAME-IRON-LIFETIME</code>).</p></div></li>
        <li><div class="step-num">03</div><div class="step-content"><h4>Instant HWID Binding & Key Delivery</h4><p>Your license key is generated, HWID-bound, and delivered with install instructions.</p></div></li>
      </ul>
      <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:2rem;">
        <button class="btn btn-discord" onclick="window.open('${DISCORD_TICKET_URL}', '_blank')">Direct Ticket Channel (#tickets) ↗</button>
        <button class="btn" onclick="window.open('${DISCORD_INVITE_URL}', '_blank')">Join Discord Server (Invite) ↗</button>
        <button id="dispatch-copy-tag" class="btn">Copy Developer Tag (${DISCORD_USERNAME})</button>
      </div>
    </div>
  `;

  router.updatePageLinks();
  document.getElementById("dispatch-copy-tag")?.addEventListener("click", function () {
    navigator.clipboard.writeText(DISCORD_USERNAME).then(() => {
      this.innerText = "✔ COPIED: " + DISCORD_USERNAME;
      setTimeout(() => { this.innerText = `Copy Developer Tag (${DISCORD_USERNAME})`; }, 2000);
    });
  });
}
