import * as echarts from 'echarts';
import axios from 'axios';
import { useEffect } from 'react';
import styles from "./MetricUsers.module.css"

const MetricUsers = ({ startDate, endDate }) => {
  
  useEffect(() => {
    let myChart = null;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/users`, {
          params: {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
          }
        });

        if (response.data) {
          const data = response.data.map(item => ({
            value: item.user_count,
            name: item.nationality,
            flag: `https://www.countryflags.io/${item.country_code}/flat/64.png`
          }));

          if (myChart) {
            myChart.dispose();
          }

          const chartDom = document.getElementById('chart');
          myChart = echarts.init(chartDom);

          const option = {
            grid: {
              top: 10,
              bottom: 30,
              left: 150,
              right: 80
            },
            xAxis: {
              max: 'dataMax',
              axisLabel: {
                formatter: function (n) {
                  return Math.round(n) + '';
                }
              }
            },
            yAxis: {
              type: 'category',
              inverse: true,
              axisLabel: {
                show: true,
                fontSize: 14,
                formatter: function (value) {
                  return `{flag|} ${value}`;
                },
                rich: {
                  flag: {
                    width: 30,
                    height: 20,
                    align: 'center',
                    backgroundColor: {
                      image: function (params) {
                        return data.find(item => item.name === params.value).flag;
                      }
                    }
                  }
                }
              },
              data: data.map(item => item.name),
              animationDuration: 300,
              animationDurationUpdate: 300
            },
            series: [
              {
                realtimeSort: true,
                seriesLayoutBy: 'column',
                type: 'bar',
                itemStyle: {
                  color: function (param) {
                    return '#5470c6';
                  }
                },
                encode: {
                  x: 'value',
                  y: 'name'
                },
                label: {
                  show: true,
                  precision: 1,
                  position: 'right',
                  valueAnimation: true,
                  fontFamily: 'monospace'
                },
                data: data
              }
            ],
            animationDuration: 0,
            animationDurationUpdate: 2000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
          };

          myChart.setOption(option);
        }
      } catch (error) {
        console.error('Error fetching user metrics:', error);
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
          const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/excel/users`, {
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
          link.setAttribute('download', `Number of users from ${startDate} to ${endDate}.xlsx`);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error('Error downloading Excel file', error);
        }
      }
    });
  };

  return (
    <div className={styles.mainDiv}>
      <h2>Users by nationality</h2>
      <div id="chart" style={{ height: '300px', width: '100%' }}></div>
        <button onClick={handleDownloadExcel} className={styles.button}>Download Report</button>
    </div>
  );
};

export default MetricUsers;
