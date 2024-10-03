import React, { useCallback } from 'react'

import { useBottomScrollListener } from 'react-bottom-scroll-listener'

const HookExample = ({ alertOnBottom }) => {
  const handleOnDocumentBottom = useCallback(() => {
    console.log('I am at bottom! ' + Math.round(performance.now()))

    if (alertOnBottom) {
      alert('Bottom hit!')
    }
  }, [alertOnBottom])

  const handleContainerOnBottom = useCallback(() => {
    console.log('I am at bottom in optional container! ' + Math.round(performance.now()))

    if (alertOnBottom) {
      alert('Bottom of this container hit!')
    }
  }, [alertOnBottom])

  /* This will trigger handleOnDocumentBottom when the body of the page hits the bottom */
  useBottomScrollListener(handleOnDocumentBottom)

  /* This will trigger handleOnContainerBottom when the container that is passed the ref hits the bottom */
  const containerRef = useBottomScrollListener(handleContainerOnBottom)

  return (
    <div>
      <div
        ref={containerRef}
        className="md:absolute m-8 md:m-0 top-20 right-12 h-72 md:w-60 bg-purple-200 overflow-auto p-4 border-2 border-purple-950 rounded"
      >
        <h4 className="font-bold">Callback when this container hits bottom</h4>
        <div className="h-44">Scroll down! ▼▼▼</div>
        <div className="h-44">A bit more... ▼▼</div>
        <div className="h-44">Almost there... ▼</div>
        <div className="h-44">You've reached the bottom!</div>
      </div>
      <div className="mt-16 m-8">
        <h1 className="text-xl font-bold">Hook example</h1>
        <h2 className="font-bold">Callback when document hits bottom</h2>
        <div className="h-96 border-2 border-purple-950 mt-4 p-4">Scroll down! ▼▼▼</div>
        <div className="h-96 border-2 border-purple-950 mt-4 p-4">A bit more... ▼▼</div>
        <div className="h-96 border-2 border-purple-950 mt-4 p-4">Almost there... ▼</div>
        <div className="h-96 border-2 border-purple-950 mt-4 p-4">You've reached the bottom!</div>
      </div>
    </div>
  )
}

export default HookExample
