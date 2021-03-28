import axios from './base';

const resourceEndpoint = '/usuario';

const userApi = {
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
      response.data.avatar = 'https://www.w3schools.com/howto/img_avatar.png';

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

export default userApi;
