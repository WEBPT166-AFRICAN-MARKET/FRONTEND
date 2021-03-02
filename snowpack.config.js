/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	root: '/',
	mount: {
		/* ... */
	},
	plugins: [['@snowpack/plugin-sass']],
	routes: [
		/* Enable an SPA Fallback in development: */
	],
	optimize: {
		/* Example: Bundle your final build: */
		minify: true,
		bundle: true
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {}
};
