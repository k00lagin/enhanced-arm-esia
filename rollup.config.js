import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only'

const production = !process.env.ROLLUP_WATCH;
let preamble = '// ==UserScript==\n' +
	'// @name        Enhanced ARM ESIA\n' +
	'// @namespace   k00lagin.enhanced-arm-esia\n' +
	'// @version     0.0.3\n' +
	'// @description Make ARM ESIA great again!\n' +
	'// @author      k00lagin\n' +
	'// @match       https://esia.gosuslugi.ru/ra/*\n' +
	'// @grant       GM_setValue\n' +
	'// @grant       GM_getValue\n' +
	'// @grant       GM_setClipboard\n' +
	'// @grant       GM_notification\n' +
	'// ==/UserScript==\n';

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/enhanced-arm-esia.js',
		banner: preamble
	},
	plugins: [
		css({ output: 'bundle.css' }),
		svelte({
			dev: !production
		}),

		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		!production && serve(),

		production && terser({
			output: {
        beautify: false,
        preamble: preamble
    	}
		})
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
