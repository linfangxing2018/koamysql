import deConConf from "../conf/DbConfig";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine();
  sequelize!: Sequelize;
  constructor() {
    console.log("初始化sequelize...");
    this.initSequelize("mysql");
  }
  initSequelize(dialect: Dialect) {
    // 创建sequelize对象
    let { host, user, password, database, port } = deConConf.getConf();
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect,
      define: {
        timestamps: false,
        freezeTableName: true,
      },
    });
  }
}
export const { sequelize } = BaseDaoDefine.baseDaoOrm;
