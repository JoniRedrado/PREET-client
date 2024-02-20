import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./Dashboard.module.css"
import RankingChart from "./Metrics/MetricRankings/MetricRankings";
import MetricUsers from "./Metrics/MetricUsers/MetricUsers";
import BookingsChart from "./Metrics/MetricBookings/MetricBookings";
import CombinedCharts from "./Metrics/MetricNetIncomes/MetricNetIncomes";
import logo from "../../assets/logo.jpg"
import { MdPeople, MdAdd, MdHotel } from "react-icons/md";
import { FaHotel, FaHome, FaArrowLeft } from "react-icons/fa";

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

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={styles.mainDiv}>
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
        <MetricUsers />
        <RankingChart />
        <BookingsChart />
        <CombinedCharts />
      </div>
    </div>
  );
};

export default Dashboard;