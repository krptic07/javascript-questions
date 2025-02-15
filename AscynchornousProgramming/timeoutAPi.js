const axios = require("axios");

const apiRequest = async (url) => {
  const timeOutRequest = new Promise((__, reject) => {
    setTimeout(() => reject(new Error("Timeout Error")), 10300);
  });

  const apiCall = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      throw Error("Error");
    }
  };
  Promise.race([timeOutRequest, apiCall()])
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

apiRequest("https://api.binance.com/api/v3/ticker/price");
