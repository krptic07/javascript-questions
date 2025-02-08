//Pipe
//Create a pipe function that takes a series of functions and executes them
// from left to right on an input value.
// Compose
// Create a compose function that takes a series of functions and executes them
// from right to left on an input value

const add5 = (x: number): number => {
  return x + 5;
};

const multiply3 = (x: number): number => {
  return x * 3;
};

const divide2 = (x: number): number => {
  return Math.floor(x / 2);
};

const intoString = (x: number): string => {
  return `${x}`;
};

// const pipeFunction = (...fns) => {
//   let result;
//   return function (x) {
//     for (let i = 0; i < fns.length; i++) {
//       if (i === 0) {
//         result = fns[0](x);
//       } else {
//         result = fns[i](result);
//       }
//     }
//     return result;
//   };
// };

const pipeFunction2 = (...fns: ((x: number) => any)[]) => {
  return function (x: number) {
    return fns.reduce((acc, func) => func(acc), x);
  };
};

const composeFunction = (...fns: ((x: number) => any)[]) => {
  return function (x: number) {
    return fns.reduceRight((acc, func) => func(acc), x);
  };
};
// console.log(pipeFunction(add5, multiply3, divide2, intoString)(6));
console.log(pipeFunction2(add5, multiply3, divide2, intoString)(6));
console.log(composeFunction(add5, multiply3, divide2)(6));
