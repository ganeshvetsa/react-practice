import * as axios from "axios";

const hostUrl = "https://covid19.mathdro.id/api";
const Api = {
  async getGlobalSummary() {
    try {
      let {data} = await axios.get(hostUrl);
      return data;
    } catch (e) {
      console.log(e.message);
    }
    return null;
  },
  async getCountries() {
    let url = `${hostUrl}/countries`;
    try {
      let {data} = await axios.get(url);
      return data.countries;
    } catch (e) {
      console.log(e.message);
    }
    return null;
  }
};
export default Api;