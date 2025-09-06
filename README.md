# Typesafe HTTP

## Goal

Project goal is to provide an easy-to-use tool for Angular engineers to check HTTP response schemas at run-time and to identify/handle schema errors.

## Features

- **io-ts support**: relevant sources available in `library/projects/typesafe-http-iots` directory
- **zod support**: relevant sources available in `library/projects/typesafe-http-zod` directory

## Prerequisites

- Angular CLI (v16+) 
- Node.js, according to [Angular version](https://angular.dev/reference/versions)

## Contribution

Contributions are welcome! Please follow these high-level steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

### Adding support to new Angular version

1. Create directory for major version in `./version` directory. Name must follow `ngXX` scheme where `XX` is major version number of Angular. E.g. for supporting Angular 20, it'd be `ng20`.
2. Add `./version/ngXX/package.root.json`. File must contain all version specific part of final, distributable `package.json`. It must contain `dependencies` and `devDependencies` sections with all Angular packages ususally added to a new Angular project.
3. Add `./version/ngXX/package.library.iots.json` and `./version/ngXX/package.library.zod.json` files to this directory. Files must contain only `peerDependencies` section with `@angular/core` and `@angular/common` package. Version definitions of both packages must follow `>=XX.0.0 <YY.0.0` pattern, where `XX` is the current and `YY` is the next Angular version. E.g. `>=20.0.0 <21.0.0`.
4. Add relevant `prepws:ngXX` script to repository's `./package.json`
5. Update package version to next major version, both in `./package.json` and `./projects/typesafe-http-XXXXX/packege.base.json`. Version numbers in these files must be kept in sync.

### Removing support of older Angular version

**NOTE** that version support removal must be applied to oldest version only and only 1 version is allowed to be removed in one shot!

1. Remove relevant `prepws:ngXX` script from repository's `package.json`
2. Remove `ngXX` directory and its content from `./versions` directory
3. Update package version to next major version, both in `./package.json` and `./projects/typesafe-http-XXXXX/package.base.json`. Version numbers in these files must be kept in sync.

### Improving library code

1. Apply your changes in library or libraries under `/library/projects/` directory
3. `npm run lint`
4. `npm run test`
5. Follow [Manual testing of library](#manual-testing-of-library) for each supported version to discover discrepancies
6. Update package version as follows, both in `./package.json` and `./projects/typesafe-http-XXXXX/package.base.json`:
   - to next minor version, when:
      - new feature added to all libraries
      - new runtime-type-checker library support added
   - to next build, when:
      - any fix applied on at least one of the libraries

### Building a library

**NOTE** that proper Node.js version must be prepared before library build started. Please check table below for reference versions:

| Tagname | Node version |
|--------:|-------------:|
| `ng16` | 18.16.1 |
| `ng17` | 18.16.1 |
| `ng18` | 18.20.8 |
| `ng19` | 18.20.8 |
| `ng20` | 20.19.0 |

Consider using NVM tool to smoothly switch from one version to another.

```
npm run prepws:nsXX
cd workspace
npm run build:lib
```

### Publishing a library
```
npm run publish:iots -- --tag ngXX
```

### Manual testing of library

Minimalist sample apps included in repository, see `/sample-apps` directory.

Here's a full script to manually test library changes across all supported Angular versions:

```bash
npm run prepws:ngXX
cd workspace
npm run lint:lib
npm run test
npm run build:lib
rm -rf projects/sample-iots
rm -rf projects/sample-zod
npm run ng -- generate application sample-iots
npm run ng -- generate application sample-zod
rm -rf projects/sample-iots/src
rm -rf projects/sample-zod/src
cp -R ../sample-apps/iots/ projects/sample-iots
cp -R ../sample-apps/zod/ projects/sample-zod
npm run ng -- serve sample-iots
ctrl-c
npm run ng -- serve sample-zod
ctrl-c
cd ..
```

Run this script above on all available versions.

**No NPM publish recommended until all versions are checked and work as expected!**

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Contact

For questions or support, please contact [peppierre@gmail.com](peppierre@gmail.com).
