import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./GestionRooms.modules.css";


const GestionRooms = () => {

    const [roomsData, setRoomsData] = useState([])
    const [roomsDelete, setRoomsDelete] = useState([])
    const [showDeletedRooms, setShowDeletedRooms] = useState(false);

    const getRooms = async () =>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BACK_URL}/rooms`)
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
            console.log(data);
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
            <Link to={"/dashboard"}>
                <button>
                    return dashboard
                </button>
            </Link>
            <button onClick={handleShowDeletedRooms}>
                {showDeletedRooms ? "Hide Deleted Rooms" : "Show Deleted Rooms"}
            </button>
            {showDeletedRooms && (
        <table>
          <thead className="encabezado">
            <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Name Hotel</th>
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
                  <button onClick={() => restoreRooms(deletedRooms.id)}>Restore</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            )}
            <table>
            <thead className="encabezado">
             <tr>
               <th>Type</th>
               <th>Description</th>
               <th>Price</th>
              <th>Name Hotel</th>
             </tr>
           </thead>
           <tbody>
             {roomsData && roomsData.map((rooms) => (
              <tr key={rooms.id}>
                <td>{rooms.type}</td>
                <td>{rooms.description}</td>
                <td>{rooms.price}$</td>
                <td>{rooms.hotel.name}</td>
                <td>
                  <button className="deleteButton" onClick={() => deleteRooms(rooms.id)}>
                    <i className="bi bi-trash" title="Delete"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </>
    )
}

export default GestionRooms;
