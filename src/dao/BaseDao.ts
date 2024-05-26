import dBConf from "../conf/DbConfig";
import mysql, { Connection } from "mysql";

class BaseDao {
  // 所有Dao 的通用Dao
  static baseDao: BaseDao = new BaseDao();
  connection!: Connection;
  constructor() {
    this.connect();
  }
  async connect() {
    this.connection = await mysql.createConnection(dBConf.getConf());
  }
  async query<T>(sql: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
export default BaseDao.baseDao;
