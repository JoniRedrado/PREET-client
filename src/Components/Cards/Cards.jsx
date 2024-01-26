/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import './Cards.style.css'

const Cards = ({ allHotels }) => {  
    const hotelList = allHotels

  return (
    <div className="cards-container">
      {hotelList.Hotel?.map((hotel) => {
        return <Card 
          key={hotel.id}
          id={hotel.id}
          name={hotel.name} 
          address={hotel.address}
          country={hotel.countryId} 
          address_url={hotel.address_url} 
          price={hotel.price} 
          email={hotel.email} 
          image={hotel.image} 
        />;
      })
      }
    </div>
  );
  
};

export default Cards;

