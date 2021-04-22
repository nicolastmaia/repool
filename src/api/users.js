import { Type } from 'react-feather';
import { repoolApi } from './base';

const resourceEndpoint = '/user';

const userApi = {
  login: async (user) => {
    const response = await repoolApi.post(`${resourceEndpoint}/signin`, user);
    const authenticatedUser = response.data;
    return authenticatedUser;
  },

  signup: async (newUser, avatarFile) => {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    formData.append('name', newUser.name);
    formData.append('email', newUser.email);
    formData.append('password', newUser.password);
    formData.append('cel', newUser.cel);
    formData.append('tel', newUser.tel);
    formData.append('bio', newUser.bio);
    formData.append('sex', newUser.sex);

    const response = await repoolApi.post(
      `${resourceEndpoint}/signup`,
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      }
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

  getFavorites: async (token) => {
    const response = await repoolApi.get('/subscriber/favorites', {
      headers: {
        Authorization: token,
      },
    });
    const { favorited } = response.data;
    return favorited;
  },

  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default userApi;
