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
const libraryIotsDirectoryPath = path.normalize(path.join(workspaceDirectoryPath, 'projects', 'typesafe-http-iots'));
const libraryZodDirectoryPath = path.normalize(path.join(workspaceDirectoryPath, 'projects', 'typesafe-http-zod'));

console.log('Altering root package.json with version-specific information...');
const baseRootPackageJsonPath = path.join(workspaceDirectoryPath, 'package.base.json');
const versionedRootPackageJsonPath = path.join(versionDirectoryPath, 'package.root.json');
const baseRootPackageJson = JSON.parse(fs.readFileSync(baseRootPackageJsonPath, 'utf8'));
const versionedRootPackageJson = JSON.parse(fs.readFileSync(versionedRootPackageJsonPath, 'utf8'));

const updatedRootPackageJson = _.merge(baseRootPackageJson, versionedRootPackageJson);

fs.writeFileSync(path.join(workspaceDirectoryPath, 'package.json'), JSON.stringify(updatedRootPackageJson, null, 2), 'utf8');

console.log('Altering library package.jsons with version-specific information...');
let updatedLibraryPackageJson;

const baseLibraryIotsPackageJsonPath = path.join(libraryIotsDirectoryPath, 'package.base.json');
const baseLibraryIotsPackageJson = JSON.parse(fs.readFileSync(baseLibraryIotsPackageJsonPath, 'utf8'));
const versionedLibraryIotsPackageJsonPath = path.join(versionDirectoryPath, 'package.library.iots.json');
const versionedLibraryIotsPackageJson = JSON.parse(fs.readFileSync(versionedLibraryIotsPackageJsonPath, 'utf8'));
updatedLibraryPackageJson = _.merge(
  baseLibraryIotsPackageJson,
  versionedLibraryIotsPackageJson,
  {
    version: `${baseLibraryIotsPackageJson.version}-${npmTag}`
  }
);
fs.writeFileSync(path.join(libraryIotsDirectoryPath, 'package.json'), JSON.stringify(updatedLibraryPackageJson, null, 2), 'utf8');

const baseLibraryZodPackageJsonPath = path.join(libraryZodDirectoryPath, 'package.base.json');
const baseLibraryZodPackageJson = JSON.parse(fs.readFileSync(baseLibraryZodPackageJsonPath, 'utf8'));
const versionedLibraryZodPackageJsonPath = path.join(versionDirectoryPath, 'package.library.zod.json');
const versionedLibraryZodPackageJson = JSON.parse(fs.readFileSync(versionedLibraryZodPackageJsonPath, 'utf8'));
updatedLibraryPackageJson = _.merge(
  baseLibraryZodPackageJson,
  versionedLibraryZodPackageJson,
  {
    version: `${baseLibraryZodPackageJson.version}-${npmTag}`
  }
);
fs.writeFileSync(path.join(libraryZodDirectoryPath, 'package.json'), JSON.stringify(updatedLibraryPackageJson, null, 2), 'utf8');

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
