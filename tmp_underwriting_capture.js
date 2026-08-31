const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const OUT_DIR = path.join(process.cwd(), 'artifacts', 'underwriting-ui-2026-05-22');

async function chooseSelectboxOption(page, label, optionText) {
  const widget = page
    .locator('label', { hasText: label })
    .first()
    .locator('xpath=..');
  await widget.click();
  const option = page.getByText(optionText, { exact: true }).last();
  await option.waitFor({ state: 'visible' });
  await option.click();
}

async function capture() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });

  await page.goto('http://127.0.0.1:8765', { waitUntil: 'networkidle', timeout: 30000 });
  await page.getByText('AI Underwriting MVP', { exact: true }).waitFor({ state: 'visible' });

  await page.screenshot({
    path: path.join(OUT_DIR, '01-home-screen.png'),
    fullPage: true,
  });

  await chooseSelectboxOption(page, 'Load sample deal', 'Fix-and-Flip / Strong');
  await page.getByRole('button', { name: 'Analyze Deal' }).click();
  await page.getByText('Recommendation: GO', { exact: true }).waitFor({ state: 'visible' });
  await page.screenshot({
    path: path.join(OUT_DIR, '02-fix-flip-go.png'),
    fullPage: true,
  });

  await chooseSelectboxOption(page, 'Load sample deal', 'Multifamily / Strong');
  await page.getByRole('button', { name: 'Analyze Deal' }).click();
  await page.getByText('Recommendation: GO', { exact: true }).waitFor({ state: 'visible' });
  await page.getByText('Multifamily', { exact: false }).waitFor({ state: 'visible' });
  await page.screenshot({
    path: path.join(OUT_DIR, '03-multifamily-go.png'),
    fullPage: true,
  });

  await chooseSelectboxOption(page, 'Load sample deal', 'Fix-and-Flip / Weak');
  await page.getByRole('button', { name: 'Analyze Deal' }).click();
  await page.getByText('Recommendation: NO-GO', { exact: true }).waitFor({ state: 'visible' });
  await page.screenshot({
    path: path.join(OUT_DIR, '04-weak-deal-no-go.png'),
    fullPage: true,
  });

  await browser.close();
  console.log(OUT_DIR);
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
