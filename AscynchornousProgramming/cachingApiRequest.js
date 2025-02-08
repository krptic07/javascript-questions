const axios = require("axios");

const cacheApiRequest = (fetchFunc) => {
  let apiCache = {};

  return async function (url, cacheDuration = 300000) {
    // if (url in apiCache) {
    //   const { timeStamp, data } = apiCache[url];
    //   const now = new Date().getTime();
    //   if (now - timeStamp <= cacheDuration) {
    //     console.log("Cached Data");
    //     return Promise.resolve(data);
    //   } else {
    //     apiCache.delete(url);
    //   }
    // } else {
    try {
      const data = await fetchFunc(url);
      const now = new Date().getTime();
      apiCache[url] = { timeStamp: now, data: data };
      return data;
    } catch (err) {
      throw err;
    }
    // }
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
const fetchImages = async (url) => {
  console.log("Axios instance:", axios);
  debugger;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Client-ID 4yWxn1NpMLd0_O19wO8D0zJev3oetY-RrMcABoT4zq8`,
    },
    // params: {
    //   per_page: 20,
    //   query: "wanderlust",
    // },
  });
  return res.data;
};

const cachedFetchData = cacheApiRequest(fetchImages);

const mainFunction = async () => {
  try {
    const response = await cachedFetchData(
      "https://api.unsplash.com/photos/random/?count=20"
    );
    console.log(response.map((photo) => photo.urls.thumb));
  } catch (err) {
    console.log(err);
  }

  // setTimeout(async () => {
  //   try {
  //     const response = await cachedFetchData(
  //       "https://api.binance.com/api/v3/ticker/price"
  //     );
  //     console.log(response[0]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, 3000);
};

mainFunction();
