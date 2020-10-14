import Axios from 'axios'

import { createApp } from 'vue'

import { message } from 'ant-design-vue'

interface AxiosRequestMessage {
  show?: boolean
  callback?: () => void
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    message?: AxiosRequestMessage
  }
}

// 公共参数
const baseUrl = new URL(process.env.VUE_APP_BASE_URL)

// 公共Axios实例
const axios = Axios.create({
  baseURL: '',
  timeout: 10000
})

/**
 *
 * @param status
 */
const getErrorCode2text = (status: number): string => {
  let content: string
  switch (status) {
    case 400:
    case 412:
      //content = data.message;
      content = 'data.message'
      break
    case 401:
      content = '登录已过期，请重新登录'
      break
    case 403:
      content = '您没有权限，无法访问'
      break
    case 404:
      content = '访问资源不存在'
      break
    case 500:
      content = '服务异常'
      break
    default:
      //content = data?.message ?? "未知异常";
      content = '未知异常'
      break
  }
  return content
}

// Request 过滤器
axios.interceptors.request.use(request => {
  const { headers, params } = request
  // const { token } = Store.state.auth;

  // OAuth2用户Token注入
  // if (token) {
  //     const { header, value } = token.tokenData();
  //     headers[header] = value;
  // }

  // 过滤空参数
  if (params) {
    const keys = Object.keys(params)
    for (const key of keys) {
      const value = params[key]
      switch (value) {
        case undefined:
        case null:
        case '':
          delete params[key]
          break
      }
    }
  }

  return request
})

// Response 过滤器
axios.interceptors.response.use(
  response => {
    console.log('use reponse===', response)
    const { data } = response
    // if (response.status === 200) {
    // }
    console.log('use data===', data)
    return data
  },
  /** 请求无响应 */
  error => {
    if (error.response) {
      const { config, data, status } = error.response
      const show = config.message?.show ?? true

      if (show) {
        const callback = config.message?.callback

        // 处理各种状态下的消息
        console.log(status, data)
        const content = getErrorCode2text(status)

        message.error(content, undefined, callback)
      }
    }
    // 请求服务未响应，error.response为undefined，走此分支
    else if (error.message) {
      let __emsg: string = error.message || ''
      if (__emsg.indexOf('timeout') >= 0) {
        __emsg = '请求超时'
      }
      switch (__emsg) {
        case 'Network Error':
          message.error('网络错误, 无法连接服务器')
          break
        default:
          message.error(__emsg)
          break
      }

      // if (error?.response?.data?.code === 401) {
      //   return Promise.reject(new Error('401'))
      // }
      // return Promise.reject(new Error(__emsg))
    }
    throw error
  }
)

export default {
  // install方法会在app.use时调用
  install(app: ReturnType<typeof createApp>) {
    app.config.globalProperties.$http = axios
  },
  ...axios
}
