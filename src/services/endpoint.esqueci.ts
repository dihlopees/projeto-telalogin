import axios from "axios";

const apiEsqueci = "http://localhost:3001";

const endpointEsqueci = {
  async enviando(data) {
    const endpoint = `${apiEsqueci}/usuario/esqueci`;
    return axios.post(endpoint, data);
  },
};

export default endpointEsqueci;
