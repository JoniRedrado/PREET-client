import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import { filterHotels, getAllCountries } from "../../redux/actions";
import Filters from "../../Components/Filters/Filters";

function Home() {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage);
  const filters = useSelector((state) => state.submitFilters);

  useEffect(() => {
    dispatch(filterHotels(filters));
    dispatch(getAllCountries());
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
