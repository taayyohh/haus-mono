find ./src -type d -mindepth 1 -maxdepth 1 | xargs -L1 basename | xargs -L1 rm -rf
rm -rf dist