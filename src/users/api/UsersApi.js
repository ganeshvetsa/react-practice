import * as axios from "axios";

const hostUrl = "http://localhost:8080/api/v1";
const usersApi = {
  async createUser(json) {
    let createUrl = `${hostUrl}/users`;
    let options = {
      headers: {
        "Authorization": "admin"
      }
    }
    try {
      return await axios.post(createUrl, json, options);
    } catch (e) {
      return null
    }
  }
};
export default usersApi;