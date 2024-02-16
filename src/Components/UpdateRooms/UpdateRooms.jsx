import axios from "axios";
import  "./UpdateRooms.modules.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBarDashboard from "../Dashboard/NavBarDashboard/NavBarDashboard";
const UpdateRooms = () => {

    const {id} = useParams();
    const navigate= useNavigate();

    const [roomsData, setRoomsData] = useState({
        type:"",
        description:"",
        price:"",
        guest:"",
        numeration:""
    })

    
    useEffect(() =>{
        const fecthRoomsData = async () =>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/rooms/detail/${id}`, roomsData);
                // console.log(response.data);
                setRoomsData(response.data);
            } catch (error) {
                console.error("Error fetching rooms data:", error);   
            }
        }
        fecthRoomsData();

    }, [id]);

    const [roomsTypes, setRoomsTypes] = useState([])

    const getTypes = async () =>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BACK_URL}/rooms`)
            console.log(data);

            const roomTypes = data.map((room) => room.type);
            const uniqueRoomTypes = [...new Set(roomTypes)]

            console.log(uniqueRoomTypes);
            setRoomsTypes(uniqueRoomTypes)
        } catch (error) {
            console.error("Error fetching rooms types:", error);   
            
        }
    }
    const handleChange = (e) =>{
        const { name, value} = e.target;
        setRoomsData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    useEffect(() =>{
        getTypes()
    }, [])

    const handleSubmit = async (e) => {
        console.log("Formulario enviado");
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BACK_URL}/rooms/update/${id}`, roomsData);
            navigate("/dashboard/rooms");
        } catch (error) {
            console.error("Error updating room:", error);
        }
    };

    return(
    	<div>
        {/* <NavBarDashboard/> */}
          <form className="form" onSubmit={handleSubmit}>
            <h1>Update Room</h1>
            <label>Types</label>
            <select name="type" value={roomsData.type} onChange={handleChange}>
                <option value="">Seleccione un tipo de habitación</option>
                {roomsTypes.map((roomType, index) => (
                    <option key={index} value={roomType}>
                        {roomType}
                    </option>
                ))}
            </select>
            <label>Description</label>
            <input type="text" name="description" value={roomsData.description} onChange={handleChange}></input>
            <label>Price</label>
            <input type="number" name="price" value={roomsData.price} onChange={handleChange}></input>
            <label>Numeration</label>
            <input type="text" name="numeration" value={roomsData.numeration} onChange={handleChange}></input>
            <button type="submit">Update</button>
          </form>
      </div>
    )
}

export default UpdateRooms;