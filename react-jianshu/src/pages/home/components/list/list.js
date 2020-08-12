import React from 'react'
import style from './list.scss'
import PropTypes from 'prop-types'

class List extends React.Component {
  render() {
    console.log('render')
    const { data } = this.props

    return (
      <div className={style.list}>{
        data.map((item, index) => {
          return (
            <div
              className="list-item"
              key={index}
              onClick={this.itemClickHandler.bind(this, item)}>
              <img className="pic" alt="" src={item.imgUrl} />
              <div className="list-info">
                <h3 className='title'>{item.title}</h3>
                <p className='desc'>{item.desc}</p>
              </div>
            </div>
          )
        })
      }</div>
    )
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  // PureComponent替代
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  itemClickHandler = (item) => {
    const history = this.props.parent.props.history
    history.push(`/detail/${item.id}`)
  }
}

List.propTypes = {
  parent: PropTypes.object,
  data: PropTypes.array
}

List.defaultProps = {
  data: []
}

export default List
