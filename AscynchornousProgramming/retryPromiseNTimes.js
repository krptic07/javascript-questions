const axios = require("axios");

const retryPromiseNTimes = async (retryCount, delay) => {
  try {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/pric"
    );
    return response.data;
  } catch (err) {
    if (retryCount > 0) {
      console.log("delaying....");
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryPromiseNTimes(retryCount - 1, delay);
    } else {
      throw new Error(err);
    }
  }
};

retryPromiseNTimes(3, 10000)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
