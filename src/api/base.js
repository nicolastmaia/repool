import axios from 'axios';

export const repoolApi = axios.create({
  baseURL: 'http://192.168.0.109:5050',
});

export const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1',
});
