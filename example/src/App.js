import React, { Component } from 'react'

import BottomScrollListener from 'react-bottom-scroll-listener'

export default class App extends Component {
  state = {
    alertOnBottom: true,
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

  handleContainerOnBottom = () => {
    console.log('I am at bottom in optional container! ' + Math.round(performance.now()))

    if (this.state.alertOnBottom) {
      alert('Bottom of this container hit! Too slow? Reduce "debounce" value in props')
    }
  }

  render() {
    return (
      <div className="root">
        <label htmlFor="alertToggle">
          <input
            id="alertToggle"
            type="checkbox"
            checked={this.state.alertOnBottom}
            onChange={this.handleToggleAlertOnBottom}
          />
          <div>Show alert on bottom</div>
        </label>
        <BottomScrollListener onBottom={this.handleContainerOnBottom}>
          {ref => (
            <div ref={ref} className="innerScrollExample">
              <h4>Callback when this container hits bottom</h4>
              <div>Scroll down! ▼▼▼</div>
              <div>A bit more... ▼▼</div>
              <div>Almost there... ▼</div>
            </div>
          )}
        </BottomScrollListener>
        <BottomScrollListener onBottom={this.handleOnBottom}>
          <div className="scrollbox">
            <h3>Callback when page hits bottom</h3>
            <div>Scroll down! ▼▼▼</div>
            <div>A bit more... ▼▼</div>
            <div>Almost there... ▼</div>
          </div>
        </BottomScrollListener>
      </div>
    )
  }
}
