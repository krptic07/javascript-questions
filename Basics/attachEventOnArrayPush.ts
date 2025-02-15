// Attach event on push element in an array ?
export {};

declare global {
  interface Array<T> {
    myPush(...args: T[]): number;
    subscribeEvent(callBack): void;
  }
}

const originalPush = Array.prototype.push;

Array.prototype.subscribeEvent = function <T>(callBack): void {
  if (typeof callBack === "function") {
    if (!this.onPush) {
      this.onPush = Symbol();
    }
    this.onPush = callBack;
  } else {
    throw TypeError("not a function the callback");
  }
};

Array.prototype.myPush = function <T>(...args: T[]): number {
  originalPush.call(this, ...args);
  if (this.onPush) {
    this.onPush("Welcome", "Abhishek");
  }
  return this.length;
};

let testArray = [1, 2, 3, 4, 5];

const callBackFunc = (message: string, name: string) => {
  console.log(`${message}, ${name}`);
};

testArray.subscribeEvent(callBackFunc);
testArray.myPush(5, 32, 34);
