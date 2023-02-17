import React from 'react';

function OPCardImgSource({img_src,set}) {
  
  return (
    <div className='img__src-bg'>
      {(img_src === "Main") ? (
          `Main Card Art from ${set}`
      ) : (
        (img_src === "Set") ? (
          `Alternate Card Art from ${set}`
        ) : (
          (img_src === "Manga Rare") ? (
            `Manga Rare Art from ${set}`
          ) : (img_src)
        )
      )}
    </div>
)}

export default OPCardImgSource;