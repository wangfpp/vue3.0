/**
 * @Description: Rollup的配置 
 * @Author: wangfpp
 * @Date: 2021.08.29
 */ 
import path from "path";
import json from "@rollup/plugin-json";
import resolveNode from "@rollup/plugin-node-resolve";
import ts from 'rollup-plugin-typescript2';

const { TARGET } = process.env; // 环境变量的TARGET
const packagesDir = path.resolve(__dirname, "packages");
const packageDir = path.resolve(packagesDir, TARGET);

// 解析文件
const resolveFile = file => path.resolve(packageDir, file);

let packageJson = require(resolveFile("package.json"));
let { buildOptions: { name, supports }  } = packageJson;
const outputConfig = {
  "esm-bundler": {
    file: resolveFile(`dist/${TARGET}.esm.bundler.js`),
    format: "es"
  },
  "cjs": {
    file: resolveFile(`dist/${TARGET}.cjs.js`),
    format: "cjs"
  },
  "global": {
    file: resolveFile(`dist/${TARGET}.global.js`),
    format: "iife"
  },
}

function createConf(type, config) {
  config.name = name;
  config.sourcemap = true;
  return {
    input: resolveFile(`src/index.ts`),
    output: config,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, "tsconfig.json")
      }),
      resolveNode()
    ]
  }
}

export default supports.map(item => {
  return createConf(item, outputConfig[item])
})