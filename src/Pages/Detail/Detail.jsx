import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getDetail, deleteHotel } from "../../redux/actions";
import "./detail.styles.css"

const Detail = () =>{

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams();

  const handleDelete = (id) => {
    dispatch(deleteHotel(id))
    window.alert('The card has been successfully deleted');
    navigate('/');
    window.location.reload();
  }

  useEffect(() =>{
    if(id){
      dispatch(getDetail(id));
    }
  }, [dispatch,id])

  const hotel = useSelector((state) => state.hotelDetail)
  console.log(hotel.country)
  return(
    <div className="container">
        <div>
          <button onClick={() => handleDelete(id)}>Delete</button>
          <Link to= {`/update/${hotel.id}`}>
            <button>Update</button>
          </Link>
        </div>
      {hotel ? (
        <div>
      <h1>{hotel.name}</h1>
      <img src={hotel.image} alt={hotel.name}/>
      <h2>{hotel.stars}⭐</h2>
      <h2>Price per night {hotel.price} $</h2>
      <h2>Country {hotel.country && hotel.country.name}</h2>
      <h2>Ubication {hotel.address_url}</h2>
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