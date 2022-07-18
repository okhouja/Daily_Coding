// const name1 = "Omar";
// let age = 40;
// const hobbies = true;

// const summarizeUser = (
//   userName: string,
//   userAge: number,
//   userHobbies: boolean
// ) => {
//   return (
//     "Name is " +
//     userName +
//     ", age is " +
//     userAge +
//     ", and the User has hobbies: " +
//     userHobbies
//   );
// };

// const add = (a: number, b: number) => a + b;
// console.log(add(2, 4));

// const addOne = (a: number) => a + 1;
// console.log(addOne(1));

// const addRandom = () => 1 + 2;
// console.log(addRandom());

// console.log(summarizeUser(name1, age, hobbies));

// Working With Objects , properties & methods

const person = {
  personName: "Omar",
  age: 40,
  greet() {
    console.log("Hi, I am " + this.personName);
  },
};

// person.greet();

// const printName = (personData: any) => {
//   console.log(personData.personName);
// };

const printName = ({ personName }: any) => {
  console.log(personName);
};
printName(person);

const { personName, age }: any = person;
console.log(personName, age);

// const copiedPerson = { ...person };
// console.log(copiedPerson);

// Arrays & Array Methods

const hobbies2: string[] = ["Sports", "Cooking"];
const [hobby1, hobby2] = hobbies2;
console.log(hobby1, hobby2);

// for (let hobby of hobbies2){
//   console.log(hobby);

// }
// console.log(hobbies2.map(hobby => 'Hobby: '+ hobby));

// console.log(hobbies2);
// hobbies2.push('Porgramming');
// console.log(hobbies2);

// const copiedArray = [...hobbies2];
// console.log(copiedArray);

// const toArray = (...args: any) => {
//   return args;
// };
// console.log(toArray(1,2,3,4));
