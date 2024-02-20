import * as echarts from 'echarts';
import { useEffect } from 'react';
import axios from 'axios';

const CombinedCharts = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener fechas actuales
        const currentDate = new Date();
        const endDate = currentDate.toISOString(); // Fecha actual en formato ISO
        currentDate.setMonth(currentDate.getMonth() - 1); // Restar un mes para obtener la fecha de inicio
        const startDate = currentDate.toISOString(); // Fecha de inicio en formato ISO

        // Realizar la solicitud con las fechas actuales para los ingresos brutos
        const incomesResponse = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/incomes`, {
          params: {
            start_date: startDate,
            end_date: endDate
          }
        });

        // Realizar la solicitud con las fechas actuales para los ingresos netos
        const netIncomesResponse = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/netIncome`, {
          params: {
            start_date: startDate,
            end_date: endDate
          }
        });

        // Procesar los datos de ingresos brutos
        const totalIncomesData = incomesResponse.data.map(item => [item.name, item.incomes]);

        // Procesar los datos de ingresos netos
        const totalNetIncomesData = netIncomesResponse.data.map(item => [item.name, item.net_incomes]);

        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);

        const option = {
          
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['hotel', 'Total Revenue', 'Net Income'],
              ...totalIncomesData.map(item => [item[0], item[1], null]), // Insertar ingresos brutos
              ...totalNetIncomesData.map(item => [item[0], null, item[1]]) // Insertar ingresos netos
            ]
          },
          xAxis: { type: 'category' },
          yAxis: { type: 'value', axisLabel: { formatter: '{value} $' } }, // Formatear etiquetas del eje y como dinero
          series: [
            { type: 'bar' },
            { type: 'bar' }
          ],
        };

        option && myChart.setOption(option);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div id="main" style={{ height: '400px', width: '600px' }}></div>
  );
};

export default CombinedCharts;
