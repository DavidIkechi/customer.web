# Heed - customersupport.web

## Deployment Status

![example workflow](https://github.com/workshopapps/customersupport.web/actions/workflows/main.yml/badge.svg)

![Heed Logo](/scrybe_frontend/src/assets/heed_logo_with_text.svg)

This repo contains both the Front and Back end for the ![Heed App](/scrybe_frontend/src/assets/heed_logo_with_text.svg)

## Current Setup (This project uses:)

- Vitest + React testing-library
- Sass + CSS modules
- Eslint
- Prettier
- Husky precommits

## Deployment to Live Link

- Repo deploys to ![Heed App](/scrybe_frontend/src/assets/heed_logo_with_text.svg)  from branch "main" and Continuous deployment is setup with Jenkins

## Contributing - Frontend

- When working on a new feature/fix create a new branch and work there.
- Clone the repo.
- Checkout to your branch with `git checkout nameofBranch`
- Run `npm install` then `npm run dev` launch the project
- Remember to update your branch from dev.
- While working, make frequent commits
- When you're done working on your feature make a PR only to the dev branch (not staging or main)

## Before committing

If you try committing and get an error from Git:

- Ensure you run `npm run lint` and fix all errors before trying to commit (husky will prevent you from committing otherwise).
- You can run `npm run lint:fix` to try to automatically fix the simpler errors.
- For easy formatting, you can use the vscode prettier extension to format code on save.

### Questions about the structure of the repo?

Ask [Tochi](https://github.com/tochibedford) - Frontend
or
[David](https://github.com/DavidIkechi) - Backend
