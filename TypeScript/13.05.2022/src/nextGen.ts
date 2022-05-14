// const userName = "Omar";
// userName = "Max";
// let age = 40;

// age = 41;

// function add(a: number, b: number) {
//   let result;
//   result = a + b;
//   return result;
// }
// if (age > 30) {
//     let isOld = true;
// }
// console.log(isOld);

// console.log(result);

// const add = (a: number, b: number) => a + b;

// const printOutput: (a: number | string) => void = (output) =>
//   console.log(output);

// const button = document.querySelector("button");

// if (button) {
//   button.addEventListener("click", (event) => console.log(event));
// }
// printOutput(add(5));

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Swimming"];

activeHobbies.push(...hobbies);

const person = {
  firstName: "Omar",
  age: 40,
};

const copiedPerson = { ...person };

const add2 = (...number: number[]) => {
  return number.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addNumbers = add2(5, 10, 2, 3.5);
console.log(addNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);

const { firstName: userName, age } = person;
console.log(userName,age,person);
