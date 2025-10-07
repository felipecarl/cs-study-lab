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