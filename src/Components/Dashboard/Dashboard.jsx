import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css"
import RankingChart from "./Metrics/MetricRankings/MetricRankings";
import MetricUsers from "./Metrics/MetricUsers/MetricUsers";
import BookingsChart from "./Metrics/MetricBookings/MetricBookings";
import CombinedCharts from "./Metrics/MetricNetIncomes/MetricNetIncomes";
import DateRangePicker from './Date/Date';
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import swal from 'sweetalert';


const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Inicializa con la fecha actual
  const [selectedEndDate, setSelectedEndDate] = useState(null); 

  const handleDateRangeSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    // Aquí puedes realizar cualquier acción adicional, como actualizar tus gráficos con las nuevas fechas seleccionadas
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('rol');

        if (token && rol === "admin") {
          // Usuario autenticado y tiene el rol de administrador
          // Continuar con la renderización del componente
        } else {
          swal('Authentication Error', 'You do not have administrator permissions', 'error');
          navigate("/");
        }
      } catch (error) {
        // Manejar errores de autenticación
        console.error("Error de autenticación:", error);
        navigate("/");
      }
    };

    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    setSelectedStartDate(lastMonth);
    setSelectedEndDate(today);

    checkAuth();
  }, [navigate]);

  return (
    <div className={`${styles.mainDiv} ${darkMode ? styles.darkMode : ""}`}>
      <div className={styles.cardContainer}>
        <div className={styles.headerContainer}>
          <h2>Dashboard</h2>
        </div>
        <div className={styles.calendarContainer}>
        <span>Please, select a date to show</span>
        <DateRangePicker onSelectDateRange={handleDateRangeSelect} />
        </div>
        <div className={styles.metricsContainer}>
          <MetricUsers startDate={selectedStartDate} endDate={selectedEndDate}/>
          <RankingChart startDate={selectedStartDate} endDate={selectedEndDate}/>
          <BookingsChart startDate={selectedStartDate} endDate={selectedEndDate}/>
          <CombinedCharts startDate={selectedStartDate} endDate={selectedEndDate}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;