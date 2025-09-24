1. Fundamentos de Computação

Antes mesmo de falar de web, é bom consolidar algumas bases:

Como computadores representam dados: binário, bits, bytes, inteiros, floats, strings.

Como o SO gerencia recursos: processos, threads, memória.

Redes básicas:

TCP/IP (endereços, portas, camadas).

DNS (como o domínio vira IP).

Roteamento e pacotes.

Sistemas de arquivos: estrutura em árvore, permissões, links (hard/symlink).

👉 Exercício prático:
Rodar ping, traceroute, netstat, dig e entender cada saída.

2. Fundamentos da Web

HTTP:

Métodos (GET, POST, PUT, DELETE, PATCH, OPTIONS).

Status codes (200, 301, 404, 500…).

Headers (Content-Type, Accept, Cache-Control, Set-Cookie…).

HTTPS (TLS, handshake, certificados).

Ciclo Request → Response.

REST vs RPC vs GraphQL.

Armazenamento e cookies:

localStorage, sessionStorage, IndexedDB.

CORS e Same-Origin Policy.

👉 Exercício prático:
Usar curl para fazer requests e inspecionar com --verbose.

3. Estrutura de uma Página Web

HTML: DOM, semântica, parsing.

CSS: CSSOM, herança, especificidade, cascade.

JavaScript:

Event Loop (call stack, Web APIs, task queue, microtasks).

Tipagem dinâmica.

Closures, protótipo, this.

Promises e async/await.

Integração:

DOM + CSSOM = Render Tree.

Reflows e Repaints.

Performance (critical rendering path).

👉 Exercício prático:
Criar uma página com HTML/CSS/JS puro e medir performance com o DevTools.

4. O Browser por dentro

Aqui chegamos no "como funciona":

Pipeline do navegador:

Parsing HTML → DOM.

Parsing CSS → CSSOM.

DOM + CSSOM → Render Tree.

Layout (calcula posição/tamanho).

Painting (desenha pixels).

Compositing (camadas).

Event Loop dentro do browser.

Carregamento de scripts:

<script>, async, defer.

Segurança:

Sandboxing.

CSP (Content Security Policy).

XSS, CSRF.

Motores de browsers:

V8 (Chrome/Edge).

SpiderMonkey (Firefox).

JavaScriptCore (Safari).

Blink / WebKit (renderização).

Otimizadores:

JIT compilation (Ignition/TurboFan no V8).

Garbage Collector.

👉 Exercício prático:
Rodar about://tracing no Chrome, inspecionar o fluxo de parsing/render.

5. Rede e Browser

Como o browser resolve DNS.

Cache em várias camadas:

Browser cache.

HTTP cache.

Service Workers (PWA).

SSE, WebSocket, Fetch, XMLHttpRequest.

Service Workers e Offline.

👉 Exercício prático:
Criar um PWA simples que funciona offline.