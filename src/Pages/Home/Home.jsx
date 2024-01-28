import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
<<<<<<< Updated upstream
import { filterHotels } from "../../redux/actions";
=======
import { getAllHotels, getAllCountries } from "../../redux/actions";
>>>>>>> Stashed changes
import Filters from "../../Components/Filters/Filters";

function Home() {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage);
  const filters = useSelector((state) => state.submitFilters)

  useEffect(() => {
<<<<<<< Updated upstream
    dispatch(filterHotels(filters));
=======
    dispatch(getAllHotels());
    dispatch(getAllCountries());
>>>>>>> Stashed changes
  }, [currentPage, dispatch]);


  return (
    <div>
      <Filters />
      <Cards allHotels={filteredHotels} />
      <Pagination />
    </div>
  );
}

export default Home;
