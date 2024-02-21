import styles from "./Sidebar.module.css";
import { useLocation } from "react-router";
import { FaUser, FaHistory, FaStar, FaSignOutAlt, FaHome, FaArrowLeft, FaHotel } from "react-icons/fa";
import { MdPeople, MdAdd, MdHotel, MdMenu, MdAdminPanelSettings } from "react-icons/md";
import { showModal, userLog } from "../../redux/actions";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/logo.jpg"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    drawerList1: {
      color: "white",
      width: "276px",
      borderRadius: "16px",
      margin: "0px 20px 10px 20px",
      "&:hover":{
        backgroundColor: "#01283F",
      }
    },
    drawerList2: {
      color: "white",
      width: "276px",
      borderRadius: "16px",
      margin: "0px 20px 10px 20px",
      "&:hover":{
        backgroundColor: "#6093C0",
      }
    }
  }));
const Sidebar = () => {
    const { pathname } = useLocation();
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [userInfo, setUserInfo] = useState({
      name: "",
      profilePicture: "",
      rol: "",
    })
    // const [name, setName] = useState('');
    // const [profilePicture, setProfilePicture] = useState('')
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_BACK_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo({
            name:response.data.name,
            profilePicture: response.data.profile_picture,
            rol: response.data.rol
          })
        })

        .catch((error) => {
          console.error(error);
        });
    }, [token]);

    function logout(option) {
        localStorage.removeItem("token");
        dispatch(showModal(option, false));
        dispatch(userLog());
        navigate("/");
      }

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
      };
    
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const renderSidebar = () => {
        if (pathname === "/dashboard" || pathname === "/dashboard/"){
            return (
                <div className={styles.mainContainer}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleDrawerOpen}>
                            <MdMenu className={styles.menuIcon}/> 
                        </button>
                    </div>
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
            <Link to={"/"} className={styles.navLink}>
              <ListItem button className={classes.drawerList1}>
                <FaHome className={styles.icon} />
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to={"/dashboard/hotels"} className={styles.navLink}>
              <ListItem button className={classes.drawerList1}>
                <FaHotel className={styles.icon} />
                <ListItemText primary="Hotel management" />
              </ListItem>
            </Link>
            <Link to={"/dashboard/rooms"} className={styles.navLink}>
              <ListItem button className={classes.drawerList1}>
                <MdHotel className={styles.icon}/>
                <ListItemText primary="Room management" />
              </ListItem>
            </Link>
            <Link to={"/dashboard/users"} className={styles.navLink}>
              <ListItem button className={classes.drawerList1}>
                <MdPeople className={styles.icon} />
                <ListItemText primary="User management" />
              </ListItem>
            </Link>
            <Link to={"/create"} className={styles.navLink}>
              <ListItem button className={classes.drawerList1}>
                <MdAdd className={styles.icon} />
                <ListItemText primary="Add a new Hotel" />
              </ListItem>
            </Link>
            <Link to={"/createrooms"} className={styles.navLink}>
              <ListItem button className={classes.drawerList1}>
                <MdAdd className={styles.icon} />
                <ListItemText primary="Add a new room" />
              </ListItem>
            </Link>
            <ListItem button onClick={handleDrawerClose} className={classes.drawerList1}>
              <FaArrowLeft className={styles.icon}/>
              <ListItemText primary="Close Menu" />
            </ListItem>
            <ListItem button className={classes.drawerList1} onClick={() => logout("login")}>
                <FaSignOutAlt className={styles.icon} />
                <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Drawer>
                    
                </div>
              )
        } else {
            return (
                <div className={styles.mainContainer}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleDrawerOpen}>
                            <MdMenu className={styles.menuIcon}/> 
                        </button>
                    </div>
                    <Drawer
                        anchor="right" 
                        open={openDrawer} 
                        onClose={handleDrawerClose}
                    >
                        <List
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "#01283F",
                                height: "100vh",
                                width: "320px",
                            }}
                        >   
                            <div className={styles.imageContainer}>
                              {userInfo.profilePicture ? (
                                <img src={userInfo.profilePicture} alt="profile-picture" className={styles.picture}/>
                              ) : (
                                <h1 className={styles.nameText}>{userInfo.name.charAt(0).toUpperCase()}</h1>
                              )}
                            </div>
                            <Link to={"/"} className={styles.navLink}>
                                <ListItem button className={classes.drawerList2} onClick={handleDrawerClose}>
                                    <FaHome className={styles.icon} />
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>
                            {userInfo.rol === "admin" && (
                              <Link to={"/dashboard"} className={styles.navLink}>
                                <ListItem button className={classes.drawerList2}>
                                  <MdAdminPanelSettings className={styles.icon} />
                                  <ListItemText primary="Admin Dashboard" />
                                </ListItem>
                              </Link>
                            )}
                            <Link to="/settings" className={styles.navLink}>
                                <ListItem button className={classes.drawerList2}>
                                    <FaUser className={styles.icon}/>
                                    <ListItemText primary="Manage Account" />
                                </ListItem>
                            </Link>
                            <Link to="/myReservations" className={styles.navLink} onClick={handleDrawerClose}> 
                                <ListItem button className={classes.drawerList2}> 
                                    <FaHistory className={styles.icon} />
                                    <ListItemText primary="Reservation History" />
                                </ListItem>
                            </Link>
                            <Link to="/userFavorites" className={styles.navLink}>
                                <ListItem button className={classes.drawerList2} onClick={handleDrawerClose}>
                                    <FaStar className={styles.icon}/>
                                    <ListItemText primary="Favorites" />
                                </ListItem>
                            </Link>
                            <ListItem button onClick={handleDrawerClose} className={classes.drawerList2}>
                                <FaArrowLeft className={styles.icon}/>
                                <ListItemText primary="Close Menu" />
                            </ListItem>
                            <ListItem button className={classes.drawerList2} onClick={() => logout("login")}>
                                <FaSignOutAlt className={styles.icon} />
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </List>

                    </Drawer>
                </div>
            );
        }
    };
    return renderSidebar();

}

export default Sidebar;