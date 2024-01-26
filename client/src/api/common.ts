import request from './axios'

export const getApplicateHealth = () => {
  return request({
    method: 'get',
    url: '/health'
  })
}
