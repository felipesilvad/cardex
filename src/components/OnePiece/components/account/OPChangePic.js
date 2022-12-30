import React, {useState, useEffect}  from 'react';
import {Image, Modal,Button} from 'react-bootstrap';
import { doc, setDoc,query, collection, onSnapshot, where } from "firebase/firestore";
import db from '../../../../firebase';

const OPChangePic = ({userData}) => {
  const [allPics, setAllPics] = useState('')
  const [ownedPics, setOwnedPics] = useState('')
  const [selectedPic, setSelectedPic] = useState('')
  const [selectedPicUrl, setSelectedPicUrl] = useState('')
  useEffect (() => {
    onSnapshot(query(collection(db, `/profile-pics`), where("set", "<", 3)), (snapshot) => {
      setOwnedPics(snapshot.docs.map(doc => (doc.id)))
    });
    onSnapshot(query(collection(db, `/profile-pics`)), (snapshot) => {
      setAllPics(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])


  useEffect(() => {
    if (userData) {
      if (userData.ownedPics) {
        setOwnedPics(ownedPics.concat(userData.ownedPics))
      }
    }
  }, [userData,ownedPics])

  const selectImage = (id, url) => {
    setSelectedPic(id)
    setSelectedPicUrl(url)
  }

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setSelectedPic(userData.profile_pic)
    setSelectedPicUrl(userData.profile_pic_url)
  }
  const handleShow = () => {
    setShow(true)
    setSelectedPic(userData.profile_pic)
    setSelectedPicUrl(userData.profile_pic_url)
  }

  const setNewPic = () => {
    handleClose()
    setDoc(doc(db, "users", userData.id), {
      profile_pic: selectedPic,
      profile_pic_url: selectedPicUrl,
    }, { merge: true})
  }

  return (
    <>
      <Button onClick={handleShow} className='w-100 my-1'>Change Profile Image</Button>
      <Modal className='change-pic-modal' show={show} onHide={handleClose}>
        <div className='bg-dblue-t rounded p-2 mx-1'>
          <h5>Select Profile Pic</h5>
          <div>
            {!!allPics && (allPics.filter(item => ownedPics.includes(item.id)).map(pic => (
              <>
                <Image src={pic.url} key={pic.id}
                className={(selectedPic === pic.id) ? ('pic-select pic-select-active') : ('pic-select')}
                onClick={() => selectImage(pic.id,pic.url)} />
              </>
            )))}
          </div>
          <div className='d-flex justify-content-end'>
            <Button onClick={() => setNewPic()} className='w-25'>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default OPChangePic