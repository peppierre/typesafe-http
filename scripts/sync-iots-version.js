const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const rootVersion = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8')).version;
const pkgPath = path.join(rootDir, 'workspace', 'projects', 'typesafe-http-iots', 'package.json');

if (!fs.existsSync(pkgPath)) {
  console.log('typesafe-http-iots package.json not found, skipping version sync.');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
if (pkg.version === rootVersion) {
  console.log(`typesafe-http-iots already at version ${rootVersion}, skipping.`);
} else {
  pkg.version = rootVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`typesafe-http-iots version synced to ${rootVersion}.`);
}
