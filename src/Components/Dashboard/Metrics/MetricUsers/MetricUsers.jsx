import axios from "axios"
import { useEffect, useState } from 'react';
import "./MetricUsers.modules.css";
import * as echarts from 'echarts';

const MetricUsers = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Calcular fechas de inicio y fin
                const today = new Date();
                const startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).toISOString();
                const endDate = today.toISOString();

                // Llamar a la API para obtener los datos de la métrica de usuarios
                const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/metrics/users`, {
                    params: {
                        start_date: startDate,
                        end_date: endDate
                    }
                });

                console.log(response.data);

                if (response.data) {
                    // Extraer los datos de la respuesta y prepararlos para la gráfica
                    const data = response.data.map(item => ({
                        value: item.user_count,
                        name: item.nationality
                    }));

                    // Configurar los datos para el gráfico de ECharts
                    const chartDom = document.getElementById('chart');
                    const myChart = echarts.init(chartDom);

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
                                    return value;
                                }
                            },
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
                                        return '#5470c6'; // color predeterminado
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
                                }
                            }
                        ],
                        animationDuration: 0,
                        animationDurationUpdate: 2000,
                        animationEasing: 'linear',
                        animationEasingUpdate: 'linear'
                    };

                    myChart.setOption(option);

                    // Establecer los datos del gráfico en el estado (no es necesario en este caso)
                    setChartData(option);
                }
            } catch (error) {
                console.error('Error fetching user metrics:', error);
            }
        };

        // Llamar a la función fetchData para obtener los datos cuando se monta el componente
        fetchData();
    }, []);

    return (
        <div>
            <h2>Users by nationality</h2>
            <div id="chart" style={{ height: '400px', width: '600px' }}></div>
        </div>
    );
};

export default MetricUsers;
