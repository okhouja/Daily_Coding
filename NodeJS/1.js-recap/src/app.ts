let name1 = "Omar";
let age: number = 40;
let hobbies = true;

function summarizeUser(
  userName: string,
  userAge: number,
  userHobbies: boolean
) {
  return (
    "Name is " +
    userName +
    ", age is " +
    userAge +
    ", and the User has hobbies: " +
    userHobbies
  );
}

console.log(summarizeUser(name1, age, hobbies));
