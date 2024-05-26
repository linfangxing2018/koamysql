/*
 * @Author: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @Date: 2024-05-12 09:19:09
 * @LastEditors: linfangxing@jinlingkeji.cn linfangxing@jinlingkeji.cn
 * @LastEditTime: 2024-05-12 10:16:41
 * @FilePath: \koamysql\src\common\ResResult.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 数字枚举成员还具有了 反向映射 Code[500]
enum Code {
  SUCCESS = 200,
  SERVERERROR = 500,
}
class ResResult {
  static success(data: any = undefined, msg: any = "") {
    return {
      code: Code.SUCCESS,
      data,
      msg,
    };
  }
  static fail(msg: any = "") {
    return {
      code: Code.SERVERERROR,
      data: undefined,
      msg,
    };
  }
}

export let { success, fail } = ResResult;
