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
