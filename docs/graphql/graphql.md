# GraphQL

## Knowledge
- SDL stands for `schema definition language`
- Kinda like SQL but different
- Query language developed for APIs and also a runtime (that is, an engine that solves the queries)
- Created by Facebook

## Compared to REST
- On REST, each entity has it's own endpoints, like `get /users`, `/users/:id/posts` and so on
- On GraphQL, only one endpoint exists `/graphql`

## What does it solves
- Overfetching (getting more data/fields than necessary)
- Underfetching (getting not enough data, like querying for some data em the field `age` is not present, making it necessary to query another endpoint, more costly)
- Strongly typed schema!
- Should be written with the client/frontend in mind, providing decoupling from the actura data storage

## Types
- int, float, string, boolean, ID
- own types can be created too


## TypeDefs vs Schema
| Aspecto           | TypeDefs                   | Schema                        |
|-------------------|----------------------------|-------------------------------|
| **Natureza**      | Declarativo                | Executável                    |
| **Conteúdo**      | Apenas definições de tipos | Tipos + lógica de resolução   |
| **Formato**       | String/SDL                 | Objeto GraphQLSchema          |
| **Propósito**     | Definir estrutura          | Executar operações            |
| **Reutilização**  | Facilmente compartilhável  | Específico para implementação |

## Types
```graphql
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```
- `Character` is a `GraphQL Object Type`
- `name` and `appearsIn` are fields of `Character` type
- **Scalar** type, is the atomic value, meaning it cannot be dismounted, example: string is a string, cannot go further than this
- `String!`, attention to the "!", that means this field is a **Non-Null type**, that GraphQL service will promise to give a value on this field
- `[Episode!]!` represents a list type of the `Episode` object type, the `[]!` means its ensured to have an array with one o zero elements
- As `Episode!` also have "!" then it means that the items inside the array will NOT be null, the array can be empty, but not have null items
  Eg:
    episodes: null ❌
    episodes: [null] ❌
    episodes: [] ✅

## Arguments
  ```graphql
  type Starship {
    id: ID!
    name: String!
    length(unit: LengthUnit = METER): Float
  }
  ```
  - Arguments can be either required or optional, when the argument is optional, we can define a default value
  - `length` field takes one argument called meter
  - If `unit` argument is not passed, it will be set to `METER` by default
  Can be used for a resolver like
  ```graphql
  Starship: {
    length: (parent, args) => {
      const meters = parent.lengthInMeters
      if (args.unit === 'FOOT') {
        return meters * 3.28084
      }
      return meters // default em metros
    }
  }
  ```

## Directives
- Allow us to modify parts of a graphQL schema or operation by usin an `@` character followed by the directive name
- Allow us to change how types, fields and arguments will be validated or executed
- Built-in directives:
  - `@deprecated` - annotates deprecated parts of the schema 
    - eg:
      ```graphql
      type User {
        fullName: String
        name: String @deprecated(reason: "Use `fullName`.")
      }
      ```
    - It's not necessary to define the `@deprecated` directive if using a GQL implementation that supports SDL, but it would be defined like this
      ```graphql
      directive @deprecated(
        reason: String = "No longer supported"
      ) on FIELD_DEFINITION | ENUM_VALUE
      ```
  - `@include(if: Boolean!)` - is a conditional, only includes the field if the exp is `true`
    - eg:
      ```graphql
      query getUser($withEmail: Boolean!) {
        user(id: 1) {
          name
          email @include(if: $withEmail)
        }
      }
      ```
  - `@skip(if: Boolean!)` - opposite of include, it will skip the field if the exp is `true`
    - eg: 
      ```graphql
      query getUser($hideEmail: Boolean!) {
        user(id: 1) {
          name
          email @skip(if: $hideEmail)
        }
      }
      ```
  - (GQL 2020+) `@specifiedBy` - scalates custom scalars, pointing to the URL that defines the specification of the type
    - eg: 
      ```graphql
      scalar UUID @specifiedBy(url: "https://tools.ietf.org/html/rfc4122")
      ```

  
  

## Basic Structure
- 1. Schema: Defines types and operations

  ```graphql
  type User {
    id: ID!
    name: String!
    age: Int
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }
  ```

- 2. Query: The client determines exactly which data he wants 
  ```graphql
  query {
    user(id: "1") {
      id
      name
    }
  }
  ```

- 3. Mutation (create/delete/edit data)
  ```graphql
  mutation {
    createUser(name: "Ana", age: 30) {
      id
      name
    }
  }
  ```

- 4. Subscription (real time): Websocket
  ```graphql
  subscription {
    newMessage {
      id
      content
    }
  }
  ```


## REST vs GRAPHQL Query
- ## REST
  - GET /users/1
  - GET /users/1/posts

- ## GraphQL
  ```graphql
  query {
    user(id: 1) {
      name
      posts {
        title
      }
    }
  }
  ```

## Concepts
- TypeDefs
  - Text written in SDL to describe types, queries, mutations...
  - A raw definition of the API contract
    Eg: 
    ```graphql
    type Author {
      id: ID!
      name: String!
      books: [Book!]!
    }
    ```
- Schema
  - Is the executable obj that Apollo (or other graphql server) uses in runtime.
  - Created using typeDefs + resolvers.
  - Eg:
    ```js
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    })
    ```
  

## Common Tools
- Apollo Server/Cliente: much used in node + react
- GraphQL Yoga: Light alternative
- GaphiQL/Playground: tool for query testing
- Relay: performance + cache

## Pattens and Good Practices
- Schema-first: draw the schema before implementing it
- Code-first: use decorators/TS to automatically generate the schema
- DataLoader: avoids N+1 queries
- Fragments: reuse queries
  Eg: 
  ```graphql
  fragment UserFields on User {
    id
    name
  }

  query {
    users {
      ...UserFields
    }
  }
  ```

## Study
- GraphQL vs REST
  - REST: Multiple endpoints with fixed payloads, prone to under/over fetching.
  - GraphQL: single endpoint, client defines what data he wants.
  - Resume: GraphQL is query driven, REST is endpoint driven.

- N+1 Queries problem
  - Caused by making another query for each result.
  Eg: Query 10 users (1 query), for each user, search for its posts (10 queries), 11 in total.
  - Solution: User DataLoader, or batching/caching techniques.
  DataLoader will group searches in a single optimized query.

- Overfetching / Underfetching
  - Over: getting more data than necessary
  Eg: `/users` returning `username, id, name, email` when just name was necessary.
  - Under: getting less data than necessary
  Eg: the user email and is readed books are necessary, query `/users` and `/users/:id/books`

- When NOT to use GraphQL
  - Simple APIs (few endpoints, small payloads)
  - Critical latency, as graphQL may add parsing/complexity
  - When security is an issue and query should not be flexible
  - straming of big files (images/videos)

- How real time subscription works
  - Subscription is a type of GraphQL operation for real time events
  - Usually implemented using websockets
  - Client opens a persistant connection -> server sends updates when something happens
  Eg: 
  subscription {
    newMessage {
      id
      content
    }
  }

## Exercise
- Build a schema for this:
  Author: id, name, books.
  Book: id, title, year, author.
  Queries: books, book(id), authors, author(id).
  Mutation: addBook.

  My answer:

  ```graphql
  addBook {
    author {
      id
      name
      books {
        id
        title,
        year
        author
      }
    }
  }
  ```
  
  Correct asnwer:

  - Write Schema first
  ```graphql
  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    year: Int
    author: Author!
  }

  type Mutation {
    addBook(title: String!, year: Int!, authorId: ID!): Book
  }
  ```

  - Then write the Query
  ```graphql
  mutation {
    addBook(title: "GraphQL Basics", year: 2025, authorId: "1") {
      id
      title
      year
      author {
        id
        name
        books {
          id
          title
          year
        }
      }
    }
  }
  ```


