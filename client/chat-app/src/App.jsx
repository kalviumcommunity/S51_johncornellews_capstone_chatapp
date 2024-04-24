import React from 'react'

const App = () => {
  return (
    <>
      <div className='chat chat-start'>
        <div className='chat-image avatar'>
          <div className='w-10 rounded-full'>
            <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className='chat-bubble'>
          Hello I am cornellews
        </div>
      </div>
      <div className='chat chat-end'>
        <div className='chat-image avatar'>
          <div className='w-10 rounded-full'>
            <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className='chat-header'>
          Cornellews
          <time className="opacity-60">90</time>
        </div>
        <div
          className="chat-bubble"
        >
          Cornellews again
        </div>
        <div
        className="chat-footer opacity-70"
        >
          Seen
        </div>
      </div>
    </>
  )
}

export default App