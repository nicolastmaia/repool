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

  post: async (anuncio) => {},
  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default anuncioApi;
