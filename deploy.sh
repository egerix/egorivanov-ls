#!/usr/bin/env sh

## abort on errors
set -e

## removing dist folder
rm -rf dist

## build
npm run build

## navigate into the build output directory
cd dist

## if you are deploying to a custom domain
# echo 'simple.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/egerix/egorivanov-ls.git master:gh-pages

cd -

## removing dist folder
rm -rf dist

## https://cli.vuejs.org/guide/deployment.html#github-pages