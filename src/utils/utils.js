/**
 * 查询参数重置
 * @param {*} params 重置参数
 */
export function reset (params) {
  const open = ['page_index', 'page_size', 'sort_by', 'descending']
  Object.keys(params).filter(val => {
    if (open.findIndex(key => key === val) === -1) {
      params[val] = null
    }
  })
}

/**
 * 时间格式化
 * @param fmt
 * @param date
 * @returns {*}
 */
export function dateFtt (fmt, date) {
  var o = {
    'M+': date.getMonth() + 1,                 //月份
    'd+': date.getDate(),                    //日
    'h+': date.getHours(),                   //小时
    'm+': date.getMinutes(),                 //分
    's+': date.getSeconds(),                 //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds()             //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}
