//a word or phrase that is made by arranging the letters of another word or phrase in a different order
// race and care

function anagramString(string1, string2) {
  string1LowerCase = string1.toLowerCase();
  string2LowerCase = string2.toLowerCase();

  firstString = string1LowerCase.split("").sort().join("");
  secondString = string2LowerCase.split("").sort().join("");

  return firstString === secondString;
}

console.log(anagramString("rac", "cAre"));
