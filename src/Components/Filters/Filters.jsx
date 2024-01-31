import { useDispatch, useSelector } from "react-redux";
import { filterHotels, filterParams, resetCurrentPage } from "../../redux/actions";
import "./Filters.style.css";

const Filters = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.submitFilters);

  const allCountries = useSelector((state) => state.countries);


  const handleFilters = (e) => {
    const { name, value } = e.target;
    dispatch(filterParams({ ...filters, [name]: value }));
  };

  const applyFilters = () => {
    dispatch(filterHotels(filters));
    dispatch(resetCurrentPage())
  };

  // const resetFilter = () => {
  //   dispatch(filterHotels());
  //   // setCurrentPage(1);
  //   // setSearchString("");
  // }

  return (
    <div>
      <div className="container-filtros">
        <div>
          <p>Countries</p>
          <select className="select" name="country" defaultValue="" onChange={handleFilters}>
            <option className="option" value="">All Countries</option>
            {allCountries &&
              allCountries.map((country, index) => (
                <option value={index + 1} key={index}>
                  {country}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p>Stars</p>
          <select name="stars" onChange={handleFilters}>
            <option value="">Cualquiera</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div>
          <h1 className="price">Price</h1>
          <div>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="min"
              step="10"
              min="0"
              max="10000"
              onChange={handleFilters}
            />
          </div>

          <div>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="max"
              step="10"
              min="0"
              max="10000"
              onChange={handleFilters}
            />
          </div>
        </div>

        <div className="order">
          <div>
            <p>Order For </p>
            <select name="orderBy" onChange={handleFilters}>
              <option value="">Order For</option>
              <option value="countryId">Country</option>
              <option value="stars">Stars</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div>
            <p>Direction </p>
            <select name="direction" onChange={handleFilters}>
              <option value="">Direction</option>
              <option value="ASC">↑</option>
              <option value="DESC">↓</option>
            </select>
          </div>
        </div>

        <button onClick={applyFilters}>Apply Filters</button>

        {/* <button onClick={resetFilter}> Reset filters</button> */}
      </div>
    </div>
  );
};

export default Filters;
