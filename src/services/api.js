import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getRestaurants = async (page = 0, size = 40) => {
    const response = await axios.get(`${API_URL}/restaurant?page=${page}&size=${size}`);
    return response.data;
  };