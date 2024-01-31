import { callExternalApi } from './external-api.services';
import Cookies from 'universal-cookie';

const apiServerUrl = "http://localhost:3001";


export const login = async (user, password) => {
  const cookies = new Cookies();
  const data =  JSON.stringify({
    email: user,
    password: password,
  });
  const config = {
    url: `${apiServerUrl}/v1/auth/login`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data,
  };

  console.log(apiServerUrl);
  console.log(config);

  const response = await callExternalApi({ config });
  
  console.log(response.data.tokens);

  //if (response.ok) {
    const accessToken = response.data.tokens.access.token;

    console.log(accessToken);
    // Set the new access token as an HTTP-only cookie
    cookies.set('access_token', accessToken, {
      path: '/',
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
    });

    console.log(cookies.get('access_token'));

    // Store the new refresh token in memory or a non-HTTP-only cookie
    localStorage.setItem('refresh_token', refreshToken);
  //}
};

export const refreshToken = async () => {
  const cookies = new Cookies();
  const config = {
    url: `${apiServerUrl}/v1/refreshtoken`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refresh_token'),
    }),
  };

  const response = await callExternalApi({ config });

  if (response.ok) {
    const { accessToken, refreshToken } = await response.json();

    // Set the new access token as an HTTP-only cookie
    cookies.set('access_token', accessToken, {
      path: '/',
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
    });

    // Store the new refresh token in memory or a non-HTTP-only cookie
    localStorage.setItem('refresh_token', refreshToken);
  }
};

export const getAccessToken = () => {
  const cookies = new Cookies();
  const access_token = cookies.get('access_token');
  console.log('accesstoken: ' + access_token);

  return access_token;

}
