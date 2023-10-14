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
                <Link className="itemLink" to={`/item/${item.id}`}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow"
                  >
                    <path
                      d="M16 48C16 30.36 30.36 16 48 16C65.64 16 80 30.36 80 48C80 65.64 65.64 80 48 80C30.36 80 16 65.64 16 48ZM8 48C8 70.08 25.92 88 48 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 48 8C25.92 8 8 25.92 8 48ZM48 44H32V52H48V64L64 48L48 32V44Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div>

                  <h3 className="fs-5">{item.title}</h3>
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
