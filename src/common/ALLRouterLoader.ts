/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-05-07 21:08:12
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-05-12 10:19:40
 * @FilePath: \koamysql\src\common\ALLRouterLoader.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Koa, { Context } from "koa";
import fs from "fs";
import path from "path";
import body from "koa-body";
import json from "koa-json";
import Router from "koa-router";
import globalException from "./GlobalExce";
import * as resResult from "./ResResult";

// interface IResponse {
//   code: number;
//   msg: string;
//   data: any;
// }
// declare module "koa" {
//   interface Context {
//     success: (data: any, msg?: any) => IResponse;
//     fail: (msg?: any) => IResponse;
//   }
// }
// Koa.prototype.context.success = resResult.success;
// Koa.prototype.context.fail = resResult.fail;

class AllRouterLoader {
  app!: Koa;
  static allRouterLoader: AllRouterLoader = new AllRouterLoader();
  // 初始化方法
  init(app: Koa) {
    this.app = app;
    // 响应处理
    Object.assign(this.app.context, resResult);
    // 加载路由
    const rootRouter = this.loadAllRouterWrapper();
    // 使用路由
    this.app.use(globalException);
    this.app.use(rootRouter.routes());
    // 4. 监听方法
    this.listen();
  }

  // 1. 加载所有路由文件
  getFiles(dir: string) {
    return fs.readdirSync(dir);
  }
  // 2. 加载所有路由文件绝对路径数据
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), "/src/router");
    const allFiles = this.getFiles(dir);
    const allFullFilePath: string[] = [];
    for (let file of allFiles) {
      const fullFilePath = dir + "\\" + file;
      allFullFilePath.push(fullFilePath);
    }
    console.log(allFullFilePath, "allFullFilePath");
    return allFullFilePath;
  }
  // 3.0 获取一级路由
  getRootRouter() {
    const rootRouter = new Router();
    rootRouter.prefix("/dang");
    this.app.use(json());
    this.app.use(body());
    return rootRouter;
  }
  // 自定义守卫
  isRouter(data: any): data is Router {
    return data instanceof Router;
  }
  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (let fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath);
      console.log(module.routes(), "加载成功");
      console.log(module instanceof Router, "加载成功1234");
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods());
      }
    }
  }

  // 3. 加载所有二级路由到以及路由
  loadAllRouterWrapper() {
    // 3.0 获取一级路由
    const rootRouter = this.getRootRouter();
    //  3.1  调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths();
    //  3.2  调用加载所有二级路由到一级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter);
    return rootRouter;
  }
  listen() {
    this.app.listen(3003);
    console.log("在3003端口监听....");
  }
}

export default AllRouterLoader.allRouterLoader;
