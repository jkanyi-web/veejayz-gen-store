/* eslint-disable import/no-named-as-default */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '@testing-library/jest-dom';
import Items from '../redux/features/Items';

const renderContents = () => render(
  <Provider store={store}>
    <Items />
  </Provider>,
);

describe('Check if loading is available in the page to avoid bad user experience', () => {
  test('Loading should be available in Items page', () => {
    renderContents();
    const itemComponent = screen.getByText('Loading...');
    expect(itemComponent).toBeInTheDocument();
  });
});
