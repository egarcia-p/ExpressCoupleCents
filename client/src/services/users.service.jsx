import { callExternalApi } from './external-api.services';

const apiServerUrl = "http://localhost:3001";

export const getUser = async (id) => {
  const config = {
    url: `${apiServerUrl}/v1/users/${id}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Credentials':true,
    },
    withCredentials: true,
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  }
}