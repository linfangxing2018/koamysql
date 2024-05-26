/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-05-16 16:51:26
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-05-21 14:14:44
 * @FilePath: \koamysql\src\conf\DbConfig.ts
 * @Description:  TS 实现 mySql 配置【方法重载+泛型综合】
 */

interface DbConConf {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
  // useConnectionPooling: boolean;
}
interface EnvConf {
  dev: DbConConf;
  prod: DbConConf;
}
class Conf {
  static conf: Conf = new Conf();
  env!: keyof EnvConf;
  envConf!: EnvConf;
  constructor() {
    this.env = process.env.NODE_ENV === "dev" ? "dev" : "prod";

    this.initConf();
  }
  initConf() {
    this.envConf = {
      dev: {
        host: "localhost",
        user: "admin",
        password: "123456",
        database: "test",
        // useConnectionPooling: true,
        port: 3306, // 默认端口号
      },
      prod: {
        host: "www.newdomain.com",
        user: "root",
        password: "123",
        database: "dangdang",
        // useConnectionPooling: true,
        port: 3306,
      },
    };
  }
  // 函数重载签名
  getConf(): DbConConf;
  getConf(key: keyof DbConConf): string;
  // 函数实现签名
  getConf(key: any = ""): any {
    if (isDbConConfKeys(key) && key.length > 0) {
      return this.envConf[this.env][key];
    } else {
      return this.envConf[this.env];
    }
  }

  setEnvConfig<T extends keyof DbConConf>(key: T, value: DbConConf[T]): void;
  setEnvConfig<T extends keyof DbConConf>(
    data: T | DbConConf,
    value?: any
  ): void {
    if (isDbConConfKeys(data)) {
      this.envConf[this.env][data] = value;
    } else {
      this.envConf[this.env] = data;
    }
  }
}

const isDbConConfKeys = (key: any): key is keyof DbConConf => {
  return (
    key === "host" ||
    key === "database" ||
    key === "port" ||
    key === "user" ||
    key === "password"
  );
};
export default Conf.conf;
