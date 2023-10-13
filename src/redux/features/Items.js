/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchItems } from './itemsSlice';

const Items = () => {
  const { items, loading, error } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchItems());
    } else {
      setFilteredItems(items);
    }
  }, [dispatch, items]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    const filtered = items.filter((item) => item.title.toLowerCase().includes(input.toLowerCase()));
    setFilteredItems(filtered);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="mb-3 w-100"
        value={searchTerm}
        onChange={handleInputChange}
      />

      {loading && <h1 className="text-center">Loading...</h1>}
      {!loading && error ? <h1 className="text-center">{error}</h1> : null}
      {!loading && items.length ? (
        <div className="overall-container">
          {filteredItems.map((item) => (
            <Container id="item-container" key={item.id}>
              <div className="item-details">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <Link className="itemLink" to={`/item/${item.id}`}>
                    <h3>{item.title}</h3>
                  </Link>
                  <p>
                    $
                    {item.price}
                  </p>
                </div>
              </div>
            </Container>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Items;
