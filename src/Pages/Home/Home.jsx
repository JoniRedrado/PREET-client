import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import { getAllHotels } from "../../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(getAllHotels());
  }, [currentPage, dispatch]);

  console.log(currentPage);
  console.log(filteredHotels);

  return (
    <div>
      <Cards allHotels={filteredHotels} />
      <Pagination/>
    </div>
  );
}

export default Home;
