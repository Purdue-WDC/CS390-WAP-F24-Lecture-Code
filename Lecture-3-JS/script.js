// I. HELLO WORLD

// console.log("Hello World!")

// a. DECLARING VARIABLES

// i. Const cannot be reassigned.

// const some_number = 0;
// some_number = 1; // gives: TypeError: Assignment to constant variable.
// console.log(some_number);

// ii. Let and var can be reassigned.

// let some_number = 0;
// var some_number = 0;
// some_number = 1;
// console.log(some_number);


// II. UNDERSTANDING DATA TYPES

// a. NUMBER

// const a = 100.3;
// const b = 10.3;
// console.log(a * b);

// b. STRING

// const a = "hello ";
// const b = 'world!'; // Double quotes and single quotes both work.
// console.log(a + b);

// c. BOOLEAN

// const a = true;
// const b = false;
// console.log(a || b);
// console.log(a && b);
// console.log(!a);

// d. UNDEFINED

// const a = undefined;
// const a; // Note: a const cannot start uninitialized.
// let a;
// console.log(a);

// e. NULL

// const a = null;
// console.log(a);

// f. OBJECTS

// i. user-defined objects

// const person = {
//     name: "John Doe",
//     email: "jd@gmail.com"
// };
// console.log(person.name); // you can access each value via object.key
// person.name = "Sam"; // we can also change key's value via object.key = new_value
// console.log(person);

// ii. arrays

// const a = [ 1, 2, "sup", [] ];
// a.push(person);
// a.pop();
// console.log(a);

// h. type conversion

// console.log(Number("10"));
// console.log(String(10));
// console.log(Boolean(0), Boolean(1));

// III. BASIC PROGRAMMING

// i. blocks and scoping

// {
//     var x = 5;
// }
// console.log(x); // x is out of scope, so for const and let we get the error: ReferenceError: x is not defined.
                   // but var defies this scoping rule, meaning we do not run into the error.

// ii. conditionals

// if (false) {
//     console.log("if block")
// } else {
//     console.log("else block")
// }

// iii. truthy and falsy: if a non-boolean value is provided where a boolean is needed (as is with if-statements), JS will implicity convert it to true ("truthy") or false ("falsy") depending on its value.

// const is_truthy = (x) => Boolean(x);
// const is_truthy = (x) => !!x; // negation forces boolean conversion, so it tells us if a value is "falsy". So, double negation tells us if a value is "truthy". 
// console.log(is_truthy(0));
// console.log(is_truthy(""));
// console.log(is_truthy([]));
// console.log(is_truthy({}));
// console.log(is_truthy(null));
// console.log(is_truthy(undefined));

// iv. comparison

// console.log(5 == 5, 5 == "5"); // true, true
// console.log(5 != 5, 5 != "5"); // false, false
// console.log(5 === 5, 5 === "5"); // false, true
// console.log(5 !== 5, 5 !== "5"); // false, true
// console.log(5 < 10, 5 > 10, 5 < 5, 5 <= 5); // true, false, false, true
// console.log("abc" < "xyz"); // true (due to lexographical ordering)
// console.log([1,2] > [1]) // true (array comparison is based off length)
// console.log({} == {}, { name: "Joe" } > {}) // false, false (object comparison is just always false)

// iv. loops

// a. while loops
// let i = 0;
// while (i < 10) {
//     console.log(i);
//     i = i + 1; // shortand is: i += 1; or even i++;
// }

// b. regular for loops
// for (let i = 0; i < 10; i = i + 1) {
// 	console.log(i)
// }

// c. for of loops
// let arr = ["1st item", "2nd item", "3rd item"];
// for (let item of arr) {
// 	console.log(item);
// }

// d. for in loops
// let arr = ["1st item", "2nd item", "3rd item"];
// for (let index in arr) {
// 	console.log(index);
//     console.log(arr[index]);
// }

// e. functions

// const add = (x, y) => {
//     return x + y;
// };
// function add(x, y) { // this is another way we can define functions. There is a minute difference between the 2, but it's negligible for now.
//     return x + y;
// }
// const add = (x, y) => x + y; // if our function is just 1 return statement, we can use this shorthand.
// const result = add(5, 10);
// console.log(result);