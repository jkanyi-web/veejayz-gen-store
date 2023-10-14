/** @format */

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
      {error && <h1 className="text-center">{error}</h1>}
      {loading && <h1 className="text-center">Loading...</h1>}
      {selectedItem ? (
        <ul className="parentUl m-0 p-0">
          <li className="d-flex justify-content-between">
            <p>
              <img src={selectedItem.image} alt={selectedItem.title} />
            </p>
          </li>
          <li className="d-flex justify-content-between">
            <p>Title: </p>
            <p>{selectedItem.title}</p>
          </li>
          <li className="d-flex justify-content-between">
            <p> Price: </p>
            <p>
              $
              {selectedItem.price}
            </p>
          </li>
          <li className="d-flex justify-content-between">
            <p>{selectedItem.description}</p>
          </li>
          <li className="d-flex justify-content-between">
            <p>Category</p>
            <p>{selectedItem.category}</p>
          </li>
          <li className="d-flex justify-content-between">
            <p>Count</p>
            <p>{selectedItem.rating.rate}</p>
          </li>
          <li className="d-flex justify-content-between">
            <p>Rating</p>
            <p>{selectedItem.rating.count}</p>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default ItemDetail;
