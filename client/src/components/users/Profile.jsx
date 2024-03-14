import React, { useEffect, useState } from 'react'
import { getUser } from '../../services/users.service';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { callExternalApi } from '../../services/external-api.services';

const Profile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = await getUser('658cec6bc586a046a046172b');
  //       console.log(user);
  //       setData(user);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty array ensures effect is only run on mount

  useEffect(() => {
    const verifyCookie = async () => {
      console.log(cookies);
      if (!cookies.token) {
        navigate("/login");
      }


      const config = {
        url: `http://localhost:3001/v1/users/658cec6bc586a046a046172b`,
        method: 'GET',
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        data,
      };
    
      console.log(config);
    
      const response = await callExternalApi({ config });
      console.log(response);
      //console.log(user);
      setData(response);
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data from Endpoint</h1>
      {data && (
        <ul>
          <li>{data.data.email}</li>
          <li>{data.data.role}</li>
        </ul>
      )}
    </div>
  );
}

export default Profile