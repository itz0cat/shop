/**
 * ITZ0CAT // DEV PROFILE & CATGAME SHOP // NAVIGO SPA
 * Built using the prototype.html reference aesthetic and neobrutalism design tokens
 */

const DISCORD_TICKET_URL = "https://discord.com/channels/1263147204940533781/1538574462553690112";
const DISCORD_INVITE_URL = "https://discord.gg/WTR52mYMF";
const DISCORD_USERNAME = "@Itz0Cat";
const GITHUB_URL = "https://github.com/itz0cat";

const TIERS = [
  {
    name: "Iron",
    unit: "UNIT / KEY-01",
    price: "₹80",
    cadence: "/ permanent",
    flag: "One-time",
    requires: null,
    sku: "CATGAME-IRON-LIFETIME",
    cls: "iron",
    specs: [
      "Lifetime access, no renewal",
      "Fixed 4.0s humanized delay",
      "1 Device allocation (HWID locked)",
      "All 6 core game solvers included"
    ]
  },
  {
    name: "Gold",
    unit: "UNIT / KEY-02",
    price: "₹20",
    cadence: "/ week (or ₹70/mo)",
    flag: "Weekly",
    requires: "Requires iron key",
    sku: "CATGAME-GOLD-SUB",
    cls: "gold",
    specs: [
      "Requires an active iron key",
      "Adjustable delay: 2.5s down to 2.0s",
      "2 Devices allocation (PC + Mobile)",
      "Priority solver backend queue"
    ]
  },
  {
    name: "Diamond",
    unit: "UNIT / KEY-03",
    price: "₹40",
    cadence: "/ week (or ₹140/mo)",
    flag: "Best value",
    requires: "Requires iron key",
    sku: "CATGAME-DIAMOND-VIP",
    cls: "featured diamond",
    specs: [
      "Requires an active iron key",
      "Near-instant 0.8s delay (down to 0.1s)",
      "5 Devices allocation (Clan / Multi-box)",
      "24/7 custom server trivia additions"
    ]
  }
];

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
    <div class="hero">
      <p class="tag">[ DEV PROFILE // SOLO INDIE DEV ]</p>
      <h1>Itz<br>0cat</h1>
      <p>Minecraft Fabric modder & developer. Creator of CatGame Flagship Auto-Solver, CatTags, and Cat Client for Java Edition 1.21.11.</p>
      <div class="hero-actions">
        <a href="/shop" class="btn btn-primary" data-navigo>&gt;&gt;&gt; See the keys</a>
        <a href="${GITHUB_URL}" class="btn" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="${DISCORD_INVITE_URL}" class="btn btn-discord" target="_blank" rel="noopener">Discord Server ↗</a>
      </div>
    </div>

    <div class="section-head">
      <span class="bracket">[ Flagship Mod ]</span>
      <span class="rule"></span>
      <span class="idx">01</span>
    </div>

    <div class="features">
      <div class="feature">
        <span class="id">01</span>
        <div>
          <h4>Built for Fabric 1.21.11</h4>
          <p>The flagship experience, tuned specifically for Minecraft 1.21.11 chat games — not a generic add-on.</p>
        </div>
      </div>
      <div class="feature">
        <span class="id">02</span>
        <div>
          <h4>Three Key Tiers</h4>
          <p>Iron, Gold, and Diamond each unlock faster solve delays and multi-device slots. Pick what fits.</p>
        </div>
      </div>
      <div class="feature">
        <span class="id">03</span>
        <div>
          <h4>No Lock-in</h4>
          <p>Weekly keys cancel anytime. Iron key is a one-time permanent buy that is yours for good.</p>
        </div>
      </div>
    </div>

    <div style="margin: 1.5rem 0 2rem;">
      <a href="/shop" class="btn btn-primary" data-navigo style="width:100%; text-align:center;">
        &gt;&gt;&gt; Open Shop & Live Solver Simulator
      </a>
    </div>
  `;

  router.updatePageLinks();
}

// -------------------------------------------------------------
// PAGE: SHOP (CatGame Keys & Terminal Simulator)
// -------------------------------------------------------------
function renderShopPage() {
  const appView = document.getElementById("app-view");
  if (!appView) return;

  appView.innerHTML = `
    <div class="hero">
      <p class="tag">[ FLAGSHIP MOD // FABRIC 1.21.11 ]</p>
      <h1>Cat<br>game</h1>
      <p>The flagship Cat Game mod. Pick a key, unlock the good stuff, jump straight in.</p>
      <div class="hero-actions">
        <button class="btn btn-primary" onclick="document.getElementById('access-keys-section').scrollIntoView({behavior:'smooth'})">
          &gt;&gt;&gt; See the keys
        </button>
      </div>
    </div>

    <div class="section-head">
      <span class="bracket">[ Live Simulator ]</span>
      <span class="rule"></span>
      <span class="idx">01</span>
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

    <div id="access-keys-section" class="section-head">
      <span class="bracket">[ Access keys ]</span>
      <span class="rule"></span>
      <span class="idx">02</span>
    </div>

    <div class="records">
      ${TIERS.map((tier, index) => `
        <div class="record ${tier.cls}">
          <div class="rec-top">
            <div>
              <div class="name">${escapeHtml(tier.name)}</div>
              <div class="unit-id">${escapeHtml(tier.unit)}</div>
              ${tier.requires ? `<div class="requires">${escapeHtml(tier.requires)}</div>` : ""}
            </div>
            <span class="flag">${escapeHtml(tier.flag)}</span>
          </div>
          <dl class="price-block">
            <dt>${escapeHtml(tier.price)}</dt>
            <dd>${escapeHtml(tier.cadence)}</dd>
          </dl>
          <ul class="perks">
            ${tier.specs.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
          </ul>
          <button class="buy" onclick="buyTier(${index})">Get ${escapeHtml(tier.name.toLowerCase())} key</button>
        </div>
      `).join("")}
    </div>
  `;

  router.updatePageLinks();
  setupSimulator();
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
    const details = `Order SKU: ${selectedTier ? selectedTier.sku : "SKU-CATGAME"}\nProduct: CatGame\nTier: ${selectedTier ? selectedTier.name + " (" + selectedTier.price + " " + selectedTier.cadence + ")" : "General Access"}\nDiscord Tag: ${DISCORD_USERNAME}`;
    navigator.clipboard.writeText(details).then(() => {
      copyDetailsBtn.innerText = "✔ COPIED TO CLIPBOARD!";
      setTimeout(() => { copyDetailsBtn.innerText = "Copy Order Details"; }, 2000);
    });
  });
}

function openModal(tier) {
  selectedTier = tier;
  const modal = document.getElementById("checkout-modal");
  document.getElementById("modal-item-title").innerText = `CatGame [${tier.name} Key]`;
  document.getElementById("modal-item-price").innerText = `${tier.price} ${tier.cadence}`;
  document.getElementById("modal-item-sku").innerText = tier.sku;
  document.getElementById("modal-item-desc").innerText = tier.specs.join(" • ");
  modal?.classList.add("active");
}

function closeModal() {
  document.getElementById("checkout-modal")?.classList.remove("active");
}

window.buyTier = function (tierIndex) {
  const tier = TIERS[tierIndex];
  if (!tier) return;
  openModal(tier);
};
