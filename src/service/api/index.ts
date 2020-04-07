import { apiPaths } from "../../constants/api-paths";
import { dataStatsGet } from "../../constants/api-mocks";

const request = (input: RequestInfo, options?: RequestInit, mock?: any) =>
  fetch(input, options)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return mock || error;
    });

const API = {
  stats: {
    get: () => request(apiPaths.dataStats, { method: "POST" }, dataStatsGet),
  },
};

export default API;
