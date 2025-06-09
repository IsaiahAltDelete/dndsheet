# D&D Character Sheet Manager

A simple React-based character sheet for Dungeons & Dragons. It uses Tailwind CSS for styling and stores data in your browser's local storage.

The application also includes an in-app **README** page accessible from the sidebar so you can quickly reference these instructions while using the sheet.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

Open `http://localhost:5173` in your browser.

## Build

To create a production build:

```bash
npm run build
```
The Vite config sets `base: ./` so the built files work when served from a subdirectory such as GitHub Pages.

## Deploying to GitHub Pages

The build output in the `dist` folder is a fully static site. You can host it
on GitHub Pages or any other static file server. To deploy on GitHub Pages:

1. Run `npm run build` to generate the `dist` folder.
2. Commit the contents of `dist` or use a deployment tool like
   [`gh-pages`](https://www.npmjs.com/package/gh-pages) to push the folder to a
   `gh-pages` branch.
3. Enable GitHub Pages in your repository settings and point it to the published
   branch.

All character data is saved in your browser's local storage, so each browser will
maintain its own copy of the sheet.
