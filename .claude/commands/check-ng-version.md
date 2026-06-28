Verify that the existing Angular version $ARGUMENTS support still builds, lints, and tests correctly.

The argument is a version number only (e.g. `21`). Throughout these steps, replace `XX` with that number.

## Context

This project maintains one directory per supported Angular version under `versions/ngXX/`. The `npm run prepws:ngXX` script cleans the workspace, copies version-specific files from `versions/ngXX/` into `workspace/`, and runs `npm install`. After that, lint, test, and build must all pass.

---

## Step 1 — Confirm the version directory exists

Check that `versions/ngXX/` exists and contains a `files.json`. If it does not exist, stop and report that ngXX is not a supported version in this project.

---

## Step 2 — Switch to the correct Node version

Look up the required Node version for ngXX in the table in `AGENTS.md`, then run:

```bash
nvm use <node-version>
```

Confirm the active Node version matches before proceeding.

---

## Step 3 — Prepare the workspace

From the repository root:

```bash
npm run prepws:ngXX
```

If this fails, report the error and stop — the remaining steps depend on a clean workspace.

---

## Step 4 — Lint

```bash
cd workspace && npm run lint:lib
```

---

## Step 5 — Test

```bash
npm run test
```

---

## Step 6 — Build

```bash
npm run build:lib
```

---

## Step 7 — Report

Summarise the outcome:

- Which steps passed and which failed.
- For any failure, include the exact error output.
- If all steps passed, confirm that ngXX is healthy.
