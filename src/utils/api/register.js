import http from '../https';

/**
 * 获取手机号验证码
 * @param data {mobile: ''}
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function getMobileVialCode (data) {
  return http.post('/user/send_vali_sms', data)
}
