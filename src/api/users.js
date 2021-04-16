import { repoolApi } from './base';

const resourceEndpoint = '/user';

const userApi = {
  getAll: async () => {
    const response = await repoolApi.get(resourceEndpoint);
    return response.data;
  },

  login: async (user) => {
    const response = await repoolApi.post(`${resourceEndpoint}/signin`, user);
    const authenticatedUser = response.data;
    return authenticatedUser;
  },

  signup: async (newUser) => {
    const response = await repoolApi.post(
      `${resourceEndpoint}/signup`,
      newUser
    );
    const authenticatedUser = response.data;
    return authenticatedUser;
  },

  getUserByToken: async (token) => {
    const response = await repoolApi.get('/subscriber/full-user', {
      headers: {
        Authorization: token,
      },
    });
    const userData = response.data;
    return userData;
  },
  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default userApi;
