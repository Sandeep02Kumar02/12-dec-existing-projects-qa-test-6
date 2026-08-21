const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// The service publishes exactly two endpoints, `GET /` and `GET /good-evening`.
// Express matches paths case-insensitively and tolerates a trailing slash by
// default, so it would also answer `/Good-Evening` and `/good-evening/`. Both
// relaxations are switched off so that only the exact documented paths resolve.
// These settings are read when the application's router is first created, which
// happens on the first route registration below, so they must be applied first.
app.set('case sensitive routing', true);
app.set('strict routing', true);

// Both endpoints are GET-only. Express additionally serves HEAD from a GET route
// implicitly and answers OPTIONS automatically with an `Allow` header, and
// neither is part of the published contract. Passing control out of the route
// table with `next('router')` hands the request to Express's default handler, so
// every non-GET method receives the same 404 as an unmatched path.
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    next('router');
    return;
  }

  next();
});

app.get('/', (req, res) => {
  res.status(200).type('text/plain').send('Hello, World!\n');
});

app.get('/good-evening', (req, res) => {
  res.status(200).type('text/plain').send('Good evening\n');
});

// Express 5 registers this callback for the server's 'error' event as well as
// 'listening', so it receives an Error (e.g. EADDRINUSE) when the bind fails.
// The error must therefore be inspected before the readiness line is written,
// otherwise a failed startup would still report the server as running.
app.listen(port, hostname, (err) => {
  if (err) {
    console.error(`Failed to start server at http://${hostname}:${port}/`, err);
    process.exitCode = 1;
    return;
  }
  console.log(`Server running at http://${hostname}:${port}/`);
});
