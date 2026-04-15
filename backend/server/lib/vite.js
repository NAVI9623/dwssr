import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import longger from 'morgan';

//IMPORTAMOS enrutadores
import indexRouter from "#routes/index.js";
import usersRouter from "#routes/users.js";
import authorRouter from "#routes/author.js";
import path from "node:path";
import { fstat } from "node:fs";

// 🔧 Solución para __dirname
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

export default function viteAssets() {
  const isDev = process.env.NODE_ENV !== 'production';
  const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

if(isDev) {
    //En desarrollo,cargamos el codigo para el front-end
    //directamente del servidor de Vite
    // /@vite/client da acceso a un  servidor HMR (Hot Module Replacement)
    // /main.js Front-end scripts entry point
    return `
    <script type="module" src="${viteDevServer}/@vite/client"></script>
    <script type="module" src="${viteDevServer}/src/main.js"></script>
    `;
  }
  //En modo produccion 
  // Obteniendo la ruta del manifiesto
  const manifestPath = path.join(__dirname,'..','..','dist','.vite','manifest.json')

  //Verificando si el manifiesto existe
  if(!fstat.existsSync(manifestPath)){
    console.warn('Vitte manifest not found. Run "nmp run build" first');
    return '';
  }

  //Parseando el manifest
  const manifest = JSON.parse(
    fstat.readFileSync(manifestPath, 'UTF-8')
  );

  //Obtener el punto de enttrada de los scripts del front-end
  const mainEntry =manifest['main.js']

  //Verificando la correcta carga del mainEntry
  if(!mainEntry){
    console.warn('main.js entry not founf in Vite manifest');
    return '';
  }

  //Creando la variable que contendra la
  //etiqueta de los scripts del front-end
  let tags = '';

  //CSS files
  if(mainEntry.css){
    mainEntry.css.forEach(cssFile => {
        tags += <script type="stylesheet" src="/${cssFile}"></script>
    });
  }

  //JS Files
  tags += <script type="module" src="/${mainEntry.file}"></script>

return tags;
}
 //Registrar el HELPER
  export function registerViteHelper(hbs){
    hbs.registerHelper(
        'viteAssets', 
        () => new hbs.SafeString(viteAssets())
    )
  }