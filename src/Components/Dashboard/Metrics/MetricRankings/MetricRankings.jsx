import { useState, useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const RankingChart = ({ startDate, endDate }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener fechas actuales
        // const currentDate = new Date();
        // const endDate = currentDate.toISOString(); // Fecha actual en formato ISO
        // currentDate.setMonth(currentDate.getMonth() - 1); // Restar un mes para obtener la fecha de inicio
        // const startDate = currentDate.toISOString(); // Fecha de inicio en formato ISO

        // Realizar la solicitud con las fechas actuales
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/ranking`, {
          params: {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
          }
        });

        console.log(response.data);
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          // Procesar los datos para configurar el gráfico
          const hotelNames = data.map(item => item.name);
          const scores = data.map(item => item.total_score);

          // Configurar los datos para el gráfico de ECharts
          const chartDom = document.getElementById('ranking-chart');
          const myChart = echarts.init(chartDom);

          const option = {
            // title: {
            //   // text: 'Dispersion of hotel scores based on total score',
            //   left: 'center',
            //   top: 0
            // },
            visualMap: {
              min: Math.min(...scores),
              max: Math.max(...scores),
              dimension: 1,
              orient: 'vertical',
              right: 10,
              top: 'center',
              text: ['HIGH', 'LOW'],
              calculable: true,
              inRange: {
                color: ['#f2c31a', '#24b7f2']
              }
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: [
              {
                type: 'category',
                data: hotelNames
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: 'hotel-scores',
                type: 'scatter',
                symbolSize: 5,
                data: data.map(item => [item.name, item.total_score])
              }
            ]
          };

          myChart.setOption(option);
        } else {
          console.error('Error fetching hotel ranking: No data returned');
        }
      } catch (error) {
        console.error('Error fetching hotel ranking:', error);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  return (
    <div>
      <h2>Hotel Ranking by Average Score</h2>
      <div id="ranking-chart" style={{ height: '400px', width: '600px' }}></div>
    </div>
  );
};

export default RankingChart;
