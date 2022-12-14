import React from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

const Account = () => {
  const {user,logout} = UserAuth()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await logout()
      navigate('/');
      console.log('You are logged out')
    }catch(e) {
      console.log(e.message)
    }
  }

  return (
    <div>
      Account email: {user && user.email}
      <Button onClick={handleLogout} className="w-100" type="submit">
        Logout
      </Button>
    </div>
  )
}

export default Account