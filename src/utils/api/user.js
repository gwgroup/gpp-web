import http from '../https'

/**
 * 获取用户详情
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getUserLoad (data) {
  return http.post('/user/load', data)
}

/**
 * 重置手机账户密码
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function resetMobilePas (data) {
  return http.post('/user/reset_mobile_account_password', data)
}

/**
 * 重置邮箱账户密码
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function resetEmailPas (data) {
  return http.post('/user/reset_email_account_password', data)
}
