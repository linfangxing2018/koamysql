/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-05-14 11:23:38
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-05-16 15:09:32
 * @FilePath: \koamysql\src\common\LogUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import log4js from "log4js";

enum LevelInfo {
  "trace" = "trace",
  "debug" = "debug",
  "info" = "info",
  "warn" = "warn",
  "error" = "error",
  "fatal" = "fatal",
}
class LogUtil {
  static logUtil: LogUtil = new LogUtil(); // 单例设计模式
  logInstance!: log4js.Logger; // 不写！会报错
  private constructor() {
    this.config();
  }
  config() {
    log4js.configure({
      appenders: {
        console: { type: "console" }, // 控制台打印
        defug_file: { type: "file", filename: "mylog/debug.log" }, // 写入到文件
      },
      categories: {
        default: {
          appenders: ["console", "defug_file"],
          level: LevelInfo.debug,
        },
        info: {
          appenders: ["console"],
          level: LevelInfo.info,
        },
        warn: {
          appenders: ["console"],
          level: LevelInfo.warn,
        },
      },
    });
  }
  getCategories(level: LevelInfo) {
    this.logInstance = log4js.getLogger(level);
  }
  // input 报错信息
  debug(input: string) {
    this.getCategories(LevelInfo.debug);
    this.logInstance.debug(input);
  }
}

export default LogUtil.logUtil;
