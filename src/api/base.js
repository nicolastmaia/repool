import axios from 'axios';

export const repoolApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1',
});
