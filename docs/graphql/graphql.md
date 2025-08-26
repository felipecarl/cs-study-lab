# GraphQL

## Knowledge
- Kinda like SQL but different
- Query language developed for APIs and also a runtime (that is, an engine that solves the queries)
- Created by Facebook


## Compared to REST
- On REST, each entity has it's own endpoints, like `get /users`, `/users/:id/posts` and so on
- On GraphQL, only one endpoint exists `/graphql`

## What does it solves
- Overfetching (getting more data/fields than necessary)
- Underfetching (getting not enough data, like querying for some data em the field `age` is not present, making it necessary to query another endpoint, more costly
- Strongly typed schema!

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


