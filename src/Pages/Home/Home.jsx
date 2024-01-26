import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../redux/actions";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import { pagination } from "../../redux/actions";
// import Pagination from "../../Components/Pagination/Pagination";

function Home() {
  const dispatch = useDispatch();
  const allHotels = useSelector((state) => state.allHotels);
  const filteredHotels = useSelector((state) => state.filteredHotels);
  // const searched = useSelector((state) => state.searched);
  // const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(pagination())
  }

  // console.log("Información de hoteles:", allHotels);

  return (
    <div>
      <button onClick={() => handleClick()}>boton</button>
      <Cards allHotels={allHotels} />
      <Pagination/>
    </div>
  );
}

export default Home;
