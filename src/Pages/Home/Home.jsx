import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import { pagination } from "../../redux/actions";
// import Pagination from "../../Components/Pagination/Pagination";

function Home() {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state) => state.filteredHotels);
  // const searched = useSelector((state) => state.searched);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(pagination(currentPage));
  }, [currentPage, dispatch]);

  return (
    <div>
      <Cards allHotels={filteredHotels} />
      <Pagination/>
    </div>
  );
}

export default Home;
