import { defineConfig } from "tsup";
import { resolve } from "path";

const coreSrc = resolve(__dirname, "../core/src/index.ts");

export default defineConfig({
    entry: ["src/index.tsx"],
    format: ["esm", "cjs"],
    dts: {
        resolve: [/@patrojs\/core/],
    },
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
    noExternal: [/@patrojs\/core/],
    tsconfig: 'tsconfig.json',
    esbuildOptions(options) {
        options.alias = {
            ...options.alias,
            "@patrojs/core": coreSrc,
        };
    },
});
