// const person: {
//     name:object;
//     age:number;

// } = {
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role:[number, string];
// }= {
//   name: "Omar",
//   age: 40,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, 'author']
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const Author = 2;

enum Role { ADMIN = 'ADMIN', READ_ONLY= 100, AUTHOR= 'AUTHOR'};

const person = {
  name: "Omar",
  age: 40,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN
};

// person.role.push('admin');
// person.role[1]= 10;

// person.role = [0, 'admin','user'];

let favoriteActivity: string[];
favoriteActivity = ["Soprts"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toLocaleUpperCase());
  // console.log(hobby.map()); // !!! Error !!!
}

if (person.role === Role.ADMIN){
    console.log('is ADMIN');
    
}