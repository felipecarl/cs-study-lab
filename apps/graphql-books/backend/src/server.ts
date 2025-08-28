import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

/**
 * Data in memory (simulating a database)
 */
// Creating types
type Author = { id: string; name: string }
type Book = { id: string; title: string; year: number; authorId: string }

// Those arrs will be our mock DB 
const authors: Author[] = [
  { id: '1', name: 'Ursula K. Le Guin' },
  { id: '2', name: 'Isaac Asimov' },
  { id: '3', name: 'Octavia E. Butler' },
]

const books: Book[] = [
  { id: '101', title: 'A Wizard of Earthsea', year: 1968, authorId: '1' },
  { id: '102', title: 'The Left Hand of Darkness', year: 1969, authorId: '1' },
  { id: '201', title: 'Foundation', year: 1951, authorId: '2' },
  { id: '202', title: 'I, Robot', year: 1950, authorId: '2' },
  { id: '301', title: 'Kindred', year: 1979, authorId: '3' },
]

/**
 * Typedefs SDL: types and operations
 * TypeDefs are written in SDL
 */
const typeDefs = /* GraphQL */ `
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    year: Int!
    author: Author!
  }

  type Query {
    authors: [Author!]!
    author(id: ID!): Author
    books: [Book!]!
    book(id: ID!): Book
  }

  input AddBookInput {
    title: String!
    year: Int!
    authorId: ID!
  }

  type Mutation {
    addBook(input: AddBookInput!): Book!
  }
`

/**
 * Resolvers: how to respond to each field/operation
 */
const resolvers = {
  Query: {
    authors: () => authors,
    author: (_: unknown, args: { id: string }) => authors.find(a => a.id === args.id),
    books: () => books,
    book: (_: unknown, args: { id: string }) => books.find(b => b.id === args.id),
  },

  Mutation: {
    addBook: (_: unknown, { input }: { input: { title: string; year: number; authorId: string } }) => {
      const author = authors.find(a => a.id === input.authorId)
      if (!author) throw new Error('Author not found')
      const id = String(Math.floor(Math.random() * 10_000) + 1000)
      const newBook: Book = { id, title: input.title, year: input.year, authorId: input.authorId }
      books.push(newBook)
      return newBook
    },
  },

  // Resolution of relational fields
  Author: {
    books: (parent: Author) => books.filter(b => b.authorId === parent.id),
  },
  Book: {
    author: (parent: Book) => authors.find(a => a.id === parent.authorId)!,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(server, { listen: { port: 4001 } }).then(({ url }) => {
  console.log(`🚀 GraphQL pronto em ${url}`)
})
