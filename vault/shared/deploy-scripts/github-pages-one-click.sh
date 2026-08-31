#!/usr/bin/env bash
# GitHub Pages One-Click Deploy
# Purpose: Push demo.html to a new or existing GitHub repo and enable Pages
# Requirements: gh CLI installed + authenticated (gh auth login)
# Usage: ./deploy-scripts/github-pages-one-click.sh [repo-name]
# Example: ./deploy-scripts/github-pages-one-click.sh deal-screener-demo

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE="$(dirname "$SCRIPT_DIR")/.."  # vault/shared -> workspace root
DEMO_FILE="$WORKSPACE/experiments/chrome-extension-deal-screener/demo.html"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}GitHub Pages One-Click Deploy${NC}"
echo "================================"
echo ""

# Check gh CLI is available and authenticated
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: gh CLI not found. Install it first:${NC}"
    echo "  https://cli.github.com/"
    exit 1
fi

if ! gh auth status &> /dev/null 2>&1; then
    echo -e "${YELLOW}gh is not authenticated. Opening browser for login...${NC}"
    gh auth login --web
    echo ""
fi

# Verify demo file exists
if [ ! -f "$DEMO_FILE" ]; then
    echo -e "${RED}Error: demo.html not found at $DEMO_FILE${NC}"
    exit 1
fi

# Determine repo name (default from filename)
REPO_NAME="${1:-deal-screener-demo}"
OWNER="$(gh api user --jq .login)"

echo "GitHub user: ${OWNER}"
echo "Repo name:   ${REPO_NAME}"
echo ""

# Check if repo already exists
if gh repo view "$OWNER/$REPO_NAME" &> /dev/null 2>&1; then
    echo -e "${YELLOW}Repo $OWNER/$REPO_NAME already exists.${NC}"
    read -p "Push to existing repo? (y/N) " CONFIRM
    if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
else
    echo "Creating new repo: ${OWNER}/${REPO_NAME}..."
    gh repo create "$OWNER/$REPO_NAME" --public --description="Deal Screener Demo - Luminary Ventures" || {
        echo -e "${RED}Failed to create repo. It may already exist.${NC}"
        exit 1
    }
fi

echo ""
echo "Setting up local repo..."

# Create a temporary working directory for the deploy
DEPLOY_DIR="$(mktemp -d)"
cd "$DEPLOY_DIR"

# Initialize git and push demo.html with minimal config
git init
git remote add origin "https://github.com/$OWNER/$REPO_NAME.git"

cp "$DEMO_FILE" ./index.html  # GitHub Pages serves index.html at root

cat > README.md << EOF
# Deal Screener Demo

Chrome Extension Deal Screener — Standalone Demo

Powered by Luminary Ventures deterministic underwriting engine.

[Live Demo](https://$OWNER.github.io/$REPO_NAME)
EOF

git add .
git commit -m "Initial: Deal Screener demo (deterministic underwriting)" --quiet 2>/dev/null || true

echo ""
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main --force 2>&1 | tail -5

echo ""
echo "Configuring GitHub Pages..."
gh repo pages "$OWNER/$REPO_NAME" enable --source main --branch main --path "/" || {
    echo -e "${YELLOW}Pages may already be enabled. Checking status...${NC}"
    gh repo pages "$OWNER/$REPO_NAME" status 2>/dev/null || true
}

# Wait for Pages to propagate
echo ""
echo "Waiting for deployment..."
sleep 10

URL="https://$OWNER.github.io/$REPO_NAME"
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}DEPLOY COMPLETE!${NC}"
echo -e "Live URL: ${YELLOW}${URL}${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Open $URL in a browser to verify"
echo "  2. Share this link with warm leads"
echo "  3. Include it in your LinkedIn post and outreach emails"

# Cleanup
cd - &>/dev/null
rm -rf "$DEPLOY_DIR"
