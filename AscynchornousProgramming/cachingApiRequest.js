const axios = require("axios");

const cacheApiRequest = (fetchFunc) => {
  let apiCache = {};

  return async function (url, cacheDuration = 300000) {
    if (url in apiCache) {
      const { timeStamp, data } = apiCache[url];
      const now = new Date().getTime();
      if (now - timeStamp <= cacheDuration) {
        console.log("Cached Data");
        return Promise.resolve(data);
      } else {
        apiCache.delete(url);
      }
    } else {
      try {
        const data = await fetchFunc(url);
        const now = new Date().getTime();
        apiCache[url] = { timeStamp: now, data: data };
        return data;
      } catch (err) {
        throw err;
      }
    }
  };
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const cachedFetchData = cacheApiRequest(fetchData);

const mainFunction = async () => {
  try {
    const response = await cachedFetchData(
      "https://api.binance.com/api/v3/ticker/price"
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }

  setTimeout(async () => {
    try {
      const response = await cachedFetchData(
        "https://api.binance.com/api/v3/ticker/price"
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, 3000);
};

mainFunction();
