/* ====================================================================
   AUTOMATAIZ – Live Dashboard Simulation & Interactive Calculators
   (js/dashboard.js)
   Colors: Green (#19B000), Mustard Yellow (#FFC61A)
   ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLiveDashboardStats();
  initChatStreamSimulation();
  initRoiCalculator();
  initPricingSwitcher();
  initWorkflowSimulator();
});

// --- 1. Live Fluctuating Dashboard Metrics ---
function initLiveDashboardStats() {
  const actionsCounter = document.getElementById('dashActionsCount');
  const revenueCounter = document.getElementById('dashRevenueCount');
  const activeBotsCounter = document.getElementById('dashActiveBots');

  if (!actionsCounter && !revenueCounter) return;

  let baseActions = 142890;
  let baseRevenue = 842500;
  let baseBots = 24;

  setInterval(() => {
    // Increment actions
    const actionDelta = Math.floor(Math.random() * 5) + 1;
    baseActions += actionDelta;
    if (actionsCounter) {
      actionsCounter.textContent = baseActions.toLocaleString();
    }

    // Occasional revenue bump
    if (Math.random() > 0.6) {
      baseRevenue += Math.floor(Math.random() * 450) + 150;
      if (revenueCounter) {
        revenueCounter.textContent = '$' + baseRevenue.toLocaleString();
      }
    }
  }, 2200);
}

// --- 2. Live WhatsApp / AI Agent Chat Stream ---
function initChatStreamSimulation() {
  const chatContainer = document.getElementById('liveChatStream');
  if (!chatContainer) return;

  const sampleConversations = [
    { sender: 'user', text: 'Hi! Can you send pricing & verify HIPAA compliance for our 45-physician practice?' },
    { sender: 'ai', text: '⚡ Automataiz Clinical AI: Absolutely. We are SOC2 Type II & HIPAA certified with end-to-end BAA. I have generated a customized deployment plan for 45 seats.' },
    { sender: 'user', text: 'Great, can we automate patient reminders on WhatsApp?' },
    { sender: 'ai', text: '✅ Yes! Automated WhatsApp workflows reduce no-shows by 44%. Shall I book a 15-min technical onboarding session?' }
  ];

  let step = 0;
  function addMessage() {
    if (step >= sampleConversations.length) {
      step = 0;
      chatContainer.innerHTML = '';
    }

    const msg = sampleConversations[step];
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${msg.sender}`;
    bubble.innerHTML = `<strong>${msg.sender === 'ai' ? '🤖 Automataiz OS' : '👤 Prospect'}:</strong> ${msg.text}`;
    bubble.style.opacity = '0';
    bubble.style.transform = 'translateY(10px)';
    bubble.style.transition = 'all 0.4s ease';

    chatContainer.appendChild(bubble);

    setTimeout(() => {
      bubble.style.opacity = '1';
      bubble.style.transform = 'translateY(0)';
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 50);

    step++;
    setTimeout(addMessage, step % 2 === 1 ? 3000 : 2500);
  }

  setTimeout(addMessage, 1500);
}

// --- 3. Interactive ROI & Time Saved Calculator ---
function initRoiCalculator() {
  const teamSlider = document.getElementById('teamSizeSlider');
  const toolSpendSlider = document.getElementById('toolSpendSlider');

  const teamValDisplay = document.getElementById('teamSizeDisplay');
  const toolValDisplay = document.getElementById('toolSpendDisplay');

  const annualSavingsDisplay = document.getElementById('roiAnnualSavings');
  const hoursSavedDisplay = document.getElementById('roiHoursSaved');
  const efficiencyMultiplier = document.getElementById('roiMultiplier');

  if (!teamSlider || !toolSpendSlider) return;

  function recalculate() {
    const teamSize = parseInt(teamSlider.value, 10);
    const toolSpendMonthly = parseInt(toolSpendSlider.value, 10);

    // Update labels
    if (teamValDisplay) teamValDisplay.textContent = `${teamSize} Members`;
    if (toolValDisplay) toolValDisplay.textContent = `$${toolSpendMonthly.toLocaleString()}/mo`;

    // Calculation formulas:
    // Average hours saved per employee per week = 8.5 hours
    // Annual hours saved = teamSize * 8.5 * 50 weeks
    const annualHoursSaved = Math.round(teamSize * 8.5 * 50);

    // SaaS stack consolidation savings: 65% of existing tool spend saved
    const toolSavingsAnnual = toolSpendMonthly * 12 * 0.65;
    
    // Labor efficiency savings ($40/hour value)
    const laborSavingsAnnual = annualHoursSaved * 38 * 0.45;

    const totalAnnualSavings = Math.round(toolSavingsAnnual + laborSavingsAnnual);
    const multiplier = (3.2 + (teamSize * 0.05)).toFixed(1);

    if (annualSavingsDisplay) {
      annualSavingsDisplay.textContent = `$${totalAnnualSavings.toLocaleString()}`;
    }
    if (hoursSavedDisplay) {
      hoursSavedDisplay.textContent = `${annualHoursSaved.toLocaleString()} hrs/yr`;
    }
    if (efficiencyMultiplier) {
      efficiencyMultiplier.textContent = `${multiplier}x ROI`;
    }
  }

  teamSlider.addEventListener('input', recalculate);
  toolSpendSlider.addEventListener('input', recalculate);
  recalculate();
}

// --- 4. Interactive Pricing Switcher (Monthly vs Annual) ---
// --- 4. Interactive Dual Pricing Switcher (Monthly vs Yearly & INR vs USD) ---
function initPricingSwitcher() {
  const billingBtns = document.querySelectorAll('.pricing-switch-btn');
  const currencyBtns = document.querySelectorAll('.currency-switch-btn');

  const starterOriginal = document.getElementById('starterOriginalPrice');
  const starterOffer = document.getElementById('priceStarter');
  const starterSavings = document.getElementById('starterSavingsBadge');
  const starterCycle = document.getElementById('starterCycleLabel');

  const growthOriginal = document.getElementById('growthOriginalPrice');
  const growthOffer = document.getElementById('priceGrowth');
  const growthSavings = document.getElementById('growthSavingsBadge');
  const growthCycle = document.getElementById('growthCycleLabel');

  const currencyNotice = document.getElementById('currencyNotice');

  let currentCycle = 'yearly'; // 'monthly' | 'yearly'
  let currentCurrency = 'INR'; // 'INR' | 'USD'

  const pricingData = {
    INR: {
      monthly: {
        startup: { original: '₹7,999/mo', offer: '₹3,999', cycle: '/month (billed monthly)', savings: 'Save ₹4,000/mo' },
        growth: { original: '₹9,999/mo', offer: '₹6,999', cycle: '/month (billed monthly)', savings: 'Save ₹3,000/mo' }
      },
      yearly: {
        startup: { original: '₹95,988/yr', offer: '₹39,999', cycle: '/year (≈ ₹3,333/mo)', savings: 'Save ₹55,989' },
        growth: { original: '₹119,988/yr', offer: '₹69,999', cycle: '/year (≈ ₹5,833/mo)', savings: 'Save ₹49,989' }
      }
    },
    USD: {
      monthly: {
        startup: { original: '$99/mo', offer: '$49', cycle: '/month (billed monthly)', savings: 'Save $50/mo' },
        growth: { original: '$129/mo', offer: '$85', cycle: '/month (billed monthly)', savings: 'Save $44/mo' }
      },
      yearly: {
        startup: { original: '$1,188/yr', offer: '$489', cycle: '/year (≈ $40/mo)', savings: 'Save $699' },
        growth: { original: '$1,548/yr', offer: '$849', cycle: '/year (≈ $70/mo)', savings: 'Save $699' }
      }
    }
  };

  function updatePricingDisplay() {
    const data = pricingData[currentCurrency][currentCycle];

    // Animate numbers with smooth fade
    const priceElements = [starterOffer, growthOffer, starterOriginal, growthOriginal];
    priceElements.forEach(el => {
      if (el) {
        el.style.opacity = '0.3';
        el.style.transform = 'translateY(4px)';
      }
    });

    setTimeout(() => {
      // Startup
      if (starterOriginal) starterOriginal.textContent = data.startup.original;
      if (starterOffer) starterOffer.textContent = data.startup.offer;
      if (starterSavings) starterSavings.textContent = data.startup.savings;
      if (starterCycle) starterCycle.textContent = data.startup.cycle;

      // Growth
      if (growthOriginal) growthOriginal.textContent = data.growth.original;
      if (growthOffer) growthOffer.textContent = data.growth.offer;
      if (growthSavings) growthSavings.textContent = data.growth.savings;
      if (growthCycle) growthCycle.textContent = data.growth.cycle;

      // Currency notice
      if (currencyNotice) {
        currencyNotice.style.display = currentCurrency === 'USD' ? 'block' : 'none';
      }

      priceElements.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
    }, 120);
  }

  // Billing Cycle Toggles
  billingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      billingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCycle = btn.getAttribute('data-cycle') || 'yearly';
      updatePricingDisplay();
    });
  });

  // Currency Toggles
  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.getAttribute('data-currency') || 'INR';
      updatePricingDisplay();
    });
  });

  // Initial render
  updatePricingDisplay();
}

// --- 5. Interactive Workflow Simulator ---
function initWorkflowSimulator() {
  const triggerNodes = document.querySelectorAll('.wf-node.trigger-actionable');
  if (!triggerNodes.length) return;

  triggerNodes.forEach(node => {
    node.addEventListener('click', () => {
      const container = node.closest('.workflow-builder');
      if (!container) return;

      const connectors = container.querySelectorAll('.wf-connector');
      const actionNodes = container.querySelectorAll('.wf-node.action');

      // Pulse animation
      node.style.borderColor = '#19B000';
      node.style.boxShadow = '0 0 25px rgba(25, 176, 0, 0.5)';

      connectors.forEach((conn, i) => {
        setTimeout(() => {
          conn.style.background = 'linear-gradient(90deg, #19B000, #FFC61A)';
          conn.style.boxShadow = '0 0 15px rgba(25, 176, 0, 0.6)';
        }, i * 250);
      });

      actionNodes.forEach((act, i) => {
        setTimeout(() => {
          act.style.borderColor = '#FFC61A';
          act.style.boxShadow = '0 0 25px rgba(255, 198, 26, 0.5)';
        }, (i + 1) * 350);
      });

      setTimeout(() => {
        node.style.borderColor = '';
        node.style.boxShadow = '';
        connectors.forEach(c => { c.style.background = ''; c.style.boxShadow = ''; });
        actionNodes.forEach(a => { a.style.borderColor = ''; a.style.boxShadow = ''; });
      }, 3000);
    });
  });
}
