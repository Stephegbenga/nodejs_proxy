const http = require('http');
const url = require('url');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

proxy.on('error', (err, req, res) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Something went wrong. And we are reporting a custom error message.');
});

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const target = query.target; // Read target from query parameter

  if (!target) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Target URL is required as a query parameter');
    return;
  }

  proxy.web(req, res, { target });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
