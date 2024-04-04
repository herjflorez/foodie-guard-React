import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudTable = () => {

  const [restaurants, setRestaurants] = useState([])

  const getRestaurants = () => {
    axios.get("http://localhost:8080/api/restaurant")
    .then((response) => setRestaurants(response.data))
  }

  const deleteRestaurant = (id) => {
    axios.delete(`http://localhost:8080/api/restaurant/${id}`)
    .then(getRestaurants)
  }

  useEffect(() => {
    getRestaurants();
  }, []);



  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th colSpan={2}> Opciones </th>
        </tr>
      </thead>
      <tbody>
        {
          restaurants?.map((restaurant) => (
            <tr>
              <td>{restaurant.id}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.phone}</td>
              <td>{restaurant.email}</td>
              <td>{restaurant.address}</td>
              <td> <button className='optionButtons option-edit' onClick={() => deleteRestaurant(restaurant.id)}> Editar </button> </td>
              <td> <button className='optionButtons option-delete' onClick={() => deleteRestaurant(restaurant.id)}> Eliminar </button> </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default CrudTable;
