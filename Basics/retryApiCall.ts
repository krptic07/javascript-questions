// How can you implement a retry mechanism for fetching data?
import axios from "axios";

const retryPromiseNtimes = (url, retry = 3, duration = 1000) => {
  return new Promise((resolve, reject) => {
    const apiFetch = (retries) => {
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((err) => {
          if (retries <= 0) {
            reject(err);
          } else {
            console.log(`delaing...`);
            setTimeout(() => apiFetch(retries - 1), duration);
          }
        });
    };

    apiFetch(retry);
  });
};

retryPromiseNtimes("https://api.nce.com/api/v3/ticker/price")
  .then((result) => console.log(result))
  .catch((err) => console.log("err"));
