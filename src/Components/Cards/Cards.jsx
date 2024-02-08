/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import './Cards.style.css'

const Cards = ({ allHotels }) => {  
  const hotelList = allHotels
  const { darkMode } = useDarkMode(); 

  return (
    <div className={`main-div ${darkMode ? 'dark-mode' : ''}`}>
        <div className="cards-container">
      {hotelList.Hotel?.map((hotel) => {
        return <Card 
          key={hotel.id}
          id={hotel.id}
          name={hotel.name} 
          // address={hotel.address}
          country={hotel.country.name} 
          // address_url={hotel.address_url}
          stars={hotel.stars}
          //price={hotel.price} 
          email={hotel.email} 
          image={hotel.image}
          rooms={hotel.rooms} 
        />;
      })
      }
      </div>
      <div className="pagination">
      <Pagination />
      </div>
    </div>
    
  );
  
};

export default Cards;

