// const person: {
//     name:object;
//     age:number;

// } = {
const person = {
  name: "Omar",
  age: 40,
  hobbies: ["Sports", "Cooking"],
};

let favoriteActivity: string[];
favoriteActivity = ["Soprts"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toLocaleUpperCase());
  // console.log(hobby.map()); // !!! Error !!!
}
