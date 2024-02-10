import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavorites } from "../../redux/actions";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.allFavorites.Favorite);

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  if (!Array.isArray(favorites)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>All Favorites</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>User Name</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <tr key={favorite.id}>
                <td>{favorite.hotel.name}</td>
                <td>{favorite.user.name}</td>
                <td>{favorite.user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Favorites;