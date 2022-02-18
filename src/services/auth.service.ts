// Importanto biblioteca responsável por requisições HTTP
import axios from 'axios';

// Definindo a base do url para os endpoints
const apiUrl = "http://localhost:3001";

// Definindo o bjeto do serviço
const authService = {

    // Definindo a função de login
    async authenticate(data) {
        const endpoint = `${apiUrl}/usuario`
        return axios.post(endpoint, data);

    },

    // Função para salar o usuário logado no local storage
    setLoggedUser(token){
        let parsedData = (token)
        console.log(token); 
        localStorage.setItem("token", parsedData.token)
    },

    // Função responsável por recuperar o usuário logado do local storage
    getLoggedUser(){
        let data = localStorage.getItem("token");
        if(!data) return null;
        try {
            let parsedData = (data)
            return parsedData
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default authService;