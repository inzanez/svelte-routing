import adapter from '@sveltejs/adapter-node';

import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			includePaths: ['theme']
		}
	}),
	kit: {
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: true,
			env: {
				host: '0.0.0.0',
				port: '8080'
			}
		}),
		// Relative to 'assets' path below! Importante:-)
		appDir: '_app',
		paths: {
			base: '/base/path'
		},
		ssr: false,

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$utils: path.resolve('./src/utils')
				}
			}
		}
	}
};

export default config;
