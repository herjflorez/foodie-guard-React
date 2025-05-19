import React, { useState, useEffect} from 'react';
import MenuUser from '../Elements/MenuUser';
import { getRestaurants } from '../../services/api.js';
import { GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import '../../css/Index.css';

const MapInModal = ({ lat, lng }) => {
  const mapContainerStyle = { width: "100%", height: "300px" };
  const defaultZoom = 14;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  // Opciones para desactivar la interacción del usuario con el mapa
  const mapOptions = {
    zoomControl: false, // Desactiva el control de zoom
    streetViewControl: false, // Desactiva el control de vista en calle
    mapTypeControl: false, // Desactiva el control de tipo de mapa (satélite, etc)
    rotateControl: false, // Desactiva el control de rotación
    draggable: false, // Desactiva la capacidad de arrastrar el mapa
    scrollwheel: false, // Desactiva el zoom con la rueda del ratón
    disableDoubleClickZoom: true, // Desactiva el zoom con doble clic
  };

  return (
    <GoogleMap
      center={{ lat, lng }}
      zoom={defaultZoom}
      mapContainerStyle={mapContainerStyle}
      options={mapOptions} 
    >
      <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
  );
};

const Index = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await getRestaurants(page, 40);
        setNumberPages(data.totalPages);
        setRestaurants(data.content);
      } catch (error) {
        console.log("Error petición", error);
      }
    };

    loadRestaurants();
  }, [page]);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  return (
    <>
      <MenuUser />
      <div className="header-page">
        <h1> Lista de Restaurantes </h1>
      </div>
      <div className="body-page-index">
        <div className="container-restaurants">
          {restaurants?.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className="item-restaurant" 
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <div className="photo-item">
                <img src={restaurant.photo} alt="" />
              </div>
              <div className="info-item">
                <div className="first-info-item">
                  <div>{restaurant.name}</div>
                  <div>{restaurant.phone}</div>
                </div>
                <div>{restaurant.address}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='container-buttons-page'> 
          {page > 0 && (
            <button className='button-page' onClick={() => setPage(page - 1)}> Anterior </button>
          )}
          {page < numberPages - 1 && (
            <button className='button-page' onClick={() => setPage(page + 1)}> Siguiente </button>
          )}
        </div>
      </div>

      {showModal && selectedRestaurant && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRestaurant.name}</h2>
            <img 
              src={selectedRestaurant.photo} 
              alt={selectedRestaurant.name} 
              style={{ width: '100%', height: 'auto' }} 
            />
            <p><strong>Teléfono:</strong> {selectedRestaurant.phone}</p>
            <p><strong>Dirección:</strong> {selectedRestaurant.address}</p>

            <MapInModal 
              lat={selectedRestaurant.lat} 
              lng={selectedRestaurant.lon} 
            />

            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
