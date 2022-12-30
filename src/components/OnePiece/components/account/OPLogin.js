import React, { useState } from 'react'
import { Form, Button, Alert, Modal } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import {UserAuth} from '../../../../contexts/AuthContext'

const OPLogin = ({show,handleClose, handleOpen}) => {
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
      navigate('/one-piece/account')
    }catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            Login
          </Button>
          <div className="w-100 text-center mt-2">
            Don't have an account? <Link className='text-danger' to="one-piece/signup">Sign Up</Link>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default OPLogin