import { repoolApi } from './base';

const userResourceEndpoint = '/user';
const subscriberResourceEndpoint = '/subscriber';

const anuncioApi = {
  getAll: async (offset) => {
    const response = await repoolApi.get(`${userResourceEndpoint}/ad`, {
      params: {
        skip: offset,
      },
    });
    const anuncios = response.data;
    return anuncios;
  },

  getNumberOfAds: async () => {
    const response = await repoolApi.get(`${userResourceEndpoint}/ad/count`);
    const count = response.data.all;
    return count;
  },

  getOne: async (id) => {
    const response = await repoolApi.get(`${userResourceEndpoint}/${id}/property`);
    return response.data;
  },

  getFavorites: async (token) => {
    const response = await repoolApi.get(`${subscriberResourceEndpoint}/favorites`, {
      headers: {
        Authorization: token,
      },
    });
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
    await repoolApi.delete(`${subscriberResourceEndpoint}/property/${anuncioId}/interest`, {
      headers: {
        Authorization: token,
      },
    });
  },

  toggleFavorite: async (token, anuncioId) => {
    const response = await repoolApi.patch(
      `${subscriberResourceEndpoint}/property/${anuncioId}/favorites`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const { favorited } = response.data;
    return !!favorited.find((element) => element.id === anuncioId);
  },

  post: async (anuncio) => {},
  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default anuncioApi;
