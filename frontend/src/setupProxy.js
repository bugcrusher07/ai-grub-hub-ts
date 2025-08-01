const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://ai-grub-hub-ts-production.up.railway.app',
            changeOrigin: true,
        })
    );
};
