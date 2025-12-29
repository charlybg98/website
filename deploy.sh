#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

ROOT_BUCKET="s3://charlyfive.com"
ROOT_DIST_ID="E26PQG4673CM90"
ROOT_DIR="sites/root/"

MUSIC_BUCKET="s3://music.charlyfive.com"
MUSIC_DIST_ID="E112XZFNH4GRX0"
MUSIC_DIR="sites/music/"

PORTFOLIO_BUCKET="s3://portfolio.charlyfive.com"
PORTFOLIO_DIST_ID="E1N5DOECVPGRB1"
PORTFOLIO_DIR="sites/portfolio/"

deploy_site() {
    local SITE_NAME=$1
    local DIR=$2
    local BUCKET=$3
    local DIST_ID=$4

    echo -e "${BLUE}🚀 Deploying ${SITE_NAME}...${NC}"
    
    echo "   -> Syncing S3..."
    aws s3 sync $DIR $BUCKET --delete --quiet
    
    echo "   -> Invalidating CloudFront..."
    aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*" > /dev/null
    
    echo -e "${GREEN}✅ ${SITE_NAME} Deployed Successfully!${NC}\n"
}


case "$1" in
    root)
        deploy_site "Gateway (Root)" $ROOT_DIR $ROOT_BUCKET $ROOT_DIST_ID
        ;;
    music)
        deploy_site "Music Site" $MUSIC_DIR $MUSIC_BUCKET $MUSIC_DIST_ID
        ;;
    portfolio)
        deploy_site "Portfolio" $PORTFOLIO_DIR $PORTFOLIO_BUCKET $PORTFOLIO_DIST_ID
        ;;
    all)
        deploy_site "Gateway (Root)" $ROOT_DIR $ROOT_BUCKET $ROOT_DIST_ID
        deploy_site "Music Site" $MUSIC_DIR $MUSIC_BUCKET $MUSIC_DIST_ID
        deploy_site "Portfolio" $PORTFOLIO_DIR $PORTFOLIO_BUCKET $PORTFOLIO_DIST_ID
        ;;
    *)
        echo "Usage: ./deploy.sh [root|music|portfolio|all]"
        exit 1
        ;;
esac