# Javascript

## History
- Brendan Eich at Netscape in 1995
- Named in a deal between Netscape and Sun
- ECMA standard calls it ECMAScript (ECAMScript is the official name)
- A language embedded in the browser
- Only language in all modern web browsers


## How it works
- Js sees the content of the page as the DOM (Document Object Model), the hierarchy of objects representing page content in web browsers

## Data Types
- numbers
- booleans
- strings
- arrays -> AKA lists
- objects -> AKA dictionaires
- functions
- null

## Arithmetic Operators
- Follows normal order, * or / before + or -, unless inside ()
- + -> sum
- - -> subtract
- / -> divide
- * -> multiply
- % -> modulus

## Syntax
- expression(arguments)
- infix | prefix | postfix
  - Usually infix (2 + 3 | a && b | x > y)
  - Sometimes prefix (!x | ++x | --x)
  - Sometimes postfix (x++ | x--)
- target (lvalue) = expression (rvalue)
- use semicolons after each expression (;)
- free-form syntax (does not care about white-space, cares about semicolons)
- // single line commnet
- /* */ multi line comment (cannot be nested)
- these are all valid: _foo, foo_bar, $foo, foo$bar
- variables: use var / let to create
- variables created without value will have the value `undefined`

## functions
- created with the word `function`
- function nameOfFunction (parameters) { bodyOfFunction }
- js will create a variable and assin a function to it (a Function Object)
- like: var someFn = function(somePar) {someBody};

  ### nested functions
  - function created inside another function
  - the nested function, will be assigned to a local variable inside the parent function scope
  - variables/parameters created inside the nested function are scope to the nestedfun, not the parent function
  - each new call of the parent function will create another instance of the nested function
  - nested functions can have variables with the same name of the parents/grandparents functions, but the nesteds variables will take precedence, but it is better to just not have same names

  ### closure
  - A closure happens when a function keeps access to variables from its lexical scope, even after that scope has finished executing.
  - When a function remebers the scope it was created, even after it has done executing.
  - Example:
    ```js
    function outer() {
      let count = 0;
      function inner() {
        count++;
        console.log(count);
      }

      return inner;
    }

    const counter = outer(); // creates the closure
    counter(); // 1
    counter(); // 2
    counter(); // 3
    ```
  - usually local vars libe count would be deleted
  - but, as `inner` uses `count`, JS keeps it scope alive in the memory
  - the result is a closure: `inner` + it's external variables
- another example
  ```js
    function someCalc(a) {
      function addTo(b) {
        return a = a + 3;
      }
      return addTo;
    }
    var test = someCalc(5);
    someCalc(); // 8
    someCalc(); // 11
    someCalc(); // 14
  ```
  ```js
    function foo(a) {
      function bar(b) {
        return a + b;
      }
      return bar;
    }
    var greg = foo(2);
    var lisa = foo(3);
    greg(6); // 8
    lisa(6); // 9
  ```

## Logical Operators
- ! not
- === equals
- !== not equals
- && and
- || or
- < less than
- > greater than
- <= less than or equal
- >= greater than or equal
- unary operator?: A unary operator is an operator that performs an operation on a single operand, such as negating a number with the unary minus, or performing a logical NOT (!x).

## Seems true
- !true // false
- !false // true
- !null // true
- !0 // true
- !"" // true
- !undefined // true

## Identifiers
- Is a sequence of chars in code that identifies a variable, function or property
- Case sensitive and not quoted
- Can contain unicode letters, $, _, and digits 0-9, but may NOT start with a digit
- Identifiers differ from a string, in that string is data, while identifiers are part of the code.
- Converting identifiers to strings is not possible, but sometimes parsing strings into identifiers is possible

## Objects
- Made of key + value pairs, those pairs are called properties
- Keys can only be strings, not numbers etc
- To access properties we use `object[string]` (squared backets)
- Example:
  ```js
    var foo = {};
    foo["name"] = "potato";
    console.log(foo["name"]); // potato
  ```
- We can also access properties as, `foo.potato` (dot operator) (must follow the rules for identifiers)
- Square brackets is more flexible, as we can do something like `david[alice()] = 3`, we cant use the dot operator to do the same.
- Methods, synonym to a fn, used in the context of OOO, is a function which is defined as an operation for some data type
- In JS it is defined as a function that uses the reserved word `this`
- when the function property is accessed via the dot operator or squared brackets and called, js passes the obj to this, in the example below, foo is passed as `this` 
  ```js
    var foo = {};
    foo.bar = function () {
      this.ack = 3;
    };
    foo.bar();
    var x = foo.ack; // 3
  ```
- Below, as the method is not directly accessed, the obj passed is the global object, ack becomes a part of the global object, then, can be directly access via the variable, as it becomes a global variable
  ```js
    var foo = {};
    foo.bar = function () {
      this.ack = 3;
    };
    var greg = foo.bar;
    greg(); // the 'global object' gets passed as this
    var x = ack; // 3
  ```
- we CANT assign values to `this`, like `this = 3`, it will trigger an error

### Object linking
```js
  var foo = {a: 1, b: 2, c: 3}; 
  var bar = {a: 4, d: 5};
  var ack = {b: 6, e: 7}; 
  // for <- bar <- ack
  // var x = foo.c === bar.c === ack.c;
  bar.c = 8;
  x = ack.c; // 8 
  x = foo.c; // 3
```
- To create a linked obj, we must use the reserver word `new`
```js
  function Tom(foo, bar) {
    this.foo = foo;
    this.bar = bar;
  }
  var jane = new Tom(2, 3);
```
- `new` operator is a unary operator, which takes as is operand, a call to function, it passes newly created object to that function special parameter `this`, it returns a newly created object.
- 


## Strings
- besides not being objects, they have a link to a obj, that have methods and properties
- like someString.length or "somestring".charAt(3);


## Postfix vs prefix
- Prefix (already uses the incremented value)
let x = 5;
let y = ++x;

console.log(x); // 6
console.log(y); // 6  ← already incremented

- Postfix (uses value without the increment)
let x = 5;
let y = x++;

console.log(x); // 6
console.log(y); // 5 -> old value