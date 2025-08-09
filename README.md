# Typesafe HTTP

## Goal

Project goal is to provide an easy-to-use tool for Angular engineers to check HTTP response schemas at run-time and to identify/handle schema errors.

## Features

- **io-ts support**: relevant sources available in `library/projects/typesafe-http-iots` directory

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
3. Add `./version/ngXX/package.library.json` file to this directory. File must contain only `peerDependencies` section with `@angular/core` and `@angular/common` package. Version definitions of both packages must follow `>=XX.0.0 <YY.0.0` pattern, where `XX` is the current and `YY` is the next Angular version. E.g. `>=20.0.0 <21.0.0`.
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
```
npm run prepws:nsXX
cd library
npm run build:lib
```

### Publishing a library
```
npm run publish:iots -- --tag ngXX
```

### Manual testing of library

1. Create an app with required Angular version
2. Include `dist` directory of built library, e.g. by using file system reference in your app's `package.json`
3. Use your favorite API to check correctness of the library

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Contact

For questions or support, please contact [peppierre@gmail.com](peppierre@gmail.com).
