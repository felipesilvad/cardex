import React, {useState} from 'react';
import {Form,Button,InputGroup} from 'react-bootstrap';
import {BiSearchAlt} from 'react-icons/bi';
import {useNavigate} from "react-router-dom"

function OPSearchBar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/one-piece/search',{state:{search:search}})
    setSearch('')
  }

  return (
    <Form className='d-flex mx-2' onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control className='search-bar'
          placeholder="Search Card" 
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
        <Button className='search-bar__button' type='submit' variant="outline-secondary">
          <BiSearchAlt />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default OPSearchBar;