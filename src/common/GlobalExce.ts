// 全局异常处理
import Koa, { Context } from "koa";
import logUtil from "./LogUtil";
const globalException = async (ctx: Context, next: Koa.Next) => {
  console.log("进入中间件");
  try {
    await next();
  } catch (err: any) {
    logUtil.debug(err.message); // 收集日志
    ctx.body = ctx.fail(`服务器错误${err.message}`);
  }
};

export default globalException;
