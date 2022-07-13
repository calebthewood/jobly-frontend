import React from 'react';
import { render, screen, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from "react-router-dom";
import CompanyList from './CompanyList';

afterEach(cleanup);

it("matches snapshot", function () {
  const { asFragment } = render(<CompanyList />);
  expect(asFragment()).toMatchSnapshot();
});

it('Renders Loading...', async () => {
  const { getByTestId } = render(<CompanyList />);
  expect(getByTestId("loading")).toHaveTextContent("Loading...");
});


const TEST_COMPANIES = {
  "companies": [
    {
      "handle": "company-one",
      "name": "Company One",
      "description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
      "numEmployees": 245,
      "logoUrl": "/logos/logo3.png"
    },
    {
      "handle": "company-two",
      "name": "Company Two",
      "description": "Kind crime at perhaps beat. Enjoy deal purpose serve begin or thought. Congress everything miss tend.",
      "numEmployees": 795,
      "logoUrl": null
    },
    {
      "handle": "company-three",
      "name": "Company Three",
      "description": "Make radio physical southern. His white on attention kitchen market upon. Represent west open seven. Particularly subject billion much score thank bag somebody.",
      "numEmployees": 309,
      "logoUrl": null
    }
  ]
};


it("fetches and displays data", async () => {
  render(<CompanyList />);
  expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");

  await waitForElementToBeRemoved(screen.getByTestId("loading")

  expect(screen.getByTestId("resolved")).toBeInTheDocument()
});

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


