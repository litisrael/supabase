
export function determineTypeReportDay(table) {
   const dataMappedById ={}
  for (let line = 0; line < table.length; line++) {
    const currentOrder = table[line];
    currentOrder.id = `${currentOrder.amazon_order_id}${currentOrder.sku}`;
    currentOrder.day = parsearDay(currentOrder.purchase_date);
    currentOrder.month = parsearMonth(currentOrder.purchase_date);

    currentOrder.quantity = parseInt(currentOrder.quantity);
    currentOrder.currency = currentOrder.currency === "" ? null : currentOrder.currency;
    currentOrder.ship_country =  currentOrder.ship_country === "" ? null :currentOrder.ship_country
    const parseToFloatOrNull = (value) => (value.trim() !== '') ? parseFloat(value) : null;
    currentOrder.item_price = parseToFloatOrNull(currentOrder.item_price);
    currentOrder.item_tax = parseToFloatOrNull(currentOrder.item_tax);
    currentOrder.shipping_price = parseToFloatOrNull(currentOrder.shipping_price);
    currentOrder.shipping_tax = parseToFloatOrNull(currentOrder.shipping_tax);
    currentOrder.gift_wrap_price = parseToFloatOrNull(currentOrder.gift_wrap_price);
    currentOrder.gift_wrap_tax = parseToFloatOrNull(currentOrder.gift_wrap_tax);
    currentOrder.item_promotion_discount = parseToFloatOrNull(currentOrder.item_promotion_discount);
    
    // Convierte a booleano si la cadena es 'true' o 'false', de lo contrario, déjalo como está.
    currentOrder.signature_confirmation_recommended = (currentOrder.signature_confirmation_recommended.toLowerCase().trim() === 'true') ? true : (currentOrder.signature_confirmation_recommended.toLowerCase().trim() === 'false') ? false : currentOrder.signature_confirmation_recommended;
    
    // Convierte a booleano si la cadena es 'true' o 'false', de lo contrario, déjalo como está.
    currentOrder.is_business_order = (currentOrder.is_business_order.toLowerCase().trim() === 'true') ? true : (currentOrder.is_business_order.toLowerCase().trim() === 'false') ? false : currentOrder.is_business_order;

    dataMappedById[table[line].id] = table[line]

  }



  return Object.values(dataMappedById);
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
