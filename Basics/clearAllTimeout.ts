// Write a polyfill for clearAllTimeout that tracks and clears all timeouts set
// using setTimeout.
// // Test

(function () {
  let timeout = [];

  let originalTimeout = this.setTimeout;
  this.setTimeout = (callback, delay, ...args) => {
    let timeoutId = originalTimeout(callback, delay, ...args);
    timeout.push(timeoutId);
    return timeoutId;
  };

  this.clearAllTimeout = function () {
    timeout.forEach((value) => {
      this.clearTimeout(value);
    });
    timeout = [];
  };

  const timeout1 = setTimeout(() => console.log("Timeout 1"), 10000);
  const timeout2 = setTimeout(() => console.log("Timeout 2"), 3000);
  const timeout3 = setTimeout(() => console.log("Timeout 3"), 4000);
  setTimeout(() => {
    console.log("Clearing all timeouts...");
    this.clearAllTimeout();
  }, 5000); // This should clear all timeouts before they execute
})();

// const timeout1 = setTimeout(() => console.log("Timeout 1"), 10000);
// const timeout2 = setTimeout(() => console.log("Timeout 2"), 3000);
// const timeout3 = setTimeout(() => console.log("Timeout 3"), 4000);
// setTimeout(() => {
//   console.log("Clearing all timeouts...");
//   this.clearAllTimeout();
// }, 5000); // This should clear all timeouts before they execute
