import axios from 'axios';

const CrudTable = ({restaurants, getRestaurants}) => {

  const URL="http://127.0.0.1:8080/api/restaurant"


  const deleteRestaurant = (id) => {
    if(window.confirm("¿Seguro que deseas eliminar el dato?")){
      axios.delete(`${URL}/${id}`)
      .then(getRestaurants)
      .catch(() => alert("Error al eliminar el restaurante"))
    }
    
  }

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
              <td> <button className='optionButtons option-edit'> Editar </button> </td>
              <td> <button className='optionButtons option-delete' onClick={() => deleteRestaurant(restaurant.id)}> Eliminar </button> </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default CrudTable;
