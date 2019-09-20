
//将引入axios库单独保存一个文件中
//2:引入axios库
import axios from "axios"

import env from '@/env'
//4:设置请求基础路径
axios.defaults.baseURL = env.baseURL

//全局响应拦截器，方便前台数据解析无需每个res.data
axios.interceptors.response.use(response => {
  return Promise.resolve(response.data)
}, error => {
  return Promise.reject(new Error(
    error.response ? error.response.data : '网络错误'
  ))
})


//3:发送请求时保存session信息
axios.defaults.withCredentials=true

export default axios