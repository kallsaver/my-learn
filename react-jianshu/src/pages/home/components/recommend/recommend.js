import React, { PureComponent } from 'react'

class Recommend extends PureComponent {
  render() {
    return (
      <div className="recommend">
        {
          <div className="recommend-item"></div>
        }
      </div>
    )
  }

  componentDidMount() {
    console.log('mount')
  }
}

export default Recommend
