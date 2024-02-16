import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBarDashboard from "../NavBarDashboard/NavBarDashboard";

import "./GestionRooms.modules.css";


const GestionRooms = () => {

    const [roomsData, setRoomsData] = useState([])
    console.log(roomsData);
    const [roomsDelete, setRoomsDelete] = useState([])
    const [showDeletedRooms, setShowDeletedRooms] = useState(false);

    const getRooms = async () =>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BACK_URL}/rooms?size=30`)
            console.log(data);
            setRoomsData(data)
        } catch (error) {
            console.error(error.message);  
        }
    }

    const deleteRooms = async (id) =>{
        try {
            
            await axios.delete(`${import.meta.env.VITE_BACK_URL}/rooms/${id}`);
        
            getRooms()
        } catch (error) {
            console.error(error.message); 
        }
    }

    const getRoomsDeleted = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/rooms/deleted`);
            console.log(data.rooms);
            setRoomsDelete(data.rooms);
        } catch (error) {
            console.error(error.message);
        }
    }

    const restoreRooms = async (id) => {
        try {
          await axios.put(`${import.meta.env.VITE_BACK_URL}/rooms/restore/${id}`);
          
          getRooms(); 
          getRoomsDeleted();
        } catch (error) {
          console.error(error.message);
        }
      };

    useEffect(() => {
        getRooms()
    }, [])

    const handleShowDeletedRooms = () => {
        setShowDeletedRooms(!showDeletedRooms);
        if (!showDeletedRooms) {
          getRoomsDeleted();
        }
    };

    return(
        <>
          <NavBarDashboard/>
            <Link to={"/dashboard"}>
              <i className="bi bi-arrow-left-circle"></i>
            </Link>
            <button onClick={handleShowDeletedRooms} type="button" className="btn btn-primary btn-lg">
              {showDeletedRooms ? "Hide Deleted Rooms" : "Show Deleted Rooms"}   
            </button>
            {showDeletedRooms && (
        <table className="table">
          <thead className="table-dark">
            <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Name Hotel</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roomsDelete.map((deletedRooms) => (
              <tr key={deletedRooms.id}>
                <td>{deletedRooms.type}</td>
                <td>{deletedRooms.description}</td>
                <td>{deletedRooms.price}$</td>
                <td>{deletedRooms.hotel && deletedRooms.hotel.name}</td>
                <td>
                  <i  onClick={() => restoreRooms(deletedRooms.id)} class="bi bi-arrow-counterclockwise"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            )}
            <table className="table">
            <thead  className="table-dark">
             <tr>
               <th>Type</th>
               <th>Description</th>
               <th>Price</th>
               <th>Numeration</th>
               {/* <th>Guest</th> */}
              <th>Name Hotel</th>
              <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {roomsData && roomsData.map((rooms) => (
              <tr key={rooms.id}>
                <td>{rooms.type}</td>
                <td>{rooms.description}</td>
                <td>{rooms.price}$</td>
                <td>{rooms.numeration}</td>
                <td>{rooms.guest}</td>
                <td>{rooms.hotel.name}</td>
                <td>
                  <i title="Delete" onClick={() => deleteRooms(rooms.id)} class="bi bi-dash-circle-fill"></i>
                </td>
                <td>
                <Link to={`/updaterooms/${rooms.id}`}>
                    <i className="bi bi-pencil-square" title="Update"></i>
                  
                </Link>
              </td>
              </tr>
            ))}
          </tbody>
        </table>

        </>
    )
}

export default GestionRooms;