import { repoolApi } from './base';

const resourceEndpoint = '/user';

const anuncioApi = {
  getAll: async () => {
    const response = await repoolApi.get(`${resourceEndpoint}/ad`);
    const anuncios = response.data;
    return anuncios;
  },

  getOne: async (id) => {
    const response = await repoolApi.get(`${resourceEndpoint}/${id}/property`);
    return response.data;
  },

  getFavorites: async () => {
    try {
      const response = await repoolApi.get('/favoritos'); // TODO mudar rota para /anuncios/favoritos
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  post: async (anuncio) => {},
  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default anuncioApi;
