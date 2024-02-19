import { useEffect, Suspense } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavorites } from "../../redux/actions";
import { useTranslation } from "react-i18next";

const Favorites = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const favorites = useSelector((state) => state.allFavorites.Favorite);

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  if (!Array.isArray(favorites)) {
    return <div>{t("Favorites.loading")}</div>;
  }

  return (
    <>
      <div>
        <h2>{t("Favorites.title")}</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{t("Favorites.hotel")}</th>
              <th>{t("Favorites.user")}</th>
              <th>{t("Favorites.email")}</th>
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

export default function WrappedApp() {
  return (
    <Suspense>
      <Favorites />
    </Suspense>
  );
}
