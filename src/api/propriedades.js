import { repoolApi } from './base';

const subscriberEndpoint = '/subscriber/property';
const ownerEndpoint = '/owner/property';

const propriedadeApi = {
  getAll: async () => {
    try {
      const response = await repoolApi.get(subscriberEndpoint);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getAsOwner: async () => {
    try {
      const response = await repoolApi.get(`${subscriberEndpoint}/dono`);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getAsInquilino: async () => {
    try {
      const response = await repoolApi.get(`${subscriberEndpoint}/inquilino`);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      const response = await repoolApi.get(`${subscriberEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  postAsSubscriber: async (propriedade, userToken) => {
    const headers = {
      Authorization: userToken,
      'Content-Type': 'application/json',
    };
    try {
      const response = await repoolApi.post(
        `${subscriberEndpoint}`,
        propriedade,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  postAsOwner: async (propriedade, userToken) => {
    const headers = {
      Authorization: userToken,
      'Content-Type': 'application/json',
    };
    try {
      const response = await repoolApi.post(`${ownerEndpoint}`, propriedade, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default propriedadeApi;
