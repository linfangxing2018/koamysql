import { Op } from "sequelize";
import Userinfo from "../interface/Userinfo";
import userModel, { UserModel } from "../definemodel/UserinfoDefine";

class UserDaoDefine {
  static useDao: UserDaoDefine = new UserDaoDefine();
  async findUserinfo(): Promise<UserModel[]> {
    return (await userModel.findAll({
      raw: true, // 返回原始结果
    })) as UserModel[];
  }
  async findUserinfoBykey(key: string, value: any): Promise<UserModel[]> {
    return (await userModel.findAll({
      raw: true,
      attributes: [key],
      where: {
        [key]: value,
      },
    })) as UserModel[];
  }
  async findUserinfoLikeName(key: string, rules: string): Promise<UserModel[]> {
    return (await userModel.findAll({
      raw: true,
      // attributes: [key],
      where: {
        [key]: {
          [Op.like]: `%${rules}%`,
        },
      },
    })) as UserModel[];
  }
  async addUser(userinfo: Pick<Userinfo, keyof Userinfo>) {
    return (await userModel.create(userinfo)) as unknown as Userinfo;
  }
}
export default UserDaoDefine.useDao;
