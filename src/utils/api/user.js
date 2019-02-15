import http from '../https';

export function getUserLoad (data) {
  return http.post('/user/load', data)
}
