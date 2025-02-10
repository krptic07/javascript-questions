//Write custome polyfill for call, apply and bind method ?

export {};

declare global {
  interface Function {
    myCall<T, U>(context: any, ...args: T[]): U;
    myApply<T, U>(context: any, args: T[]): U;
    myBind<A1, A2, U>(context: any, ...args: A1[]): (...boundArgs: A2[]) => U;
  }
}

Function.prototype.myCall = function <T, U>(context: any, ...args: T[]): U {
  if (typeof this !== "function") {
    throw TypeError("Can be only applied to functions");
  } else {
    let contextRef: any =
      context !== null && context !== undefined ? Object(context) : globalThis;
    let uniqueKey = Symbol();
    contextRef[uniqueKey] = this;
    const result: U = contextRef[uniqueKey](...args);

    delete contextRef[uniqueKey];

    return result;
  }
};

const greet = (name: string, age: number) => {
  return `Hello ${name} of ${age} years`;
};

console.log(greet.myCall(null, "Alice", "2"));

Function.prototype.myApply = function <T, U>(context: any, args: T[]): U {
  if (typeof this !== "function") {
    throw TypeError("Can be only applied to functions");
  } else {
    let contextRef =
      context !== null && context !== undefined ? context : globalThis;
    let uniqueKey = Symbol();
    contextRef[uniqueKey] = this;
    let result = contextRef[uniqueKey](...args);
    delete contextRef[uniqueKey];
    return result;
  }
};

console.log(greet.myApply(null, ["Alice", 2]));

Function.prototype.myBind = function <A1, A2, U>(
  context: any,
  ...args: A1[]
): (...boundArgs: A2[]) => U {
  if (typeof this !== "function") {
    throw TypeError("Can be only applied to functions");
  } else {
    let contextRef =
      context !== null && context !== undefined ? context : globalThis;
    let fn = this;
    return function (...boundArgs: A2[]): U {
      return fn.call(contextRef, ...args, ...boundArgs);
    };
  }
};

const greetName = greet.myBind(null, "Alice");
console.log(greetName(3));
