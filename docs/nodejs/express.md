# Express

## What is it?
- Is a http server framework, built on top of node.js
- Just a layer on convenience (syntatic sugar + middlewares + routing)
- NodeJs by itself has a native http module, that can create servers

## Pure NodeJs vs Express
- Pure
  ```js
  import http from 'http';

  const server = http.createServer((req, res) => {
    if (req.url === '/hello' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!');
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  server.listen(3000);
  ```
- Express
  ```js
  import express from 'express';

  const app = express();

  app.get('/hello', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(3000);
  ```