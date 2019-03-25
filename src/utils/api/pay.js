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
 * 加载充值记录
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getLoadApi (data) {
  return http.post('/account/recharge_load', data)
}

/**
 * 获取用户可用优惠券
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getDiscountCouponApi (data) {
  return http.post('/account/get_coupons', data)
}

/**
 * 优惠券充值
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function payDiscountCouponApi (data) {
  return http.post('/account/coupon_recharge', data)
}

/**
 * 微信充值
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function payWeixinApi (data) {
  return http.post('/account/weixin_recharge', data)
}

/**
 * 微信充值状态查询
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function payWeixinQueryApi (data) {
  return http.post('/account/weixin_recharge_query', data)
}
