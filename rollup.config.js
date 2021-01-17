import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import smelte from 'smelte/rollup-plugin-smelte';
import css from 'rollup-plugin-css-only';
import babel from "@rollup/plugin-babel";

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			},
		}),
		css({ output: 'bundle.css', exclude: ["**/tailwind.css"] }),
		/* it's important that you have tailwindcss installed as dependency */
		smelte({
			purge: production,
			output: "./public/global.css",
			darkMode: true
		}),

		/*for IE11... but support is VERY limited (it's best that you don't use IE at all)*/
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          exclude: ["node_modules/@babel/**", "node_modules/core-js-pure/**"],
          babelHelpers: "runtime",
          presets: [
            [
              "@babel/preset-env",
              {
                targets: '> 0.25%, not dead, IE 11',
              }
            ]
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-transform-runtime', {
			  useESModules: true,
			  corejs: 3
            }]
          ],
		}),
		
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
