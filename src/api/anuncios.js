import { repoolApi } from './base';

const userResourceEndpoint = '/user';
const subscriberResourceEndpoint = '/subscriber';

const anuncioApi = {
  getAll: async () => {
    const response = await repoolApi.get(`${userResourceEndpoint}/ad`);
    const anuncios = response.data;
    return anuncios;
  },

  getOne: async (id) => {
    const response = await repoolApi.get(
      `${userResourceEndpoint}/${id}/property`
    );
    return response.data;
  },

  getFavorites: async (token) => {
    const response = await repoolApi.get(
      `${subscriberResourceEndpoint}/favorites`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const anunciosFavoritos = response.data.favorited;
    return anunciosFavoritos;
  },

  createInterest: async (token, anuncioId) => {
    await repoolApi.post(
      `${subscriberResourceEndpoint}/property/${anuncioId}/interest`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },

  removeInterest: async (token, anuncioId) => {
    await repoolApi.delete(
      `${subscriberResourceEndpoint}/property/${anuncioId}/interest`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
  getInterest: async (token, anuncioId) => {
    const response = await repoolApi;
    const isInterested = response.data;
    return isInterested;
  },

  post: async (anuncio) => {},
  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default anuncioApi;
