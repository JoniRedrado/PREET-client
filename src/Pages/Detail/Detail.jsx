import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import "./detail.styles.css"

const Detail = () =>{

  const dispatch = useDispatch();

  const {id} = useParams();

  useEffect(() =>{
    if(id){
      dispatch(getDetail(id));
    }
  }, [dispatch,id])

  const hotel = useSelector((state) => state.hotelDetail)

  return(
    <div className="container">
      {hotel ? (
        <div>
      <h1>{hotel.name}</h1>
      <img src={hotel.image} alt={hotel.name}/>
      <h2>Price per night {hotel.price}$</h2>
      <h2>Ubication {hotel.address_url}</h2>
      {/* <h2>{hotel.countryId}</h2> */}
      <h2>Contact {hotel.email}</h2>
      </div> ) : (
        <p>cargando...</p>
      )}
      <div>
        <Link to="/">
          <button> Return home</button>
        </Link>
      </div>
    </div>
  )

}

export default Detail;