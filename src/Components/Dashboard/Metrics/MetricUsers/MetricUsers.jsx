import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import "./MetricUsers.modules.css"

const MetricUsers = () => {
    const [chartData, setChartData] = useState({});

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
                        nationality: item.nationality,
                        user_count: item.user_count
                    }));

                    // Configurar los datos para la gráfica
                    const chartData = {
                        labels: data.map(item => item.nationality),
                        datasets: [
                            {
                                label: 'Número de Usuarios',
                                data: data.map(item => item.user_count),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    };

                    // Establecer los datos de la gráfica en el estado
                    setChartData(chartData);
                }
            } catch (error) {
                console.error('Error fetching user metrics:', error);
            }
        };

        // Llamar a la función fetchData para obtener los datos cuando se monta el componente
        fetchData();
    }, []);

    if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
        return null;
    }


    return (
        <div>
            <h2>Gráfico de Usuarios por Nacionalidad</h2>
            <div style={{ height: '400px', width: '600px' }}>
                <Bar 
                    data={chartData} 
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                type: 'category'
                            }
                        }
                    }} 
                />
            </div>
        </div>
    );
};

export default MetricUsers;
