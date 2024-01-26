import axios from 'axios'
import whiteList from './white-list';
import { ElMessage } from 'element-plus'
import router from '@/router'

const controller = new AbortController();
const token = localStorage.getItem('token')

axios.defaults.baseURL = 'https://wooc.com:8000/api';
axios.defaults.timeout = 5000;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

const errorHandle = (error: any) => {
  if (error.response) {
    // 请求已发出，服务器响应状态码非 2xx
    const { status } = error.response
    if (status) {
      const errorText = codeMessage[status]
      ElMessage.error({
        message: `错误码 ${status}: ${errorText}`,
        duration: 2.5
      })
    }
  } else {
    ElMessage.error({
      message: `${error.code}: ${error.message}`,
      duration: 2.5
    })
  }
}

axios.interceptors.request.use(function (config) {
  const isNeedToken = whiteList.includes(config.url || '')
  if (isNeedToken) {

    if (token) {

      // config.headers['Authorization'] = 'Bearer ' + token
      console.log(config)
    } else {
      // Abort request and redirect to "/login" when need token and token is not exist.
      console.log('Please log in first!')
      ElMessage.error({
        message: `Please log in first!`,
        duration: 2.5
      })
      controller.abort()
      router.push('/login')
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  errorHandle(error)
  return Promise.reject(error);
});

export default axios;
