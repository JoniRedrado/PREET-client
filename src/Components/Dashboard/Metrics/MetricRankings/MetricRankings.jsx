import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const RankingChart = () => {
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
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/ranking`, {
          params: {
            start_date: startDate,
            end_date: endDate
          }
        });

        console.log(response);
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          // Procesar los datos para configurar el gráfico
          const hotelNames = data.map(item => item.name);
          const scores = data.map(item => item.total_score);

          // Configurar los datos para el gráfico de barras
          setChartData({
            labels: hotelNames,
            datasets: [
              {
                label: 'Puntuación Promedio',
                data: scores,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error('Error fetching hotel ranking: No data returned');
        }
      } catch (error) {
        console.error('Error fetching hotel ranking:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Ranking de Hoteles por Puntuación Promedio</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <Bar data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default RankingChart;
