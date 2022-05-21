/* A First Class Decorators */

// function Logger(constructor: Function) {
//   console.log("Logging...");
//   console.log(constructor);
// }

function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const hookE1 = document.getElementById(hookId);
    const p = new constructor();
    if (hookE1) {
      hookE1.innerHTML = template;
      hookE1.querySelector("h1")!.textContent = p.name;
    }
  };
}

// @Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")

class Person {
  name = "Omar";

  constructor() {
    console.log("Creating person Object....");
  }
}
const pers = new Person();
console.log(pers);
