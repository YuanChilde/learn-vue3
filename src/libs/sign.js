import CryptoJS from 'crypto-js'

// SHA256
const sha256 = (data) => {
  return CryptoJS.SHA256(data).toString()
}
// MD5
const md5 = (data) => {
  return CryptoJS.MD5(data).toString()
}

const getDateTimeToString = () => {
  const date_ = new Date()
  let year = date_.getFullYear()
  let month = date_.getMonth() + 1
  let day = date_.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  let hours = date_.getHours()
  let mins = date_.getMinutes()
  let secs = date_.getSeconds()
  let msecs = date_.getMilliseconds()
  if (hours < 10) hours = '0' + hours
  if (mins < 10) mins = '0' + mins
  if (secs < 10) secs = '0' + secs
  if (msecs < 10) secs = '0' + msecs
  return year + '' + month + '' + day + '' + hours + '' + mins + '' + secs
}

const getNonce = () => {
  return Math.random().toString(36).substring(2)
}

/**
 * 接口参数签名
 * @param {*} config 请求配置
 */
export const sign = (config, appId, appSecret, signType) => {
  // 获取到秒级的时间戳,与后端对应
  let data = {
    APP_ID: appId,
    TIMESTAMP: getDateTimeToString(),
    SIGN_TYPE: signType,
    NONCE: getNonce()
  }

  const _singKey = 'SIGN'
  const _secretKey = 'SECRET_KEY'
  let keys = []
  if (config.method === 'get') {
    // url参数签名
    data = config.params = Object.assign(config.params ? config.params : {}, data)
    keys = Object.keys(data)
  } else {
    // request body参数的内容
    data = config.data = Object.assign(config.data ? config.data : {}, data)
    keys = Object.keys(data)
  }
  // 排序
  const skeys = keys.sort()
  let str = ''
  skeys.filter(k => {
    return k !== _singKey && k !== _secretKey
  }).map(k => {
    const v = data[k]
    if (v || v === 0) {
      // 参数值为空，则不参与签名
      str = str + k + '=' + v + '&'
    }
  })
  str = str + _secretKey + '=' + appSecret
  let sign = ''
  if (data.SIGN_TYPE === 'MD5') {
    sign = md5(str).toUpperCase()
  }
  if (data.SIGN_TYPE === 'SHA256') {
    sign = sha256(str).toUpperCase()
  }
  if (config.method === 'get') {
    config.params[_singKey] = sign
  } else {
    config.data[_singKey] = sign
  }
  return config
}
