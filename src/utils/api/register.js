import http from '../https'

/**
 * 获取手机号验证码
 * @param data {mobile: ''}
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getMobileVialCode (data) {
  return http.post('/user/send_vali_sms', data)
}

/**
 * 获取邮箱验证码
 * @param data {email: ''}
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getEmailVialCode (data) {
  return http.post('/user/send_vali_email', data)
}

/**
 * 手机号注册
 * @param data { mobile, vali_code, password, display_name }
 * @returns {AxiosPromise<any>}
 */
export function registerMobile (data) {
  return http.post('/user/regedit_with_mobile', data)
}

/**
 * 邮箱注册
 * @param data { email, vali_code, password, display_name }
 * @returns {AxiosPromise<any>}
 */
export function registerEmail (data) {
  return http.post('/user/regedit_with_email', data)
}
