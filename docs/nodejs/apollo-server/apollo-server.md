# Apollo Server

## Knowledge
- Is the nodejs implementation of the graphQL runtime
- Is the engine between schemas and resolvers
- Workflow:
  - 1. Receives the query (HTTPS or Websocket)
  - 2. Validates against the schema (typeDefs)
  - 3. Execute the corresponding resolvers
  - 4. Returns the JSON file
- Analogy
  - Schema (typeDefs) = is the contract (the restaurant menu)
  - Resolvers = the kitchen (who prepares each plate of the menu)
  - Apollo Server = the waitress that receives the order, check if the menu has it, sends to the kitchen and then delivers the right plate

## Why use Apollo?
- GraphQL is the specification (the recipe)
- We need a lib/server to implement this recipe
- Apollo Server is the market default
- Alternatives: Yoga / Mercurius

## What can be setup with Apollo Server
- Schema: `typeDefs` + `resolvers`
- Context: extra data injected on all resolvers (auth user, db connection)
- Plugins: logs, tracing, rate limit
- Validation rules: limit the dept of the query, cost
- Transportation: HTTP / WebSocket (subscriptions)