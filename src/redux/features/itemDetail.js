import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from './itemsSlice';

function ItemDetail() {
  const { itemId } = useParams();
  const dispatch = useDispatch();

  // Use Redux state to get the items
  const { items, loading, error } = useSelector((state) => state.items);

  // Find the item with the matching itemId
  const selectedItem = items.find((item) => item.id === Number(itemId));

  useEffect(() => {
    // Fetch the items if they haven't been loaded
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch, items]);

  return (
    <div>
      {error && (
      <p>{error}</p>
      )}
      {loading && (
        <p>Loading...</p>
      )}
      {selectedItem ? (
        <div>
          <h3>{selectedItem.title}</h3>
          <p>
            Price: $
            {selectedItem.price}
          </p>
          <p>
            {selectedItem.description}
          </p>
          <p>
            {selectedItem.category}
          </p>
          <p><img src={selectedItem.image} alt={selectedItem.title} /></p>
        </div>
      ) : null}
    </div>
  );
}

export default ItemDetail;
