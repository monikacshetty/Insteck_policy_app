import axios from "axios";

const url = "https://itstestapi20191202.azurewebsites.net/";
const brandApi = "api/car/brands";
const policyApi = "api/policy";
const apiKey = {
  headers: { "X-Api-Key": "" }
};
class PolicyService {
  fetchBrands() {
    return axios.get(url + brandApi, apiKey);
  }

  fetchModels(id) {
    return axios.get(url + `api/car/models/${id}`, apiKey);
  }

  fetchPolicy(page) {
    return axios.get(url + `/api/policy?page=${page}&size=8`, apiKey);
  }
  fetchPremium(params) {
    let fromUtc = new Date(params.start).toUTCString();
    let toUtc = new Date(params.end).toUTCString();

    return axios.get(
      url +
        `api/calculator/premium?modelId=${params.modelId}&period.start=${fromUtc}&period.end=${toUtc}&kilometers=${params.kilometers}&owners=${params.owners}`,
      apiKey
    );
  }

  executeSendPolicy(policy) {
    return axios.post(url + policyApi, policy, apiKey);
  }
}

export default new PolicyService();
