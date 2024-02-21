import { useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const RankingChart = ({ startDate, endDate }) => {
  useEffect(() => {
    let myChart = null;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/ranking`, {
          params: {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
          }
        });

        if (response.data) {
          const data = response.data;

          if (Array.isArray(data) && data.length > 0) {
            // Procesar los datos para configurar el gráfico
            const hotelNames = data.map(item => item.name);
            const scores = data.map(item => item.total_score);

            // Configurar los datos para el gráfico de ECharts
            if (myChart) {
              myChart.dispose();
            }

            const chartDom = document.getElementById('ranking-chart');
            myChart = echarts.init(chartDom);

            const option = {
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
        }
      } catch (error) {
        console.error('Error fetching hotel ranking:', error);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }

    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [startDate, endDate]);

  return (
    <div>
      <h2>Hotel Ranking by Average Score</h2>
      <div id="ranking-chart" style={{ height: '400px', width: '600px' }}></div>
    </div>
  );
};

export default RankingChart;
