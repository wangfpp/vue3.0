/**
 * @Description: 打包所有文件
 * @Author: wangfpp
 * @Date: 2021.08.29
 */ 
const fs = require("fs");
const execa = require("execa"); // 开启子进程

const packagesAll = fs.readdirSync("packages"); // 找到package下所有的文件

// 过滤文件 保存文件夹
const packageDir = packagesAll.filter(item => {
  return fs.statSync(`packages/${item}`).isDirectory();
})


/**
 * @description 打包的功能函数
 * @param { String } 打包的文件夹的名字
 */ 
async function build(target) {
  await execa("rollup", ["-c", "--environment", `TARGET:${target}`], {stdio: "inherit"});
}


/**
 * @description 打包的基类
 * @param { String } 打包的文件夹名字
 * @param { Funtion } 打包的函数
 */ 
function buildHandler(targets, buildFn) {
  const res = [];
  targets.forEach(item => {
    let p = buildFn(item);
    res.push(p);
  })
  return Promise.all(res);
}

buildHandler(packageDir, build);