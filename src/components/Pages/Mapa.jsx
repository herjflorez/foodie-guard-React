import MenuUser from '../Elements/MenuUser';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { InfoWindow } from "@react-google-maps/api";
import { Circle } from "@react-google-maps/api";
import '../../css/Map.css';
import Slider from "react-slick";



const Mapa = () => {

  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [radius, setRadius] = useState(20);
  const mapRef = useRef(null);
  const mapContainerStyle = { width: "100%", height: "500px" };
  const defaultZoom = 14;

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const earthRadius = 6371;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadius * c;
  };
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        alert("No se pudo obtener la ubicación.");
        console.error(err);
      }
    );
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Allrestaurant`);
        const filtered = res.data.filter((r) =>
          calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lon) <= radius
        );
        setRestaurants(filtered.slice(0, 20));
      } catch (error) {
        alert("Error al cargar restaurantes.");
        console.error(error);
      }
    };

    if (userLocation) fetchRestaurants();
  }, [userLocation, radius]);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(defaultZoom);
    }
  }, [userLocation]);

  const panTo = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);
    }
  };

  if (!isLoaded || !userLocation) return <div>Cargando mapa...</div>;

    return(
        <>
        
            <MenuUser />
            <div className="header-page">
                <h1> Mapa </h1>
                <GoogleMap
                  center={userLocation}
                  zoom={defaultZoom}
                  mapContainerStyle={mapContainerStyle}
                  onLoad={(map) => {
                    mapRef.current = map;
                    const locationButton = document.createElement("button");
                    locationButton.textContent = "📍 Mi ubicación";
                    locationButton.style.padding = "6px 12px";
                    locationButton.style.margin = "10px";
                    locationButton.style.borderRadius = "4px";
                    locationButton.style.cursor = "pointer";
                    locationButton.style.fontSize = "14px";
                    locationButton.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.3)";

                    locationButton.addEventListener("click", () => {
                      if (userLocation) {
                        map.panTo(userLocation);
                        map.setZoom(15);
                      } else {
                        alert("Ubicación no disponible.");
                      }
                    });

                    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
                  }}
                >
                  <Circle
                    center={userLocation}
                    radius={radius * 1000}
                    options={{
                      strokeColor: "#007BFF",
                      strokeOpacity: 0.5,
                      strokeWeight: 1,
                      fillColor: "#007BFF",
                      fillOpacity: 0.15,
                    }}
                  />

                  {restaurants.map((r) => (
                    <Marker
                      key={r.id}
                      position={{ lat: r.lat, lng: r.lon }}
                      title={r.name}
                      onClick={() => setActiveMarker(r.id)}
                      >
                      {activeMarker === r.id && (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                          <div>
                            <img src={r.photo} alt={r.name} style={{width: "250px"}}/>
                            <h4>{r.name}</h4>
                            <p>{r.address}</p>
                            <small>{r.type}</small>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
                </GoogleMap>

            <div className='container-radius-map'>
              <label>Radio de búsqueda: {radius} km</label>
              <input
                type="range"
                min="1"
                max="500"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
            </div>

            <div className='container-slider-restaurant'>
              { restaurants.length > 5 ? (
                  <Slider className='slider-restaurant'
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={Math.min(5, restaurants.length)}
                    slidesToScroll={1}
                    arrows={true}
                  >
                    {restaurants.map((r) => (
                      <div className='item-slider-restaurant'
                        key={r.id}
                        onClick={() => panTo(r.lat, r.lon)}
                      >
                        <h4>{r.name}</h4>
                        <p>{r.address}</p>
                        <small>{r.type}</small>
                      </div>
                    ))}
                  </Slider>
              ) : (
                <div className='container-restaurants-without-slide'> 
                  {restaurants.map((r) => (
                    <div className='item-map-restaurant'
                      key={r.id}
                      onClick={() => panTo(r.lat, r.lon)}
                    >
                      <h4>{r.name}</h4>
                      <p>{r.address}</p>
                      <small>{r.type}</small>
                    </div>
                  ))}
                </div>
              )

              }
              
            </div>
          </div>
        </>
    )

}


export default Mapa