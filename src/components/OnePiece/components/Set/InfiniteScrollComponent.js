import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

function InfiniteScrollComponent() {
  const [items, setItems] = useState([1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3]); // initial items
  const [hasMore, setHasMore] = useState(true); // whether there are more items to load
  const loadMoreItems = () => {
    // fetch more items from the server, for example
    // and append them to the existing items
    // set hasMore to false if there are no more items left to load
    setItems([...items, ...[4, 5, 6]]);
    setHasMore(false);
  };
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMoreItems}
      hasMore={hasMore}
      loader={<div className="loader" key={0}>Loading ...</div>}
    >
      {items.map((item) => (
        <div key={item} className="item">{item}</div>
      ))}
    </InfiniteScroll>
  );
}

export default InfiniteScrollComponent;