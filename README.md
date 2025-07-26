# Typesafe HTTP

## Goal

Project goal is to provide an easy-to-use tool for Angular engineers to check HTTP response schemas at run-time and to identify/handle schema errors.

## Features

- **io-ts support**: relevant sources available in `library/projects/typesafe-http-iots` directory

## Prerequisites

- Angular CLI (v16+) 
- Node.js, according to Angular version, see [Angular version](https://angular.dev/reference/versions)

## Contribution

Contributions are welcome! Please follow these high-level steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

### Adding support to new Angular version

1. Create directoryfor major version in `./version` directory. Name must follow `ngXX` scheme where `XX` is major verions number of Angular.
2. Add `package.root.json` to this directory. File must contain all version specific part of final, distributable `package.json`. It must contain `dependencies` and `devDependencies` sections with all Angular packages ususally added to a new Angular project.
3. Add `package.library.json` file to this directory. File must contain only `peerDependencies` section with `@angular/core` and `@angular/common` package. Version definitions of both packages must follow `>=XX.0.0 <YY.0.0` pattern, where `XX` is the current and `YY` is the next Angular version.
4. Add relevant `switchenv:ngXX` script to repository's `package.json`

### Removing support of older Angular version

**NOTE** that version support removal must be applied to oldest version only and only 1 version is allowed to be removed at one step!

1. Remove relevant `switchend:ngXX` script from repository's `package.json`
2. Remove `ngXX` directory and its content from `./versions` directory

## Improving library code

1. Apply your changes in library or libraries under `/library/projects/` directory
3. `npm run lint`
4. `npm run test`
5. Follow [Manual testing of library](#manual-testing-of-library) for each supported version to discover discrepancies

## Building a library
```
cd library
npm run build:lib
```

### Manual testing of library

1. Create an app with required Angular version
2. Include `dist` directory of built library
3. Use your favorite API to check correctness of the library

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Contact

For questions or support, please contact [peppierre@gmail.com](peppierre@gmail.com).
