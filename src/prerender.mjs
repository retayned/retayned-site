import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

// Vite's default build output folder (relative to repo root)
const DIST = "dist";

// App.jsx is now a sibling in src/
import RetaynedSite, { getAllRoutes } from "./App.jsx";
import React from "react";
import { renderToString } from "react-dom/server";

const template = readFileSync(join(DIST, "index.html"), "utf-8");
const routes = getAllRoutes();

for (const route of routes) {
  const appHtml = renderToString(
    React.createElement(RetaynedSite, { initialPath: route })
  );

  const page = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  const outPath =
    route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page, "utf-8");
  console.log("prerendered:", route);
}

console.log(`Done. Prerendered ${routes.length} routes.`);
