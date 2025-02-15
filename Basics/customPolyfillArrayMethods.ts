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
    myFlat(depth?: number): T[];
    mySort(): void;
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
// console.log([1, 2, 3, 4].myEvery((element) => element > 3));

// Write custom function for Array.flat() using both recursive and iterative
// approaches.

Array.prototype.myFlat = function <T>(
  depth: number = Number.POSITIVE_INFINITY
): T[] {
  if (!Array.isArray(this)) {
    throw TypeError("Not an array");
  } else {
    let result: T[] = [];
    for (let element of this) {
      if (Array.isArray(element) && depth > 0) {
        result = result.concat(element.myFlat(depth - 1));
      } else {
        result.push(element);
      }
    }
    return result;
  }
};

const flattenArray = <T>(array: any[]): T[] => {
  let result: T[] = [];
  for (let element of array) {
    if (Array.isArray(element)) {
      result = result.concat(flattenArray(element));
    } else {
      result.push(element);
    }
  }
  return result;
};

const flattenArrayIterative = (array) => {
  let secondaryArray = [...array];
  let result = [];
  while (secondaryArray.length) {
    const element = secondaryArray.pop();
    if (Array.isArray(element)) {
      secondaryArray.push(...element);
    } else {
      result.push(element);
    }
  }
  return result.reverse();
};

const flattenArrayWithDepth = (array, depth) => {
  let result = [];
  for (let element of array) {
    if (Array.isArray(element) && depth > 0) {
      result = result.concat(flattenArrayWithDepth(element, depth - 1));
    } else {
      result.push(element);
    }
  }
  return result;
};

const nestedArray = [
  [1, 2, 3], // First inner array
  [4, 5, 6], // Second inner array
  [7, 8, 9], // Third inner array
  [10, 11, [12, 13]], // Fourth inner array with another nested array
];

// console.log(flattenArray(nestedArray));
// console.log(flattenArrayIterative(nestedArray));
// console.log(flattenArrayWithDepth(nestedArray, 1));
// console.log(nestedArray.myFlat(1));

Array.prototype.mySort = function <T>(): void {
  if (!Array.isArray(this) || this.length === 0) {
    throw TypeError("Array should be there");
  } else {
    const partitionArray = (
      array: T[],
      leftIndex: number,
      rightIndex: number
    ) => {
      let partitionElement = array[leftIndex];
      let left = leftIndex;
      let right = rightIndex;
      while (left < right) {
        while (array[left] <= partitionElement && left <= rightIndex - 1) {
          left += 1;
        }
        while (array[right] >= partitionElement && right >= leftIndex + 1) {
          right -= 1;
        }
        if (left < right) {
          [array[left], array[right]] = [array[right], array[left]];
        }
      }
      [array[leftIndex], array[right]] = [array[right], array[leftIndex]];
      return right;
    };

    const quickSort = (array: T[], leftIndex: number, rightIndex: number) => {
      if (leftIndex >= rightIndex) {
        return;
      } else {
        const partitionIndex = partitionArray(array, leftIndex, rightIndex);
        quickSort(array, leftIndex, partitionIndex - 1);
        quickSort(array, partitionIndex + 1, rightIndex);
      }
    };

    quickSort(this, 0, this.length - 1);
  }
};

// const testArray = [2, 3, 7, 4, 10, 9, 11, 1, 5, 12, 8];
// testArray.mySort();
// console.log(testArray);
