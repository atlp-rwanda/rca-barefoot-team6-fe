import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center justify-center h-screen gap-4">
        <img src={reactLogo} className="animate-spin" alt="logo"  />
        <img src={viteLogo} alt="Vite-logo" className='animate-ping'/>
      <h1 className='text-blue-500'>Welcome to our app</h1>
    </div>
  )
}

export default App
