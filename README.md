# Typesafe HTTP

## Goal

Project goal is to provide an easy-to-use tool to Angular engineers to check HTTP response schemas in run-time and to identify/handle schema errors.

## Features

- **io-ts support**: relevant sources available in `library/projects/typesafe-http-iots` directory

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v16)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/peppierre/typesafe-http.git
   ```
2. Navigate to the project directory:
   ```
   cd typesafe-http
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Improving library code

1. Apply your changes in `/library/projects/typesafe-http-iots`
2. Update package version number accordingly
3. `npm run lint`
4. `npm run test`
5. Check your changes with **ALL SANDBOXES** by starting their devservers one-by-one

## Building a library
```
cd library
npm run build:lib:iots
```

## Running the Application

Start the development server:
```
cd sandbox-v{versionnumber}
npm run start
```
Access the application at `http://localhost:4200`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

### Supporting new Angular version

Following steps required to have sandbox app for a new Angular version:

1. Run following commands:
```bash
$ npx @angular/cli@{major-version} new sandbox-v{major-version} --no-create-application
$ cd sandbox-v{major-version}
$ npm run ng -- generate application sandbox-app
$ npm run ng -- generate library typesafe-http-iots
```
2. Remove newly created `sandbox-v{major-version}/projects/typesafe-http-iots`
3. Create symlink to library
```bash
$ ln -s ../library/projects/typesafe-http-iots ./projects
```
4. Delete all content of `sandbox-v{major-version}/projects/sandbox-app/src/`
5. Copy content of previous version sandbox
```bash
$ cp -R ../sandbox-v{prev-major-version}/projects/sandbox-app/src/ ./projects/sandbox-app/src
```
6. Follow instructions provided on [Angular Update Guide](https://angular.dev/update-guide)
7. Add major version number of Angular to `/sandbox-v{major-version}/projects/typesafe-http-iots/package.json` and update version of RxJs.
E.g. 
```json
{
   ...
   "peerDependencies": {
      "@angular/common": "~16.0.0" | "~17.0.0",
      "@angular/core": "~16.0.0" | "~17.0.0",
      ...
      "rxjs": "~6.5.3 | ~7.4.0"
   },
}
```
8. Replace `script` section in `/sandbox-v{major-version}/package.json` with following lines:
```json
{
   ...
   "scripts": {
      "ng": "ng",
      "start": "ng serve sandbox-app",
      "build": "ng build typesafe-http-iots"
   },
   ...
}
```
9. Extend `tsconfig.json`
```json
{
  "compilerOptions": {
      ...
      "paths": {
         "@peppierre/typesafe-http-iots": [
            "./dist/typesafe-http-iots/"
         ]
      },
      ...
   }
}
```
10. Add following lines to `/sandbox-v{major-version}/.gitignore`
```
# Typesafe HTTP
projects/typesafe-http-iots
```

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Contact

For questions or support, please contact [peppierre@gmail.com].
