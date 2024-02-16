/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Cards.module.css";
import { useRef, useState } from 'react';

const Cards = ({ allHotels }) => {  
  const [buttonPage, setButtonPage] = useState(false);
  
  const refCard = useRef();

  const hotelList = allHotels
  const hotelsLength = hotelList.Hotel.length;

  const { darkMode } = useDarkMode(); 
  
  const scrollToFirstCard = () => {
    if(buttonPage){
      setButtonPage(false);
      refCard.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className={`${styles.mainContainer}${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.cardsContainer}>
      {hotelList.Hotel?.map((hotel, index) => {
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
          dataScroll={{index,
                       refCard, 
                       scrollToFirstCard,
                       hotelsRender: hotelsLength - 1}}

        />;
      })
      }
      </div>
      <div className={styles.pagination}>
      <Pagination setButtonPage={setButtonPage} />
      </div>
    </div>
    
  );
  
};

export default Cards;

