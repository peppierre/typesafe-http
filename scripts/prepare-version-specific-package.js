const fs = require('fs');
const path = require('path');

// Extract and parse arguments from process.argv
const rawArgs = process.argv.slice(2);

// Function to parse named arguments (e.g., --key value)
function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (!value || value.startsWith('--')) {
        console.error(`Missing value for argument: --${key}`);
        process.exit(1);
      }
      result[key] = value;
      i++; // Skip value
    }
  }
  return result;
}

const args = parseArgs(rawArgs);

// Destructure and validate
const { npmTag } = args;

if (!npmTag) {
  console.error('Usage: node prepare-version-specific-package.js --npmTag <tag>');
  process.exit(1);
}

const rootDirectoryPath = path.join(__dirname, '..');
const versionDirectoryPath = path.join(rootDirectoryPath, 'versions', npmTag);
const workspaceDirectoryPath = path.join(rootDirectoryPath, 'workspace');

console.log('Preparing package with the following configuration:');
console.log(`- NPM Tag: ${npmTag}`);

console.log('Copying version-specific files via files.json manifest...');
const filesManifestPath = path.join(versionDirectoryPath, 'files.json');
if (fs.existsSync(filesManifestPath)) {
  const filesManifest = JSON.parse(fs.readFileSync(filesManifestPath, 'utf8'));
  for (const entry of filesManifest.copy ?? []) {
    const src = path.join(versionDirectoryPath, entry.from);
    const dest = path.join(workspaceDirectoryPath, entry.to);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`  Copied: ${entry.from} → ${entry.to}`);
  }
} else {
  console.log('No files.json manifest found, skipping additional file copies.');
}
