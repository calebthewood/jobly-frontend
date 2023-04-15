import React from 'react';
import {
  render,
  cleanup,
  waitFor
} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import JobList from './JobList';
import axiosMock from 'axios';

afterEach(cleanup);

it("matches snapshot", function () {
  const { asFragment } = render(<JobList />);
  expect(asFragment()).toMatchSnapshot();
});

it('renders Loading...', async () => {
  const { screen } = render(<JobList />);
  expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
});


test('makes AJAX request', async () => {
  const { getByTestId } = render(<JobList />);
  // Wait for page to update with query text
  await waitFor(() => expect(axiosMock).toHaveBeenCalledTimes(1));
});
