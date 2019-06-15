import React, { Component } from 'react'

import 'react-toggle/style.css'

import BottomScrollListener from 'react-bottom-scroll-listener'

class ComponentExample extends Component {
  handleOnDocumentBottom = () => {
    console.log('I am at bottom! ' + Math.round(performance.now()))

    if (this.props.alertOnBottom) {
      alert('Bottom hit! Too slow? Reduce "debounce" value in props')
    }
  }

  handleContainerOnBottom = () => {
    console.log('I am at bottom in optional container! ' + Math.round(performance.now()))

    if (this.props.alertOnBottom) {
      alert('Bottom of this container hit! Too slow? Reduce "debounce" value in props')
    }
  }

  render() {
    return (
      <div className="root">
        <div className="scroll-box">
          <h1>Component example</h1>
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
            <div ref={scrollRef} className="inner-scroll-example">
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

export default ComponentExample
