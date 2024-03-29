import axios from 'axios';
const url = 'http://localhost:3000/api/';
export default {
  login(credentials) {
    return axios
      .post(url + 'login/', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'sign-up/', credentials)
      .then(response => response.data);
  },
  getSecretContent() {
    return axios.get(url + 'secret-route/').then(response => response.data);
  },
  getallcities() {
    return axios.get(url + 'getallcities/');
  },
  getallgroups() {
    return axios.get(url + 'getallgroups/');
  }
};