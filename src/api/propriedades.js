import axios from './base';

const resourceEndpoint = '/propriedades';

const propriedadeApi = {
  getAll: async () => {
    try {
      const response = await axios.get(resourceEndpoint);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getAsOwner: async () => {
    try {
      const response = await axios.get(`${resourceEndpoint}/dono`);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getAsInquilino: async () => {
    try {
      const response = await axios.get(`${resourceEndpoint}/inquilino`);
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

  post: async (anuncio) => {},
  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default propriedadeApi;
