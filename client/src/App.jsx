import { useState } from 'react'
import AuthForm from '../components/loginForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import { useAppContext } from '../context/appContext'
import Homepage from '../pages/Homepage'

function App() {
  const [count, setCount] = useState(0)
  const { user } = useAppContext();

  return (
    <div className='w-full'>
      {user ? <Homepage /> : <LoginPage />}
    </div>
  )
}

export default App
