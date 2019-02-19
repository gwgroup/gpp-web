import http from '../https'

/**
 * 获取红包活动列表
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getListApi (data) {
  return http.post('/red-packet/get_actives', data)
}

/**
 * 创建红包活动
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function saveRedPackageApi (data) {
  return http.post('/red-packet/create_active', data)
}
