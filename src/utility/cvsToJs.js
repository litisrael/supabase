export function csvToJs(csv) {
  const lines = csv.split(/\r?\n/);

  const result = [];
  console.log("result",result);
  const headers = lines[0]
    .split(",")
    .map((column) => column.replaceAll("-", "_"));

  headers.push("id", "day", "month");

  let indexId;
  let indexDay;
  let indexMonth;
  let indexPurchaseDate;
  let indexAmazon_order_id;
  let indexSku;
  let indexQuantity;
  let IndexItem_price;
  let indexItem_tax;
  let indexShipping_price;
  let indexShipping_tax;
  let indexGift_wrap_price;
  let indexGift_wrap_tax;
  let indexItem_promotion_discount;

  let indexIs_business_order;
  let indexSignature_confirmation_recommended;
  //  "signature_confirmation_recommended"

  for (let header = 0; header < headers.length; header++) {
    if (headers[header] === "id") {
      indexId = header;
    }

    if (headers[header] === "day") {
      indexDay = header;
    }
    if (headers[header] === "month") {
      indexMonth = header;
    }

    if (headers[header] === "amazon_order_id") {
      indexAmazon_order_id = header;
    }

    if (headers[header] === "sku") {
      indexSku = header;
     
    }

    if (headers[header] === "purchase_date") {
      indexPurchaseDate = header;
    }

    //  bla
    if (headers[header] === "quantity") {
      indexQuantity = header;
    }
    if (headers[header] === "item_price") {
      IndexItem_price = header;
    }
    if (headers[header] === "item_tax") {
      indexItem_tax = header;
    }
    if (headers[header] === "shipping_price") {
      indexShipping_price = header;
    }
    if (headers[header] === "shipping_tax") {
      indexShipping_tax = header;
    }

    if (headers[header] === "gift_wrap_price") {
      indexGift_wrap_price = header;
    }

    if (headers[header] === "gift_wrap_tax") {
      indexGift_wrap_tax = header;
    }

    if (headers[header] === "item_promotion_discount") {
      indexItem_promotion_discount = header;
    }
    if (headers[header] === "is_business_order") {
      indexIs_business_order = header;
    }
    if (headers[header] === "item_promotion_discount") {
      indexItem_promotion_discount = header;
    }
  }

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const field = lines[i].split(",");
    
  
    // se usa el currentIndex por si dentro de algun campo hay comas

    let currentIndex = 0;
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
     
    
      if (currentIndex == indexId) {
        obj.id = `${field[indexAmazon_order_id]}${field[indexSku]}`
        console.log("obj.id",obj.id);
        currentIndex++;
        continue;
      }
      
      if (currentIndex === indexDay) {
        obj.day = parsearDay(field[indexPurchaseDate])
        currentIndex++;
        continue;
        }

      if (currentIndex == indexMonth) {
        obj.month = parsearMonth(field[indexPurchaseDate])
        currentIndex++;
        continue;
      }


      if (field[currentIndex] === "" || field[currentIndex] === undefined) {
        obj[header] = null;
        currentIndex++;
        continue;
      }
    
   

      if (
        field[indexQuantity] !== undefined &&
        field[indexQuantity].trim() !== ""
      ) {
        obj[header] = parseInt(field[currentIndex]);
      }
      if (
        (field[IndexItem_price] !== undefined &&
          field[IndexItem_price].trim() !== "") ||
        (field[indexItem_tax] !== undefined &&
          field[indexItem_tax].trim() !== "") ||
        (field[indexShipping_price] !== undefined &&
          field[indexShipping_price].trim() !== "") ||
        (field[indexShipping_tax] !== undefined &&
          field[indexShipping_tax].trim() !== "") ||
        (field[indexGift_wrap_price] !== undefined &&
          field[indexGift_wrap_price].trim() !== "") ||
        (field[indexGift_wrap_tax] !== undefined &&
          field[indexGift_wrap_tax].trim() !== "") ||
        (field[indexItem_promotion_discount] !== undefined &&
          field[indexItem_promotion_discount].trim() !== "")
      ) {
        obj[header] = parseFloat(field[currentIndex]);
      }

      if (
        (field[indexIs_business_order] !== undefined &&
          field[indexIs_business_order].trim() !== "") ||
        (field[indexSignature_confirmation_recommended] !== undefined &&
          field[indexSignature_confirmation_recommended].trim() !== "")
      ) {
        obj[header] = field[currentIndex]
          .trim()
          .toLowerCase(field[currentIndex]);
      }

      if (field[currentIndex] && field[currentIndex].startsWith('"')) {
        // Campo de texto que comienza con comillas dobles
        let combinedValue = field[currentIndex].slice(1);

        // Buscar el siguiente campo que termine con comillas dobles
        while (
          (!field[currentIndex].endsWith('"') ||
            combinedValue.endsWith('""')) &&
          currentIndex < field.length - 1
        ) {
          currentIndex++;
          combinedValue += `,${field[currentIndex]}`;
        }

        // Eliminar comillas dobles adicionales y reemplazar comillas dobles escapadas
        obj[header] = combinedValue.replace(/""/g, '"').replace(/\\"/g, '"');
      } else {
        // Campo normal sin comillas dobles
        obj[header] = field[currentIndex];
      }

      currentIndex++;
    }
    // console.log(obj);
    result.push(obj);
  }

  return result;
}

function parsearDay(fechaString) {
  const dateObject = new Date(fechaString);
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(dateObject);
  // console.log("dayOfWeek",dayOfWeek);
  return dayOfWeek;
}
function parsearMonth(fechaString) {
  const dateObject = new Date(fechaString);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(dateObject);
  // console.log("month", month);
  return month;
}

const processQuotedField =()=>{
  
}