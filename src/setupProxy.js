const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://joshbarlowsite.duckdns.org:3141',
      changeOrigin: true,
    })
  );
};