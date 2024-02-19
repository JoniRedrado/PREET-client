import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const NetIncomeChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener fechas actuales
        const currentDate = new Date();
        const endDate = currentDate.toISOString(); // Fecha actual en formato ISO
        currentDate.setMonth(currentDate.getMonth() - 1); // Restar un mes para obtener la fecha de inicio
        const startDate = currentDate.toISOString(); // Fecha de inicio en formato ISO

        // Realizar la solicitud con las fechas actuales
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/netIncome`, {
          params: {
            start_date: startDate,
            end_date: endDate
          }
        });

        console.log(response.data);

        const data = response.data;

        // Procesar los datos para configurar el gráfico
        const hotelNames = data.map(item => item.name);
        const netIncomes = data.map(item => item.net_incomes);

        // Configurar los datos para el gráfico de barras
        setChartData({
          labels: hotelNames,
          datasets: [
            {
              label: 'Ingresos Netos',
              data: netIncomes,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching net incomes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Ingresos Netos de Hoteles</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <Bar data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default NetIncomeChart;