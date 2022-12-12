import adapter from '@sveltejs/adapter-node';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: true,
		}),
		appDir: '_app',
		paths: {
			base: ''
		}
	}
};

export default config;
