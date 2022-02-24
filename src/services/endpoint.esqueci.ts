// Importanto biblioteca responsável por requisições HTTP
import axios from 'axios';

// Definindo a base do url para os endpoints
const apiEsqueci = "http://localhost:3001";

// Definindo o bjeto do serviço
const endpointEsqueci  = {

    // Definindo a função de login
    async enviando(data) {
        const endpoint = `${apiEsqueci}/usuario/esqueci`
        return axios.post(endpoint, data);

    }
}

export default endpointEsqueci;