import { csvToJs } from "./cvsToJs.js";
import { determineTypeReportDay } from "../createDrops/determineTypeReportDay.js";

export const handleDrop = async (files) => {
  const selectedFile = files[0];

  if (!selectedFile) {
    console.error("No se ha seleccionado ningún archivo.");
    return;
  }

  
  // Comprobar si es un archivo CSV
  if (!selectedFile.type || !selectedFile.type.includes("csv")) {
    console.error("El archivo seleccionado no es un archivo CSV.");
    return;
  }

  const reader = new FileReader();

  const readFile = () => {
    return new Promise((resolve, reject) => {
      // Manejo de errores
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(selectedFile);

      reader.onload = () => {
        const csvData = reader.result;
        const dataJs = csvToJs(csvData);
        const dataJsToTypes = determineTypeReportDay(dataJs)
 console.log("dataJsToTypes",dataJsToTypes);
  
        resolve(dataJsToTypes);
      };

      // Leer el archivo como texto
    });
  };

  try {
    const result = await readFile();
    return result;
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return null;
  }
};
