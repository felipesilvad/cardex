import React, {useState} from 'react'
import {Spinner,Form,Button} from 'react-bootstrap';
import OPSetCardGallery from '../Set/OPSetCardGallery';
import OPSetCardTable from '../Set/OPSetCardTable';
import OPCardModal from '../Card/OPCardModal';

const OPSearchView = ({cd,addCard,getCardCount,removeCard,loading,showAA,setShowAA,cards,setColors,resetCardType}) => {
  const [view, setView] = useState('Gallery')

  const [cardModal, setCardModal] = useState('')
  const [cardImg, setCardImg] = useState('')
  const [cardImgSrc, setCardImgSrc] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openCardModal = (card,img,img_src) => {
    setCardModal(card)
    setCardImg(img)
    setCardImgSrc(img_src)
    handleShow()
  }

  return (
    <div className="mr-1 w-100">
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
          <Form>
            <Form.Check type="switch"d="custom-switch"label="Show Alternate Art" checked={showAA}
            className='aa-switch' onClick={() => setShowAA(!showAA)} />
          </Form>
        </div>
      ) : ('')}
      
      <div className={`bg-Gray-t mx-1 p-1 rounded 
      // ${(view === "Gallery" ? ('') : ('table-vh'))}`}>
        {(cards.length === 0)?(<h5 className='mx-2'>No Cards Found</h5>)
        :('')}
        {(!loading &&(
          (view === "Gallery" ? (
            <OPSetCardGallery cd={cd} addCard={addCard} getCardCount={getCardCount} removeCard={removeCard}
            resetCardType={resetCardType} showAA={showAA} cards={cards} setColors={setColors}
            openCardModal={openCardModal} />
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
      <OPCardModal show={show} handleClose={handleClose} card={cardModal} img={cardImg} img_src={cardImgSrc} />
    </div>
  )
}

export default OPSearchView