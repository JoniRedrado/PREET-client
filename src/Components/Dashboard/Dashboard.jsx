import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./Dashboard.module.css"
import RankingChart from "./Metrics/MetricRankings/MetricRankings";
import MetricUsers from "./Metrics/MetricUsers/MetricUsers";
import BookingsChart from "./Metrics/MetricBookings/MetricBookings";
import CombinedCharts from "./Metrics/MetricNetIncomes/MetricNetIncomes";
import DateRangePicker from './Date/Date';
import logo from "../../assets/logo.jpg"
import { MdPeople, MdAdd, MdHotel, MdMenu } from "react-icons/md";
import { FaHotel, FaHome, FaArrowLeft } from "react-icons/fa";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  drawerList: {
    color: "white",
    width: "276px",
    borderRadius: "16px",
    margin: "0px 20px 10px 20px",
    "&:hover":{
      backgroundColor: "#01283F",
    }
  },
}));

const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date()); // Inicializa con la fecha actual
  const [selectedEndDate, setSelectedEndDate] = useState(new Date()); 

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
    checkAuth();
  }, []);

  return (
    <div className={`${styles.mainDiv} ${darkMode ? styles.darkMode : ""}`}>
      <div className={styles.sidebar}>
        <button className={styles.button} onClick={handleDrawerOpen}>
          Toggle Menu
        </button>
        <Drawer 
        anchor="left" 
        open={openDrawer} 
        onClose={handleDrawerClose}
        >
          <List
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#6093C0",
            height: "100vh",
            width: "320px",
          }}
          >
            <div className={styles.logoContainer}>
              <img src={logo} alt="logo" className={styles.logo} />
            </div>
            <Link to={"/dashboard/hotels"} className={styles.navLink}>
              <ListItem button className={classes.drawerList}>
                <FaHotel className={styles.icon} />
                <ListItemText primary="Hotel management" />
              </ListItem>
            </Link>
            <Link to={"/dashboard/rooms"} className={styles.navLink}>
              <ListItem button className={classes.drawerList}>
                <MdHotel className={styles.icon}/>
                <ListItemText primary="Room management" />
              </ListItem>
            </Link>
            <Link to={"/dashboard/users"} className={styles.navLink}>
              <ListItem button className={classes.drawerList}>
                <MdPeople className={styles.icon} />
                <ListItemText primary="User management" />
              </ListItem>
            </Link>
            <Link to={"/create"} className={styles.navLink}>
              <ListItem button className={classes.drawerList}>
                <MdAdd className={styles.icon} />
                <ListItemText primary="Add a new Hotel" />
              </ListItem>
            </Link>
            <Link to={"/createrooms"} className={styles.navLink}>
              <ListItem button className={classes.drawerList}>
                <MdAdd className={styles.icon} />
                <ListItemText primary="Add a new room" />
              </ListItem>
            </Link>
            <Link to={"/"} className={styles.navLink}>
              <ListItem button className={classes.drawerList}>
                <FaHome className={styles.icon} />
                <ListItemText primary="Go to home" />
              </ListItem>
            </Link>
            <ListItem button onClick={handleDrawerClose} className={classes.drawerList}>
              <FaArrowLeft className={styles.icon}/>
              <ListItemText primary="Close Menu" />
            </ListItem>
          </List>
        </Drawer>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.headerContainer}>
          <h2>Dashboard</h2>
        </div>
        <div className={styles.calendarContainer}>
        <span>Please, select a date to show</span>
        <DateRangePicker onSelectDateRange={handleDateRangeSelect} />
        </div>
        <div className={styles.metricsContainer}>
          <MetricUsers />
          <RankingChart />
          <BookingsChart />
          <CombinedCharts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;