const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('https');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.DEPS_URL && new URL(process.env.DEPS_URL);
module.exports = function expressMiddleware(router) {
  url &&
    router.use(
      '/backend',
      createProxyMiddleware({
        target: `${url.origin}/backend`,
        secure: false,
        agent: http.globalAgent,
        limit: '100mb',
        timeout: 50000,
        proxyTimeout: 50000,
        changeOrigin: true,
      }),
    );
};
