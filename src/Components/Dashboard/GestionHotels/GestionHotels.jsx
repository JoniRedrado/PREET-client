import axios from "axios";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./GestionHotels.components.css";

const GestionHotels = () =>{

   const [hotelsData, setHotelsData] = useState([])
   const [hotelDelete, setHotelDelete] = useState([])
    const dispatch = useDispatch()

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

  const getHotelsDeleted = async() => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels/deleted`);
      setHotelDelete(data.Hotel)
      
    } catch (error) {
      console.error(error.message);
    }
  };

  // const handleDeleted = async () => {
  //   await getHotelsDeleted();
  // };


  const restoreHotel = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACK_URL}/hotels/restore/${id}`);
      getHotels() // Actualiza el estado local con los hoteles restaurados
    } catch (error) {
      console.error(error.message);
    }
  };



  useEffect(() => {
    getHotels()
    getHotelsDeleted()
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
              </td>
              <td>
              <Link to={`/update/${hotel.id}`}>
                    <button>
                        <i className="bi bi-pencil-square" title="Update"></i>
                    </button>
                </Link>
              </td>
            </tr>
            ))}
            <div>
                  Users Deleted
            </div>
            {/* {hotelDelete.map(deletedHotel => (
                  <tr key={deletedHotel.id}>
                  <td>{deletedHotel.name}</td>
                  <td>{deletedHotel.stars}</td>
                  <td>{deletedHotel.country.name}</td>
                  <td>
                    <button onClick={() => restoreHotel(deletedHotel.id)}>
                      Restore
                      </button>
                  </td>
                  </tr>
               ))} */}
               
          </tbody>
         </table>
    </> 
    
   )

}

export default GestionHotels;
