import { supabase } from "../supabase/client.js";
import Chart from 'chart.js/auto';





export const chartDays = async()=> {

const ctx = document.getElementById('chartDays').getContext('2d');

let { data: spapi_allOrders, error } = await supabase
  .from('spapi_allOrders')
  .select('*')
  .eq('day','Monday' )

console.log("spapi_allOrders Monday",spapi_allOrders); 
// Crear el objeto de configuración del gráfico
const chartConfig = {
  type: 'bar',
  data: {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'],
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