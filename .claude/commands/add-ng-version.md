Add support for Angular version $ARGUMENTS to the `typesafe-http` project.

The argument is a version number only (e.g. `22`). Throughout these steps, replace `XX` with the new Angular major version number and `PREV` with the previous Angular major version (XX - 1).

## Context

This project maintains one directory per supported Angular version under `versions/`. Each `versions/ngXX/` directory contains all version-specific files that `scripts/prepare-version-specific-package.js` copies into `workspace/` before installing and building.

The previous version's directory (`versions/ngPREV/`) is the authoritative template to start from.

---

## Step 1 — Determine the correct Node version

Check the Node version table in `AGENTS.md`. If ngXX is not yet listed, research the official Angular compatibility table and add the new entry to the table.

Node version requirements for reference (update if needed):
- ng16, ng17 → 18.16.1
- ng18, ng19 → 18.20.8
- ng20, ng21 → 20.19.0

---

## Step 2 — Copy the previous version directory as a starting point

```bash
cp -R versions/ngPREV versions/ngXX
```

---

## Step 3 — Update `versions/ngXX/package.json` (workspace-level)

This is the Angular workspace `package.json`. Update:

1. All `@angular/*` dependency version ranges from `~PREV.x.x` / `^PREV.x.x` to the appropriate `^XX.0.0` range.
2. `ng-packagr` version to match the new Angular major (e.g., `^XX.0.0`).
3. `angular-eslint` version to match the new Angular major.
4. `typescript` version — check the Angular XX compatibility matrix; Angular versions pin TypeScript to a specific `~x.y.z` range.
5. The test runner toolchain if it changed (ng20 used Jest + `jest-preset-angular`; ng21 switched to Vitest + `@angular/build:unit-test`). Check if there was a similar tooling shift in this release.
6. Remove any leftover config blocks (e.g., `"jest": {...}`) that belong to a test runner no longer in use.
7. Update `rxjs`, `fp-ts`, `zod`, `tslib` to their latest compatible versions.

---

## Step 4 — Update `versions/ngXX/iots-package.json` and `versions/ngXX/zod-package.json`

In both files, update `peerDependencies`:
```json
"@angular/common": "^>=XX.0.0 <YY.0.0",
"@angular/core":   "^>=XX.0.0 <YY.0.0"
```
where `YY = XX + 1`.

---

## Step 5 — Update `versions/ngXX/angular.json`

1. The `$schema` path stays as `./node_modules/@angular/cli/lib/config/schema.json` — no change needed.
2. If the test builder changed (e.g., from a Jest-based builder to `@angular/build:unit-test`), update the `"test"` architect block in both `typesafe-http-iots` and `typesafe-http-zod` projects accordingly.
3. If the build builder changed (`@angular-devkit/build-angular:ng-packagr` → `@angular/build:ng-packagr`), update the `"build"` architect block.

---

## Step 6 — Update `versions/ngXX/tsconfig.json` and `versions/ngXX/tsconfig.spec.json`

Check the Angular XX release notes for any new required `compilerOptions` (e.g., `moduleResolution`, `target`, `module` changes). Update if needed.

If the test runner changed (e.g., from Jest to Vitest), `tsconfig.spec.json` may need to switch from `"types": ["jest"]` to `"types": []` or `"types": ["vitest/globals"]`. Inspect the previous two version files to understand the pattern.

---

## Step 7 — Update `versions/ngXX/http-options-base.type.ts`

This file mirrors Angular's `HttpRequest` options interface. For each new Angular version, check what new fetch-API fields were added to `HttpRequest`.

Research approach:
1. Look at the Angular XX changelog or CHANGELOG.md on GitHub for `HttpClient` / `HttpRequest` changes.
2. Compare `versions/ngPREV/http-options-base.type.ts` with any new fields documented.
3. Add new optional fields following the existing pattern:
   ```ts
   newField?: NewFieldType | undefined;
   ```

Do NOT remove fields from previous versions — only add new ones.

---

## Step 8 — Update spec files if the test runner changed

If there was a test runner change (like the Jest → Vitest switch between ng20 and ng21), the spec files may need updating. Compare:
- `versions/ngPREV/iots-typesafe-http.service.get.spec.ts`
- `versions/ngXX/iots-typesafe-http.service.get.spec.ts`

If the import source changed (e.g., `from '@jest/globals'` → `from 'vitest'`), update all 14 spec files (`iots-*` and `zod-*`) in `versions/ngXX/`.

---

## Step 9 — Update `versions/ngXX/eslint.config.js`

Check if `angular-eslint` introduced any breaking config shape changes in version XX. If not, no change is needed beyond what was copied in Step 2.

---

## Step 10 — Update `versions/ngXX/files.json`

Review whether any new files need to be added to the copy manifest. If you added new files in `versions/ngXX/` that need to land in `workspace/`, register them here following the existing pattern.

Also check if any files from the previous version are no longer needed (e.g., `setup.jest.ts` was removed when switching from Jest to Vitest in ng21).

---

## Step 11 — Add the `prepws:ngXX` script to root `package.json`

In the root `package.json`, add to `"scripts"`:
```json
"prepws:ngXX": "npm run pre-prepws && node scripts/prepare-version-specific-package.js --npmTag ngXX && npm run post-prepws"
```

---

## Step 12 — Bump the root `package.json` version

Per the versioning rules in `AGENTS.md`:
- Adding a new Angular version = **major bump** (`X.0.0`).

Update `"version"` in the root `package.json` accordingly.

---

## Step 13 — Update `AGENTS.md`

1. Add the new Node version row to the Node version requirements table if ngXX requires a different Node version.
2. Update the `prepws:ngXX` example in "Common tasks" to reference the new version.

---

## Step 14 — Verify

Run a dry-run of the copy script to confirm the manifest is correct:
```bash
node scripts/prepare-version-specific-package.js --npmTag ngXX
```
(This will try to copy files; it will fail if the workspace is not prepped, but it will at least validate that all `from` paths in `files.json` exist.)

Then do a full workspace prep and test run:
```bash
nvm use <node-version-for-ngXX>
npm run prepws:ngXX
cd workspace
npm run lint:lib && npm run test && npm run build:lib
cd ..
```

---

## Summary checklist

- [ ] `versions/ngXX/` directory created from `versions/ngPREV/`
- [ ] `package.json` — all Angular/toolchain versions updated
- [ ] `iots-package.json` — peer deps updated to `>=XX <YY`
- [ ] `zod-package.json` — peer deps updated to `>=XX <YY`
- [ ] `angular.json` — builder targets updated if toolchain changed
- [ ] `tsconfig.json` / `tsconfig.spec.json` — compiler options updated
- [ ] `http-options-base.type.ts` — new HttpRequest fields added
- [ ] Spec files updated if test runner changed
- [ ] `eslint.config.js` reviewed
- [ ] `files.json` updated (new files added, obsolete files removed)
- [ ] Root `package.json` — `prepws:ngXX` script added
- [ ] Root `package.json` — version bumped (major)
- [ ] `AGENTS.md` — Node version table and examples updated
- [ ] Workspace prep + lint + test + build passes

After all checks pass, summarize:
1. What was changed mechanically (version numbers, toolchain updates).
2. What required judgment (new `HttpOptionsBase` fields, tooling changes).
3. Anything that still needs manual review before publishing.
