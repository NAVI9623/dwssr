import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// 🔧 Solución para __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function viteAssets() {
  const isDev = process.env.NODE_ENV !== "production";
  const viteDevServer = process.env.VITE_DEV_SERVER || "http://localhost:5173";

  if (isDev) {
    // En desarrollo, cargamos el código del front-end
    // directamente del servidor de Vite
    // /@vite/client da acceso al servidor HMR (Hot Module Replacement)
    // /src/main.js es el entry point del front-end
    return `
      <script type="module" src="${viteDevServer}/@vite/client"></script>
      <script type="module" src="${viteDevServer}/src/main.js"></script>
    `;
  }

  // En modo producción
  // Obteniendo la ruta del manifiesto
  // ✅ Nuevo manifest path
  const manifestPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    ".vite",
    "manifest.json",
  );

  // Verificando si el manifiesto existe
  if (!fs.existsSync(manifestPath)) {
    console.warn('Vite manifest not found. Run "npm run build" first');
    return "";
  }

  // Parseando el manifest
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  // Obtener el punto de entrada de los scripts del front-end
  const mainEntry = manifest["src/main.js"];

  // Verificando la correcta carga del mainEntry
  if (!mainEntry) {
    console.warn("main.js entry not found in Vite manifest");
    return "";
  }

  // Variable que contendrá las etiquetas del front-end
  let tags = "";

  // CSS files
  if (mainEntry.css) {
    mainEntry.css.forEach((cssFile) => {
      // ✅ Template literal — no JSX
      tags += `<link rel="stylesheet" href="/${cssFile}">`;
    });
  }

  // JS file
  // ✅ Template literal — no JSX
  tags += `<script type="module" src="/${mainEntry.file}"></script>`;

  return tags;
}

// Registrar el HELPER en Handlebars
export function registerViteHelper(hbs) {
  hbs.registerHelper("viteAssets", () => new hbs.SafeString(viteAssets()));
}
