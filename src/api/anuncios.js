import axios from './base';

const resourceEndpoint = '/anuncios';

export const getAll = async () => {
  try {
    const response = await axios.get(resourceEndpoint);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getOne = async (id) => {
  try {
    const response = await axios.get(`${resourceEndpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const post = async (anuncio) => {};
export const edit = async (id, newData) => {};
export const remove = async (id) => {};
