import request from './axios'

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/health'
  })
}
