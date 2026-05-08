//Importar libreria winston
import winston, { format } from "winston";
import path from "path";
import fs from "node:fs";
// Importamos biblioteca de transporte de winston para enviar logs a MongoDB
import DailyRotateFile from "winston-daily-rotate-file";

// Desestructuramos funciones format
const { combine, timestamp, label, colorize, prettyPrint } = format;

//Creando los directorios
const __rootDir = path.resolve(process.cwd());

// Creando la ruta del directorio de logs en la raiz del proyecto
const logDir = path.join(__rootDir, "logs");
// Rurina que crea la carpeta donde iran los logs si no existe
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Definiendo esquma de colores para cada nivel de log
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

// Agregamos los colores a winston
winston.addColors(colors);

// Creando el formato de salida para los diferentes transportes
const myConsoleFormat = combine(
  //Agregamos color a la salida de consola
  colorize({ all: true }),
  // Agregamos una etiquea Log
  label({ label: "📢" }),
  // Agregamos un timestamp a cada log
  timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  // Agregamos un formato personalizado para la salida de consola
  format.printf(
    (info) =>
      `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`,
  ),
);
// Formato para los archivos de log
const myFileFormat = combine(
  // Quitamos los colores para los archivos de log
  format.uncolorize(),
  // Agregamos fecha en formato ISO
  timestamp(),
  // Salida en formato JSON para los archivos de log
  format.json(),
);

//Creando los trasportes para los logs
const options = {
  errorFile: {
    level: "error",
    filename: path.join(__rootDir, "logs", "error.log"),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat,
  },
  readableFile: {
    filename: path.join(logDir, "app-readable.log"),
    level: "info",
    format: combine(
      format.uncolorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      prettyPrint(),
    ),
    maxsize: 5242880,
    maxFiles: 5,
  },
  dailyRotateFile: {
    filename: path.join(logDir, "app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: myFileFormat,
  },
};

// Creando el transporte para la consola

//creando una instancia de winston logger con los transportes y formatos definidos
//usaremos un transport diario lo que es dally rotate file para el log principal esto facilita
//la retencion por fecha y la compresion de archivos
//para los demas logs manenaremos un archivo unico para cada nivel de log
const logger = winston.createLogger({
  transports: [
    //logs principal con rotacion diaria
    new DailyRotateFile(options.dailyRotateFile),
    //logs de error en un archivo separado
    new winston.transports.File(options.readableFile),
    //log de errores en un archivo separado
    new winston.transports.File(options.errorFile),
    //log de advertencias en un archivo separado
    new winston.transports.Console(options.console),
  ],

  exceptionHandlers: [
    //Manejador de excepciones para errores no capturados
    new winston.transports.File({
      filename: path.join(logDir, "exception.log"),
    }),
  ],
  rejectionHandlers: [
    //Manejador de rechazos para errores no capturados
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
    }),
  ],
  exitOnError: false, // No salir en caso de error no capturado
});

export default logger;
