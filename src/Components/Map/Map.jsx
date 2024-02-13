import styles from "./Map.module.css"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Modal from "react-modal";
import { useState, useEffect } from "react";

const customModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    },
    content: {
      width: '80%',
      maxWidth: '600px',
      margin: 'auto',
      border: 'none',
      borderRadius: '8px',
      padding: '20px'
    }
  };

const Map = ({ isOpen, onRequestClose, address, children}) => {
    const [position, setPosition] = useState({ lat: 0, lng: 0 });
    
    useEffect(() => {
        if (address) {
          // Espera a que window.google esté disponible
          const waitForGoogle = setInterval(() => {
            if (window.google && window.google.maps) {
              clearInterval(waitForGoogle);
              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({ address: address }, (results, status) => {
                if (status === "OK") {
                  setPosition({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                  });
                } else {
                  console.error(
                    "Geocoding was not successful for the following reason:",
                    status
                  );
                }
              });
            }
          }, 100); // Intenta cada 100ms
        }
      }, [address]);
    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={customModalStyle}
          ariaHideApp={false}
        >
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_MAPS_API} // Reemplaza 'YOUR_API_KEY' con tu clave de API de Google Maps
          >
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={position || { lat: 0, lng: 0 }}
              zoom={position ? 10 : 1}
            >
              {position && <Marker position={position} />}
            </GoogleMap>
          </LoadScript>
          {children}
        </Modal>
      );
    };

export default Map;