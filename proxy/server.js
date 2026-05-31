const http = require('http');

const OLLAMA = 'http://127.0.0.1:11434';
const PORT = 11435;

const server = http.createServer((req, res) => {
  // CORS: allow the Vercel front end and local tooling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Only proxy /api/* requests
  if (!req.url || !req.url.startsWith('/api/')) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const body = [];
  req.on('data', (chunk) => body.push(chunk));
  req.on('end', () => {
    const data = Buffer.concat(body);

    const options = {
      hostname: '127.0.0.1',
      port: 11434,
      path: req.url,
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const proxy = http.request(options, (ollamaRes) => {
      res.writeHead(ollamaRes.statusCode || 502, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      ollamaRes.pipe(res);
    });

    proxy.on('error', (err) => {
      console.error('Ollama error:', err.message);
      res.writeHead(502);
      res.end(JSON.stringify({ error: 'Ollama unavailable' }));
    });

    proxy.write(data);
    proxy.end();
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`PlantDoc proxy -> http://127.0.0.1:${PORT}`);
  console.log(`Forwarding to Ollama -> ${OLLAMA}`);
});
