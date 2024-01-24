// import Card from "../Card/Card";

// // eslint-disable-next-line react/prop-types
// const Cards = ({allHotels}) => {

//     const hotelList = allHotels;

//     return(
//         <div>
//             {hotelList.map((hotel) => {
//             return (<Card
//                 key={hotel.id}
//                 id={hotel.id}
//                 name={hotel.name}
//                 image={hotel.image}
//                 country={hotel.country}
//                 addres ={hotel.address_url}
//                 price = {hotel.price}
//                 email ={hotel.email}
//             />)
//             })}
//         </div>
//     )
// }

// export default Cards;

// Cards.jsx
import Card from "../Card/Card";

// eslint-disable-next-line react/prop-types
const Cards = ({ allHotels }) => {
  return (
    <div>
      {allHotels.map((hotel) => (
        <Card key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default Cards;

