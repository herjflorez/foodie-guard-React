import React, { useState, useEffect } from 'react';
import Image from './../../assets/Logo.png';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import axios from 'axios';

const CrudApp = () => {

    const [isVisible, setIsVisible] = useState(false)

    const changeVisibility = () => {
        setIsVisible(!isVisible); 
    } 
    
    const [restaurants, setRestaurants] = useState([])

  const URL = "http://localhost:8080/api/restaurant"

  const getRestaurants = () => {
    axios.get(URL)
    .then((response) => setRestaurants(response.data))
    .catch(() => alert("Error al cargar los restaurantes"))
  }

  
  useEffect(() => {
    getRestaurants();
  }, []);

  return (<>
        <h2> Crud restaurantes Foddie Guard </h2>
        <div id='logo'>
            <img src={Image} alt='logo' />
        </div>

        <button id='NewRestaurant' className='optionButtons' onClick={changeVisibility}>Añadir restaurante</button>

        {isVisible && <CrudForm onHide={changeVisibility} getRestaurants={getRestaurants} URL={URL}/>}

        <CrudTable restaurants={restaurants} getRestaurants={getRestaurants}/>
    </>
  )
}

export default CrudApp