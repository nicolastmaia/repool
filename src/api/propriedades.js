/* eslint-disable no-restricted-syntax */
import { repoolApi } from './base';

const subscriberEndpoint = '/subscriber';
const ownerEndpoint = '/owner';

const propriedadeApi = {
  getAll: async () => {},

  getAsOwner: async (userToken) => {
    const response = await repoolApi.get(`${ownerEndpoint}/properties`, {
      headers: {
        Authorization: userToken,
      },
    });
    const propriedades = response.data;
    return propriedades;
  },

  getAsInquilino: async (userToken) => {},

  getOne: async (id, userToken) => {
    const response = await repoolApi.get(`${ownerEndpoint}/${id}/property`, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'multipart/form-data',
      },
    });
    const propriedade = response.data;
    return propriedade;
  },

  getInterests: async (propertyId, userToken) => {
    const response = await repoolApi.get(
      `${ownerEndpoint}/property/${propertyId}/interest`,
      {
        headers: {
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const propertyInterests = response.data;
    return propertyInterests;
  },

  ownerToggleConfirm: async (pConfirmation, interestId, userToken) => {
    const response = await repoolApi.patch(
      `${ownerEndpoint}/${interestId}/interest`,
      { pConfirmation },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    const interest = response.data;
    return interest;
  },

  postAsSubscriber: async (propriedade, photo, userToken) => {
    const formData = new FormData();
    formData.append('img', photo);

    for (const [key, value] of Object.entries(propriedade)) {
      formData.append(key, value);
    }

    const response = await repoolApi.post(
      `${subscriberEndpoint}/property`,
      formData,
      {
        headers: {
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  postAsOwner: async (propriedade, photo, userToken) => {
    const formData = new FormData();
    formData.append('img', photo);

    for (const [key, value] of Object.entries(propriedade)) {
      formData.append(key, value);
    }

    const headers = {
      Authorization: userToken,
      'Content-Type': 'application/json',
    };

    const response = await repoolApi.post(
      `${ownerEndpoint}/property`,
      formData,
      {
        headers,
      }
    );
    return response.data;
  },

  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default propriedadeApi;
