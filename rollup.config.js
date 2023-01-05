/*
 * @Description:
 * @Date: 2022-07-06 10:15:25
 */

const path = require('path');

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import jsx from 'acorn-jsx';
import babel from 'rollup-plugin-babel';
import typescript from 'typescript';
import clear from 'rollup-plugin-clear';
import rollupTypescript from 'rollup-plugin-typescript2';
import rollupVue from 'rollup-plugin-vue';
import rollupPostcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

import json from '@rollup/plugin-json';

const outdir = 'lib';

export default {
  input: 'packages/index.ts',
  output: [
    {
      format: 'esm',
      file: `${outdir}/index.esm.js`
    },
    {
      name: 'fd',
      format: 'umd',
      file: `${outdir}/index.umd.js`
    }
  ],
  plugins: [
    clear({ targets: [outdir] }),
    resolve(),
    json(),
    rollupTypescript({
      check: false,
      include: ['packages/**/*.ts+(|x)', 'tools/**/*.ts+(|x)'],
      exclude: 'node_modules/**',
      typescript: typescript
    }),
    rollupVue({
      preprocessStyles: true
    }),
    rollupPostcss({
      extract: path.resolve(`${outdir}/index.css`),
      plugins: [autoprefixer()]
    }),
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ],
  acornInjectPlugins: [jsx()],
  external: ['vue', 'xrk-tools']
};
