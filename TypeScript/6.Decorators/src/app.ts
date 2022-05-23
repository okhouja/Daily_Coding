/* A First Class Decorators */

// function Logger(constructor: Function) {
//   console.log("Logging...");
//   console.log(constructor);
// }

function Logger(logString: string) {
  console.log("LOGGER FACTORY");

  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");

  return function (constructor: any) {
    console.log("Renedering template");

    const hookE1 = document.getElementById(hookId);
    const p = new constructor();
    if (hookE1) {
      hookE1.innerHTML = template;
      hookE1.querySelector("h1")!.textContent = p.name;
    }
  };
}

// @Logger("LOGGING - PERSON")
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Omar";

  constructor() {
    console.log("Creating person Object....");
  }
}
const pers = new Person();
console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Ivalid price - Should be positive");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
