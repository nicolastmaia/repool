import axios from './base';

const resourceEndpoint = '/user';

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

  login: async (user) => {
    try {
      const response = await axios.post(`${resourceEndpoint}/signin`, user);
      const jwtToken = response.data;
      return jwtToken;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  signup: async (newUser) => {
    try {
      const response = await axios.post(`${resourceEndpoint}/signup`, newUser);
      const authenticatedUser = response.data;
      return authenticatedUser;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getUserByToken: async (token) => {
    const qualquercoisa = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.get('subscriber/full-user', qualquercoisa);
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
