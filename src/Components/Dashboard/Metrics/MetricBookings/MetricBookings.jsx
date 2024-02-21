import { useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const BookingsChart = ({ startDate, endDate }) => {
  useEffect(() => {
    let myChart = null;

    const fetchData = async () => {
      try {
        // Si ya hay una instancia de gráfico, destrúyela antes de inicializar una nueva
        if (myChart) {
          myChart.dispose();
        }

        // Realizar la solicitud con las fechas actuales
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/bookings`, {
          params: {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
          }
        });

        // console.log(response.data);

        const data = response.data;

        // Procesar los datos para configurar el gráfico
        const hotelNames = data.map(item => item.name);
        const totalBookings = data.map(item => item.total_bookings);

        // Configurar los datos para el gráfico de ECharts
        const chartDom = document.getElementById('bookings-chart');
        myChart = echarts.init(chartDom);

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
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

    if (startDate && endDate) {
      fetchData();
    }

    // Devuelve una función de limpieza para destruir la instancia del gráfico al desmontar el componente
    return () => {
      if (myChart) {
        myChart.dispose();
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
          const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/excel/bookings`, {
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
          link.setAttribute('download', `Bookings from ${startDate} to ${endDate}.xlsx`);
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
      <h2>Total Hotel Reservations</h2>
      <div id="bookings-chart" style={{ height: '400px', width: '600px' }}></div>
      <button onClick={handleDownloadExcel}>Download Report</button>

    </div>
  );
};

export default BookingsChart;
