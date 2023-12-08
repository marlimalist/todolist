const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
	if (process.env.DEV_PROXY === "true") {
		const { targets, defaultTarget } = require(path.resolve(__dirname, "configuration/dev.proxyConfig.js"));

		targets.forEach(entry => {
			app.use(entry.path, createProxyMiddleware(entry));
		});
		app.use(
			"/marcapo_platform",
			createProxyMiddleware({
				target: defaultTarget,
				changeOrigin: true,
			})
		);
	}
};
