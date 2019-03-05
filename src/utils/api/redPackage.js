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
 * 获取红包活动详情
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getLoadApi (data) {
  return http.post('/red-packet/load_cards', data)
}

/**
 * 创建红包活动
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function saveRedPackageApi (data) {
  return http.post('/red-packet/create_active', data)
}

/**
 * 生成红包卡
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function createRedPackageCardApi (data) {
  return http.post('/red-packet/generate_cards', data)
}
