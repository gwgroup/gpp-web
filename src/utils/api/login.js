import http from '../https'

/**
 * 登录接口
 * @param data {username: '', password: ''}
 * @returns {AxiosPromise<any>}
 */
export function login (data) {
  return http.post('/user/login', data)
}
