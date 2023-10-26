import React from 'react'
import {useContext} from 'react'
import Navbar from './components/Navbar/Navbar'
import SignUp from './Routes/SignUp/SignUp'
import LoginForm from './Routes/Login/Login'
import { UserContext } from './userContex'
import { UsersignOut } from './firebase/firebase'
const App: React.FC = () => {
  const { currentUser } = useContext(UserContext);
  console.log("Current User:",currentUser)
  return (
    <div>
     {!currentUser? <h1>Sign Up</h1>:<h1 onClick={UsersignOut}>Sign Out</h1>}
      <Navbar />
      <SignUp />
      <LoginForm />
    </div>
  )
}

export default App