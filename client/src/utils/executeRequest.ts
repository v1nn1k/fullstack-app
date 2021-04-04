interface FetchOptions<T extends object> {
  method: "GET" | "POST" | "PATCH";
  body?: T;
}

const executeRequest = (url: string, options: FetchOptions<{}>) =>
  fetch(url, {
    method: options.method,
    body: JSON.stringify(options.body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .catch((e) => {
      console.error("Request error " + e);
    });
export default executeRequest;
