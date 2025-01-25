const throttleFunction = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    let now = new Date().getTime();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
};

const buttonClick = () => {
  fetch("https://api.binance.com/api/v3/ticker/price")
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

const throttledClick = throttleFunction(buttonClick, 1000);

throttledClick(2);
setTimeout(() => throttledClick(), 50);
setTimeout(() => throttledClick(), 1000);
setTimeout(() => throttledClick(), 1500);
setTimeout(() => throttledClick(), 2000);
throttledClick(6);
