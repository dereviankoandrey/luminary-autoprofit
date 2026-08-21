/**
 * Deal Screener — Content Script (Manifest V3)
 * Scans property listing pages, runs deterministic underwriting math,
 * overlays Deal Score badges and detail panels.
 */

// ─── Zillow selectors ──────────────────────────────────────

const ZILLOW_SELECTORS = {
  // Individual listing cards on search/map-hover results
  listings: [
    '[data-testid="card-layout-item"]',
    '.js-cardWidget',
    '[class*="StyledCardWrapper"]',
    '.StyledPropertyCardData-wrapper',
    '.section-title',
  ],
  price: [
    '[data-testid="price-column"] .property-card-data-item__value',
    '.ds-price-value',
    '[class*="StyledPriceLine"]',
    'span[data-testid="home-detail-price"], span[data-testid="price-line"]',
  ],
  beds: ['[data-testid="beds-column"] .property-card-data-item__value'],
  baths: ['[data-testid="baths-column"] .property-card-data-item__value'],
  sqft: ['[data-testid="sqft-column"] .property-card-data-item__value'],
  address: ['[class*="StreetAddress"], [data-testid="address-line"]', '.ds-address-value'],
};

// ─── Redfin selectors ──────────────────────────────────────

const REDFIN_SELECTORS = {
  listings: [
    '[class*="property-card__root"]',
    'a[class*="PropertyCard"]',
    '[data-testid="property-listing"]',
  ],
  price: ['[class*="price"], [class*="Price"], .ds-price-value'],
  beds: ['[class*="beds"], [class*="Beds"]'],
  baths: ['[class*="baths"], [class*="Baths"]'],
  sqft: ['[class*="sqft"], [class*="SqFt"]'],
  address: ['[class*="address"], [class*="Address"]'],
};

// ─── Utility functions ─────────────────────────────────────

function parseNumber(str) {
  if (!str) return NaN;
  // Strip currency symbols, commas, whitespace
  const cleaned = str.replace(/[$,$,]/g, '').replace(/\s/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? NaN : num;
}

function parseBaths(str) {
  if (!str) return NaN;
  // Handle "2.5", "2-3", etc.
  const cleaned = str.replace(/[-–—]/g, '.').replace(/[^\d.]/g, '');
  return parseFloat(cleaned);
}

function parseBeds(str) {
  if (!str) return NaN;
  const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? NaN : num;
}

function parseSqft(str) {
  if (!str) return NaN;
  const cleaned = str.replace(/[^\d.]/g, '');
  return parseFloat(cleaned);
}

function textFromSelectors(selectors, container) {
  for (const sel of selectors) {
    try {
      // Try within container first, then global
      let el = container ? container.querySelector(sel) : document.querySelector(sel);
      if (!el && !container) continue;
      if (el) return el.textContent.trim();
    } catch (_) {}
  }
  return '';
}

function getTextFromParent(el, selectors) {
  // Look in parent elements up to 4 levels deep
  let node = el.parentElement;
  for (let i = 0; i < 6 && node; i++) {
    for (const sel of selectors) {
      try {
        const found = node.querySelector(sel);
        if (found && found.textContent.trim()) return found.textContent.trim();
      } catch (_) {}
    }
    node = node.parentElement;
  }
  return '';
}

function getTextFromCard(el, selectors) {
  // For a single listing element, try to extract price/beds/etc. from its subtree
  for (const sel of selectors) {
    const matches = el.querySelectorAll(sel);
    if (matches.length > 0 && matches[0].textContent.trim()) {
      return matches[0].textContent.trim();
    }
  }
  // Fallback: search parent chain
  return getTextFromParent(el, selectors);
}

// ─── Data extraction per platform ──────────────────────────

function extractZillowData() {
  const listings = document.querySelectorAll(ZILLOW_SELECTORS.listings[0]);
  if (listings.length === 0) return [];

  const results = [];
  for (const card of listings) {
    try {
      // Try to find price in the card or its ancestors
      let priceText = textFromSelectors(ZILLOW_SELECTORS.price, card);
      if (!priceText) {
        // Search up from the card element
        const parentPrice = getTextFromParent(card, ZILLOW_SELECTORS.price);
        if (parentPrice) priceText = parentPrice;
      }

      const price = parseNumber(priceText);
      if (isNaN(price) || price <= 0) continue;

      // Extract beds/baths/sqft from card or its parent chain
      let bedsText = textFromSelectors(ZILLOW_SELECTORS.beds, card);
      if (!bedsText) bedsText = getTextFromParent(card, ZILLOW_SELECTORS.beds);
      
      let bathsText = textFromSelectors(ZILLOW_SELECTORS.baths, card);
      if (!bathsText) bathsText = getTextFromParent(card, ZILLOW_SELECTORS.baths);

      let sqftText = textFromSelectors(ZILLOW_SELECTORS.sqft, card);
      if (!sqftText) sqftText = getTextFromParent(card, ZILLOW_SELECTORS.sqft);

      const address = textFromSelectors(ZILLOW_SELECTORS.address, card) || '';

      results.push({
        price: price,
        beds: parseBeds(bedsText),
        baths: parseBaths(bathsText),
        sqft: parseSqft(sqftText),
        address: address,
        platform: 'zillow',
        element: card, // Store reference for overlay placement
      });
    } catch (e) {
      console.warn('[Deal Screener] Error extracting Zillow data:', e);
    }
  }
  return results;
}

function extractRedfinData() {
  const listings = document.querySelectorAll(REDFIN_SELECTORS.listings[0]);
  if (listings.length === 0) return [];

  const results = [];
  for (const card of listings) {
    try {
      let priceText = textFromSelectors(REDFIN_SELECTORS.price, card);
      if (!priceText) priceText = getTextFromParent(card, REDFIN_SELECTORS.price);

      const price = parseNumber(priceText);
      if (isNaN(price) || price <= 0) continue;

      const bedsText = getTextFromParent(card, REDFIN_SELECTORS.beds);
      const bathsText = getTextFromParent(card, REDFIN_SELECTORS.baths);
      const sqftText = getTextFromParent(card, REDFIN_SELECTORS.sqft);
      const address = textFromSelectors(REDFIN_SELECTORS.address, card) || '';

      results.push({
        price: price,
        beds: parseBeds(bedsText),
        baths: parseBaths(bathsText),
        sqft: parseSqft(sqftText),
        address: address,
        platform: 'redfin',
        element: card,
      });
    } catch (e) {
      console.warn('[Deal Screener] Error extracting Redfin data:', e);
    }
  }
  return results;
}

function extractDataFromPage() {
  if (window.location.hostname.includes('zillow.com')) {
    return extractZillowData();
  } else if (window.location.hostname.includes('redfin.com')) {
    return extractRedfinData();
  }
  return [];
}

// ─── Deal analysis ─────────────────────────────────────────

function analyzeListing(listing) {
  // Use the quickScreeen function from engine.js
  if (typeof window.UnderwritingEngine === 'undefined') {
    console.warn('[Deal Screener] Engine not loaded');
    return null;
  }

  const { quickScreeen } = window.UnderwritingEngine;

  // Build deal data for the screener
  let dealData = {};

  if (listing.beds && listing.beds >= 2) {
    // Likely residential — try fix-and-flip analysis
    dealData = {
      price: listing.price,
      units: listing.beds <= 4 ? listing.beds : null,
    };

    // Try to estimate monthly rent from comparable data or skip
    if (listing.sqft && listing.sqft > 0) {
      // Rough rent estimation per sqft by property type
      let estRentPerSqft = 1.2; // Default for multifamily in many markets
      dealData.monthly_rent = Math.round(listing.sqft * estRentPerSqft);
    }
  } else if (listing.beds && listing.beds >= 5) {
    // Likely larger multifamily or commercial
    dealData = {
      price: listing.price,
      units: listing.beds >= 8 ? Math.ceil(listing.beds / 2) : null,
      monthly_rent: listing.sqft ? Math.round(listing.sqft * 1.5) : null,
    };
  } else {
    // No bed data — use price as the primary signal
    dealData = { price: listing.price };

    if (listing.sqft && listing.sqft > 0) {
      dealData.monthly_rent = Math.round(listing.sqft * 1.2);
    }
  }

  return quickScreeen(dealData);
}

// ─── Overlay UI ─────────────────────────────────────────────

let activePanel = null;
let isDragging = false;
let dragOffsetX = 0, dragOffsetY = 0;

function getScoreColor(score) {
  if (score >= 70) return '#22c55e';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
}

function getRecommendationClass(rec) {
  switch (rec) {
    case 'GO': return 'ds-reco-go';
    case 'NO-GO': return 'ds-reco-nogo';
    default: return 'ds-reco-review';
  }
}

function createOverlayPanel(result, listing) {
  // Remove existing panel if any
  closeActivePanel();

  const score = result.deal_score || 50;
  const rec = result.recommendation || 'REVIEW';
  const risk = result.risk_level || 'Medium';
  const color = getScoreColor(score);

  // Build SVG ring
  const circumference = 2 * Math.PI * 34; // r=34, cx/cy=40
  const offset = circumference - (score / 100) * circumference;

  let metricsHTML = '';
  if (result.cap_rate_percent != null) {
    const cls = result.cap_rate_percent >= 6 ? 'ds-metric-good' : result.cap_rate_percent < 4 ? 'ds-metric-bad' : 'ds-metric-warn';
    metricsHTML += `<div class="ds-metric-row"><span class="ds-metric-label">Cap Rate</span><span class="ds-metric-value ${cls}">${result.cap_rate_percent.toFixed(2)}%</span></div>`;
  }
  if (result.cash_on_cash_return != null) {
    const cls = result.cash_on_cash_return >= 5 ? 'ds-metric-good' : result.cash_on_cash_return < 0 ? 'ds-metric-bad' : 'ds-metric-warn';
    metricsHTML += `<div class="ds-metric-row"><span class="ds-metric-label">Cash-on-Cash</span><span class="ds-metric-value ${cls}">${result.cash_on_cash_return.toFixed(1)}%</span></div>`;
  }
  if (result.annual_noi != null) {
    metricsHTML += `<div class="ds-metric-row"><span class="ds-metric-label">Annual NOI</span><span class="ds-metric-value">$${new Intl.NumberFormat().format(result.annual_noi)}</span></div>`;
  }
  if (result.purchase_to_arv_ratio != null) {
    const cls = result.purchase_to_arv_ratio <= 0.75 ? 'ds-metric-good' : result.purchase_to_arv_ratio >= 0.9 ? 'ds-metric-bad' : 'ds-metric-warn';
    metricsHTML += `<div class="ds-metric-row"><span class="ds-metric-label">Purchase/ARV</span><span class="ds-metric-value ${cls}">${result.purchase_to_arv_ratio}</span></div>`;
  }
  if (result.price_per_unit != null) {
    metricsHTML += `<div class="ds-metric-row"><span class="ds-metric-label">Price/Unit</span><span class="ds-metric-value">$${new Intl.NumberFormat().format(result.price_per_unit)}</span></div>`;
  }

  const panel = document.createElement('div');
  panel.id = 'deal-screener-panel';
  panel.className = '';

  panel.innerHTML = `
    <div id="ds-header">
      <div class="brand">Deal Screener</div>
      <button id="ds-close" title="Close">×</button>
    </div>
    <div id="ds-body">
      <div id="ds-score-ring">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#f0f0f0" stroke-width="6"/>
          <circle cx="40" cy="40" r="34" fill="none" stroke="${color}" stroke-width="6"
            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
            stroke-linecap="round" style="transition: stroke-dashoffset 0.8s ease"/>
        </svg>
        <div id="ds-score-value" style="color:${color}">${score}</div>
      </div>
      <div id="ds-score-label">
        <span class="${getRecommendationClass(rec)}" id="ds-recommendation">→ ${rec}</span>
        <div style="font-size:11px;color:#999;margin-top:4px">Risk: ${risk}</div>
      </div>
      ${metricsHTML ? `<div id="ds-metrics">${metricsHTML}</div>` : ''}
    </div>
    <div id="ds-footer">Math only · No LLMs</div>
  `;

  // Position near the listing element or default position
  if (listing && listing.element) {
    const rect = listing.element.getBoundingClientRect();
    panel.style.right = 'auto';
    panel.style.left = Math.min(rect.left + rect.width / 2 - 150, window.innerWidth - 320) + 'px';
    panel.style.top = Math.max(rect.bottom + 8, 100) + 'px';
  } else {
    panel.style.right = '24px';
    panel.style.left = 'auto';
    panel.style.top = '100px';
  }

  document.body.appendChild(panel);
  activePanel = panel;

  // Close handler
  panel.querySelector('#ds-close').addEventListener('click', () => closeActivePanel());

  // Drag handlers
  const header = panel.querySelector('#ds-header');
  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = panel.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    panel.style.transition = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging || !activePanel) return;
    activePanel.style.position = 'fixed';
    activePanel.style.left = Math.max(0, Math.min(e.clientX - dragOffsetX, window.innerWidth - 300)) + 'px';
    activePanel.style.top = Math.max(0, e.clientY - dragOffsetY) + 'px';
    activePanel.style.right = 'auto';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Click outside to close
  setTimeout(() => {
    document.addEventListener('mousedown', function handler(e) {
      if (!panel.contains(e.target)) {
        closeActivePanel();
        document.removeEventListener('mousedown', handler);
      }
    });
  }, 100);
}

function closeActivePanel() {
  if (activePanel) {
    activePanel.remove();
    activePanel = null;
  }
}

// ─── Badge overlay on listing cards ────────────────────────

let badgeElements = new WeakMap(); // Track which elements have badges

function addBadgeToCard(listing, result) {
  if (!listing || !listing.element || !result) return;

  const card = listing.element;

  // Remove existing badge if any
  const existingBadge = badgeElements.get(card);
  if (existingBadge) {
    existingBadge.remove();
  }

  const rec = result.recommendation || 'REVIEW';
  let badgeClass, badgeText;

  switch (rec) {
    case 'GO':
      badgeClass = 'ds-badge-go';
      badgeText = '✓ GO';
      break;
    case 'NO-GO':
      badgeClass = 'ds-badge-nogo';
      badgeText = '✗ NO-GO';
      break;
    default:
      badgeClass = 'ds-badge-review';
      badgeText = '? REVIEW';
  }

  const badge = document.createElement('div');
  badge.className = `ds-listing-badge ${badgeClass}`;
  badge.textContent = badgeText;
  badge.style.cssText = 'position:absolute;top:8px;right:8px;z-index:9999;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.03em;box-shadow:0 2px 8px rgba(0,0,0,0.15);pointer-events:auto;';

  // Ensure card has positioning context
  if (getComputedStyle(card).position === 'static') {
    card.style.position = 'relative';
  }

  card.appendChild(badge);
  badgeElements.set(card, badge);

  // Click to open detail panel
  const onClick = () => createOverlayPanel(result, listing);
  badge.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick();
  });
  card.addEventListener('click', onClick);
}

// ─── Initialization ────────────────────────────────────────

function init() {
  if (!document.body) return;

  // Check if engine is loaded
  if (typeof window.UnderwritingEngine === 'undefined') {
    console.warn('[Deal Screener] Underwriting engine not found. Make sure engine.js loads before overlay.js.');
    return;
  }

  // Extract listings from page
  const listings = extractDataFromPage();
  if (listings.length === 0) {
    console.log('[Deal Screener] No property listings detected on this page.');
    showHint('No listings found. Try navigating to a search results or listing detail page.');
    return;
  }

  console.log(`[Deal Screener] Found ${listings.length} property listing(s). Analyzing...`);

  // Analyze each listing and add badges
  let analyzed = 0;
  const analysisResults = []; // Track results for storage + email capture
  for (const listing of listings) {
    const result = analyzeListing(listing);
    if (result && !result.error) {
      addBadgeToCard(listing, result);
      analysisResults.push({ listing, result });
      analyzed++;
    } else {
      console.log(`[Deal Screener] Could not analyze: ${listing.address || 'unknown address'}`);
    }
  }

  console.log(`[Deal Screener] Analyzed ${analyzed}/${listings.length} listings.`);

  if (analyzed > 0) {
    showHint(`${analyzed} listing(s) analyzed. Click any badge for details.`);

    // ─── Email capture trigger ──────────────────────────────
    try {
      if (window.DealScreenerEmail) {
        const { hasCaptured, addDealToListing } = window.DealScreenerEmail;

        // Store all analyzed deals in local storage for export later
        analysisResults.forEach(({ listing, result }) => {
          addDealToListing(listing, result);
        });

        if (!hasCaptured()) {
          // Show modal after first deal is analyzed and user has had time to see it.
          // Delay 2 seconds so the overlay panel can render first.
          setTimeout(() => {
            window.DealScreenerEmail.showCaptureModal();
          }, 2000);
        }
      }
    } catch (e) {
      console.warn('[Deal Screener] Email capture module error:', e);
    }
  }
}

function showHint(text) {
  const hint = document.createElement('div');
  hint.id = 'ds-hint';
  hint.textContent = text;
  document.body.appendChild(hint);
  setTimeout(() => hint.remove(), 4000);
}

// ─── MutationObserver for dynamic pages ────────────────────

let observerStarted = false;

function startObserver() {
  if (observerStarted) return;
  observerStarted = true;

  const observer = new MutationObserver((mutations) => {
    // Only re-scan periodically, not on every mutation
    let shouldRecheck = false;
    for (const m of mutations) {
      if (m.addedNodes.length > 0) {
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if this is a listing element or contains listings
            const hasListing = ZILLOW_SELECTORS.listings.some(s => node.matches?.(s)) ||
                              REDFIN_SELECTORS.listings.some(s => node.matches?.(s));
            if (hasListing) {
              shouldRecheck = true;
              break;
            }
          }
        }
      }
      if (shouldRecheck) break;
    }

    if (shouldRecheck) {
      // Small delay to let DOM settle
      setTimeout(() => {
        init();
      }, 500);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// ─── Entry point ──────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    startObserver();
    init();
  });
} else {
  // DOM already loaded
  setTimeout(() => {
    startObserver();
    init();
  }, 100);
}
