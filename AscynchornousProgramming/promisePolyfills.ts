// Promise.all

const promise1 = new Promise((resolve, reject) =>
  setTimeout(() => reject(3), 3000)
);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(() => reject("err1"), 2000)
);
const promise3 = new Promise((resolve, reject) =>
  setTimeout(() => reject("4th one"), 4000)
);
const promise4 = new Promise((resolve, reject) =>
  setTimeout(() => reject("err2"), 1000)
);

const pArray = [promise1, promise2, promise3, promise4];
const promiseAll = (promisesArray) => {
  let resultsArray = [];
  let length = promisesArray.length;
  return new Promise((resolve, reject) => {
    if (length === 0) {
      resolve(resultsArray);
    }

    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          resultsArray[index] = result;
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          length -= 1;
          if (length <= 0) {
            resolve(resultsArray);
          }
        });
    });
  });
};

// promiseAll(pArray)
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const promiseRace = <T>(promisesArray: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  });
};

// promiseRace(pArray)
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const promiseAny = <T>(promisesArray: Promise<T>[]) => {
  let totalPromises = promisesArray.length;
  let errors = [];
  if (totalPromises === 0) {
    throw new AggregateError(errors);
  }
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((response) => resolve(response))
        .catch((err) => {
          errors[index] = err;
          totalPromises -= 1;
          if (totalPromises === 0) {
            reject(new AggregateError(errors));
          }
        });
    });
  });
};

promiseAny(pArray)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
