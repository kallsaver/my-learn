import React, { PureComponent } from 'react'
import style from './c-header.scss'

class CHeader extends PureComponent {
  render() {
    const focused = false
    return (
      <div className={style['c-header']}>
        <div className="nav">
          <div className="nav-item left">首页</div>
          <div className="nav-item left">下载App</div>
          <div className="nav-item right">
            <i className="iconfont"></i>
          </div>
          <div className="search">
            <input className="nav-search" placeholder='搜索' />
            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}></i>
          </div>
        </div>
        <div className="addition">
          <div className="write">
            <button className="write-btn">
              <i className="iconfont"></i>
              <span>写文章</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CHeader
