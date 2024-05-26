import StringUtil from "../common/StringUtil";
import baseDao from "./BaseDao";
import Userinfo from "../interface/Userinfo";
class UserDao {
  constructor() {
    console.log("创建UserDao...");
  }
  static userDao: UserDao = new UserDao();
  findUserinfo(username: string, psw: string) {
    let sql = `select * from userinfo where 1 = 1 `;
    if (StringUtil.isNotEmpty(username)) {
      sql += ` and username = '${username}'`;
    }
    if (StringUtil.isNotEmpty(psw)) {
      sql += ` and psw = '${psw}'`;
    }
    return baseDao.query<Userinfo[]>(sql);
  }
}

export default UserDao.userDao;
