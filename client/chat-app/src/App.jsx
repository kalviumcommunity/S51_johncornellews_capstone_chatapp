import React from 'react'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: "center" }}>

      {/* <Login /> */}
      <SignUp />
    </div>
  )
}

export default App