import axios from "axios";

const instance = axios.create({
  baseURL: "",
  timeout: 10000
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    error.msg = "服务器忙，请稍后再试!";
    return Promise.reject(error);
  }
);

export function get(path, data = {}, config = {}) {
  return instance.get(path, {
    ...config,
    params: data
  });
}

export function del(path, data = {}, config = {}) {
  return instance.delete(path, {
    ...config,
    params: data
  });
}

export function post(path, data = {}, config = {}) {
  return instance.post(path, data, config);
}

export function put(path, data = {}, config = {}) {
  return instance.put(path, data, config);
}

export default {
  get,
  del,
  post,
  put
};
