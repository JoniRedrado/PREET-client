import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import { filterHotels, getAllCountries, userLog } from "../../redux/actions";
import Filters from "../../Components/Filters/Filters";
// import { useNavigate } from 'react-router-dom';


function Home() {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage);
  const filters = useSelector((state) => state.submitFilters);
  const userChanged = useSelector((state) => state.userChanged)

  const token = localStorage.getItem("token");

  console.log(filteredHotels);
  
  useEffect(() => {
    dispatch(filterHotels(filters));
    dispatch(getAllCountries());
    if (userChanged) {
      dispatch(userLog())
    }
}, [currentPage, userLog]);

  return (
    <>
      {token
        ? (<div>
            <Filters />
            <Cards allHotels={filteredHotels} />
            <Pagination />
          </div>)
        : ""
    }
    </>
  );
}

export default Home;
