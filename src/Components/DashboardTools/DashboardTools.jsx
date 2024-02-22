import styles from "./DashboardTools.module.css"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { FaHotel } from "react-icons/fa"
import { RiBarChart2Fill } from "react-icons/ri";
import { MdAdd, MdHotel, MdPeople } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSelectedOption } from "../../redux/actions";
const useStyles = makeStyles((theme) => ({
    drawerList1: {
      color: "white",
      width: "100%",
      margin: "0px 20px 10px 20px",
      "&:hover":{
        backgroundColor: "#01283F",
      }
    }
  }));

const DashboardTools = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleOptionChange = (option) =>{
      dispatch(setSelectedOption(option))
    };
  return (
    <div className={styles.mainContainer}>
        <List
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#6093C0",
            height: "100%",
            width: "100%",
            }}
        >
            <ListItem button className={classes.drawerList1} onClick={() => handleOptionChange("Graphics")}>
                <RiBarChart2Fill className={styles.icon}/> 
                <ListItemText primary="Graphics"/>            
            </ListItem>

            <ListItem button className={classes.drawerList1} onClick={() => handleOptionChange("hotelManagement")}>
                <FaHotel className={styles.icon}/> 
                <ListItemText primary="Hotel management"/>
            </ListItem>

            <ListItem button className={classes.drawerList1} onClick={() => handleOptionChange("roomManagement")}>
                <MdHotel className={styles.icon}/> 
                <ListItemText primary="Room management"/>
            </ListItem>

            <ListItem button className={classes.drawerList1} onClick={() => handleOptionChange("usersManagement")}>
                <MdPeople className={styles.icon}/> 
                <ListItemText primary="Users management"/>
            </ListItem>

            <ListItem button className={classes.drawerList1} onClick={() => handleOptionChange("newHotel")}>
                <MdAdd className={styles.icon}/> 
                <ListItemText primary="Add a new Hotel"/>
            </ListItem>

            <ListItem button className={classes.drawerList1} onClick={() => handleOptionChange("newRoom")}>
                <MdAdd className={styles.icon}/> 
                <ListItemText primary="Add a new room"/>
            </ListItem>
        </List>
        

    </div>
  )
}

export default DashboardTools