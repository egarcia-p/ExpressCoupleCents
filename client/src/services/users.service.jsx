import axios from 'axios';
import { callExternalApi } from './external-api.services';
import Cookies from 'js-cookie';

const API_SERVER_URL = "http://localhost:3001";

export const getUser = async (id) => {
  // Get JWT token from cookie
  //const accessToken = Cookies.get('token');
  //console.log(accessToken);


  const config = {
    url: `${API_SERVER_URL}/v1/users/${id}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
  }
  //console.log(config);

  //const { data, error } = await callExternalApi({ config })

  //const { data, error } = axios.get(`http://localhost:3001/v1/users/${id}`, { withCredentials: true })
  let data = null;
/*
  fetch(`http://localhost:3001/v1/users/${id}`, {
    method: 'GET',
    credentials: 'include', // include HTTP cookies with the request
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        //'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
    })
    .then(response => response.json())
    .then(resdata => console.log(resdata))
    .catch(error => console.error('Error:', error));*/

  return {
    data: data || null,
    error: null,
  }
}