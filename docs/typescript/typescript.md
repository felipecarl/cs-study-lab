# Typescript

## Enums
- Is a structure
- Generates JS code
- Can be used as a value "GenderType.MALE"
- Exists in runtime
- console.log(GenderType.MALE) | "MALE"
- keyword `enum`

## Types
- Is a type declaration
- Only exists on TS, meaning, it does NOT generates JS code
- Does NOT exists in runtime
- console.log(GenderType) | undefined
- keyword `type`
- Can be extended (inheritance) using `&`
- Cannot be redeclared
- Can represent objects, classes, functions
- Can represent union types, tuples, primitives, literals, etc
- Exists only in compile time
- Can be united | and interssected &
  ```ts
  type Id = string | number;

  type User = {
    name: string;
    age: number;
  };

  type Employee = User & { role: string };
  ```

## Interface
- keyword `interface`
- Can be extended (inheritance)
- Can be redeclared (merging)
  ```ts
    interface Person {
      name: string;
    }

    interface Person {
      age: number;
    }

    // ✅ Automatic Merge
    const p: Person = { name: 'Ana', age: 30 };
  ```
- Can represent objects, classes, functions
- CANNOT represent union types, tuples, primitives, literals, etc
- Exists only in compile time
- Interfaces define the form of a object or a class contract
- Good for modelling objects, classes, DTOs, parameters, component props


## Types VS Interfaces
- Merging
  ```ts
    interface A { x: number; }
    interface A { y: number; }

    const obj: A = { x: 1, y: 2 }; // ✅ works

    //----//----

    type B = { x: number; }
    type B = { y: number; } // ❌ error: duplicate identifier
  ```
- Extends vs. &
  ```ts
    interface A { x: number; }
    interface B extends A { y: number; } // ✅ interface extend

    //----//----

    type A = { x: number; }
    type B = A & { y: number; } // ✅ type intersection
  ```
- Flexibility
  ```ts
    // Types are more flexible, can represent anything
    type Status = 'PENDING' | 'DONE';
    type Callback = (value: string) => void;
    type ID = number | string;

    // Interfaces cant
    interface Status = 'PENDING' | 'DONE'; // ❌ erro
  ```
- Implementation on classes
  ```ts
    // Only interfaces can be implemented by classes 
    interface Flyable {
      fly(): void;
    }

    class Bird implements Flyable {
      fly() {
        console.log('Flying!');
      }
    }
  ```
- Performance / Compilation
  - The compilator treats them internally almost the same
  - No impact on performance between them
  - But interfaces are more optimized for tools and intelliSense
- In General
  - Interfaces: DTOs, contracts, simple entities
  - Types: unions, helpers, compositions etc

## Knowledge
### Union types
  - mean a value can be one type OR another
  - Example: `let value: string | number;`

### Tuples
  - A tuple is a fixed sized array, with fixed types on each position
  - Useful when the quantity and order of objects matter
  - And each position hast a different meaning
  ```ts
    let person: [string, number];
    person = ['John', 30];   // ✅ correct
    person = [30, 'John'];   // ❌ wrong order
  ```
  - readonly tuples
  ```ts
    const position: readonly [number, number] = [10, 20];
    position[0] = 99; // ❌ error - imutable tuple
  ```
  - rest elements tuple
  ```ts
    type StringPair = [string, ...string[]];
    const example: StringPair = ['main', 'extra1', 'extra2']; // ok
  ```

### enum-like object | const eum pattern
  - Not an official enum,  but behaves like a enum
  - Like the example below, it's a imutable literal object
  - Lighter than a enum, as only generates the object, enums generate the object + reverse map
  - Better practice than enums
  - Example
  ```ts
    export const TeamType = {
      MALE: 'MALE',
      FEMALE: 'FEMALE',
      MIXED: 'MIXED',
    } as const;
  ```

### string vs literal
- strings are just strings, the string type
- string literal is a specific type, like `let direction: 'LEFT' | 'RIGHT';`