import React, { useState, useEffect, useCallback } from 'react';
import MenuUser from '../Elements/MenuUser';
import '../../css/Alergenos.css';
import axios from 'axios';
import gluten from './../../assets/Gluten.png';
import soya from './../../assets/Soya.png';
import milk from './../../assets/Milk.png';
import eggs from './../../assets/Eggs.png';
import mustard from './../../assets/Mustard.png';
import nuts from './../../assets/Nuts.png';
import sulphites from './../../assets/sulfites.png';
import celery from './../../assets/Celery.png';
import fish from './../../assets/Fish.png';
import crustaceans from './../../assets/Crustaceans.png';
import molucs from './../../assets/Molucs.png';
import peanut from './../../assets/Peanuts.png';
import sesame from './../../assets/Sesame.png';
import lupins from './../../assets/Lupins.png';
import selected from './../../assets/seleccionado.png';

const Alergenos = () => {
  const [dishes, setDishes] = useState([]);
  const [page, setPage] = useState(0);
  const [numberPages, setNumberPages] = useState(0);

  const allergens = [
    { id: 'gluten', image: gluten },
    { id: 'soya', image: soya },
    { id: 'milk', image: milk },
    { id: 'eggs', image: eggs },
    { id: 'mustard', image: mustard },
    { id: 'nuts', image: nuts },
    { id: 'sulphites', image: sulphites },
    { id: 'celery', image: celery },
    { id: 'fish', image: fish },
    { id: 'crustaceans', image: crustaceans },
    { id: 'molucs', image: molucs },
    { id: 'peanut', image: peanut },
    { id: 'sesame', image: sesame },
    { id: 'lupins', image: lupins },
  ];

  const [selectedAllergens, setSelectedAllergens] = useState('00000000000000');

  const handleToggle = (index) => {
    const updated = selectedAllergens
      .split('')
      .map((val, i) => (i === index ? (val === '1' ? '0' : '1') : val))
      .join('');
    setSelectedAllergens(updated);
    setPage(0);
  };

  const fetchDishes = useCallback(async (pageValue = page, allergensString = selectedAllergens) => {
    const URL = `${process.env.REACT_APP_API_URL}/dishes/filter/${allergensString}?page=${pageValue}&size=40`;
    try {
      const response = await axios.get(URL);
      setNumberPages(response.data.totalPages);
      setDishes(response.data.content);
    } catch (error) {
      console.error('Error petición', error);
    }
  }, [page, selectedAllergens]); // 👈 dependencias que se usan dentro de la función
  
  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return (
    <>
      <MenuUser />

      <div className='header-page'>
        <h1>Alergenos</h1>  
      </div>

      <div className='body-page-ellergens'>
        <div className='imeges-allergens'>
          {allergens.map((item, index) => (
            <div
              key={item.id}
              className='container-image-allergen'
              onClick={() => handleToggle(index)}
            >
              <img src={item.image} alt={item.id} />
              {selectedAllergens[index] === '1' && (
                <img src={selected} alt='seleccionado' className='overlay-img' />
              )}
            </div>
          ))}
        </div>

        <div className='dishes-containers'>
          {dishes?.map((dish) => (
            <div key={dish.id} className='item-dish'>
              <div className='photo-item-dish'>
                <img src={dish.photo} alt={dish.name} />
              </div>
              <div className='info-item-dish'>
                <h4>{dish.name}</h4>
                <p>{dish.description}</p>
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

export default Alergenos;
