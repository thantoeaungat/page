import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';

const config = {
	input: 'src/social-contact.js',
	plugins: [
		image(),
		babel({
			babelHelpers: 'bundled'
		})
	],
};

export default config;