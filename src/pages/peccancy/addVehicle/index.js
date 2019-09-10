import '@/assets/css/weui.min.css'
import '@/assets/css/common.css'
import './index.css'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import weui from '@/assets/js/weui.min.js'
import Backhome from '@/components/Backhome.jsx'
import { addVehicle } from '@/api'
import { fixIos12WeixinInputBug, redirect } from '@/util'

const vehicleTypes = [
  { label: '大型汽车', value: '01' },
  { label: '小型汽车', value: '02' },
  { label: '使馆汽车', value: '03' },
  { label: '领馆汽车', value: '04' },
  { label: '境外汽车', value: '05' },
  { label: '外籍汽车', value: '06' },
  { label: '两、三轮摩托车', value: '07' },
  { label: '轻便摩托车', value: '08' },
  { label: '使馆摩托车', value: '09' },
  { label: '领馆摩托车', value: '10' },
  { label: '境外摩托车', value: '11' },
  { label: '外籍摩托车', value: '12' },
  { label: '农用运输车', value: '13' },
  { label: '拖拉机', value: '14' },
  { label: '挂车', value: '15' },
  { label: '教练汽车', value: '16' },
  { label: '教练摩托车', value: '17' },
  { label: '试验汽车', value: '18' },
  { label: '试验摩托车', value: '19' },
  { label: '临时入境汽车', value: '20' },
  { label: '临时入境摩托车', value: '21' },
  { label: '临时行驶车', value: '22' },
  { label: '警用汽车', value: '23' },
  { label: '警用摩托车', value: '24' },
  { label: '香港入出境车', value: '26' },
  { label: '澳门入出境车', value: '27' }
]

const provinces = [
  { label: '粤', value: 0 },
  { label: '苏', value: 0 },
  { label: '闽', value: 0 },
  { label: '湘', value: 0 },
  { label: '鄂', value: 0 },
  { label: '赣', value: 0 },
  { label: '浙', value: 0 },
  { label: '京', value: 0 },
  { label: '沪', value: 0 },
  { label: '津', value: 0 },
  { label: '渝', value: 0 },
  { label: '桂', value: 0 },
  { label: '陕', value: 0 },
  { label: '宁', value: 0 },
  { label: '皖', value: 0 },
  { label: '蒙', value: 0 },
  { label: '贵', value: 0 },
  { label: '晋', value: 0 },
  { label: '琼', value: 0 },
  { label: '辽', value: 0 },
  { label: '吉', value: 0 },
  { label: '黑', value: 0 },
  { label: '冀', value: 0 },
  { label: '甘', value: 0 },
  { label: '豫', value: 0 },
  { label: '鲁', value: 0 },
  { label: '新', value: 0 },
  { label: '川', value: 0 },
  { label: '青', value: 0 },
  { label: '云', value: 0 },
  { label: '藏', value: 0 }
]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tag: provinces[0].label,
      vehicleNo: '',
      vehicleType: '',
      vehicleTypeText: '请选择车辆类型',
      VIN: '',
      engineNo: '',
      ownerName: '',
      userPhone: ''
    }

    this.validate        = this.validate.bind(this)
    this.submitHandle    = this.submitHandle.bind(this)
    this.switchTagHandle = this.switchTagHandle.bind(this)
    this.clickHandle     = this.clickHandle.bind(this)
    this.changeHandle    = this.changeHandle.bind(this)
  }

  componentDidMount() {
    fixIos12WeixinInputBug()
  }

  changeHandle(e) {
    let value = ''
    if(e.target.name === 'vehicleNo' 
      || e.target.name === 'VIN' 
      || e.target.name === 'engineNo') {
        value = e.target.value.toUpperCase()
    }else {
      value = e.target.value
    }
    // 这里需要将车牌号 车架号 引擎号修改为大写
    this.setState({[e.target.name]: value})
  }

  clickHandle(e) {
    weui.picker(vehicleTypes, {
      id: 'singleLinePicker',
      defaultValue: ['01'],
      onConfirm: (result) => {
        if(result && result[0]){
          this.setState({vehicleTypeText: result[0].label})
          this.setState({vehicleType: result[0].value})
        }
      }
    })
  }

  switchTagHandle(e) {
    weui.picker(provinces, {
      id: 'singleLinePicker2',
      defaultValue: [0],
      onConfirm: (result) => {
        if(result && result[0]){
          this.setState({tag: result[0].label})
        }
      }
    })
  }

  validate() {
    const {vehicleNo, vehicleType, VIN, engineNo, ownerName, userPhone} = this.state
    if(!vehicleNo) { weui.itoast('请输入车牌号'); return false; }
    if(!vehicleType && vehicleType != '请选择车辆类型') { weui.itoast('请选择车辆类型'); return false; }
    if(!VIN) { weui.itoast('请输入车架号后6位'); return false; }
    if(!engineNo) { weui.itoast('请确认发动机号后6位'); return false; }
    if(!ownerName) { weui.itoast('请确认车主姓名'); return false; }
    if(!userPhone) { weui.itoast('请输入车主手机号码'); return false; }
    return true
  }

  submitHandle() {
    if(!this.validate()) {
      return
    }

    const {tag, vehicleNo, vehicleType, VIN, engineNo, ownerName, userPhone} = this.state
    const loading = weui.loading('处理中...')
    addVehicle({
        vehicle: tag + vehicleNo,
        vehicleType: vehicleType,
        frameNo: VIN,
        engineNo: engineNo,
        ownerName: ownerName,
        userPhone: userPhone
      })
      .then(res => {
        const {data} = res
        if(data.code == "1") {
          weui.alert('车辆添加成功', function() {
            redirect('./vehicleList.do')
          })
        }else {
          weui.itoast(data.msg, 1000)
        }
      })
      .catch(err => {
        weui.itoast(err.msg)
      })
      .then(() => {
        loading.hide()
      })
  }

  render() {
    return (
      <div>
        <div className="u_bg_white u_m_xxx u_radius_x u_shadow_x">
          <div className="group">
            <div className="group__head">
              <label className="form__tag" onClick={this.switchTagHandle}>{this.state.tag}</label>
            </div>
            <div className="group__body">
              <input 
                type="text" 
                maxLength="12" 
                placeholder="请输入车牌号" 
                className="form__input"
                name="vehicleNo"
                value={this.state.vehicleNo}
                onChange={this.changeHandle}
              />
            </div>
          </div>

          <div className="group">
            <div className="group__body" onClick={this.clickHandle}>
              <div>{this.state.vehicleTypeText}</div>
            </div>
          </div>

          <div className="group">
            <div className="group__body">
              <input 
                type="text" 
                maxLength="12" 
                placeholder="请输入车架号后6位" 
                className="form__input" 
                name="VIN"
                value={this.state.VIN}
                onChange={this.changeHandle}
              />
            </div>
          </div>

          <div className="group">
            <div className="group__body">
              <input 
                type="text" 
                maxLength="12" 
                placeholder="请确认发动机号后6位" 
                className="form__input" 
                name="engineNo"
                value={this.state.engineNo}
                onChange={this.changeHandle}
              />
            </div>
          </div>

          <div className="group">
            <div className="group__body">
              <input 
                type="text" 
                placeholder="请确认车主姓名" 
                className="form__input" 
                name="ownerName"
                value={this.state.ownerName}
                onChange={this.changeHandle}
              />
            </div>
          </div>

          <div className="group">
            <div className="group__body">
              <input 
                type="text" 
                maxLength="11" 
                placeholder="请输入车主手机号码" 
                className="form__input" 
                name="userPhone"
                value={this.state.userPhone}
                onChange={this.changeHandle}
              />
            </div>
          </div>
        </div>
        <div className="u_m_xxx">
          <button className="button" onClick={this.submitHandle}>添加</button>
        </div>

        <Backhome/>
      </div>
    )
  }
}

ReactDOM.render(<App />,
  document.getElementById('app'))