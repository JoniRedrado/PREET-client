import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import TryAgain from "../../Components/Try again/TryAgain";
import styles from "./SearchResult.module.css"
import Filters from "../../Components/Filters/Filters"
import SearchBar from "../../Components/SearchBar/SearchBar"

function SearchResult() {
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalHotels, setTotalHotels] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, [filteredHotels]);

  return (
    <div className={styles.mainContainer}>
        <div className={styles.content}>
          <div className={styles.filtersContainer}>
            <Filters/>
          </div>
          <div className={styles.cardsContainer}>
          <h2>{`${searchTerm} ${totalHotels} Hotels found`}</h2>
          {noResults ? (
            <TryAgain />
          ):(
            <Cards allHotels={filteredHotels} />
          )}

          </div>

        </div>
    </div>
  );
}

export default SearchResult;