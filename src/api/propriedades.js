/* eslint-disable no-restricted-syntax */
import { repoolApi } from './base';

const subscriberEndpoint = '/subscriber';
const ownerEndpoint = '/owner';

const propriedadeApi = {
  getAll: async () => {},

  getPropertiesAsOwner: async (userToken) => {
    const response = await repoolApi.get(`${ownerEndpoint}/properties`, {
      headers: {
        Authorization: userToken,
      },
    });
    const propriedades = response.data;
    return propriedades;
  },

  getRentsAsInquilino: async (userToken) => {
    const response = await repoolApi.get(`${subscriberEndpoint}/rent`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  },

  getRentsAsOwner: async (propertyId, userToken) => {
    const response = await repoolApi.get(`${ownerEndpoint}/property/${propertyId}/rents/active`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  },

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
    const response = await repoolApi.get(`${ownerEndpoint}/property/${propertyId}/interests`, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'multipart/form-data',
      },
    });
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

  subscriberConfirmRent: async (interestId, userToken) => {
    const response = await repoolApi.patch(
      `${subscriberEndpoint}/${interestId}/interest`,
      { uConfirmation: true },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return response.data;
  },

  subscriberRemoveRent: async (rentId, userToken) => {
    const response = await repoolApi.delete(`${subscriberEndpoint}/${rentId}/rent`, {
      headers: {
        Authorization: userToken,
      },
    });
    const inactiveRent = response.data;
    return inactiveRent;
  },

  ownerRemoveRent: async (rentId, userToken) => {
    const response = await repoolApi.delete(`${ownerEndpoint}/${rentId}/rent`, {
      headers: { Authorization: userToken },
    });
    const inactiveRent = response.data;
    return inactiveRent;
  },

  postAsSubscriber: async (propriedade, photo, userToken) => {
    const formData = new FormData();
    formData.append('img', photo);

    for (const [key, value] of Object.entries(propriedade)) {
      formData.append(key, value);
    }

    const response = await repoolApi.post(`${subscriberEndpoint}/property`, formData, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'multipart/form-data',
      },
    });
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

    const response = await repoolApi.post(`${ownerEndpoint}/property`, formData, {
      headers,
    });
    return response.data;
  },

  edit: async (id, newData) => {},
  remove: async (id) => {},
};

export default propriedadeApi;
