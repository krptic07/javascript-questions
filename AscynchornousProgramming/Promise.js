//Implement Promise.any and Promise.allSettled

// Promise.allSettled([promise1, promise2, promise3]).then((results) =>
//   console.log(results)
// );

// Promise.all([promise1, promise2, promise3, promise4])
//   .then((results) => console.log(results))
//   .catch((err) => console.log(err));

// Promise.any([promise1, promise2, promise3, promise4])
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// Promise.race([promise1, promise2, promise3, promise4])
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// const axios = require("axios"); // In Node.js (not needed in the browser)

// const timeoutFetch = (url) => {
//   const timeOutCheck = new Promise((_, reject) =>
//     setTimeout(() => reject("API Timeout"), 100)
//   );
//   // const fetchData = fetch(url);
//   const fetchData = axios.get(url);

//   return Promise.race([fetchData, timeOutCheck]);
// };

// const apiClient = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com",
//   timeout: 1000, // Default timeout of 5 seconds
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// apiClient
//   .get("/users")
//   .then((response) => console.log(response.data))
//   .catch((error) => console.error("Request failed:", error.message));

// timeoutFetch("https://api.binance.com/api/v3/ticker/price")
//   .then((response) => console.log(response))
//   .catch((err) => console.log(err));

let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("errore"), 500);
});
let promise2 = new Promise((resolve, reject) =>
  setTimeout(() => resolve(3), 1000)
);
let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("ee"), 50);
});
let promise4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(6), 4000);
});

// let promiseAnyFunc = (promises) => {
//   return new Promise((resolve, reject) => {
//     let totalPromises = promises.length;
//     let errors = [];
//     if (totalPromises === 0) {
//       reject(new AggregateError(errors, "All Promises were rejected"));
//     }
//     promises.forEach((promise, index) => {
//       Promise.resolve(promise)
//         .then(resolve)
//         .catch((err) => {
//           errors[index] = err;
//           totalPromises--;
//           if (totalPromises === 0) {
//             reject(new AggregateError(errors, "All Promises were rejected"));
//           }
//         });
//     });
//   });
// };

// promiseAnyFunc([promise1, promise2, promise3, promise4])
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// let promiseAllSettledFunc = (promises) => {
//   return new Promise((resolve) => {
//     let totalPromises = promises.length;
//     let results = [];
//     if (totalPromises === 0) {
//       resolve([]);
//     }
//     promises.forEach((promise, index) => {
//       Promise.resolve(promise)
//         .then((result) => {
//           results[index] = { status: "fulfilled", value: result };
//         })
//         .catch((err) => {
//           results[index] = { status: "rejected", reason: err };
//         })
//         .finally(() => {
//           totalPromises--;
//           if (totalPromises === 0) {
//             resolve(results);
//           }
//         });
//     });
//   });
// };

// promiseAllSettledFunc([promise1, promise2, promise3, promise4])
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

let promiseAllFunc = (promises) => {
  return new Promise((resolve, reject) => {
    let totalPromises = promises.length;
    let results = [];
    if (totalPromises === 0) {
      resolve(results);
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          totalPromises--;
          if (totalPromises == 0) {
            resolve(results);
          }
        });
    });
  });
};

promiseAllFunc([promise1, promise2, promise3, promise4])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

let promiseRaceFunc = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

promiseRaceFunc([promise1, promise2, promise3, promise4])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
