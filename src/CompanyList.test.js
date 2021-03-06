import React from 'react';
import {
  render,
  cleanup,
  waitFor
} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import CompanyList from './CompanyList';
import axiosMock from 'axios';

afterEach(cleanup);

it('matches snapshot', function () {
  const { asFragment } = render(<CompanyList />);
  expect(asFragment()).toMatchSnapshot();
});

it('renders Loading...', async () => {
  const { getByTestId } = render(<CompanyList />);
  expect(getByTestId("loading")).toHaveTextContent("Loading...");
});


test('makes AJAX request', async () => {
  render(<CompanyList />);
  await waitFor(() => expect(axiosMock).toHaveBeenCalledTimes(1));
});
