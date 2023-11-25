# WeAreStudio99 - Quote & invoice generator

This README outlines the necessary steps to get the **quote-invoice-generator** development environment up and running. Please follow the instructions carefully to ensure compatibility across different work environments.

## Manifesto

This project starts as a POC for running Puppeteer in NextJS Server Actions (for PDF generation) and a first attempt at storing all state in the URL. It's also used as a sandbox to research the best way to configure and structure a NextJS App for a fluid development and a robust software. Finally, it tries to be a showcase for the state of MY art with these technologies.
PS : I may really need to generate invoices & quotes but I prefer to spend my time coding this rather than opening Acrobat like any sane person.

## Disclaimer

This project leverages NextJS's new server actions feature in conjunction with Puppeteer. Current deployment on Vercel involves a serverless environment which poses compatibility issues with Puppeteer, preventing it from functioning correctly when deployed. As such, please be aware that the current intended use-case for this program is strictly for local development and execution. Future updates may address this deployment limitation, but for now, ensure to run and test the application locally.

## Node.js

To synchronize Node.js versions across different environments, we recommend using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm). Once installed, you can set the project's Node.js version with the following command:

```bash
nvm install
```

## Yarn

Yarn is the package manager of choice for this project. After ensuring you are using Node.js 20 _(lts/iron)_, activate `corepack` to use Yarn by running:

```bash
corepack enable
```

## Visual Studio Code

Uniformity in the TypeScript version used across different development setups is crucial. For VSCode users, ensure that you [use the workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript) rather than the built-in version provided by VSCode.

### Optional: Optimized Editor Configuration

For an enhanced development experience with project-specific editor settings, copy the `.vscode.sample` folder to your workspace configuration folder `.vscode`:

```bash
cp -R .vscode.sample .vscode
```

## Getting Started

Ensure that you follow the sections below in sequence to set up your development environment without issues. Documentation is provided to guide you through the major setup steps.

### Setup Environment Variables

Begin by creating a `.env.local` file for your environment variables. Use the `.env.local.sample` as a template:

```bash
cp .env.local.sample .env.local
```

Replace the placeholders in the newly created file with your actual values.

### Install Dependencies

To install the project dependencies, run:

```bash
yarn install
```

## Running the App

To start the application in watch mode during development:

```bash
yarn run dev
```

For running the application in production mode:

```bash
yarn run start
```

To remove `node_modules`, `.yarn.lock`, the puppeteer cache and the NextJS build output & re-install all dependencies

```bash
yarn run reset
```
