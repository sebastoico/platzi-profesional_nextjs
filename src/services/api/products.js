import axios from 'axios';
import endPoints from '@services/api/index';

const addProduct = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.products.postProducts, body, config);
  return response.data;
};

export { addProduct };
