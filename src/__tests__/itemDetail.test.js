/* eslint-disable import/no-named-as-default */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '@testing-library/jest-dom';
import ItemDetail from '../redux/features/itemDetail';

const renderContents = () => render(
  <Provider store={store}>
    <ItemDetail />
  </Provider>,
);

describe('Check if loading is available in the page to avoid bad user experience', () => {
  test('Loading should be available in Item detail page', () => {
    renderContents();
    const itemDescription = screen.getByText('Loading...');
    expect(itemDescription).toBeInTheDocument();
  });
});
