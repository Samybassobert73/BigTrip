import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

function updateHeadersWithToken(config: AxiosRequestConfig, accessToken:string) {
  const headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return {
    ...config,
    headers,
  };
}

function isAccessTokenValid(accessToken:string) {
  const decodedToken = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString('ascii'));
  const tokenExpirationDate = new Date(decodedToken.exp * 1000);
  console.log(tokenExpirationDate)
  return tokenExpirationDate > new Date();
}

const apiClient = axios.create({
  baseURL: baseURL,
});

//@ts-ignore
apiClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken) {
    return Promise.reject(new Error('No access token found.'));
  }

  if (isAccessTokenValid(accessToken)) {
    return updateHeadersWithToken(config, accessToken);
  } else {
    try {
      const response = await axios.post('/auth/refresh', { refreshToken });

      if (response.status === 200) {
        const { accessToken: newAccessToken } = response.data.token;
        localStorage.setItem('accessToken', newAccessToken);
        return updateHeadersWithToken(config, newAccessToken);
      }
    } catch (error) {
      return Promise.reject(new Error('Unauthorized.'));
    }
  }
});

export default apiClient;

