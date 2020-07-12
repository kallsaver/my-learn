import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import style from './home.scss'
import List from './components/list/list'
import homeJson from '../../api/home.json'

class Index extends PureComponent {
  state = {
    banner: '//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540',
    articleList: [],
  }

  render() {
    return (
      <div className={style.home}>
        <div className="home-left">
          <img className="banner-img"
            alt=""
            src={this.state.banner}
            onClick={this.clickHandler} />
          <div className="topic">
            <div className="topic-item">
              <div className="topic-pic"></div>
            </div>
          </div>
          <List data={this.state.articleList} parent={this}></List>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { articleList } = homeJson.data

    this.setState({
      articleList,
    })
  }

  clickHandler = () => {
    console.log(this.props)
  }
}

Index.propTypes = {
  history: PropTypes.object
}

Index.defaultProps = {
}

export default Index
