/* *** Built-in Generics *** */

// const names: Array<string> = []; // string[]
// // names[0].split(' ');

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });
// promise.then((data: any) => {
//   data.split(" ");
// });

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergeObj = merge(
  { name: "Omar", hobbies: ["Sports", "Cooking"] },
  { age: 40 }
);
console.log(mergeObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got" + element.length + " elements.";
  }
  return [element, descriptionText];
}
console.log(countAndDescribe(["sports", "Cooking"]));
console.log(countAndDescribe("Hi"));
console.log(countAndDescribe(""));
console.log(countAndDescribe("T"));
