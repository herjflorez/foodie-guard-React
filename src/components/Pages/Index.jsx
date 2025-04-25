import React, { useState, useEffect } from 'react';
import MenuUser from '../Elements/MenuUser';
import axios from 'axios';
import '../../css/Index.css';

const Index = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(0);
  

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/restaurant?page=${page}&size=40`;

    const getRestaurants = async () => {
      try {
        const response = await axios.get(URL);
        console.log("Respuesta:", response.data);
        setNumberPages(response.data.totalPages);
        setRestaurants(response.data.content);
      } catch (error) {
        console.log("Error petición", error);
      }
    };

    getRestaurants();
  }, [page]);

  return (
    <>
        <MenuUser />
        <div className="header-page">
            <h1> Lista de Restaurantes </h1>
        </div>
        <div className="body-page-index">
            <div className="container-restaurants">
                {restaurants?.map((restaurant) => (
                    <div key={restaurant.id} className="item-restaurant">
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
    </>
  );
};

export default Index;
