import { Context } from "koa";

declare module "koa" {
  interface Context {
    params: any;
    // 你可以添加更多的自定义属性
  }
}
