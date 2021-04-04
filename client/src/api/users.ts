import executeRequest from "../utils/executeRequest";
import config from "../config";

const createService = (baseUrl: string) => {
  const url = `${baseUrl}/users`;

  return {
    get: () => executeRequest(url, { method: "GET" }),
    // post: (data) => exe,
    patch: (id: string, data: any) =>
      executeRequest(`${url}/${id}`, {
        method: "PATCH",
        body: data,
      }),

    post: (data: any) => executeRequest(url, { method: "POST", body: data }),
  };
};

export default createService(config.apiServiceUrl);
