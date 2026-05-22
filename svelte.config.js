import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		paths: {
			base: '/questionnaire',
			assets: 'https://ebichu.cc/questionnaire',
		},
		csrf: {
			trustedOrigins: [
				'http://localhost:3001',
				'http://127.0.0.1:3001',
				'https://ebichu.cc',
				'https://void.ebichu.cc',
			]
		}
	}
};

export default config;
