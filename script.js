(() => {
  const body = document.body;
  const rainBtn = document.getElementById("rainBtn");
  const rainLabel = document.getElementById("rainLabel");
  const rainLayer = document.getElementById("rainLayer");
  const statusEl = document.getElementById("weatherStatus");

  const DROP_COUNT = 220;
  let isRaining = false;
  let splashTimer = null;
  let lightningTimer = null;

  /**
   * Build a bunch of raindrops once and keep them in the DOM.
   * Toggling `.raining` on body shows/hides them via the parent layer.
   */
  function buildRaindrops() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < DROP_COUNT; i++) {
      const drop = document.createElement("span");
      drop.className = "raindrop";
      const left = Math.random() * 100;
      const duration = 0.5 + Math.random() * 0.8;
      const delay = Math.random() * -2;
      const height = 12 + Math.random() * 22;
      const opacity = 0.4 + Math.random() * 0.6;
      drop.style.left = `${left}vw`;
      drop.style.height = `${height}px`;
      drop.style.animationDuration = `${duration}s`;
      drop.style.animationDelay = `${delay}s`;
      drop.style.opacity = String(opacity);
      frag.appendChild(drop);
    }
    rainLayer.appendChild(frag);
  }

  function spawnSplash() {
    const splash = document.createElement("span");
    splash.className = "splash";
    splash.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(splash);
    splash.addEventListener("animationend", () => splash.remove(), { once: true });
  }

  function startSplashes() {
    stopSplashes();
    splashTimer = setInterval(() => {
      for (let i = 0; i < 3; i++) spawnSplash();
    }, 180);
  }
  function stopSplashes() {
    if (splashTimer) {
      clearInterval(splashTimer);
      splashTimer = null;
    }
  }

  function flashLightning() {
    const flash = document.createElement("div");
    flash.className = "flash";
    document.body.appendChild(flash);
    flash.addEventListener("animationend", () => flash.remove(), { once: true });
  }

  function scheduleLightning() {
    stopLightning();
    const tick = () => {
      if (!isRaining) return;
      flashLightning();
      lightningTimer = setTimeout(tick, 6000 + Math.random() * 8000);
    };
    lightningTimer = setTimeout(tick, 2500 + Math.random() * 4000);
  }
  function stopLightning() {
    if (lightningTimer) {
      clearTimeout(lightningTimer);
      lightningTimer = null;
    }
  }

  function startRain() {
    if (isRaining) return;
    isRaining = true;
    body.classList.add("raining");
    rainLayer.style.display = "block";
    rainBtn.setAttribute("aria-pressed", "true");
    rainLabel.textContent = "Make it sunny";
    statusEl.textContent = "Stormy · 72°F · lightning rolling in";
    startSplashes();
    scheduleLightning();
  }

  function stopRain() {
    if (!isRaining) return;
    isRaining = false;
    body.classList.remove("raining");
    rainLayer.style.display = "none";
    rainBtn.setAttribute("aria-pressed", "false");
    rainLabel.textContent = "Make it rain";
    statusEl.textContent = "Sunny & 84°F in South Beach";
    stopSplashes();
    stopLightning();
  }

  rainBtn.addEventListener("click", () => {
    if (isRaining) stopRain();
    else startRain();
  });

  buildRaindrops();
  rainLayer.style.display = "none";
})();
