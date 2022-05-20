/* *** Intersection Type *** */

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployess extends Admin, Employee{}

type ElevatedEmployess = Admin & Employee;

const e1: ElevatedEmployess = {
  name: "Omar",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
/* End of Intersection Type */

// Function Overloads and Type Guard

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;

/* Function Type Guard
What's a "Type Guard"?
- A code pattern where you check for ceertain type before you try to do something with it at runtime.
 * so With type guards you avoid runtime errors by checking types before you try to do something with the values.
*/

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add("John", "Smith");
result.split(" ");

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
printEmployeeInformation({ name: "Alex", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}
class Truck {
  drive() {
    console.log("Driving a Truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo...." + amount);
  }
}
type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
/* End of Type Gaurd*/

/*  *** Discriminated Type *** */

interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Miving at speed: " + speed);
}

moveAnimal({ type: "horse", runningSpeed: 10 });
moveAnimal({ type: "bird", flyingSpeed: 10 });
/* */

/* *** Type Casting *** */

// const paragraph = document.querySelector("p");
// const paragraph = document.getElementById("message-output");

// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
// const userInputElement = document.getElementById(
//   "user-input"
// )! as HTMLInputElement;
// userInputElement.value = "Hi there!";

const userInputElement = document.getElementById("user-input")!;
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}
/* */

/* *** Index Type *** */

interface ErrorContainer {
  // {email: 'Not a valid email', username: 'Must start with a character!'}
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a character!",
};
/* */

/* *** Optionam Chaining *** */

const fetchedUserData = {
  id: "u1",
  name: "Paul",
  job: { title: "CEO", description: "My own Company" },
};
console.log(fetchedUserData?.job?.title);
/* */

// Nullish Coalescing

// const userInput = "";
const userInput = undefined;

const storedData = userInput ?? "DEFAULT";

console.log(storedData);
/* */
