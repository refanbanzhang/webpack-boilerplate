import '@/assets/css/weui.min.css'
import '@/assets/css/common.css'
import './index.css'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import weui from '@/assets/js/weui.min.js'
import { getVehicleList, delVehicleById } from '@/api'
import { getVehicleTypeAsText } from '@/util'
import SkeletonPlaceholder from '@/components/SkeletonPlaceholder.jsx'
import Backhome from '@/components/Backhome.jsx'

const Item = function({vehicle, vehicle_type, id, frame_no, engine_no, user_phone, clickHandle}) {
  const href = `/portal/peccancy/userPeccancy.do?vehicleNo=${vehicle}&engineNo=${engine_no}&userPhone=${user_phone}`
  return (
    <a className="item" href={href}>
      <div className="order">
        <div className="order__hd">
          <div className="order__title">
            <img className="order__icon" src="/portal/images/icon/car.png" />
            {vehicle}
          </div>
          <div className="order__status">
            <button 
              data-id={id}
              type="button" 
              className="button-tag button-warn" 
              onClick={clickHandle}>
              删除
            </button>
          </div>
        </div>
        <div className="order__bd">
          <div className="order__text">
            <div className="cell">
              <div className="cell__title">车辆类型</div>
              <div className="cell__text">{vehicle_type}</div>
            </div>
            <div className="cell">
              <div className="cell__title">车架号</div>
              <div className="cell__text">{frame_no}</div>
            </div>
            <div className="cell">
              <div className="cell__title">发动机号</div>
              <div className="cell__text">{engine_no}</div>
            </div>
          </div>
        </div>
        <div className="order__ft">
          <button className="button-tag button-xx">查看违章记录</button>
        </div>
      </div>
    </a>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {list: [], loadFlag: false}

    this.remove = this.remove.bind(this)
    this.delHandle = this.delHandle.bind(this)
  }

  componentDidMount() {
    this.initLoad()
  }

  initLoad() {
    getVehicleList()
      .then(res => {
        const {data} = res
        if(data && data.length){
          this.setState({list: data, loadFlag: true})
        }else {
          this.setState({loadFlag: true})
        }
      })
  }

  remove(id) {
    const items = this.state.list.filter(item => item.id !== parseInt(id))
    this.setState({list: items})
  }

  //  删除车辆
  delHandle(e) {
    e.preventDefault()
    const id = e.target.getAttribute('data-id')
    if(!id){
      weui.itoast('数据不足，无法删除');
      return false
    }

    weui.confirm('确定删除吗？', () => {
      const loading = weui.loading('处理中...');
      delVehicleById(id)
        .then(res => {
          const {data} = res

          if(data.code === '1') {
            this.remove(id)
          }else {
            weui.itoast(data.msg)
          }
        })
        .then(() => {
          loading.hide()
        })
    })
  }

  render() {
    const items = this.state.list.map((item) => (
      <CSSTransition
        key={item.id} 
        timeout={500}
        classNames="fade"
      >
        <Item 
          id={item.id}
          vehicle={item.vehicle} 
          clickHandle={this.delHandle}
          vehicle_type={getVehicleTypeAsText(item.vehicle_type)}
          frame_no={item.frame_no} 
          user_phone={item.user_phone}
          engine_no={item.engine_no}
        />
      </CSSTransition>
    ))

    if(!this.state.loadFlag) {
      return(
        <div>
          <div className="page-container">
            <main>
              <SkeletonPlaceholder />
            </main>
            <div className="fixed-bottom">
              <div className="button-wrap">
                <a className="button" href="/portal/peccancy/addVehicle.do">添加车辆</a>
              </div>  
            </div>
          </div>   
          <Backhome />
        </div>
      )
    }

    return (
      <div>
        <div className="page-container">
          <main>
            {items.length ? <TransitionGroup>{items}</TransitionGroup> : (
              <div className="placeholder-empty">
                <img 
                  className="placeholder-empty__icon" 
                  src="/portal/images/icon/dataEmpty.png?201901181628" alt=""
                />
                <div className="placeholder-empty__text">暂无数据</div>
              </div>
            )}
          </main>
          <div className="fixed-bottom">
            <div className="button-wrap">
              <a className="button" href="/portal/peccancy/addVehicle.do">添加车辆</a>
            </div>  
          </div>
        </div>
        <Backhome />
      </div>
    )
  }
}

ReactDOM.render(<App />,
  document.getElementById('app'))