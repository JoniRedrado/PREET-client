import { useState, useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const BookingsChart = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener fechas actuales
        const currentDate = new Date();
        const endDate = currentDate.toISOString(); // Fecha actual en formato ISO
        currentDate.setMonth(currentDate.getMonth() - 1); // Restar un mes para obtener la fecha de inicio
        const startDate = currentDate.toISOString(); // Fecha de inicio en formato ISO

        // Realizar la solicitud con las fechas actuales
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/bookings`, {
          params: {
            start_date: startDate,
            end_date: endDate
          }
        });

        console.log(response.data);

        const data = response.data;

        // Procesar los datos para configurar el gráfico
        const hotelNames = data.map(item => item.name);
        const totalBookings = data.map(item => item.total_bookings);

        // Configurar los datos para el gráfico de ECharts
        const chartDom = document.getElementById('bookings-chart');
        const myChart = echarts.init(chartDom);

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //   orient: 'vertical',
          //   left: 10,
          //   data: hotelNames
          // },
          series: [
            {
              name: 'Total de Reservas',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: hotelNames.map((name, index) => ({
                value: totalBookings[index],
                name: name
              }))
            }
          ]
        };

        myChart.setOption(option);
      } catch (error) {
        console.error('Error fetching hotel bookings:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Total Hotel Reservations</h2>
      <div id="bookings-chart" style={{ height: '400px', width: '600px' }}></div>
    </div>
  );
};

export default BookingsChart;

