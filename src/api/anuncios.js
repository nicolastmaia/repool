import axios from './base';

const resourceEndpoint = '/anuncios';

const anuncioApi = {
  getAll: async () => {
    try {
      const response = await axios.get(resourceEndpoint);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      const response = await axios.get(`${resourceEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getFavorites: async () => {
    try {
      const response = await axios.get('/favoritos'); // TODO mudar rota para /anuncios/favoritos
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
