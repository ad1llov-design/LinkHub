
if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
if (Test-Path package-lock.json) { Remove-Item package-lock.json }
npm cache clean --force
npm install
npm run build
