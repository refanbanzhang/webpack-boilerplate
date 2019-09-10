import { get, post } from "./steup";

/**
 * 校验交易密码
 * @param {String} oldPwd
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
 * @param {String} id
 */
export function delVehicleById(id) {
  return post("/peccancy/delUserCar.do", {
    id
  });
}

/**
 * 添加车辆
 * @param {Object} data
 */
export function addVehicle(data) {
  return post("/peccancy/addUserCar.do", data);
}

/**
 * 获取违章数据
 * @param {Object} vehicle
 */
export function getPeccancyList(vehicle) {
  return post("/peccancy/peccancyQuery.do", {
    vehicle
  });
}

/**
 * 违章代办
 * @param {Object} data
 */
export function peccancyDeal(data) {
  return post("/peccancy/peccancyDeal.do", data);
}

/**
 * 查询违章详情
 * @param {Object} data
 */
export function peccancyQueryDetail(data) {
  return post("/peccancy/peccancyQueryDetail.do", data);
}
