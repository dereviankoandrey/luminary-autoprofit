#!/bin/bash
# Content Machine Cron Job
# Runs daily at 1 AM EST to generate and publish DIY subwoofer audio content

# Set timezone to EST
export TZ=America/New_York

# Log file
LOG_FILE="/home/andrey/.openclaw/workspace/content_machine_cron.log"

# Function to log messages with timestamp
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S %Z')] $1" | tee -a "$LOG_FILE"
}

log_message "Starting Content Machine cron job..."

# Change to workspace directory
cd /home/andrey/.openclaw/workspace || {
    log_message "ERROR: Failed to change to workspace directory"
    exit 1
}

# Run content generation script
log_message "Running content generation script..."
if bash /home/andrey/.openclaw/workspace/generate_content.sh >> "$LOG_FILE" 2>&1; then
    log_message "Content generation completed successfully"
else
    log_message "ERROR: Content generation failed"
    exit 1
fi

# Check if generated content exists
if [[ -f "social_media_post.txt" && -f "blog_post.md" && -f "youtube_script.txt" ]]; then
    log_message "All content files generated successfully"
else
    log_message "ERROR: Some content files missing"
    exit 1
fi

# TODO: Add actual publishing logic here when APIs are configured
# For now, just log that content is ready for publishing
log_message "Content ready for publishing:"
log_message "  - Social media post: social_media_post.txt"
log_message "  - Blog post: blog_post.md"
log_message "  - YouTube script: youtube_script.txt"

# Archive generated content with date
DATE_STAMP=$(date '+%Y%m%d')
mkdir -p "content_archive/$DATE_STAMP"
cp social_media_post.txt "content_archive/$DATE_STAMP/"
cp blog_post.md "content_archive/$DATE_STAMP/"
cp youtube_script.txt "content_archive/$DATE_STAMP/"
log_message "Content archived to content_archive/$DATE_STAMP/"

log_message "Content Machine cron job completed successfully"