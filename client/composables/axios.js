import axios from "axios";

const API_URL = "http://localhost:3001/api/";
let headers = {
  "Content-Type": "application/json",
};

export const $ = axios.create({
  baseURL: API_URL,
  headers: headers,
});

$.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      navigateTo("/logout");
      return;
    }
    return Promise.reject(error);
  },
);
