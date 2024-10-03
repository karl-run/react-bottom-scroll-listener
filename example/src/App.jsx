import React, { useState } from 'react'
import Toggle from 'react-toggle'

import ComponentExample from './ComponentExample'
import HookExample from './HookExample'

const App = () => {
  const [hookExample, setHookExample] = useState(true)
  const [alertOnBottom, setAlertOnBottom] = useState(true)

  return (
    <div>
      <header className="bg-purple-700 p-2 flex gap-3 flex-col md:flex-row justify-between m-2 rounded text-white items-center border-2 border-purple-950">
        <h1 className="text-xl">react-bottom-scroll-listener</h1>
        <div className="flex gap-6">
          <label htmlFor="alert-state" className="flex justify-center gap-3">
            <span>Use {alertOnBottom ? 'alert dialog' : 'console.log'}</span>
            <Toggle id="alert-state" checked={alertOnBottom} onChange={() => setAlertOnBottom((b) => !b)} />
          </label>
          <label htmlFor="use-hook-state" className="flex justify-center gap-3">
            <span>Use {hookExample ? 'hook' : 'component'}</span>
            <Toggle id="use-hook-state" checked={hookExample} onChange={() => setHookExample((b) => !b)} />
          </label>
        </div>
      </header>
      {hookExample ? <HookExample alertOnBottom={alertOnBottom} /> : <ComponentExample alertOnBottom={alertOnBottom} />}
    </div>
  )
}

export default App
