// const person: {
//     name:object;
//     age:number;
// } = {
var person = {
    name: "Omar",
    age: 40,
    hobbies: ["Sports", "Cooking"],
    role: [2, 'author']
};
// person.role.push('admin');
// person.role[1]= 10;
// person.role = [0, 'admin','user'];
var favoriteActivity;
favoriteActivity = ["Soprts"];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toLocaleUpperCase());
    // console.log(hobby.map()); // !!! Error !!!
}
