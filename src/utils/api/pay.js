import http from '../https'

/**
 * 获取充值记录列表
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getListApi (data) {
  return http.post('/account/recharge_history', data)
}

/**
 * 获取用户可用优惠券
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getDiscountCouponApi (data) {
  return http.post('/account/get_coupons', data)
}
