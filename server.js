const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

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
