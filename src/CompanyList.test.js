import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  findByTestId } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from "react-router-dom";
import CompanyList from './CompanyList';
import App from './App';
import Home from './Home';
import axiosMock from "axios";

afterEach(cleanup);

it("matches snapshot", function () {
  const { asFragment } = render(<CompanyList />);
  expect(asFragment()).toMatchSnapshot();
});

it('Renders Loading...', async () => {
  const { getByTestId } = render(<CompanyList />);
  expect(getByTestId("loading")).toHaveTextContent("Loading...");
});


it("renders Company List", async function() {
  const { getByTestId, screen } = render(
    <MemoryRouter initialEntries={["/companies"]}>
      <Home />
    </MemoryRouter>
  );
  const result = await waitForElementToBeRemoved(getByTestId("loading"))
  console.log(result)
  await waitFor(() => findByTestId("search"));
  expect(axiosMock.get).toHaveBeenCalledTimes(2);
  expect(asFragment()).toMatchSnapshot();
});


// it("fetches and displays data", async () => {
//   render(<CompanyList />);
//   expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");

//   await waitForElementToBeRemoved(screen.getByTestId("loading")

//   expect(screen.getByTestId("resolved")).toBeInTheDocument()
// });

// it("renders list of companies", async () => {
//   const { getByTestId, asFragment } = render(
//     <MemoryRouter initialEntries={["/companies"]}>
//       <CompanyList />
//     </MemoryRouter>
//   );
//   await waitFor(() => getByTestId("resolved"));
//   expect(axiosMock.get).toHaveBeenCalledTimes(2);
//   expect(asFragment()).toMatchSnapshot();
// });


