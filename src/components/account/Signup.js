import React, { useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import {UserAuth} from '../../contexts/AuthContext'

const Signup = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const {createUser} = UserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try{
      await createUser(email,password)
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
          <h2 className="text-center mb-4">Sign Up</h2>
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
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already ha've an account? <Link to="/login">Log In</Link>
          </div>'
        </Card.Body>
      </Card>
    </>
  )
}

export default Signup