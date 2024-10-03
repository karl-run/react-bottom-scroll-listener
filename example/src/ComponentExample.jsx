import React, { Component } from 'react'

import 'react-toggle/style.css'

import { BottomScrollListener } from 'react-bottom-scroll-listener'

class ComponentExample extends Component {
  handleOnDocumentBottom = () => {
    console.log(`I am at bottom! ${Math.round(performance.now())}`)

    if (this.props.alertOnBottom) {
      alert('Bottom hit! Too slow? Reduce "debounce" value in props')
    }
  }

  handleContainerOnBottom = () => {
    console.log(`I am at bottom in optional container! ${Math.round(performance.now())}`)

    if (this.props.alertOnBottom) {
      alert('Bottom of this container hit! Too slow? Reduce "debounce" value in props')
    }
  }

  render() {
    return (
      <div>
        {/* If you want to listen for the bottom of a specific container you need to forward
            a scrollRef as a ref to your container */}
        <BottomScrollListener onBottom={this.handleContainerOnBottom}>
          {(scrollRef) => (
            <div
              ref={scrollRef}
              className="md:absolute m-8 md:m-0 top-20 right-12 h-72 md:w-60 bg-purple-200 overflow-auto p-4 border-2 border-purple-950 rounded"
            >
              <h4 className="font-bold">Callback when this container hits bottom</h4>
              <div className="h-44">Scroll down! ▼▼▼</div>
              <div className="h-44">A bit more... ▼▼</div>
              <div className="h-44">Almost there... ▼</div>
              <div className="h-44">You've reached the bottom!</div>
            </div>
          )}
        </BottomScrollListener>

        <div className="mt-16 m-8">
          <h1 className="text-xl font-bold">Component example</h1>
          <h2 className="font-bold">Callback when document hits bottom</h2>
          <div className="h-96 border-2 border-purple-950 mt-4 p-4">Scroll down! ▼▼▼</div>
          <div className="h-96 border-2 border-purple-950 mt-4 p-4">A bit more... ▼▼</div>
          <div className="h-96 border-2 border-purple-950 mt-4 p-4">Almost there... ▼</div>
          <div className="h-96 border-2 border-purple-950 mt-4 p-4">You've reached the bottom!</div>
        </div>

        {/* When you only want to listen to the bottom of "document", you can put it anywhere */}
        <BottomScrollListener onBottom={this.handleOnDocumentBottom} />
      </div>
    )
  }
}

export default ComponentExample
