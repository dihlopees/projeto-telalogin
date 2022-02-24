import axios from "axios";

const apiUrl = "http://localhost:3001";

const authService = {
  async authenticate(data) {
    const endpoint = `${apiUrl}/usuario`;
    return axios.post(endpoint, data);
  },

  setLoggedUser(token) {
    let parsedData = token;
    console.log(token);
    localStorage.setItem("token", parsedData.token);
  },

  getLoggedUser() {
    let data = localStorage.getItem("token");
    if (!data) return null;
    try {
      let parsedData = data;
      return parsedData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default authService;
