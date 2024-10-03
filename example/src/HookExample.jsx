import React, { useCallback } from 'react';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const HookExample = ({ alertOnBottom }) => {
  const handleOnDocumentBottom = useCallback(() => {
    console.log('I am at bottom! ' + Math.round(performance.now()));

    if (alertOnBottom) {
      alert('Bottom hit!');
    }
  }, [alertOnBottom]);

  const handleContainerOnBottom = useCallback(() => {
    console.log('I am at bottom in optional container! ' + Math.round(performance.now()));

    if (alertOnBottom) {
      alert('Bottom of this container hit!');
    }
  }, [alertOnBottom]);

  /* This will trigger handleOnDocumentBottom when the body of the page hits the bottom */
  useBottomScrollListener(handleOnDocumentBottom);

  /* This will trigger handleOnContainerBottom when the container that is passed the ref hits the bottom */
  const containerRef = useBottomScrollListener(handleContainerOnBottom);

  return (
    <div className="root">
      <div className="scroll-box">
        <h1>Hook example</h1>
        <h2>Callback when document hits bottom</h2>
        <div>Scroll down! ▼▼▼</div>
        <div>A bit more... ▼▼</div>
        <div>Almost there... ▼</div>
        <div>You've reached the bottom!</div>
      </div>
      <div>
        <div ref={containerRef} className="inner-scroll-example">
          <h4>Callback when this container hits bottom</h4>
          <div>Scroll down! ▼▼▼</div>
          <div>A bit more... ▼▼</div>
          <div>Almost there... ▼</div>
          <div>You've reached the bottom!</div>
        </div>
      </div>
    </div>
  );
};

export default HookExample;
