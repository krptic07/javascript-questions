// ** Very frequently asked question **
// // Reduce is important among all
// // Write custom polyfill for map, reduce, filter, every ?
export {};

declare global {
  interface Array<T> {
    myMap<U>(callback: (element: T, index: number, array: T[]) => U): U[];
    myReduce<U>(
      callback: (accumulator: U, element: T, index: number, array: T[]) => U,
      startValue?: U
    ): U;
    myFilter(callback: (element: T, index: number, array: T[]) => boolean): T[];
    myEvery(
      callback: (element: T, index: number, array: T[]) => boolean
    ): boolean;
  }
}

Array.prototype.myMap = function <T, U>(
  callbackFunc: (element: T, index: number, array: T[]) => U
): U[] {
  if (typeof callbackFunc !== "function") {
    throw TypeError("Not valid function");
  } else {
    let results: U[] = [];
    // let array = this as T[]
    for (let i = 0; i < this.length; i++) {
      results.push(callbackFunc(this[i], i, this));
    }
    return results;
  }
};
// console.log(
//   [1, 2, 3, 4].myMap((element, index, array) => {
//     console.log(index);
//     console.log(array);
//     return `${element}- element`;
//   })
// );

Array.prototype.myReduce = function <T, U>(
  callbackFunc: (accumulator: U, element: T, index?: number, array?: T[]) => U,
  startValue?: U
): U {
  if (typeof callbackFunc !== "function") {
    throw TypeError("Not valid function");
  } else if (this.length === 0 && startValue === undefined) {
    throw TypeError("Enter array or start Value");
  } else {
    let startIndex: number = 0;
    let accumulator: U;
    if (startValue !== undefined) {
      accumulator = startValue;
    } else {
      accumulator = this[0] as U;
      startIndex = 1;
    }
    for (let i = startIndex; i < this.length; i++) {
      accumulator = callbackFunc(accumulator, this[i], i, this);
    }
    return accumulator;
  }
};

// console.log([1, 2, 3].myReduce((acc, ele) => acc + ele, 5));

Array.prototype.myFilter = function <T>(
  callbackFunc: (element: T, index?: number, array?: T[]) => boolean
): T[] {
  if (typeof callbackFunc !== "function") {
    throw TypeError("Not Function");
  } else {
    let results: T[] = [];
    for (let i = 0; i < this.length; i++) {
      const answer = callbackFunc(this[i], i, this);
      if (answer) {
        results.push(this[i]);
      }
    }
    return results;
  }
};

// console.log([1, 2, 3, 4].myFilter((element) => element % 2 === 0));
Array.prototype.myEvery = function <T>(
  callbackFunc: (element: T, index: number, array: T[]) => boolean
): boolean {
  if (typeof callbackFunc !== "function") {
    throw TypeError("Not Function");
  } else {
    for (let i = 0; i < this.length; i++) {
      const answer = callbackFunc(this[i], i, this);
      if (answer) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
};
console.log([1, 2, 3, 4].myEvery((element) => element > 3));
