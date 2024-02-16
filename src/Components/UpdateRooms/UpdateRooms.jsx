import axios from "axios";
import "./UpdateRooms.modules.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateRooms = () => {

    const {id} = useParams();

    const [roomsData, setRoomsData] = useState({
        type:"",
        description:"",
        price:"",
        name_hotel:""
    })

    useEffect(() =>{
        const fecthRoomsData = async () =>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/rooms/detail/${id}`);
                setRoomsData(response.data);
            } catch (error) {
                console.error("Error fetching rooms data:", error);   
            }
        }
        fecthRoomsData();
    }, [id]);

    const handleChange = (e) =>{
        const { name, value} = e.target;
        setRoomsData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const fieldLabels = {
        type:"Type",
        description:"Description",
        price:"Price",
        name_hotel:"Name Hotel"
    }
    return(
    	<div>
        <h1>Update Room</h1>
          <form>
            {Object.keys(fieldLabels).map((field) => (
              <div key={field}>
                <label>
                {fieldLabels[field]}
                  <input
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={roomsData[field] || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              ))}
          </form>
      </div>
    )
}

export default UpdateRooms;