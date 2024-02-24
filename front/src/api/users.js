/* eslint-disable no-restricted-syntax */
import { Type } from 'react-feather';
import { repoolApi } from './base';

const userResourceEndpoint = '/user';
const subscriberResourceEndpoint = '/subscriber';

const userApi = {
  login: async (user) => {
    const response = await repoolApi.post(`${userResourceEndpoint}/signin`, user);
    const authenticatedUser = response.data;
    return authenticatedUser;
  },

  signup: async (newUser) => {
    const response = await repoolApi.post(`${userResourceEndpoint}/signup`, newUser);
    const authenticatedUser = response.data;
    return authenticatedUser;
  },

  uploadAvatar: async (avatarFile, userToken) => {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      await repoolApi.patch(`${subscriberResourceEndpoint}/user/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: userToken,
        },
      });
      return null;
    } catch (error) {
      return 'warning';
    }
  },

  getUserByToken: async (userToken) => {
    const response = await repoolApi.get('/subscriber/full-user', {
      headers: {
        Authorization: userToken,
      },
    });
    const userData = response.data;
    return userData;
  },

  getFavorites: async (userToken) => {
    const response = await repoolApi.get('/subscriber/favorites', {
      headers: {
        Authorization: userToken,
      },
    });
    const { favorited } = response.data;
    return favorited;
  },

  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default userApi;
