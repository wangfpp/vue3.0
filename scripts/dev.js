/**
 * @Description: 打包开发环境
 * @Author: wangfpp
 * @Date: 2021.08.29
 */ 
/**
 * @Description: 打包所有文件
 * @Author: wangfpp
 * @Date: 2021.08.29
 */ 
 const fs = require("fs");
 const execa = require("execa"); // 开启子进程
 const target = "reactivity"
 
 build(target)

 /**
  * @description 打包的功能函数
  * @param { String } 打包的文件夹的名字
  */ 
 async function build(target) {
   await execa("rollup", ["-cw", "--environment", `TARGET:${target}`], {stdio: "inherit"});
 }