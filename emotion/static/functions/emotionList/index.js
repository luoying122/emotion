const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  // 先取出集合记录总数
  return db.collection('emotion').where({
    user_id: event.openid
  }).get()
  // const total = countResult.total
  // // 计算需分几次取
  // const batchTimes = Math.ceil(total / 100)
  // // 承载所有读操作的 promise 的数组
  // const tasks = []
  // for (let i = 0; i < batchTimes; i++) {
  //   const promise =
  //   tasks.push(promise)
  // }
  // 等待所有
  // return (await Promise.all(tasks)).reduce((acc, cur) => ({
  //   data: acc.data.concat(cur.data),
  //   errMsg: acc.errMsg
  // }))

}
