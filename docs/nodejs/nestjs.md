# NestJs

## What is?
- Is a Node/Ts framework inspired in Angular + Spring: modules, dependency injection (DI), controllers, providers, pipes, guards, mirroring java architecture.

## How it works?
- IMPORTANT: NestJs is NOT a HTTP framework, nesti s actually an application framework, not an HTTP server
- It is like an orchestrator, managing DIs, modules, controllers, pipes, guards, interceptors, filters, etc
- It does need an HTTP engine, Express by default or Fastify (faster)
- What happens inside `NestFactory.create(AppModule)`
  - 1. Nest creates the IoC container, based on modules and providers on AppModule
    - Registers all services (@injectable()), controllers, interceptors
    - Resolves DIs and builds the dependecy graph
  - 2. Creates a HTTPAdapter instance
    - By default, express
    - `new ExpressAdapter(express())
    - Instantiates a pure Express app, this adapter is the translation layer between Nest/Express
  - 3. Creates the nest application
    - `const nestApp = new NestApplication(context, expressAdapter, httpServer);`
    - context: IoC container (modules, providers, metadata)
    - expressAdapter: bridge to express
    - httpServer: the HTTP server itself
- What express handles?
  - creates the http server
  - handles routes
  - handles middlewares
  - manages request response cycle
- What nest handles?
  - Solves which controller and which method will return the route
  - applies pipes (validation) before the controller
  - applies guards (authentication, authorization) before the execution
  - applies interceptors (logging, response transformation)
  - handles exceptions with global filters
  - return the result back to express
- Full flow: Client → HTTP → Express → Nest Router → Guards → Pipes → Controller → Service → Response → Express → Client
- Express can be replaced by fastify at anytime, that's because Nest never talks to express directly, it talks to a generic http interface called `AbstractHttpAdapter`
  
  
## Misc
- @Decorators are a design pattern that allow for the modification or extension of classes, methods or properties at definition time, they provide a way to add functionality to existing code without affecting it's source.

## DTO (Data Transfer Object)
- It's an object that defines how data are sent or recived by its application, usually between Controller -> Service or Client -> API
- Kinda like a default format that defines the structure and rules for the data that get in / out of your application
- In NestJs, it is used to guarantee types, validation and security of requests

## Modules
- Logical agrupators of functionalities.
- Example: A `UsersModule` has everything related to users (controllers, services, specific providers)
- In nestJs they are classes with the decorator `@Module`, definining imports, controllers and providers.
- Example: 
```ts
  @Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService],
  })
  export class UsersModule {}
```

## Dependency Injection (DI)
- A design pattern that says: dont create dependencies straight inside the class (new Something()), instead declare what you need and let the framework deliver the instance.
- Why use it?
  - Facilitates tests (can inject mocks)
  - Facilitates maintenance (does not couples classes to concrete implementations)
  - Favors reuse
  - For a class to be injectable, it has to be marked with `@Injectable()`
  - NestJs has a IoC (Inversion of Control) container, it is, a system that creates, stores and injects automatically the objects your application needs, instead of using `new` by yourself
    - Without IoC
    ```ts
      class UsersService {
        constructor(private db: DatabaseService) {}
      }

      const db = new DatabaseService();
      const users = new UsersService(db);
    ```
    - With IoC
    ```ts
      // some file
      @Injectable()
      class DatabaseService {}

      @Injectable()
      class UsersService {
        constructor(private db: DatabaseService) {}
      }

      // another file
      @Module({
        providers: [DatabaseService, UsersService],
      })
      export class AppModule {}
    ```

## Controllers
- Responsible for handling HTTP requests
- They DONT have business rules, they only call services
- Use the decorator @Controller + methods @Get(), @Post() etc...
- Example: 
```ts
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  }
```

##  Providers
- Any class or function that can be a DI
- Services, Repos, Fatories, Helpers, are all providers in Nest
- On Nest, anything with wih `@Injectable` is a provider

## Pipes
- Pré-processors of request data, used to validate or transform parameters before getting to the controller
- Example: transform string "123" to the number 123.
- 
## Guards
- Authorization filters, that choose if the request can go on
- Example: check if the user is auth or has some permission
- Code example:
```ts
  @Injectable()
  export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      return request.user?.role === 'admin';
    }
  }
```

## TypeORM
- TypeORM = TypeScript Object-Relational Mapper
- It's a lib (ORM) that connects typescript to a relational DB, allowing working with classes/objects instead of writing pure SQL, like mongoose for mongodb

## Nest CLI
- `nest g` or `nest generate` -> `nest generate <type> <path>`
  - it reads the decorator metadata and generates boilerplate code accordingly tto the selected option: module, controller, service, gateway(websocket), guard, interceptor, etc
  - example: `pnpm nest g module modules/players` will create the module inside `src/modules/players/players.module.ts`
  - `2️⃣ pnpm nest g controller modules/players --flat` will create the controller, as its using the flag `--flat`, will not create a subfolder `/controller`

## Entities
- Example
  ```ts
    // this decorator tells TypeORM: this class represents a table called "players on DB"
    @Entity('players')
    // creates a unity restriction on the db, meaning, there cannot be two registers with same email: in postgre "ALTER TABLE players ADD CONSTRAINT unique_email UNIQUE(email);"
    @Unique(['email'])
    export class Player {
      //  Creates a column id that is the primary key and is self-incremental, in postgre it's a SERIAL or BIGSERIAL <id SERIAL PRIMARY KEY;>
      @PrimaryGeneratedColumn() id: number;
      // Creates a text column with 120char limit
      @Column({ length: 120 }) name: string;
      @Column({ length: 180, nullable: true }) email?: string;
      @Column({ type: 'float', default: 0 }) rating: number; // futuro: Elo
      @CreateDateColumn() createdAt: Date;
      @UpdateDateColumn() updatedAt: Date;
    }
  ```
- Another Example
  ```ts
    // a register of a table can be related to many registers of another table
    // this decorator does NOT creates a column, just sets the relationship between entities
    // { eager: true }: everytime a Team is searched, find the related Players, without eager, the default behaviour is lazy loading, maki ".find({ relations: ['players'] }))." necessary.
    @ManyToMany(() => Player, { eager: true })
    // This means, create a intermediary table called "team_players" to store this relationship
    @JoinTable({ name: 'team_players' })
  ```
  - The arrow fn on the example above (`() => Player`), fixes the circular import issue, that is when two files depend on each other, otherwise typeORM would try to load Player when loading Teams, but it would not be loaded yet, as Team also depends on Player, what this arrow function does is telling typeORM that it should wait for all entities to be loaded, and then, would return the required entity. 

## Structure

### src/main.ts
- is the core of a NestJS application, it's the entry point, from where the app starts executing
- NestFactory: is a factory that creates the main instance of Nest application, it initializes the IoC container, injects all modules and creates the HTTP server (by default, express)
- bootstrap Function: contains the `NestFactory.create(AppModule)`, the AppModule is the root module, and the create() fn loads all modules, controllers, providers and DIs defined inside AppModule
- `app.globalPrefix('api')`: will add "/api" to all the app routes, making versioning easier
- `app.enableVersioning`: allows support for api versions, to be able to maintain compatibility between new and old clients
- `app.useGlobalPipes`: validationPipe is a powerfull tool
  - whitelist: true -> automatically removes fields not defined on DTO
  - forbidNonWhitelisted: true -> throws errors if client sends non existant field
  - transform: true -> convert tipes automatically, "123" -> 123
- `app.enableCors()`: activates CORS (Cross-Origin Resource Sharing), allowing frontend in another domain/port access the API, without this, browser would block requests from port 3001, 3000 etc
-  `const config = new DocumentBuilder()`: swagger auto documentation
-  `await app.listen(process.env.PORT || 3000);` will start the server :D
-  `bootstrap();` executes the main fn

### src/app.module.ts
- Is the root module of the application, where Nest loads all configs and modules
- In nest, everything spins around Modules
- `@Module()` decorator, tells Nest that the class is a logical container
- `imports: [...]` lists other modules that will be loaded and be available globally inside nest
- `ConfigModule.forRoot({ isGlobal: true })` automatically loads env vars from `.env`, creates a global provider called ConfigService, that can be injected at any location of the app
  - `isGlobal: true` makes unecessary to import `ConfigService` around other modules, it's global automatically
- `TypeOrmModule.forRootAsync()` configures TypeORM, for SQL DBs
  - `forRootAsync()` indicates that the config will be async (may depend on env vars, initialization of other modules, etc)
  - Inside the forRootAsync
    - `inject: [ConfigService]` tells nest "before running `useFactory`, inject the instance of ConfigService here, that means, nest resolves ConfigService using DI
    - `useFactory: (cfg: ConfigService) => ({ ... })` is a configuration factory, a fn that returns the configuration object of the TypeORM, inside of it the cfg (ConfigService) is used to read env vars dynamically, it returns something like a default `ormconfig.js`
    - `type: 'postgres'` -> sets db driver
    - `url` -> complete connection string (user, password, host, db)
    - `autoLoadEntities` -> register all entities (@Entity) without having to list them manually
    - `synchronize: false` -> should never be `true` in production, as it creates/modify automatically based on entities, only useful in dev
    - `logging: true` -> logs executed SQL queries, good for debugging