import axios from "axios";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";

import "./GestionHotels.components.css";

const GestionHotels = () =>{

   const [hotelsData, setHotelsData] = useState([])

     const getHotels = async() => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels?size=30`);
      console.log(data)
      setHotelsData(data.Hotel)
      
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const deleteHotel = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACK_URL}/hotels/${id}`);

      getHotels()

    } catch (error) {
      console.error(error.message);
    }
  };

    useEffect(() => {
    getHotels()
  }, [])

   return(
    <>
       <table>
         <thead className="encabezado">
           <tr>
             <th>Name</th>
             <th>Stars</th>
             <th>Country</th>
             <th>Delete</th>
             <th>Update</th>

           </tr>
         </thead>
         <tbody>
           {hotelsData.map(hotel => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.stars}</td>
              <td>{hotel.country.name}</td>
              <td>
                <button className="deleteButton" onClick={() => deleteHotel(hotel.id)}>
                  <i className="bi bi-trash" title="Delete"></i>
                </button>
                <Link to={`/update/${hotel.id}`}>
                    <button>
                        <i className="bi bi-pencil-square" title="Update"></i>
                    </button>
                </Link>
              </td>
            </tr>))}
        </tbody>
      </table>
    </> 
    
   )

}

export default GestionHotels;
