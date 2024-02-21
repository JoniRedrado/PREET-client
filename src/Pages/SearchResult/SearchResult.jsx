import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import TryAgain from "../../Components/Try again/TryAgain";
import styles from "./SearchResult.module.css"
import Filters from "../../Components/Filters/Filters"
import { getAllHotels } from "../../redux/actions";

function SearchResult() {

  const dispatch = useDispatch()

  const filteredHotels = useSelector((state) => state.filteredHotels);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalHotels, setTotalHotels] = useState(0);

  const filters = useSelector((state) => state.submitFilters)
  const allHotels = useSelector((state) => state.allHotels)

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchdata = async () => {

      if(Object.keys(filters).length <= 1) {
        await dispatch(getAllHotels())
      } else {
        if (filteredHotels.total === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        // Obtener el término de búsqueda de la URL
        const urlParts = window.location.pathname.split('/');
        const searchTermFromUrl = urlParts[urlParts.length - 1];
        setSearchTerm(decodeURIComponent(searchTermFromUrl));
        setTotalHotels(filteredHotels.total)
      }
    }

    fetchdata()
  }, [dispatch, filters, filteredHotels]);

  useEffect(() => {
    if (allHotels.total !== undefined) {
      setTotalHotels(allHotels.total)
    }
  }, [allHotels.total])

  return (
    <div className={styles.mainContainer}>
        <div className={styles.content}>
          <div className={styles.filtersContainer}>
            <Filters/>
          </div>
          <div className={styles.cardsContainer}>
          <h2>{`${totalHotels} Hotels found`}</h2>
          {noResults ? (
            <TryAgain />
          ):(
            <Cards hotels={Object.keys(filteredHotels).length === 0 ? allHotels : filteredHotels} />
          )}

          </div>

        </div>
    </div>
  );
}

export default SearchResult;