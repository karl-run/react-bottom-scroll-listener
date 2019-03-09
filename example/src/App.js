import React, { Component } from 'react'
import Toggle from 'react-toggle'

import 'react-toggle/style.css'

import BottomScrollListener from 'react-bottom-scroll-listener'

export default class App extends Component {
  state = {
    alertOnBottom: true,
  }

  handleAlertBottomChange = () => {
    this.setState(prevState => ({ alertOnBottom: !prevState.alertOnBottom }))
  }

  handleOnDocumentBottom = () => {
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
        <header>
          <h1>react-bottom-scroll-listener</h1>
          <label htmlFor="alert-state">
            <span>Use {this.state.alertOnBottom ? 'alert dialog' : 'console.log'}</span>
            <Toggle id="alert-state" checked={this.state.alertOnBottom} onChange={this.handleAlertBottomChange} />
          </label>
        </header>

        <div className="scrollbox">
          <h2>Callback when document hits bottom</h2>
          <div>Scroll down! ▼▼▼</div>
          <div>A bit more... ▼▼</div>
          <div>Almost there... ▼</div>
          <div>You've reached the bottom!</div>
        </div>

        {/* When you only want to listen to the bottom of "document", you can put it anywhere */}
        <BottomScrollListener onBottom={this.handleOnDocumentBottom} />

        {/* If you want to listen for the bottom of a specific container you need to forward
            a scrollRef as a ref to your container */}
        <BottomScrollListener onBottom={this.handleContainerOnBottom}>
          {scrollRef => (
            <div ref={scrollRef} className="innerScrollExample">
              <h4>Callback when this container hits bottom</h4>
              <div>Scroll down! ▼▼▼</div>
              <div>A bit more... ▼▼</div>
              <div>Almost there... ▼</div>
              <div>You've reached the bottom!</div>
            </div>
          )}
        </BottomScrollListener>
      </div>
    )
  }
}
