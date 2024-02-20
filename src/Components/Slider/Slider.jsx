import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import { Card, CardContent, CardMedia, Typography, Button, makeStyles } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%', // Hace que el slider ocupe todo el ancho disponible
    margin: theme.spacing(2, 0), // Margen arriba y abajo
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%', // Ajusta el ancho de las tarjetas
    margin: 'auto', // Centra las tarjetas dentro del slider
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white', // Color de fondo de las tarjetas
  },
  cardContent: {
    flex: 1,
    marginLeft: theme.spacing(2),
  },
  image: {
    width: '400px', // Ancho fijo para todas las imágenes
    height: '300px', // Altura automática para mantener la proporción
    borderRadius: theme.spacing(1),
  },
  controlButton: {
    color: 'white', // Color de los íconos de control
    backgroundColor: '#022840', // Color de fondo de los botones de control
    borderRadius: '50%', // Radio para los controles
    width: '40px', // Ajusta el ancho de los controles
    height: '40px', // Ajusta la altura de los controles
    boxShadow: 'none', // Elimina cualquier sombra alrededor del botón
  },
  bookButton: {
    backgroundColor: '#022840', // Color de fondo del botón "Book Now"
    color: 'white', // Color del texto del botón "Book Now"
    '&:hover': {
      backgroundColor: '#015C7F', // Color de fondo al pasar el ratón
    },
  },
}));

const Slider = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [rankedHotels, setRankedHotels] = useState([]);

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
    return '⭐'.repeat(count);
  };

  const handleClick = (hotelId) => {
    navigate(`/detail/${hotelId}`)
  }
  const renderHotelCard = (hotel) => (
    <Card key={hotel.id} className={classes.card}>
      <CardMedia
        className={classes.image}
        component="img"
        image={hotel.image}
        alt={hotel.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2" gutterBottom>
          {hotel.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {renderStars(hotel.stars)}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          <strong>Address:</strong> {hotel.address}
        </Typography>

        <Typography variant="body2" color="textSecondary" paragraph>
          <strong>Email:</strong> {hotel.email}
        </Typography>
        <Button onClick={() => handleClick(hotel.id)} variant="contained" className={classes.bookButton}  target="_blank">
          Book Now
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Carousel 
      animation="slide" 
      className={classes.root} 
      indicators={false} 
      navButtonsAlwaysVisible 
      NextIcon={<NavigateNext className={classes.controlButton} style={{background: 'none'}} />} 
      PrevIcon={<NavigateBefore className={classes.controlButton} style={{background: 'none'}} />}
    >
      {rankedHotels.map((hotel) => renderHotelCard(hotel))}
    </Carousel>
  );
};

export default Slider;