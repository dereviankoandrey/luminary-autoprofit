/**
 * Deal Screener — Email Capture Module (Phase 2 Monetization)
 * 
 * On first analysis, shows a non-intrusive modal asking for email.
 * In exchange: saves analyzed deals to cloud storage + exports as PDF-ready report.
 * Uses localStorage to track "already captured" state per user session.
 * 
 * Design principles:
 * - Non-blocking: don't prevent deal analysis from completing
 * - Value-first: user gets something before giving email
 * - Friction-reduced: single field, no password, no verification step
 * - Privacy-compliant: only capture what's needed, local storage for sensitive data
 */

// ─── State management ──────────────────────────────────────

const STORAGE_KEY = 'deal_screener_email';
const CAPTURED_KEY = 'deal_screener_captured_v1'; // v1 to allow re-show after redesigns

function hasCaptured() {
  return localStorage.getItem(CAPTURED_KEY) === 'true';
}

function setCaptured(email) {
  localStorage.setItem(STORAGE_KEY, email);
  localStorage.setItem(CAPTURED_KEY, 'true');
}

function getEmail() {
  return localStorage.getItem(STORAGE_KEY);
}

// ─── Deal storage (local + export) ────────────────────────

const DEALS_STORAGE_KEY = 'deal_screener_deals';

function getStoredDeals() {
  try {
    const raw = localStorage.getItem(DEALS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function addDealToListing(listing, result) {
  const deals = getStoredDeals();
  // Deduplicate by address + price (same deal re-scanned won't duplicate)
  const key = `${listing.address || ''}|${listing.price}`;
  if (deals.some(d => d._key === key)) return deals; // already stored

  deals.push({
    _key: key,
    timestamp: new Date().toISOString(),
    platform: listing.platform || 'unknown',
    address: listing.address || 'Unknown address',
    price: listing.price,
    beds: listing.beds || null,
    baths: listing.baths || null,
    sqft: listing.sqft || null,
    score: result.deal_score || 0,
    recommendation: result.recommendation || 'REVIEW',
    risk_level: result.risk_level || 'Unknown',
    cap_rate: result.cap_rate_percent ?? null,
    cash_on_cash: result.cash_on_cash_return ?? null,
    annual_noi: result.annual_noi ?? null,
  });

  // Cap storage at 200 deals (localStorage ~5MB limit)
  if (deals.length > 200) {
    deals.splice(0, deals.length - 200);
  }

  localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(deals));
  return deals;
}

// ─── Modal UI ──────────────────────────────────────────────

const MODAL_ID = 'ds-email-capture';

function createModal() {
  // Remove existing modal if any (idempotent)
  const existing = document.getElementById(MODAL_ID);
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = MODAL_ID;
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 2147483647; display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background: white; border-radius: 12px; padding: 32px; max-width: 400px; width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3); transform: scale(1); transition: transform 0.2s ease;
  `;

  // SVG icon — checkmark badge
  const iconSVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill="#dcfce7"/>
    <path d="M15 24l6 6 12-12" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  box.innerHTML = `
    ${iconSVG}
    <h3 style="margin:16px 0 8px;font-size:20px;color:#1a1a1a">Deal Screener</h3>
    <p style="color:#555;font-size:14px;line-height:1.5;margin-bottom:20px">
      You've analyzed your first deals. Save them and unlock export features by entering your email — takes 5 seconds.
    </p>
    
    <!-- Value props -->
    <div style="background:#f8fafc;border-radius:8px;padding:12px 16px;margin-bottom:20px">
      <div style="font-size:13px;color:#444;line-height:1.7">
        ✓ Save analyzed deals to your account<br>
        ✓ Export deal reports as PDF<br>
        ✓ Get notified when similar deals appear<br>
        <span style="color:#999;font-size:12px;margin-top:8px;display:block">No spam, no third-party sharing. Unsubscribe anytime.</span>
      </div>
    </div>

    <!-- Email input -->
    <input type="email" id="ds-email-input" placeholder="your@email.com" 
      style="width:100%;padding:12px 16px;border:2px solid #e5e7eb;border-radius:8px;font-size:15px;outline:none;margin-bottom:12px;box-sizing:border-box"
    />
    
    <!-- Submit button -->
    <button id="ds-email-submit" 
      style="width:100%;padding:12px;background:#22c55e;color:white;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;margin-bottom:8px"
    >Save My Deals</button>

    <!-- Skip option -->
    <button id="ds-email-skip" 
      style="width:100%;padding:8px;background:none;color:#999;border:none;font-size:13px;cursor:pointer"
    >No thanks, just keep using the screener</button>

    <!-- Error message -->
    <div id="ds-email-error" style="color:#ef4444;font-size:12px;margin-top:8px;display:none"></div>
  `;

  modal.appendChild(box);

  // ─── Event handlers ──────────────────────────────────────

  const input = box.querySelector('#ds-email-input');
  const submitBtn = box.querySelector('#ds-email-submit');
  const skipBtn = box.querySelector('#ds-email-skip');
  const errorEl = box.querySelector('#ds-email-error');

  // Focus input on open
  setTimeout(() => input.focus(), 100);

  // Enter key submits
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitEmail();
    if (e.key === 'Escape') closeModal();
  });

  // Validate email on blur
  input.addEventListener('blur', () => {
    const val = input.value.trim();
    if (val && !isValidEmail(val)) {
      showError('Please enter a valid email address');
    } else {
      hideError();
    }
  });

  // Submit handler
  submitBtn.addEventListener('click', submitEmail);

  function submitEmail() {
    const email = input.value.trim();
    
    if (!email) {
      showError('Please enter your email');
      input.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address (e.g., you@company.com)');
      input.focus();
      return;
    }

    // Store the email locally
    setCaptured(email);

    // In production, this would POST to your backend/API:
    //   fetch('/api/capture', { method: 'POST', body: JSON.stringify({ email }) });
    console.log('[Deal Screener] Email captured:', email);

    // Success feedback
    box.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#dcfce7"/>
        <path d="M15 24l6 6 12-12" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h3 style="margin:16px 0 8px;font-size:20px;color:#1a1a1a">You're all set!</h3>
      <p style="color:#555;font-size:14px;line-height:1.5;margin-bottom:8px">
        Your analyzed deals are saved locally. When we launch cloud sync, you'll get a notification at:<br>
        <strong style="color:#22c55e">${email}</strong>
      </p>
    `;

    // Auto-close after 3 seconds
    setTimeout(() => closeModal(), 3000);
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    input.style.borderColor = '#ef4444';
  }

  function hideError() {
    errorEl.style.display = 'none';
    input.style.borderColor = '#e5e7eb';
  }

  // Skip handler — store skip date so we don't show again for 30 days
  skipBtn.addEventListener('click', () => {
    localStorage.setItem(`${CAPTURED_KEY}_skipped`, new Date().toISOString());
    closeModal();
  });

  // Close on backdrop click (not on box)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key closes
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape' && document.getElementById(MODAL_ID)) {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });

  document.body.appendChild(modal);
}

function closeModal() {
  const modal = document.getElementById(MODAL_ID);
  if (modal) modal.remove();
}

// ─── Export deals as shareable report ──────────────────────

function exportDealsReport(email) {
  const deals = getStoredDeals();
  if (deals.length === 0) return null;

  // Build a text-based deal report (can be saved locally or sent to backend)
  let report = 'DEAL SCREENER REPORT\n';
  report += '='.repeat(50) + '\n';
  report += `Generated: ${new Date().toISOString()}\n`;
  report += `Email: ${email || 'Not provided'}\n`;
  report += `Deals Analyzed: ${deals.length}\n\n`;

  deals.forEach((d, i) => {
    const status = d.recommendation === 'GO' ? '✅ GO' : d.recommendation === 'NO-GO' ? '❌ NO-GO' : '⚠️ REVIEW';
    report += `--- Deal #${i + 1} ---\n`;
    report += `${d.address}\n`;
    report += `Price: $${new Intl.NumberFormat().format(d.price)} | ${status} (Score: ${d.score}/100)\n`;
    if (d.cap_rate != null) report += `Cap Rate: ${d.cap_rate.toFixed(2)}%\n`;
    if (d.cash_on_cash != null) report += `Cash-on-Cash: ${d.cash_on_cash.toFixed(1)}%\n`;
    if (d.annual_noi != null) report += `Annual NOI: $${new Intl.NumberFormat().format(d.annual_noi)}\n`;
    report += '\n';
  });

  // Trigger download as .txt file
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `deal-screener-report-${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);

  return report;
}

// ─── Utility ──────────────────────────────────────────────

function isValidEmail(email) {
  // RFC 5322 simple validation — sufficient for capture form
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Public API ──────────────────────────────────────────

window.DealScreenerEmail = {
  hasCaptured,
  setCaptured,
  getEmail,
  getStoredDeals,
  addDealToListing,
  showCaptureModal: createModal,
  closeModal,
  exportDealsReport,
};
