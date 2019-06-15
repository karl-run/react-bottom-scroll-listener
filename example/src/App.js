import React, { useState } from 'react'
import Toggle from 'react-toggle'

import ComponentExample from './ComponentExample'
import HookExample from './HookExample'

const App = () => {
  const [hookExample, setHookExample] = useState(true)
  const [alertOnBottom, setAlertOnBottom] = useState(true)

  return (
    <div>
      <header>
        <h1>react-bottom-scroll-listener</h1>
        <div className="right-toggle-box">
          <label htmlFor="alert-state">
            <span>Use {alertOnBottom ? 'alert dialog' : 'console.log'}</span>
            <Toggle id="alert-state" checked={alertOnBottom} onChange={() => setAlertOnBottom(b => !b)} />
          </label>
          <label htmlFor="use-hook-state">
            <span>Use {hookExample ? 'hook' : 'component'}</span>
            <Toggle id="use-hook-state" checked={hookExample} onChange={() => setHookExample(b => !b)} />
          </label>
        </div>
      </header>
      {hookExample ? <HookExample alertOnBottom={alertOnBottom} /> : <ComponentExample alertOnBottom={alertOnBottom} />}
    </div>
  )
}

export default App
