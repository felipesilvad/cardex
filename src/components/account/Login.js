import React, { useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import {UserAuth} from '../../contexts/AuthContext'

const LogIn = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const {signIn} = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try{
      await signIn(email,password)
      navigate('/account')
    }catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => setPassword(e.target.value)} type="password"  required />
            </Form.Group>
            <Button className="w-100" type="submit">
              <Link to='/signup'>Sign Up</Link>
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default LogIn