import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import url from "postcss-url";
import terser from '@rollup/plugin-terser';

const isProduction = process.env.PRODUCTION === 'true';

export default {
    input: "src/index.ts",
    output: {
        file: "public/" + (isProduction ? "countdown.min.js" : "countdown.js"),
        // Self-executing function for script tag
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
        }),
        peerDepsExternal(),
        resolve({ browser: true, main: true }),
        typescript({ tsconfig: "./tsconfig.json"}),
        commonjs(),
        postcss({
            extensions: [".css"],
            modules: true,
            plugins: [
                url({
                    url: "inline"
                })
            ]        
        }),
        // Minifica il codice in produzione
        isProduction && terser(),
        // Server di sviluppo
        !isProduction && serve({
            open: false,
            verbose: true,
            contentBase: ["", "public"],
            host: "localhost",
            port: 4000,
        }),
        // Ricarica automatica del browser
        !isProduction && livereload({ watch: "public", })
    ].filter(Boolean)
};