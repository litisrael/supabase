import { handleDrop } from "../utility/handeldrop.js";
import { supabase } from "../supabase/client.js";


export const createDropDay = async () => {
  const input = document.getElementById("fileInputReportDay");
  const button = document.getElementById("buttonReportDay");

  button.addEventListener("click", async () => {

   
        const dataToInsert = await handleDrop(input.files);
    
     console.log("dataToInsert",dataToInsert);
     
        if (!dataToInsert){  console.error("No hay datos válidos para insertar.");
        return;}
    
        const { data, error } = await supabase
        .from("spapi_allOrders")
        .upsert(dataToInsert)
      .select()

      if (error) {
          console.error('Error al insertar datos en Supabase:', error.message);
        } else {
          console.log('Inserción exitosa en Supabase. Registros insertados:', data);
        
        
      }
       
  
      

});
};
