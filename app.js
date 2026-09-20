/**
 * ITZ0CAT DEV PROFILE & CATGAME SHOP // NAVIGO SPA ROUTER
 */

const DISCORD_TICKET_URL = "https://discord.com/channels/1263147204940533781/1538574462553690112";
const DISCORD_INVITE_URL = "https://discord.gg/WTR52mYMF";
const DISCORD_USERNAME = "@Itz0Cat";
const GITHUB_URL = "https://github.com/itz0cat";

const PROFILE = {
  name: "Itz0Cat",
  tagline: "Minecraft Fabric modder & solo indie dev.",
  bio: "Building Fabric mods, clients, and dev tooling. Creator of CatGame Flagship Auto-Solver, CatTags, and Cat Client for Java Edition 1.21.11.",
  stack: ["Java / Fabric API", "Node.js", "PostgreSQL", "Render", "GitHub Actions"]
};

// CATGAME STORE — flagship product, sold via Discord ticket
const CATGAME = {
  id: "catgame-mod",
  title: "CatGame Flagship Auto-Solver",
  badge: "Flagship Auto-Solver",
  description: "Undetected Minecraft Fabric 1.21.11 chat-game auto-solver. Solves fill-in-the-gaps, unscramble, math, reverse, and trivia with humanized delays and predictive radar.",
  tags: ["Fabric 1.21.11", "0.8s Fastest", "2,466+ Words"],
  sku: "SKU-CATGAME-SOLVER",
  tiers: [
    {
      name: "Iron Tier",
      price: "₹80",
      cadence: "Lifetime Permanent",
      delay: "4.0s (Fixed)",
      devices: "1 Device",
      sku: "CATGAME-IRON-LIFETIME",
      specs: [
        "Fixed 4.0s humanized delay",
        "1 Device allocation (HWID locked)",
        "Permanent lifetime access",
        "All 6 core game solvers included"
      ]
    },
    {
      name: "Gold Tier",
      price: "₹20/wk (or ₹70/mo)",
      cadence: "Subscription",
      delay: "2.5s (Down to 2.0s)",
      devices: "2 Devices",
      sku: "CATGAME-GOLD-SUB",
      specs: [
        "Adjustable delay: 2.5s down to 2.0s",
        "In-game /cat delay unlocked",
        "2 Devices allocation (PC + Mobile)",
        "Priority solver backend queue"
      ]
    },
    {
      name: "Diamond Tier",
      price: "₹40/wk (or ₹140/mo)",
      cadence: "Subscription",
      delay: "0.8s (Down to 0.1s)",
      devices: "5 Devices",
      sku: "CATGAME-DIAMOND-VIP",
      specs: [
        "Near-instant 0.8s delay (down to 0.1s)",
        "Unrestricted in-game delay control",
        "5 Devices allocation (Clan / Multi-box)",
        "24/7 custom server trivia additions"
      ]
    }
  ]
};

const router = new Navigo("/", { hash: false });
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
    .on("/", () => { setActiveNav("home"); renderHomePage(); })
    .on("/shop", () => { setActiveNav("shop"); renderShopPage(); })
    .on("/store", () => { router.navigate("/shop"); })
    .on("/catgame", () => { router.navigate("/shop"); })
    .on("/projects", () => { router.navigate("/"); })
    .on("/skills", () => { router.navigate("/"); })
    .on("/tickets", () => { router.navigate("/shop"); })
    .notFound(() => { setActiveNav("home"); renderHomePage(); })
    .resolve();
}

function setActiveNav(route) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("data-route") === route);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// -------------------------------------------------------------
// PAGE: HOME (Dev Profile & Flagship Highlight)
// -------------------------------------------------------------
function renderHomePage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <section class="hero">
      <div>
        <div class="hero-tag">Developer Profile</div>
        <h1 class="hero-title">${escapeHtml(PROFILE.name)}</h1>
        <p class="hero-desc"><b>${escapeHtml(PROFILE.tagline)}</b><br>${escapeHtml(PROFILE.bio)}</p>

        <div class="product-tags" style="margin-bottom:2rem;">
          ${PROFILE.stack.map(s => `<span class="product-tag">${escapeHtml(s)}</span>`).join("")}
        </div>

        <div class="hero-cta-group">
          <a href="/shop" class="btn btn-primary" data-navigo>Go to Shop →</a>
          <a href="${GITHUB_URL}" class="btn" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="${DISCORD_INVITE_URL}" class="btn btn-discord" target="_blank" rel="noopener">Discord Server ↗</a>
        </div>
      </div>
    </section>

    <div class="section-header">
      <span class="section-tag">[ Flagship Product ]</span>
      <span class="section-line"></span>
      <span class="section-index">SHOP</span>
    </div>

    <div class="flagship-showcase">
      <div class="flagship-header">
        <div>
          <div class="flagship-badge">${escapeHtml(CATGAME.badge)}</div>
          <h2 class="flagship-title">${escapeHtml(CATGAME.title)}</h2>
        </div>
      </div>
      <p class="flagship-desc">${escapeHtml(CATGAME.description)}</p>
      <div class="product-tags" style="margin-bottom:1.25rem;">
        ${CATGAME.tags.map(t => `<span class="product-tag">${escapeHtml(t)}</span>`).join("")}
      </div>
      <a href="/shop" class="btn btn-primary btn-sm" data-navigo>View Key Tiers & Demo (From ₹20) →</a>
    </div>
  `;

  router.updatePageLinks();
}

// -------------------------------------------------------------
// PAGE: SHOP (CatGame Tiers & Terminal Simulator)
// -------------------------------------------------------------
function renderShopPage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <div class="breadcrumb">
      <a href="/" data-navigo>Home</a><span class="sep">/</span><span class="current">Shop</span>
    </div>

    <div class="page-intro">
      <div class="hero-tag">Fabric 1.21.11 // Flagship Store</div>
      <h1 class="page-title">CatGame Auto-Solver</h1>
      <p class="page-desc">${escapeHtml(CATGAME.description)}</p>
    </div>

    <div class="solver-demo">
      <div class="demo-bar">
        <span class="demo-title"><span style="color:var(--green)">●</span> LIVE SOLVER TERMINAL SIMULATOR</span>
        <span>ENGINE: CATGAME-v4.0</span>
      </div>
      <div class="demo-presets">
        <button class="preset-btn" data-prompt="_rown Co_cret_ ___d__">Fill Gaps</button>
        <button class="preset-btn" data-prompt="What is 14 * 7 - (20 / 4)?">Math</button>
        <button class="preset-btn" data-prompt="Unscramble epCerre">Unscramble</button>
        <button class="preset-btn" data-prompt="Reverse pQLVEQ">Reverse</button>
        <button class="preset-btn" data-prompt="How many blocks high can a player build in the nether?">Trivia</button>
      </div>
      <div id="sim-console" class="demo-console">
        <div><span class="msg-header">[SYSTEM]</span> Simulator ready. Click a preset above or type a prompt.</div>
      </div>
      <div class="demo-controls">
        <input id="sim-input" type="text" class="demo-input" placeholder="Type a chat game prompt...">
        <button id="sim-solve-btn" class="btn btn-primary btn-sm">Solve</button>
      </div>
    </div>

    <div class="section-header">
      <span class="section-tag">[ License Keys ]</span>
      <span class="section-line"></span>
      <span class="section-index">INSTANT HWID DISPATCH</span>
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
    appendConsoleLine(`<span class="msg-header">[CHATGAMES]</span> <span class="msg-prompt">Incoming: "${escapeHtml(promptText)}"</span>`);

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
    const details = `Order SKU: ${selectedTier ? selectedTier.sku : "SKU-CATGAME"}\nProduct: CatGame\nTier: ${selectedTier ? selectedTier.name + " (" + selectedTier.price + ")" : "General Access"}\nDiscord Tag: ${DISCORD_USERNAME}`;
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
