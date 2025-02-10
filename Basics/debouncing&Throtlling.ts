// Implement a debouncing function in JavaScript that delays the execution
// of a given function until after a specified wait time has passed since the
// last call.

const throttleFunc = <T>(
  func: (...args: T[]) => void,
  delay: number
): ((...args: T[]) => void) => {
  let timeout: number = 0;
  return function (...args: T[]) {
    let now = new Date().getTime();
    if (now - timeout > delay) {
      func(...args);
      timeout = now;
    }
  };
};

const debounceFunc = <T>(
  func: (...args: T[]) => void,
  delay: number
): ((...args: T[]) => void) => {
  let timer;
  return function (...args: T[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const logFunc = (name: string) => console.log(name);
const throttedFunc = throttleFunc(logFunc, 1000);
throttedFunc("abhishek");
setTimeout(() => {
  throttedFunc("mohona");
}, 2000);
setTimeout(() => {
  throttedFunc("arkojit");
}, 50);

const debouncedFunc = debounceFunc(logFunc, 5000);
debouncedFunc("arkojit");
debouncedFunc("abhishek");
setTimeout(() => {
  debouncedFunc("mohona");
}, 2000);
