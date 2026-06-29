# typesafe-http — Project Guide for Claude

## What this project is

Two Angular libraries that add runtime HTTP response schema validation on top of Angular's `HttpClient`:

- `@peppierre/typesafe-http-iots` — uses [io-ts](https://github.com/gcanti/io-ts) + fp-ts for validation
- `@peppierre/typesafe-http-zod` — uses [zod](https://github.com/colinhacks/zod) for validation

Each library exposes a single injectable service, `TypesafeHttpService`, which mirrors the full `HttpClient` API. When the caller passes a `runtimeType` option, the service validates the JSON response against it and throws a `TypeError` if there is a mismatch.

## Repository layout

```
/                         root — orchestration only (scripts, version manifests)
  package.json            version source-of-truth + prepws:ngXX scripts
  scripts/
    prepare-version-specific-package.js   copies files from versions/ngXX/ into workspace/
    sync-iots-version.js  propagates root version → iots package.json before build
    sync-zod-version.js   propagates root version → zod package.json before build
  versions/
    ng16/ … ng21/         one directory per supported Angular major version
      files.json          manifest: which files to copy and where inside workspace/
      package.json        workspace-level deps for this Angular version
      angular.json        Angular CLI workspace config for this version
      iots-package.json   library package.json for iots (peerDeps >=16.0.0 <22.0.0)
      zod-package.json    library package.json for zod
      *.spec.ts           test files (prefixed iots- / zod-)
      tsconfig*.json      TypeScript / test runner configs
  workspace/              Angular workspace — the only place you edit library source
    projects/
      typesafe-http-iots/src/lib/
        typesafe-http.service.ts       core service (io-ts variant)
        provide.util.ts                provideTypesafeHttp() helper
        types/http-options.type.ts     all overload option types (version-agnostic)
      typesafe-http-zod/src/lib/       identical structure, zod variant
    dist/                 build output (not committed)
  sample-apps/
    iots/                 minimal Angular app for manual integration testing (iots)
    zod/                  minimal Angular app for manual integration testing (zod)
```

## Multi-version workflow

The `workspace/` directory is reconfigured per Angular version. Before doing anything in the workspace, run:

```bash
npm run prepws:ngXX       # e.g. prepws:ng21
```

This:
1. Cleans `workspace/node_modules`, `dist`, `package-lock.json`, eslint config, npm cache
2. Copies all files listed in `versions/ngXX/files.json` into `workspace/`
3. Runs `npm install` in `workspace/`

**Never edit files that are listed in a `versions/ngXX/files.json` directly inside `workspace/` — they are overwritten by `prepws`.** Edit the originals in the relevant `versions/ngXX/` directory and register them in `files.json`.

Files NOT in any `files.json` (i.e., the core service source, `provide.util.ts`, `public-api.ts`, `index.ts`) are version-agnostic and live only in `workspace/projects/`.

## Node version requirements

Use [NVM](https://github.com/nvm-sh/nvm) to match the required Node version:

| Angular version | Node version |
|----------------:|-------------:|
| ng16, ng17      | 18.16.1      |
| ng18, ng19      | 18.20.8      |
| ng20, ng21      | 20.19.0      |

## Common tasks

### Lint (inside workspace/)
```bash
npm run lint:lib
```

### Run tests (inside workspace/)
```bash
npm run test           # single run with coverage
npm run test:watch     # watch mode
```

### Build libraries (inside workspace/)
```bash
npm run build:lib      # builds both iots and zod
```
Version is auto-synced from root `package.json` before each build.

### Build and publish (from repo root)
```bash
npm run build:release   # runs prepws:ng21 + build:lib
cd workspace
npm run publish:iots
npm run publish:zod
```

### Manual integration test (from repo root)
```bash
npm run prepws:ngXX
cd workspace
npm run lint:lib && npm run test && npm run build:lib
rm -rf projects/sample-iots projects/sample-zod
npm run ng -- generate application sample-iots
npm run ng -- generate application sample-zod
rm -rf projects/sample-iots/src projects/sample-zod/src
cp -R ../sample-apps/iots/ projects/sample-iots
cp -R ../sample-apps/zod/ projects/sample-zod
npm run ng -- serve sample-iots   # Ctrl-C when done
npm run ng -- serve sample-zod    # Ctrl-C when done
cd ..
```
Repeat for every supported Angular version before publishing.

## Versioning rules

Version is set **only in the root `package.json`** and auto-propagated to each library before its build step.

- **Patch bump** (`x.y.Z`) — any fix on at least one library
- **Minor bump** (`x.Y.0`) — new feature on all libraries, or new runtime-type-checker support added
- **Major bump** (`X.0.0`) — new Angular version added, or oldest Angular version removed

Only one Angular version may be removed per release.

## Adding a new Angular version (checklist)

1. Create `versions/ngXX/` with: `package.json`, `angular.json`, `iots-package.json`, `zod-package.json`, `files.json`, tsconfig files, spec files.
2. In `iots-package.json` and `zod-package.json`, set `peerDependencies` `@angular/core`/`@angular/common` to `>=16.0.0 <YY.0.0` where `YY` is one above the newly added version.
3. Register all copied files in `versions/ngXX/files.json`.
4. Add `prepws:ngXX` script to root `package.json`.
5. Bump root `package.json` to next major version.

## Core implementation pattern

`TypesafeHttpService` delegates every call to Angular's `HttpClient`, then uses RxJS `tap` to intercept the response and validate it:

- **io-ts**: checks `runtimeType instanceof iots.Type`, calls `runtimeType.decode(value)`, throws `TypeError` if `result._tag === 'Left'`.
- **zod**: checks `runtimeType instanceof ZodType`, calls `runtimeType.safeParse(value)`, throws `TypeError` if `!result.success`.

The typed overloads (e.g., `get<T>(url, { runtimeType: MY_SCHEMA })`) are the primary public API. Non-typed overloads (returning `object`) pass through without validation.

`HttpOptionsBase` no longer exists as a hand-written interface. Each HTTP method has its own base type derived via `Parameters<HttpClient['METHOD']>[N]` (index 1 for url-only methods, 2 for url+body methods). The `Omit<..., 'responseType' | 'observe'>` strip lets concrete option types re-add those fields with specific literal values. Because the derivation lives in the emitted `.d.ts`, it resolves against the **consumer's** installed Angular version at their compile time — narrower on ng16, full fetch-API fields on ng21+.
