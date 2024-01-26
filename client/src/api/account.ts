import request from './axios'

interface LoginWithPasswordDataType {
  account: string
  password: string
}
export const loginWithPassword = (data: LoginWithPasswordDataType): Promise<any> => {
  return request({
    method: 'post',
    url: '/auth/login'
  })
}

export const getUserInfoById = (params: { id: string }): Promise<any> => {
  return request({
    method: 'get',
    url: `/users/${params.id}`
  })
}
