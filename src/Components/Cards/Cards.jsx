/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Cards.module.css"

const Cards = ({ allHotels }) => {  
  const hotelList = allHotels
  const { darkMode } = useDarkMode(); 

  return (
    <div className={`${styles.mainContainer}${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.cardsContainer}>
      {hotelList.Hotel?.map((hotel) => {
        return <Card 
          key={hotel.id}
          id={hotel.id}
          name={hotel.name} 
          address={hotel.address}
          country={hotel.country.name} 
          stars={hotel.stars}
          email={hotel.email} 
          image={hotel.image}
          rooms={hotel.rooms} 
        />;
      })
      }
      </div>
      <div className={styles.pagination}>
      <Pagination />
      </div>
    </div>
    
  );
  
};

export default Cards;

