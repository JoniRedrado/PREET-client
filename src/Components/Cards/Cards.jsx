/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Cards.module.css";
import { useRef, useEffect, useState } from 'react';

const Cards = ({ allHotels }) => {  
  const [buttonPage, setButtonPage] = useState(false);

  const refCard = useRef();
  const hotelList = allHotels
  const { darkMode } = useDarkMode(); 

  useEffect(() => {
    if(buttonPage){
      if(refCard.current) refCard.current.scrollIntoView({ behavior: 'smooth' });
      setButtonPage(false);
    }
  }, [allHotels])

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
          refComponent={{index, refCard}}
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

