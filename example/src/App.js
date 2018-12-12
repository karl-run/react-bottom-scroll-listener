import React, { Component } from 'react'

import BottomScrollListerer from 'react-bottom-scroll-listener'

export default class App extends Component {
  state = {
    alertOnBottom: false,
  }

  handleToggleAlertOnBottom = () => {
    this.setState(prevState => ({ alertOnBottom: !prevState.alertOnBottom }))
  }

  handleOnBottom = () => {
    console.log('I am at bottom! ' + Math.round(performance.now()))

    if (this.state.alertOnBottom) {
      alert('Bottom hit! Too slow? Reduce "debounce" value in props')
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="alertToggle">
          <input
            id="alertToggle"
            type="checkbox"
            checked={this.state.alertOnBottom}
            onChange={this.handleToggleAlertOnBottom}
          />
          Show alert on bottom
        </label>
        <BottomScrollListerer onBottom={this.handleOnBottom}>
          <div style={{ height: '2000px', backgroundColor: 'palevioletred' }}>Scroll down!</div>
        </BottomScrollListerer>
      </div>
    )
  }
}
