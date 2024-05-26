import { UserModel } from "./../definemodel/UserinfoDefine";
/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-05-06 19:57:05
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-05-24 18:12:21
 * @FilePath: \koamysql\src\router\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Context } from "koa";
import Router from "koa-router";
import userDao from "../dao/UserDao";
import Userinfo from "../interface/Userinfo";
import UserDaoOrm from "../dao/UserDaoDefine";

const router = new Router();
router.prefix("/usermodule");
// :username 是占位
// http://localhost:3003/dang/usermodule/findUserinfo/wangwu
router.get("/findUserinfo/:username/:psw", async (ctx: Context) => {
  const { username, psw } = ctx.params;
  // const name = username.join("-"); // 错误测试
  const userinfo: Userinfo[] = await userDao.findUserinfo(username, psw);
  console.log(userinfo[0], "userinfo");
  const dbUserinfo = userinfo[0];
  ctx.body = ctx.success(`欢迎! ${dbUserinfo.psw}`);
});
router.get("/findAllUser", async (ctx: Context) => {
  const userModel = await UserDaoOrm.findUserinfo();
  ctx.body = userModel;
});
// router.get("/findUserinfoBykey/:key", async (ctx: Context) => {
//   const { key } = ctx.params;
//   const userModel = await UserDaoOrm.findUserinfoBykey(key);
//   ctx.body = userModel;
// });
router.get("/findUserinfoBykey/:key/:value", async (ctx: Context) => {
  const { key, value } = ctx.params;
  const userModel = await UserDaoOrm.findUserinfoBykey(key, value);
  ctx.body = userModel;
});
router.get("/findUserinfoLikeName/:key/:rules", async (ctx: Context) => {
  const { key, rules } = ctx.params;
  const userModel = await UserDaoOrm.findUserinfoLikeName(key, rules);
  ctx.body = userModel;
});
// router.post("/addUser", async (ctx: Context) => {
//   const user = ctx.request.body; // post 获取参数的方式
//   ctx.body = `您好:${user.username},年龄:${user.age}`;
// });
router.post("/addUser", async (ctx: Context) => {
  const user: Userinfo = ctx.request.body;
  console.log(user);
  const dbUser = await UserDaoOrm.addUser(user);
  console.log("dbUser:", dbUser);
  ctx.body = dbUser;
});
module.exports = router; // 导出一个函数，该函数返回路由实例
