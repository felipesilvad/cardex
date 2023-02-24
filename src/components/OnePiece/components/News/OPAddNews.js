import React, { useState } from 'react'
import {Form,Button,Row,Alert,Container,Col} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {UserAuth} from '../../../../contexts/AuthContext'
import {addDoc,collection} from "firebase/firestore";
import db from '../../../../firebase';
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {storage} from '../../../../firebase';
import draftToHtml from 'draftjs-to-html';
import Select from 'react-select'
import OPEditor from './OPEditor';

const OPAddNews = () => {
  const {user} = UserAuth()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [error, setError] = useState()
  const [tags, setTags] = useState()
  const [newsDate, setNewsDate] = useState()
  const navigate = useNavigate()
  const now = new Date()
  const [selectedImage, setSelectedImage] = useState(null);
  const storageRef = ref(storage, `newsCovers/${now}`);

  const AddNews = () => {
    const htmlContent = draftToHtml(content)
    const contentSplited = htmlContent.split('|@|')

    uploadBytes(storageRef, selectedImage).then(() => {
      getDownloadURL(storageRef)
      .then((url) => {
        try{
          addDoc(collection(db, "op/news/news"), {
            title: title,
            content: contentSplited,
            tags: tags,
            thumb: url,
            postedBy: user.uid,
            createdAt: new Date(newsDate.replace('-','/')),
          })
          navigate('/one-piece')
        }catch (e) {
          setError(e.message)
          console.log(e.message)
        }
      })
    })
  }
  
  
  const tagsOptions = [
    { value: 'English', label: 'English' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Card Reveal', label: 'Card Reveal' },
    { value: 'Leaks', label: 'Leaks' },
    { value: 'Product', label: 'Product' },
    { value: 'Event', label: 'Event' }
  ]
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (content) {
      if (selectedImage) {
        if (newsDate) {
          AddNews()
        } else {setError('No Date')}
      } else {setError('No Thumbnail')}
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
            <Row>
              <Col>
              <Select
                isMulti
                name="tags"
                options={tagsOptions}
                className="basic-multi-select Selector"
                classNamePrefix="select"
                placeholder="Tags"
                onChange={(e) => setTags(e)}
                isSearchable
              />
              </Col>
              <Col>
                <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  // value={date}
                  onChange={(e) => setNewsDate(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
         
          <Form.Group id="content">
            <p>To add card: <code>/ADDCARD/card_n=OP01-001,art=0/ADDCARD/</code></p>
            <p>full width image width: -webkit-fill-available</p>
            <OPEditor content={content} setContent={setContent} />
          </Form.Group>
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
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