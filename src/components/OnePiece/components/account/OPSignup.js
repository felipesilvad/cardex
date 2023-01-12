import React, { useState, useEffect } from 'react'
import {Form,Button,Row,Alert,Container,Col,Image} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import {UserAuth} from '../../../../contexts/AuthContext'
import {doc,setDoc,query,collection,onSnapshot,where} from "firebase/firestore";
import db from '../../../../firebase';

const OPSignup = () => {
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const {createUser} = UserAuth()
  const navigate = useNavigate()
  const newDate = new Date()
  const [users, setUsers] = useState('')
  const [profilePics, setProfilePics] = useState('')
  const [selectedPic, setSelectedPic] = useState('cMJ9A7ZomhPoRS7HhAwP5ya5Nup2')
  const [selectedPicUrl, setSelectedPicUrl] = useState('https://firebasestorage.googleapis.com/v0/b/cardex-26f5f.appspot.com/o/profile-pics%2FST01-001%20(1).png?alt=media&token=10500a2e-00af-486d-99e4-5902218cc99c')
  useEffect (() => {
    onSnapshot(query(collection(db, `/profile-pics`), where("set", "<", 3)), (snapshot) => {
      setProfilePics(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  useEffect (() => {
    onSnapshot(query(collection(db, `/users`)), (snapshot) => {
      setUsers(snapshot.docs.map(doc => (doc.data().username)))
    });
  }, [])

  const selectImage = (id, url) => {
    setSelectedPic(id)
    setSelectedPicUrl(url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (users.includes(username)) {
      setError('Username already taken')
    } else if (username.length > 20) {
      setError('Username too long')
    } else {
      try{
        await createUser(email,password).then((userCredential) => {
          setDoc(doc(db, "users", userCredential.user.uid), {
            id: userCredential.user.uid,
            email: email,
            username: username,
            profile_pic: selectedPic,
            profile_pic_url: selectedPicUrl,
            createdAt: newDate,
          })
        })
        navigate('/one-piece')
      }catch (e) {
        setError(e.message)
        console.log(e.message)
      }
    }
  }

  return (
    <Container>
      <h2 className="text-center mb-4">Sign Up</h2>
      <div className='mx-3 bg-Gray-t rounded p-2'>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={5}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" required />
              </Form.Group>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={(e) => setUsername(e.target.value)} type="username" required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password"  required />
              </Form.Group>
            </Col>
            <Col lg={7} >
              <div className='bg-dblue-t rounded p-2 mx-1'>
                <h5>Select Profile Pic</h5>
                <div>
                  {!!profilePics && (profilePics.map(pic => (
                    <>
                      <Image src={pic.url} key={pic.id}
                      className={(selectedPic === pic.id) ? ('pic-select pic-select-active') : ('pic-select')}
                      onClick={() => selectImage(pic.id,pic.url)} />
                    </>
                  )))}
                </div>
              </div>
            </Col>
          </Row>
          
          <div className='m-2 text-center'>
            <Button className="bg-danger border-none" type="submit">
              Sign Up
            </Button>
          </div>
          
        </Form>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link className='text-danger' to="one-piece/login">Log In</Link>
        </div>
      </div>
    </Container>
  )
}

export default OPSignup