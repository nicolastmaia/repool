import { repoolApi } from './base';

const subscriberEndpoint = '/subscriber/property';
const ownerEndpoint = '/owner/property';

const propriedadeApi = {
  getAll: async () => {
    const response = await repoolApi.get(subscriberEndpoint);
    return response.data;
  },

  getAsOwner: async () => {
    const response = await repoolApi.get(`${subscriberEndpoint}/dono`);
    return response.data;
  },

  getAsInquilino: async () => {
    const response = await repoolApi.get(`${subscriberEndpoint}/inquilino`);
    return response.data;
  },

  getOne: async (id) => {
    const response = await repoolApi.get(`${subscriberEndpoint}/${id}`);
    return response.data;
  },

  postAsSubscriber: async (propriedade, userToken) => {
    const headers = {
      Authorization: userToken,
      'Content-Type': 'application/json',
    };
    const response = await repoolApi.post(
      `${subscriberEndpoint}`,
      propriedade,
      { headers }
    );
    return response.data;
  },

  postAsOwner: async (propriedade, userToken) => {
    const headers = {
      Authorization: userToken,
      'Content-Type': 'application/json',
    };
    const response = await repoolApi.post(`${ownerEndpoint}`, propriedade, {
      headers,
    });
    return response.data;
  },

  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default propriedadeApi;
