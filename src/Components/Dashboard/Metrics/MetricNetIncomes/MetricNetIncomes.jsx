import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import axios from 'axios';

const CombinedCharts = ({ startDate, endDate }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la solicitud con las fechas actuales para los ingresos brutos
        const incomesResponse = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/incomes`, {
          params: {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
          }
        });

        // Realizar la solicitud con las fechas actuales para los ingresos netos
        const netIncomesResponse = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/netIncome`, {
          params: {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
          }
        });

        // Procesar los datos de ingresos brutos
        const totalIncomesData = incomesResponse.data.map(item => [item.name, item.incomes]);

        // Procesar los datos de ingresos netos
        const totalNetIncomesData = netIncomesResponse.data.map(item => [item.name, item.net_incomes]);

        // Destruir la instancia del gráfico si ya existe
        if (chartRef.current) {
          echarts.dispose(chartRef.current);
        }

        const myChart = echarts.init(chartRef.current);

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

    if (startDate && endDate) {
      fetchData();
    }

    // Devuelve una función de limpieza para destruir la instancia del gráfico al desmontar el componente
    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current);
      }
    };
  }, [startDate, endDate]);

  const handleDownloadExcel = async () => {
    swal({
      title: 'You are sure?',
      text: 'Do you want to download the report file?',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: 'Yes, download'
      },
    }).then(async (confirmed) => {
      if (confirmed) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/excel/incomes`, {
            params: {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
            },
            responseType: 'blob'
          });
          console.log(response.data);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Incomes of hotels from ${startDate} to ${endDate}.xlsx`);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error('Error downloading Excel file', error);
        }
      }
    });
  };

  return (
    <div>
      <h2>Incomes Hotels</h2>
    <div ref={chartRef} style={{ height: '400px', width: '600px' }}></div>
    <button onClick={handleDownloadExcel}>Download Report</button>
    </div>
  );
};

export default CombinedCharts;
