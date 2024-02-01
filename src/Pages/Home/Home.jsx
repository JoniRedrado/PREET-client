import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import { filterHotels, getAllCountries, userLog } from "../../redux/actions";
import Filters from "../../Components/Filters/Filters";
import TryAgain from "../../Components/Try again/TryAgain"

// import { useNavigate } from 'react-router-dom';


function Home() {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage);
  const filters = useSelector((state) => state.submitFilters);
  const userChanged = useSelector((state) => state.userChanged)
  const [noResults, setNoResults] = useState(false);

  /* console.log(filteredHotels); */
  
  useEffect(() => {
    dispatch(filterHotels(filters));
    dispatch(getAllCountries());
    if (userChanged) {
      dispatch(userLog())
    }
}, [currentPage, userLog]);

useEffect(() => {
  if (filteredHotels.total === 0) {
    setNoResults(true);
  } else {
    setNoResults(false);
  }
}, [filteredHotels]);

  return (
      <div>
        <Filters />
          {noResults ? (
            <TryAgain />
              ):(
            <>
              <Cards allHotels={filteredHotels} />
              <Pagination />
            </>
            )}
      </div>
    )
}

export default Home;
