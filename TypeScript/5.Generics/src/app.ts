/* 
1.When can "Generics" come in very handy?
    In cases where you have a type actually works together with multiple other possible types
    (e.g. an object which emits data of different types).
    Generics help you create data structures that work together or wrap values of a broad variety of types
    (e.g. an array that can hold any type of data).

2. What's the idea behind constraints (when talking about generics)?
    Constraints allow you to narrow down the concrete types that may be used in a generic function etc.



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

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}
extractAndConvert({ name: "Omar" }, "name");

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Jake");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = { name: "Maxi" };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: "Mania" });
// /* */
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

// TS Generic Utility Types
// Partial

interface CourseGoal {
  title: string;
  description: string;
  completeUnit: Date;
}
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUnit = date;
  return courseGoal as CourseGoal;
}

// Readonly
const names: Readonly<string[]> = ["Max", "Anna"];
// names.push("Mark");
// names.pop("");
