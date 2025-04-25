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

  const URL = "http://127.0.0.1:8080/api/restaurant"

  const getRestaurants = async () => {
    try{
      const response = await axios.get(URL)
      console.log("Respuesta:" , response.data)
      console.log(response.status);
      setRestaurants(response.data)

    } catch(error){
      console.log("Error pertición", error)
    }
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