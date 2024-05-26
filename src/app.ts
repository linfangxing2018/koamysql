/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-05-06 19:16:45
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-05-21 14:16:43
 * @FilePath: \koamysql\app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Koa from "koa";
// import body from "koa-body";
// import json from "koa-json";
// import Router from "koa-router";
// import useRouter from "./router/user";
import ALLRouterLoader from "./common/ALLRouterLoader";
import getConf from "./conf/DbConfig";

const app = new Koa();
// const router = new Router();
// router.prefix("/dang"); //为所有的路由访问添加路由前缀/dang，来作为一级路由
// http://localhost:3003/dang/usermodule/findUserinfo/admin
// getConf.getConf("dd"); // 错误提示
console.log(getConf.getConf("host"));
console.log(getConf.getConf(), "配置");
// router.get("/test", async (ctx: Koa.Context, next: Koa.Next) => {
//   ctx.body = "第一个测试页面";
//   // ctx.app.context 全局上下文
// });
// router.use(json());
// router.use(body());
// router.use(useRouter.routes(), useRouter.allowedMethods());
ALLRouterLoader.init(app);
//  加载路由到全局路由上
// app.use(router.routes());
// app.listen(3003);
// console.log("server running on port 3003");
