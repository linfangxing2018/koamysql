/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-05-20 18:26:29
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-05-20 18:26:39
 * @FilePath: \koamysql\src\interface\Userinfo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 跟数据库定义的字段一致
export default interface Userinfo {
  userid: number;
  username: string;
  psw: string;
  address: string;
  valid: number;
}
