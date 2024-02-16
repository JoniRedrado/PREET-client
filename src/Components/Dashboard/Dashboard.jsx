import "./Dashboard.style.css";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  return(
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Dashboard Admin</a>
          </div>
        </nav>
      </div>
    <div className="sidebar-card">
      <ul className="nav flex-column">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Reservas recientes</a>
        <p>Mostrar una lista de las reservas más recientes realizadas en los hoteles asociados. Esto proporcionará una visión general rápida de la actividad de reserva reciente.</p>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <div className="card-container">
<div className="card" >
  <div className="card-body">
    <h5 className="card-title">Estadísticas de reservas</h5>
    <p className="card-text"> Mostrar gráficos o tablas con estadísticas sobre reservas, como la cantidad de reservas realizadas en un período de tiempo específico, el ingreso total generado por las reservas, el número de reservas por hotel, etc. Esto ayudará a entender las tendencias y el rendimiento general del negocio.</p>
    <a href="#" className="card-link">Card link</a>
  </div>
</div>
<div className="card" >
  <div className="card-body">
    <h5 className="card-title">Gestión de habitaciones</h5>
    <p className="card-text">Permitir a los administradores agregar, eliminar y actualizar información sobre las habitaciones disponibles en cada hotel, como el tipo de habitación, la disponibilidad, el precio, las comodidades, et</p>
    <Link to={"/dashboard/rooms"}>
    <a href="#" className="card-link">Card link</a>
    </Link>
  </div>
</div>
<div className="card" >
  <div className="card-body">
    <h5 className="card-title">Gestión de hoteles</h5>
    <p className="card-text">Proporcionar herramientas para agregar nuevos hoteles a la plataforma, actualizar la información del hotel, como la dirección, las imágenes, las comodidades, etc., y desactivar hoteles que ya no están disponibles para reservas.</p>
    <Link to={"/dashboard/hotels"}>
    <a href="#" className="card-link">Card link</a>
    </Link>

  </div>
</div>
<div className="card" >
  <div className="card-body">
    <h5 className="card-title">Gestión de usuarios</h5>
    <p className="card-text">Permitir a los administradores ver y gestionar la información de los usuarios registrados en la plataforma, como los datos personales, las preferencias de comunicación, el historial de reservas, etc.</p>
    <Link to={"/dashboard/users"}>
      <a href="#" className="card-link">Card link</a>
    </Link>
  </div>
</div>
<div className="card" >
  <div className="card-body">
    <h5 className="card-title">Comentarios y calificaciones</h5>
    <p className="card-text"> Proporcionar acceso a los comentarios y calificaciones dejados por los usuarios sobre los hoteles y sus experiencias de reserva. Esto ayudará a identificar problemas y áreas de mejora en la calidad del servicio.</p>
      <a href="#" className="card-link">Card link</a>

  </div>
</div>
<div className="card" >
  <div className="card-body">
    <h5 className="card-title">Informes y exportaciones</h5>
    <p className="card-text">Ofrecer la posibilidad de generar informes detallados sobre diferentes aspectos de la plataforma, como ingresos, ocupación de habitaciones, preferencias de reserva de los usuarios, etc. También permitir la exportación de estos informes en diferentes formatos (por ejemplo, CSV, PDF) para su análisis adicional.</p>
    <a href="#" className="card-link">Card link</a>
  </div>
</div>
<div className="card" >
  <div className="card-body">
    <h5 className="card-title">Notificaciones y alertas</h5>
    <p className="card-text">Configurar un sistema de notificaciones y alertas para informar a los administradores sobre eventos importantes, como nuevas reservas, cancelaciones, problemas técnicos, etc</p>
    <a href="#" className="card-link">Card link</a>
  </div>
</div>
º</div>
    </div>
    </div>
  )
}

export default Dashboard;

// const Dashboard = () => {
//   const { darkMode } = useDarkMode(); 
//   const navigate = useNavigate();
//   const [selectedOptions, setSelectedOption] = useState({
//     users: true,
//     hotels: false
//   })

//   const [usersData, setUsersData] = useState([])
//   const [hotelsData, setHotelsData] = useState([])
  
//   const handleButtonClick = () => {
//     navigate('/favorites');
//   };




  
//   const getHotels = async() => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels?size=30`);
      
//       setHotelsData(data.Hotel)
      
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
  
//   const deleteHotel = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_BACK_URL}/hotels/${id}`);

//       getHotels()

//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getUsers()
//     getHotels()
//   }, [])

//   const usersButton = () => {
//     setSelectedOption({users: true, hotels: false})
//     };
    
//   const hotelsButton = () => {
//     setSelectedOption({users: false, hotels: true})
//   };

//   const usersTable = () => {
//     return (

//       <div className={`table-container ${darkMode ? 'darkMode' : ''}`}>

//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {usersData.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.last_name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button className="deleteButton" onClick={() => deleteUser(user.id)}>
//                     <i className="bi bi-trash" title="Delete"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   const hotelsTable = () => {
//     return (
//     <>
//       <table>
//         <thead className="encabezado">
//           <tr>
//             <th>Name</th>
//             <th>Stars</th>
//             <th>Country</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {hotelsData.map(hotel => (
//             <tr key={hotel.id}>
//               <td>{hotel.name}</td>
//               <td>{hotel.stars}</td>
//               <td>{hotel.country.name}</td>
//               <td>
//                 <button className="deleteButton" onClick={() => deleteHotel(hotel.id)}>
//                   <i className="bi bi-trash" title="Delete"></i>
//                 </button>
//               </td>
//             </tr>))}
//         </tbody>
//       </table>
//     </> 
//     )
//   }

//   return (
//     <div>
//       <div className="container-dashboard">
//         <div className="buttons">
//           <button  onClick={handleButtonClick}>Favorites</button>
//           <button className="yellowButton" onClick={usersButton}>Users</button>
//           <button className="blueButton" onClick={hotelsButton}>Hotels</button>
//         </div>
//         <div>
//           {
//             selectedOptions.users
//               ? usersTable()
//               : hotelsTable()
//           }
//         </div>
//         <Pagination/>
//         {/* <button onClick={applyFilters}>Apply Filters</button>
//         <button onClick={handleReset} className="reset">
//           Reset Filters
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


