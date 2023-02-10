import React, { useState, useEffect } from 'react'
import {Form,Button,Row,Alert,Container,Col,Image} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import {UserAuth} from '../../../../contexts/AuthContext'
import {addDoc,collection} from "firebase/firestore";
import db from '../../../../firebase';
import draftToHtml from 'draftjs-to-html';
import Select from 'react-select'

import OPEditor from './OPEditor';

const OPAddNews = () => {
  const {user} = UserAuth()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const newDate = new Date()
  const tags = [
    { value: 'Card Reveal', label: 'Card Reveal' },
    { value: 'Leaks', label: 'Leaks' },
    { value: 'Product', label: 'Product' },
    { value: 'Event', label: 'Event' }
  ]
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (content) {
      const htmlContent = draftToHtml(content)
      const contentSplited = htmlContent.split('/ADDCARD/')
      const cardsOnContent = []
      contentSplited.forEach((content, index) => {
        if (content.includes('card_n=')) {
          const cardStuff = content.split("<");
          cardsOnContent.push(cardStuff[0])
          contentSplited[index] = `/ADDCARD/${cardStuff[0]}/ADDCARD/`
        }
      })
      console.log(contentSplited, cardsOnContent);

      try{
        addDoc(collection(db, "op/news/news"), {
          title: title,
          content: contentSplited,
          cardsOnContent: cardsOnContent,
          postedBy: user.uid,
          createdAt: newDate,
        })
        navigate('/one-piece')
      }catch (e) {
        setError(e.message)
        console.log(e.message)
      }
    } else {setError('No Content')}
  } 

  return (
    <Container>
      <h2 className="text-center mb-4">Add News</h2>
      <div className='mx-3 bg-Gray-t rounded p-2'>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="title">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={(e) => setTitle(e.target.value)} type="title" placeholder="Title" required />
          </Form.Group>
          <Select
            isMulti
            name="tags"
            options={tags}
            className="basic-multi-select Selector"
            classNamePrefix="select"
            isSearchable
          />
          <Form.Group id="content">
            <code>To add card: /ADDCARD/card_n=OP01-001,alt_art=0/ADDCARD/</code>
            <OPEditor content={content} setContent={setContent} />
          </Form.Group>
          <div className='m-2 text-center'>
            <Button className="bg-danger border-none" type="submit">
              Add News
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default OPAddNews