webpackJsonp([0],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixIos12WeixinInputBug = fixIos12WeixinInputBug;
//	修复ios12中微信bug
function fixIos12WeixinInputBug() {
  var currentScrollTop = 0;

  function scrollTop(y) {
    y = y ? y : 0;
    $(window).scrollTop(y);
  }

  $("body").on("focus", "input", function (e) {
    currentScrollTop = $(window).scrollTop();
  });

  $("body").on("blur", "input", function () {
    scrollTop(currentScrollTop);
  });
}

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _api = __webpack_require__(8);

var _util = __webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vehicleTypes = [{ label: '大型汽车', value: '01' }, { label: '小型汽车', value: '02' }, { label: '使馆汽车', value: '03' }, { label: '领馆汽车', value: '04' }, { label: '境外汽车', value: '05' }, { label: '外籍汽车', value: '06' }, { label: '两、三轮摩托车', value: '07' }, { label: '轻便摩托车', value: '08' }, { label: '使馆摩托车', value: '09' }, { label: '领馆摩托车', value: '10' }, { label: '境外摩托车', value: '11' }, { label: '外籍摩托车', value: '12' }, { label: '农用运输车', value: '13' }, { label: '拖拉机', value: '14' }, { label: '挂车', value: '15' }, { label: '教练汽车', value: '16' }, { label: '教练摩托车', value: '17' }, { label: '试验汽车', value: '18' }, { label: '试验摩托车', value: '19' }, { label: '临时入境汽车', value: '20' }, { label: '临时入境摩托车', value: '21' }, { label: '临时行驶车', value: '22' }, { label: '警用汽车', value: '23' }, { label: '警用摩托车', value: '24' }, { label: '香港入出境车', value: '26' }, { label: '澳门入出境车', value: '27' }];

var provinces = [{ label: '粤', value: 0 }, { label: '苏', value: 0 }, { label: '闽', value: 0 }, { label: '湘', value: 0 }, { label: '鄂', value: 0 }, { label: '赣', value: 0 }, { label: '浙', value: 0 }, { label: '京', value: 0 }, { label: '沪', value: 0 }, { label: '津', value: 0 }, { label: '渝', value: 0 }, { label: '桂', value: 0 }, { label: '陕', value: 0 }, { label: '宁', value: 0 }, { label: '皖', value: 0 }, { label: '蒙', value: 0 }, { label: '贵', value: 0 }, { label: '晋', value: 0 }, { label: '琼', value: 0 }, { label: '辽', value: 0 }, { label: '吉', value: 0 }, { label: '黑', value: 0 }, { label: '冀', value: 0 }, { label: '甘', value: 0 }, { label: '豫', value: 0 }, { label: '鲁', value: 0 }, { label: '新', value: 0 }, { label: '川', value: 0 }, { label: '青', value: 0 }, { label: '云', value: 0 }, { label: '藏', value: 0 }];

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      tag: provinces[0].label,
      vehicleNo: '',
      vehicleType: '',
      vehicleTypeText: '请选择车辆类型',
      VIN: '',
      engineNo: '',
      ownerName: '',
      userPhone: ''
    };

    _this.validate = _this.validate.bind(_this);
    _this.submitHandle = _this.submitHandle.bind(_this);
    _this.switchTagHandle = _this.switchTagHandle.bind(_this);
    _this.clickHandle = _this.clickHandle.bind(_this);
    _this.changeHandle = _this.changeHandle.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _util.fixIos12WeixinInputBug)();
    }
  }, {
    key: 'changeHandle',
    value: function changeHandle(e) {
      var value = '';
      if (e.target.name === 'vehicleNo' || e.target.name === 'VIN' || e.target.name === 'engineNo') {
        value = e.target.value.toUpperCase();
      } else {
        value = e.target.value;
      }
      // 这里需要将车牌号 车架号 引擎号修改为大写
      this.setState(_defineProperty({}, e.target.name, value));
    }
  }, {
    key: 'clickHandle',
    value: function clickHandle(e) {
      var _this2 = this;

      weui.picker(vehicleTypes, {
        id: 'singleLinePicker',
        defaultValue: ['01'],
        onConfirm: function onConfirm(result) {
          if (result && result[0]) {
            _this2.setState({ vehicleTypeText: result[0].label });
            _this2.setState({ vehicleType: result[0].value });
          }
        }
      });
    }
  }, {
    key: 'switchTagHandle',
    value: function switchTagHandle(e) {
      var _this3 = this;

      weui.picker(provinces, {
        id: 'singleLinePicker2',
        defaultValue: [0],
        onConfirm: function onConfirm(result) {
          if (result && result[0]) {
            _this3.setState({ tag: result[0].label });
          }
        }
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _state = this.state,
          vehicleNo = _state.vehicleNo,
          vehicleType = _state.vehicleType,
          VIN = _state.VIN,
          engineNo = _state.engineNo,
          ownerName = _state.ownerName,
          userPhone = _state.userPhone;

      if (!vehicleNo) {
        weui.itoast('请输入车牌号');return false;
      }
      if (!vehicleType && vehicleType != '请选择车辆类型') {
        weui.itoast('请选择车辆类型');return false;
      }
      if (!VIN) {
        weui.itoast('请输入车架号后6位');return false;
      }
      if (!engineNo) {
        weui.itoast('请确认发动机号后6位');return false;
      }
      if (!ownerName) {
        weui.itoast('请确认车主姓名');return false;
      }
      if (!userPhone) {
        weui.itoast('请输入车主手机号码');return false;
      }
      return true;
    }
  }, {
    key: 'submitHandle',
    value: function submitHandle() {
      if (!this.validate()) {
        return;
      }

      var _state2 = this.state,
          tag = _state2.tag,
          vehicleNo = _state2.vehicleNo,
          vehicleType = _state2.vehicleType,
          VIN = _state2.VIN,
          engineNo = _state2.engineNo,
          ownerName = _state2.ownerName,
          userPhone = _state2.userPhone;

      var loading = weui.loading('处理中...');
      (0, _api.addVehicle)({
        vehicle: tag + vehicleNo,
        vehicleType: vehicleType,
        frameNo: VIN,
        engineNo: engineNo,
        ownerName: ownerName,
        userPhone: userPhone
      }).then(function (res) {
        var data = res.data;

        if (data.code == "1") {
          weui.alert('车辆添加成功', function () {
            (0, _util.redirect)('./vehicleList.do');
          });
        } else {
          weui.itoast(data.msg, 1000);
        }
      }).catch(function (err) {
        weui.itoast(err.msg);
      }).then(function () {
        loading.hide();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'u_bg_white u_m_xxx u_radius_x u_shadow_x' },
          _react2.default.createElement(
            'div',
            { className: 'group' },
            _react2.default.createElement(
              'div',
              { className: 'group__head' },
              _react2.default.createElement(
                'label',
                { className: 'form__tag', onClick: this.switchTagHandle },
                this.state.tag
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'group__body' },
              _react2.default.createElement('input', {
                type: 'text',
                maxLength: '12',
                placeholder: '\u8BF7\u8F93\u5165\u8F66\u724C\u53F7',
                className: 'form__input',
                name: 'vehicleNo',
                value: this.state.vehicleNo,
                onChange: this.changeHandle
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'group' },
            _react2.default.createElement(
              'div',
              { className: 'group__body', onClick: this.clickHandle },
              _react2.default.createElement(
                'div',
                null,
                this.state.vehicleTypeText
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'group' },
            _react2.default.createElement(
              'div',
              { className: 'group__body' },
              _react2.default.createElement('input', {
                type: 'text',
                maxLength: '12',
                placeholder: '\u8BF7\u8F93\u5165\u8F66\u67B6\u53F7\u540E6\u4F4D',
                className: 'form__input',
                name: 'VIN',
                value: this.state.VIN,
                onChange: this.changeHandle
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'group' },
            _react2.default.createElement(
              'div',
              { className: 'group__body' },
              _react2.default.createElement('input', {
                type: 'text',
                maxLength: '12',
                placeholder: '\u8BF7\u786E\u8BA4\u53D1\u52A8\u673A\u53F7\u540E6\u4F4D',
                className: 'form__input',
                name: 'engineNo',
                value: this.state.engineNo,
                onChange: this.changeHandle
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'group' },
            _react2.default.createElement(
              'div',
              { className: 'group__body' },
              _react2.default.createElement('input', {
                type: 'text',
                placeholder: '\u8BF7\u786E\u8BA4\u8F66\u4E3B\u59D3\u540D',
                className: 'form__input',
                name: 'ownerName',
                value: this.state.ownerName,
                onChange: this.changeHandle
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'group' },
            _react2.default.createElement(
              'div',
              { className: 'group__body' },
              _react2.default.createElement('input', {
                type: 'text',
                maxLength: '11',
                placeholder: '\u8BF7\u8F93\u5165\u8F66\u4E3B\u624B\u673A\u53F7\u7801',
                className: 'form__input',
                name: 'userPhone',
                value: this.state.userPhone,
                onChange: this.changeHandle
              })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'u_m_xxx' },
          _react2.default.createElement(
            'button',
            { className: 'button', onClick: this.submitHandle },
            '\u6DFB\u52A0'
          )
        ),
        _react2.default.createElement(Backhome, null)
      );
    }
  }]);

  return App;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ }),

/***/ 54:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPaymentPswd = checkPaymentPswd;
exports.getVehicleList = getVehicleList;
exports.delVehicleById = delVehicleById;
exports.addVehicle = addVehicle;
exports.getPeccancyList = getPeccancyList;
exports.peccancyDeal = peccancyDeal;
exports.peccancyQueryDetail = peccancyQueryDetail;

var _steup = __webpack_require__(9);

/**
 * 校验交易密码
 * @param {String} oldPwd
 */
function checkPaymentPswd(oldPwd) {
  return (0, _steup.post)("/user/checkpaypwd.do", {
    oldPwd: oldPwd
  });
}

/**
 * 获取车辆列表
 */
function getVehicleList() {
  return (0, _steup.get)("/peccancy/queryUserCarList.do");
}

/**
 * 删除指定id车辆
 * @param {String} id
 */
function delVehicleById(id) {
  return (0, _steup.post)("/peccancy/delUserCar.do", {
    id: id
  });
}

/**
 * 添加车辆
 * @param {Object} data
 */
function addVehicle(data) {
  return (0, _steup.post)("/peccancy/addUserCar.do", data);
}

/**
 * 获取违章数据
 * @param {Object} vehicle
 */
function getPeccancyList(vehicle) {
  return (0, _steup.post)("/peccancy/peccancyQuery.do", {
    vehicle: vehicle
  });
}

/**
 * 违章代办
 * @param {Object} data
 */
function peccancyDeal(data) {
  return (0, _steup.post)("/peccancy/peccancyDeal.do", data);
}

/**
 * 查询违章详情
 * @param {Object} data
 */
function peccancyQueryDetail(data) {
  return (0, _steup.post)("/peccancy/peccancyQueryDetail.do", data);
}

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.get = get;
exports.del = del;
exports.post = post;
exports.put = put;

var _axios = __webpack_require__(10);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = _axios2.default.create({
  baseURL: "",
  timeout: 10000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  error.msg = "服务器忙，请稍后再试!";
  return Promise.reject(error);
});

function get(path) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return instance.get(path, _extends({}, config, {
    params: data
  }));
}

function del(path) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return instance.delete(path, _extends({}, config, {
    params: data
  }));
}

function post(path) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return instance.post(path, data, config);
}

function put(path) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return instance.put(path, data, config);
}

exports.default = {
  get: get,
  del: del,
  post: post,
  put: put
};

/***/ })

},[27]);