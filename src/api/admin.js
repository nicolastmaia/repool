import { repoolApi } from './base';

const adminEndpoint = '/admin';

const adminApi = {
  getQtdUsersBySex: async (userToken) => {
    const response = await repoolApi.get(`${adminEndpoint}/sex-mounth`, {
      headers: {
        Authorization: userToken,
      },
    });
    const usersBySex = response.data;
    return usersBySex;
  },

  getQtdPropsByState: async (userToken) => {
    const response = await repoolApi.get(`${adminEndpoint}/properties-mounth`, {
      headers: {
        Authorization: userToken,
      },
    });
    const propsByState = response.data;
    return propsByState;
  },

  getQtdActivePropsByState: async (userToken) => {
    const response = await repoolApi.get(`${adminEndpoint}/ad-mounth`, {
      headers: {
        Authorization: userToken,
      },
    });
    const propsByState = response.data;
    return propsByState;
  },
};

export default adminApi;
