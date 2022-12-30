import React, {useState} from 'react'
import {Spinner,Form,Button} from 'react-bootstrap';
import OPSetCardGallery from '../Set/OPSetCardGallery';
import OPSetCardTable from '../Set/OPSetCardTable';
const OPSearchView = ({cd,addCard,loading,showAA,setShowAA,cards}) => {
  const [view, setView] = useState('Gallery')

  return (
    <div className="mr-1">
      <div className='d-flex justify-content-around'>
        {!cd &&(<>
          {(view === "Gallery" ? (
            <Button className='imgBtn set__view-btn view-btn-active' onClick={() => setView('Gallery')}>Gallery</Button>):(
            <Button className='imgBtn set__view-btn' onClick={() => setView('Gallery')}>Gallery</Button>
          ))}
          {(view === "Table" ? (
            <Button className='imgBtn set__view-btn view-btn-active' onClick={() => setView('Table')}>Table</Button>):(
            <Button className='imgBtn set__view-btn' onClick={() => setView('Table')}>Table</Button>
          ))}
        </>)}
      </div>
      {(view === "Gallery") ? (
        <div className='d-flex justify-content-end w-100'>
          <Form className='d-flex justify-content-end w-100'>
            <Form.Check type="switch"d="custom-switch"label="Show Alternate Art" checked={showAA}
            className='d-flex justify-content-end aa-switch w-100' onClick={() => setShowAA(!showAA)} />
          </Form>
        </div>
      ) : ('')}
      
      <div className={`bg-Gray-t mx-1 p-1 rounded scrollbar scrollbar-primary search-overflow
      ${(view === "Gallery" ? ('gallery-vh') : ('table-vh'))}`}>
        {(cards.length === 0)?(<h5 className='mx-2'>No Cards Found</h5>)
        :('')}
        {(!loading &&(
          (view === "Gallery" ? (
            <OPSetCardGallery cd={cd} addCard={addCard}
            showAA={showAA} cards={cards} />
          ) : (
            <OPSetCardTable cards={cards} />
          ))
        ))}
        {(loading &&(
          <div className='p-2 text-center'>
            <Spinner animation="border" variant="danger" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OPSearchView