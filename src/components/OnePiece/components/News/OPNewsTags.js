import React from 'react';

function OPNewsTags({tags}) {
  return (
    <div className='news_tags_list d-flex'>
      {tags&&(
        tags.map((tagItem) => (
          <>
            {(tagItem.value === "English") ? (<div className='px-2 mx-1 bg-primary rounded text-white'>{tagItem.value}</div>) : ('')}
            {(tagItem.value === "Japanese") ? (<div className='px-2 mx-1 bg-light rounded text-dark'>{tagItem.value}</div>) : ('')}
            {(tagItem.value === "Card Reveal") ? (<div className='px-2 mx-1 bg-danger rounded text-white'>{tagItem.value}</div>) : ('')}
            {(tagItem.value === "Leaks") ? (<div className='px-2 mx-1 bg-warning rounded text-white'>{tagItem.value}</div>) : ('')}
            {(tagItem.value === "Product") ? (<div className='px-2 mx-1 bg-secondary rounded text-white'>{tagItem.value}</div>) : ('')}
            {(tagItem.value === "Event") ? (<div className='px-2 mx-1 bg-info rounded text-white'>{tagItem.value}</div>) : ('')}
          </>
        ))
      )}
    </div>
  );
}

export default OPNewsTags;