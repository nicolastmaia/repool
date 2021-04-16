import { repoolApi } from './base';

const resourceEndpoint = '/user';

const userApi = {
  getAll: async () => {
    try {
      const response = await repoolApi.get(resourceEndpoint);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  login: async (user) => {
    try {
      const response = await repoolApi.post(`${resourceEndpoint}/signin`, user);
      const authenticatedUser = response.data;
      return authenticatedUser;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  signup: async (newUser) => {
    try {
      const response = await repoolApi.post(
        `${resourceEndpoint}/signup`,
        newUser
      );
      const authenticatedUser = response.data;
      return authenticatedUser;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getUserByToken: async (token) => {
    try {
      const response = await repoolApi.get('/subscriber/full-user', {
        headers: {
          Authorization: token,
        },
      });
      const userData = response.data;
      return userData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default userApi;
