import http from '../https'

export function getListApi (data) {
  return http.post('/red-packet/get_actives', data)
}
