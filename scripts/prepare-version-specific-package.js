const fs = require('fs');
const path = require('path');
const _ = require('lodash');

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

console.log('Preparing package with the following configuration:');
console.log(`- NPM Tag: ${npmTag}`);

const rootDirectoryPath = path.normalize(path.join(__dirname, '..'));
const workspaceDirectoryPath = path.normalize(path.join(rootDirectoryPath, 'workspace'));
const versionDirectoryPath = path.normalize(path.join(rootDirectoryPath, 'versions', npmTag));
const libraryDirectoryPath = path.normalize(path.join(workspaceDirectoryPath, 'projects', 'typesafe-http-iots'));

console.log('Altering root package.json with version-specific information...');
const baseRootPackageJsonPath = path.join(workspaceDirectoryPath, 'package.base.json');
const versionedRootPackageJsonPath = path.join(versionDirectoryPath, 'package.root.json');
const baseRootPackageJson = JSON.parse(fs.readFileSync(baseRootPackageJsonPath, 'utf8'));
const versionedRootPackageJson = JSON.parse(fs.readFileSync(versionedRootPackageJsonPath, 'utf8'));

const updatedRootPackageJson = _.merge(baseRootPackageJson, versionedRootPackageJson);

fs.writeFileSync(path.join(workspaceDirectoryPath, 'package.json'), JSON.stringify(updatedRootPackageJson, null, 2), 'utf8');

console.log('Altering library package.json with version-specific information...');
const baseLibraryPackageJsonPath = path.join(libraryDirectoryPath, 'package.base.json');
const versionedLibraryPackageJsonPath = path.join(versionDirectoryPath, 'package.library.json');
const baseLibraryPackageJson = JSON.parse(fs.readFileSync(baseLibraryPackageJsonPath, 'utf8'));
const versionedLibraryPackageJson = JSON.parse(fs.readFileSync(versionedLibraryPackageJsonPath, 'utf8'));

const updatedLibraryPackageJson = _.merge(
  baseLibraryPackageJson,
  versionedLibraryPackageJson,
  {
    version: `${baseLibraryPackageJson.version}-${npmTag}`
  }
);

fs.writeFileSync(path.join(libraryDirectoryPath, 'package.json'), JSON.stringify(updatedLibraryPackageJson, null, 2), 'utf8');

console.log('Altering root angular.json with version-specific information...');
const baseRootAngularJsonPath = path.join(workspaceDirectoryPath, 'angular.base.json');
const versionedRootAngularJsonPath = path.join(versionDirectoryPath, 'angular.root.json');
const baseRootAngularJson = JSON.parse(fs.readFileSync(baseRootAngularJsonPath, 'utf8'));
const versionedRootAngularJson = JSON.parse(fs.readFileSync(versionedRootAngularJsonPath, 'utf8'));

const updatedRootAngularJson = _.merge(baseRootAngularJson, versionedRootAngularJson);

fs.writeFileSync(path.join(workspaceDirectoryPath, 'angular.json'), JSON.stringify(updatedRootAngularJson, null, 2), 'utf8');

console.log('Copying version-relevant ESLint configuration...');
try {
  fs.copyFileSync(
    path.join(versionDirectoryPath, '.eslintrc.json'),
    path.join(workspaceDirectoryPath, '.eslintrc.json')
  );
} catch (error) {
  console.log('No version-specific ESLint configuration (.eslintrc.json) found, skipping copy.');
}
try {
  fs.copyFileSync(
    path.join(versionDirectoryPath, 'eslint.config.js'),
    path.join(workspaceDirectoryPath, 'eslint.config.js')
  );
} catch (error) {
  console.log('No version-specific ESLint configuration (eslint.config.js) found, skipping copy.');
}
