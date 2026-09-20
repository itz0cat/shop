/**
 * UNIVERSAL SHOP // FRONTEND SCRIPT (VERCEL READY)
 * CatGame Mod, Skills, Prototypes & Discord Ticket Redirect
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

// STATE
let currentCategory = "all";
let searchQuery = "";
let selectedProduct = null;
let selectedTier = null;

// DOM ELEMENTS
document.addEventListener("DOMContentLoaded", () => {
  renderProductGrid();
  setupFilterTabs();
  setupSearch();
  setupCrtToggle();
  setupSimulator();
  setupModal();
});

// 1. RENDER PRODUCTS
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

// 2. FILTER TABS
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

// 3. SEARCH
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProductGrid();
  });
}

// 4. CRT SCANLINES TOGGLE
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

// 5. INTERACTIVE SOLVER SIMULATOR
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

    // Gap solver simulation
    if (promptText.includes("_")) {
      type = "FILL_GAPS";
      if (promptText.toLowerCase().includes("rown") && promptText.toLowerCase().includes("cret")) {
        answer = "Brown Concrete Powder";
      } else if (promptText.toLowerCase().includes("dia") && promptText.toLowerCase().includes("ond")) {
        answer = "Diamond Sword";
      } else {
        answer = "Netherite Ingot";
      }
    }
    // Math solver simulation
    else if (/[0-9+\-*\/xX÷]/.test(promptText) && (promptText.toLowerCase().includes("what is") || promptText.toLowerCase().includes("solve") || /[0-9]+\s*[+*\/xX\-]\s*[0-9]+/.test(promptText))) {
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
    }
    // Reverse simulation
    else if (promptText.toLowerCase().startsWith("reverse") || promptText.toLowerCase().includes("unreverse")) {
      type = "REVERSE";
      const target = promptText.replace(/^(reverse|unreverse)[:\s]*/i, '').trim();
      answer = target.split('').reverse().join('');
    }
    // Unscramble simulation
    else if (promptText.toLowerCase().startsWith("unscramble") || promptText.toLowerCase().includes("unscramble")) {
      type = "UNSCRAMBLE";
      const target = promptText.replace(/^(unscramble)[:\s]*/i, '').trim().toLowerCase();
      if (target.includes("creeper") || target === "epcerre") answer = "Creeper";
      else if (target.includes("skyblock") || target === "lbskcoky") answer = "Skyblock";
      else if (target.includes("obsidian") || target === "aidnbosi") answer = "Obsidian";
      else answer = "Diamond Block";
    }
    // Trivia simulation
    else {
      type = "TRIVIA";
      if (promptText.toLowerCase().includes("nether")) answer = "128";
      else if (promptText.toLowerCase().includes("rarest ore")) answer = "Emerald";
      else if (promptText.toLowerCase().includes("ender dragon")) answer = "The End";
      else answer = "Steve";
    }

    // Simulated Diamond Tier instant latency (800ms)
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

// 6. MODAL & CHECKOUT REDIRECT
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

// Global action handler
window.handleProductAction = function(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  if (prod.id === "catgame-mod") {
    // Scroll down smoothly to the Tier Matrix
    const tiersSection = document.getElementById("catgame-tiers");
    if (tiersSection) {
      tiersSection.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }

  openModal(prod);
};

window.buyTier = function(tierIndex) {
  const catgame = PRODUCTS.find(p => p.id === "catgame-mod");
  if (!catgame || !catgame.tiers[tierIndex]) return;
  openModal(catgame, catgame.tiers[tierIndex]);
};
