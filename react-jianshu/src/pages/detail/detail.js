import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './detail.scss'

import homeJson from '../../api/home.json'

class Detail extends PureComponent {
  state = {
    title: '',
    desc: ''
  }

  render() {
    return (
      <div className={style.detail}>
        <div className="title">{this.state.title}</div>
        <div className="desc">
          <p>{this.state.desc}</p>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { id } = this.props.match.params

    const { articleList } = homeJson.data

    for (const item of articleList) {
      if (String(item.id) === id) {
        this.setState({
          title: item.title,
          desc: item.desc
        })
      }
    }
  }
}

Detail.propTypes = {
  match: PropTypes.object,
}

export default Detail
