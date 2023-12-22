import { supabase } from "../supabase/client.js";
import Chart from 'chart.js/auto';




export const chartDays = async()=> {

const ctx = document.getElementById('chartDays').getContext('2d');

let { data: spapi_allOrders, error1 } = await supabase
  .from('spapi_allOrders')
  .select('*')
  .eq('day','Monday' )

//   let { data: datesOfCharat, error } = await supabase
//   .from('spapi_allOrders')
//   .select('purchase_date',{distinct :true})
// // La variable datesOfCharat contendrá las fechas únicas en la columna 'purchase_date'


const { data, error2 } = await supabase.rpc("getuniquedates");
console.log("Datos devueltos por la función:", data);
const bla  = await supabase.rpc("getuniquedates");
console.log("data",bla.data);
const arrayDeFechas = data.map(objeto => objeto.fecha);

console.log("arrayDeFechas",arrayDeFechas);

console.log("spapi_allOrders Monday",spapi_allOrders); 
// Crear el objeto de configuración del gráfico
const chartConfig = {
  type: 'bar',
  data: {
    labels: arrayDeFechas,
    datasets: [{
      label: 'Ventas mensuales',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// Crear el gráfico
return new Chart(ctx, chartConfig);
}