import React, {useState, useEffect}  from 'react';
import {Image, Modal,Button,Spinner} from 'react-bootstrap';
import {doc,updateDoc,query,collection,onSnapshot,where,arrayUnion} from "firebase/firestore";
import db from '../../../../firebase';

const OPUnlockPic = ({userData}) => {
  const [unlockPics, setUnlockPics] = useState('')
  const [generatedPic, setGeneratedPic] = useState('')
  const [loading, setLoading] = useState('');
  const [show, setShow] = useState(false);

  useEffect (() => {
    onSnapshot(query(collection(db, `/profile-pics`), where("set", ">", 2)), (snapshot) => {
      setUnlockPics(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })
  }, [])
  useEffect (() => {
    if (unlockPics && userData) {
      if (userData.ownedPics) {
        const unlockFilter = unlockPics.filter(x => !userData.ownedPics.includes(x.id))
        setGeneratedPic(unlockFilter[Math.floor(Math.random() * unlockFilter.length)])
        setLoading(false)
      } else {
        const unlockFilter = unlockPics
        setGeneratedPic(unlockFilter[Math.floor(Math.random() * unlockFilter.length)])
        setLoading(false)
      }
    }
  }, [unlockPics, userData])

  useEffect (() => {
    if (!generatedPic) {setLoading(false)}
  }, [generatedPic])

  const handleClose = () => {
    setShow(false)
    if (generatedPic) {
      updateDoc(doc(db, "users", userData.id), {
        ownedPics: arrayUnion(generatedPic.id)
      })
    }
  }
  const handleShow = () => {
    setShow(true)
    setLoading(true)
  }

  return (
    <>
      <Button onClick={handleShow} className='w-100 my-1'>Unlock Profile Image</Button>
      <Modal className='change-pic-modal' show={show} onHide={handleClose}>
        <div className='bg-dblue-t rounded p-2 mx-1'>
          <h5>Received Profile Pic</h5>
          <div className='text-center'>
            {(loading &&(
              <div className='p-2 text-center'>
                <Spinner animation="border" variant="danger" />
              </div>
            ))}
            {generatedPic &&(
              <Image src={generatedPic.url} key={generatedPic.id} className='pic-select'/>
            )}
          </div>
          <div className='d-flex justify-content-end'>
            <Button onClick={() => handleClose()} className='w-25'>Claim</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default OPUnlockPic