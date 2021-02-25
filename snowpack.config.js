/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		/* ... */
	},
	plugins: [['@snowpack/plugin-sass']],
	routes: [
		/* Enable an SPA Fallback in development: */
	],
	optimize: {
		/* Example: Bundle your final build: */
		minify: true
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		watch: true,
		clean: true,
		out: 'build'
	}
};
