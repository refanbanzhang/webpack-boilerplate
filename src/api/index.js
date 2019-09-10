import axios from "axios";
import axiosSetting from "./axiosSetting";

axiosSetting();

function get(path, data = {}, config = {}) {
  return axios.get(path, {
    ...config,
    params: data
  });
}

function post(path, data = {}, config = {}) {
  return axios.post(path, data, config);
}

/**
 * 校验交易密码
 * @param {*} url
 * @param {*} pswd
 */
export function checkPaymentPswd(oldPwd) {
  return post("/user/checkpaypwd.do", {
    oldPwd
  });
}

/**
 * 获取车辆列表
 */
export function getVehicleList() {
  return get("/peccancy/queryUserCarList.do");
}

/**
 * 删除指定id车辆
 */
export function delVehicleById(id) {
  return post("/peccancy/delUserCar.do", {
    id
  });
}

/**
 * 添加车辆
 */
export function addVehicle(data) {
  return post("/peccancy/addUserCar.do", data);
}

/**
 * 获取违章数据
 */
export function getPeccancyList(vehicle) {
  return post("/peccancy/peccancyQuery.do", {
    vehicle
  });
}

/**
 * 违章代办
 */
export function peccancyDeal(data) {
  return post("/peccancy/peccancyDeal.do", data);
}

/**
 * 查询违章详情
 */
export function peccancyQueryDetail(data) {
  return post("/peccancy/peccancyQueryDetail.do", data);
}
