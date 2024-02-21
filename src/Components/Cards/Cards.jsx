/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Cards.module.css";
import { useRef } from 'react';

const Cards = ({ hotels }) => {  
  const buttonPage = useRef(false);
  const refCard = useRef();

  const hotelList = hotels

  const { darkMode } = useDarkMode(); 
  
  const scrollToFirstCard = () => {
    if(buttonPage.current){
      buttonPage.current = false;
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
                       scrollToFirstCard}}

        />;
      })
      }
      </div>
      <div className={styles.pagination}>
      <Pagination buttonPage={buttonPage} />
      </div>
    </div>
    
  );
  
};

export default Cards;

