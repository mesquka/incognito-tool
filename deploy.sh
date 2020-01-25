#!/usr/bin/env sh

# abort on errors
set -e

# build
npm install
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# Push to pages
git push -f git@github.com:mesquka/incognito_mining_dashboard.git master:gh-pages

cd -