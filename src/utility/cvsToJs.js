export function csvToJs(csv) {
  const lines = csv.split(/\r?\n/);
  const result = [];
  const headers = lines[0].split(",").map((column) => column.replaceAll('-', '_'));

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const row = lines[i].split(",");
    
    let currentIndex = 0; 
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];

      if (row[currentIndex] === "") {
        obj[header] = null
        currentIndex++;
        continue
       
      }
  
      
      if (row[currentIndex] && row[currentIndex].startsWith('"')) {
        // Campo de texto que comienza con comillas dobles
        let combinedValue = row[currentIndex].slice(1);

        // Buscar el siguiente campo que termine con comillas dobles
        while (
          (!row[currentIndex].endsWith('"') || combinedValue.endsWith('""')) &&
          currentIndex < row.length - 1
        ) {
          currentIndex++;
          combinedValue += `,${row[currentIndex]}`;
        }

        // Eliminar comillas dobles adicionales y reemplazar comillas dobles escapadas
        obj[header] = combinedValue.replace(/""/g, '"').replace(/\\"/g, '"');
      } else {
        // Campo normal sin comillas dobles
        obj[header] = row[currentIndex];
      }
      if (
          ["quantity" ].includes(header.toLowerCase())
      ) {
        obj[header] = isNumeric(obj[header]) ? parseFloat(obj[header]) : null;
      } else if (
      ["is_business_order", "signature_confirmation_recommended"].includes(header.toLowerCase())
    ) {
      obj[header] = obj[header].trim().toLowerCase() === 'true';
    }
      currentIndex++;
    }
console.log(obj);
    result.push(obj);
  }

  return result;
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// export function csvToJs(stringVal) {
//   // 1. Divide la cadena en líneas y asigna la primera línea a 'keys' y el resto a 'rest'
//   const [keys, ...rest] = stringVal
//     .trim() // Elimina espacios en blanco al principio y al final
//     .split("\n") // Divide la cadena en líneas usando el salto de línea como delimitador
//     .map((item) => item.split(",")); // Divide cada línea en elementos usando el delimitador proporcionado

//   // 2. Crea un array de objetos a partir de 'rest'
//   const formedArr = rest.map((item) => {
//     const object = {};
//     // 3. Asigna los valores de cada línea a las propiedades correspondientes del objeto
//     keys.forEach((key, index) => {
//       key.replaceAll('-', '_')
//       object[key] = item.at(index)});
//     return object;
//   });
// console.log(formedArr);
//   // 4. Devuelve el array de objetos formado
//   return formedArr;
// }

// export function csvToJs(csv) {

//   // \n or \r\n depending on the EOL sequence

//   const lines = csv.split("\n")

//   const result = [];

//   const headers = lines[0].split(",").map(column => column.replaceAll('-', '_'));

//   for (const line of lines) {
//     const obj = {};
//     const row = line.split(",");
//     console.log("row",row);

//     for (let i = 0; i < headers.length; i++) {
//       const header = headers[i];

//       obj[header] = row[i];

//     }

//     // console.log(obj);
//     result.push(obj);
//   }

//   result.shift();
//   return result;
// }



// export function csvToJs(csvData) {
//   // Dividir el CSV en líneas
//   const lines = csvData.split(/\r?\n/);

//   // Obtener los encabezados (suponemos que la primera línea contiene los encabezados)
//   const headers = lines[0]
//     .split(",")
//     .map((column) => column.replaceAll("-", "_"));

//   // Crear un array para almacenar los objetos procesados
//   const processedData = [];

//   // Iterar sobre las líneas (empezamos desde 1 para omitir los encabezados)
//   for (let i = 1; i < lines.length; i++) {
//     const currentLine = lines[i].split(",");

//     // Crear un objeto para representar la fila actual
//     const currentObject = {};

//     // Iterar sobre los encabezados y asignar los valores correspondientes
//     for (let j = 0; j < headers.length; j++) {
//       // Asegurarse de que estamos dentro del límite de la línea actual
//       if (currentLine[j] !== undefined && currentLine[j].trim() !== "") {
//         // Convertir los valores según el tipo de dato en la tabla
//         switch (headers[j].trim()) {
//           case "item_price":
//           case "item_tax":
//           case "shipping_price":
//           case "shipping_tax":
//           case "gift_wrap_price":
//           case "gift_wrap_tax":
//           case "item_promotion_discount":
//           case "ship_promotion_discount":
//             const numericValue = parseFloat(currentLine[j].trim());
//             // // Verificar si la conversión es exitosa y el valor no es NaN
//             // currentObject[headers[j].trim()] = !isNaN(numericValue) ? numericValue : null;
//             // const numericValue = parseFloat(currentLine[j].trim());
//             if (!isNaN(numericValue)) {
//               currentObject[headers[j].trim()] = numericValue;
//             }
//             break;
//           case "quantity":
//           case "is_business_order":
//           case "signature_confirmation_recommend":
//             currentObject[headers[j].trim()] =
//               currentLine[j].trim().toLowerCase() === "true";
//             break;
//           default:
//             // Otros tipos de datos se mantienen como cadenas
//             currentObject[headers[j].trim()] = currentLine[j].trim();
//             break;
//         }
//       }
//     }

//     console.log("currentObject", currentObject);

//     // for (const prop in currentObject) {
//     //   console.log(`Tipo de ${prop}: ${typeof currentObject[prop]}`);
//     // }
//     // Agregar el objeto procesado al array
//     processedData.push(currentObject);
//   }
// }

// const dateString = "2023-11-20T03:12:16+00:00";
// const dateObject = new Date(dateString);

// const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
//   dateObject
// );
// const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
//   dateObject
// );

// console.log(`La fecha ${dateString} es un ${dayOfWeek}, de ${month}.`);
