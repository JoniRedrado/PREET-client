import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Slider.module.css"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Hace que el slider ocupe todo el ancho disponible
    margin: theme.spacing(2, 0), // Margen arriba y abajo
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", 
    height: "100%",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor:"transparent"
  },
  info: { display: "flex", 
  flexDirection: "row", 
  width: "90%",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    flex: 1,
    marginLeft: theme.spacing(2),
    paddingTop: "50px",
    width: "70%",
    backgroundColor:"#f0f0f0"
  },
  image: {
    width: "50%", // Ancho fijo para todas las imágenes
    height: "300px", // Altura automática para mantener la proporción
    borderRadius: theme.spacing(1),
  },
  controlButton: {
    color: "white", // Color de los íconos de control
    borderRadius: "50%", // Radio para los controles
    width: "20px", // Ajusta el ancho de los controles
    height: "20px", // Ajusta la altura de los controles
  },
  bookButton: {
    backgroundColor: "#022840", // Color de fondo del botón "Book Now"
    color: "white", // Color del texto del botón "Book Now"
    "&:hover": {
      backgroundColor: "#015C7F", // Color de fondo al pasar el ratón
    },
  },
}));

const Slider = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const classes = useStyles();
  const [rankedHotels, setRankedHotels] = useState([]);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/hotels/range`)
      .then((response) => {
        setRankedHotels(response.data);

      })
      .catch((error) => {
        console.error("Error al obtener datos de hoteles:", error);
      });
  }, []);

  const renderStars = (count) => {
    return "⭐".repeat(count);
  };

  const handleClick = (hotelId) => {
    navigate(`/detail/${hotelId}`);
  };
  const renderHotelCard = (hotel) => (
    <Card key={hotel.id} className={classes.card}>
      <div className={classes.info}>
        <CardMedia
          className={classes.image}
          component="img"
          image={hotel.image}
          alt={hotel.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h4" color="black" paragraph>
            {hotel.name}
          </Typography>
          <Typography variant="body2" color="yellow" paragraph>
            {renderStars(hotel.stars)}
          </Typography>
          <Typography variant="body2" color="black" paragraph>
            <strong>{t("Slider.address")}</strong> {hotel.address}
          </Typography>

          <Button
            onClick={() => handleClick(hotel.id)}
            variant="contained"
            className={classes.bookButton}
            target="_blank"
          >
            {t("Slider.button")}
          </Button>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div className={styles.mainDiv}>
      <div className={styles.titleContainer}>
      <span className={styles.title}>{t("Slider.title")}</span>
      <p>{t("Slider.subtitle")}</p>
      </div>
      <div className={styles.caruselContainer}>
      <Carousel
      animation="slide"
      className={`${classes.root} ${darkMode ? "darkMode" : ""}`}
      indicators={false}
      navButtonsAlwaysVisible
      NextIcon={
        <NavigateNext
          className={classes.controlButton}
          style={{ background: "none" }}
        />
      }
      PrevIcon={
        <NavigateBefore
          className={classes.controlButton}
          style={{ background: "none" }}
        />
      }
    >
      {rankedHotels.map((hotel) => renderHotelCard(hotel))}
    </Carousel>
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <Slider />
    </Suspense>
  );
}
