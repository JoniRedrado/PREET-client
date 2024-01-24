// import "./Home.module.css"
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { useEffect } from "react";
import { getAllHotels } from "../../redux/actions";
function Home() {
  
  const dispatch = useDispatch()
  const hotels = useSelector((state) => state.allHotels)

  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);

  return (
    <div>
      <h1>estamos en el home</h1>
      <Cards allHotels={hotels} />
    </div>
  )
}

export default Home;
