const BASE_URL = "http://localhost:3001";
/* const BASE_URL = "http://badges-server.jorgevelasquez006.now.sh";
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  bd: {
    // Name de la matriz de datos en la API
    list() {
      return callApi("/bd");
    },
    create(badge) {
      // throw new Error('500: Server error');
      return callApi(`/bd`, {
        method: "POST",
        body: JSON.stringify(badge)
      });
    },
    read(badgeId) {
      return callApi(`/bd/${badgeId}`);
    },
    update(badgeId, updates) {
      return callApi(`/bd/${badgeId}`, {
        method: "PUT",
        body: JSON.stringify(updates)
      });
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    remove(badgeId) {
      return callApi(`/bd/${badgeId}`, {
        method: "DELETE"
      });
    }
  }
};

export default api;
