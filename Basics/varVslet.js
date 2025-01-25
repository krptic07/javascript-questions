// The following code outputs 2 and 2 after waiting for one second
// Modify the code to output 0 and 1 after one second.

function randomFunc() {
  for (var i = 0; i < 2; i++) {
    setTimeout(() => console.log(i), 1000);
  }
}
randomFunc();

function randomFuncAns() {
  for (var i = 0; i < 2; i++) {
    (function (i) {
      setTimeout(() => console.log(i), 1000);
    })(i);
  }
}
randomFuncAns();

//or

function randomFuncLet() {
  for (let i = 0; i < 2; i++) {
    setTimeout(() => console.log(i), 1000);
  }
}
randomFunc();

//Guess the output of the following code:

var x = 23;

(function () {
  var x = 43;
  (function random() {
    x++;
    console.log(x);
    var x = 21;
  })();
})();

//since var is function scoped , for the random() function x is hoisted up and declared,
function random() {
  var x; // x is hoisted
  x++; // x is not a number since it is not initialized yet
  console.log(x); // Outputs NaN
  x = 21; // Initialization of x
}
