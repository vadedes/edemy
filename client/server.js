//this server is meant for development mode only, so we could implement cookie storage
//need to install http-proxy-middleware dependency first
//this server is just a proxy of the actual server, the actual server should still be running and this proxy server will connect to the main server

const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    //apply proxy in dev mode
    if (dev) {
      server.use(
        '/api',
        createProxyMiddleware({
          target: 'http://localhost:3333',
          changeOrigin: true,
        })
      );
    }
    //
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('>Ready on http://localhost:3333');
    });
  })
  .catch((err) => {
    console.log('Error', err);
  });
