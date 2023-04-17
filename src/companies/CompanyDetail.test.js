import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import CompanyDetail from "./CompanyDetail";
import JoblyApi from "../api/api";
import { formatCurrency } from "../utils";

jest.mock("../api/api");

const company = {
  handle: "test-company",
  name: "Test Company",
  description: "This is a test company.",
  numEmployees: 245,
  logoUrl: "/logos/logo3.png",
  jobs: [
    {
      id: 1,
      title: "Test Job",
      salary: 100000,
      equity: "0.065",
    },
  ],
};

beforeEach(() => {
  JoblyApi.getCompany.mockResolvedValueOnce(company);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('CompanyDetail', () => {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <UserProvider>
          <CompanyDetail />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter initialEntries={["/companies/test-company"]}>
        <UserProvider>
          <CompanyDetail />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the company details and job cards", async () => {
    // Jest would only match the entire salary text, hence below
    const salary = "Salary: " + formatCurrency(company.jobs[0].salary);
    render(
      <MemoryRouter initialEntries={['/companies/test-company']}>
        <UserProvider>
          <CompanyDetail />
        </UserProvider>
      </MemoryRouter >
    );
    await waitFor(() => { expect(screen.getByText(company.name)).toBeInTheDocument() });
    await waitFor(() => { expect(screen.getByText(company.description)).toBeInTheDocument() });
    await waitFor(() => { expect(screen.getByText(company.jobs[0].title)).toBeInTheDocument() });
    await waitFor(() => { expect(screen.getByText(salary)).toBeInTheDocument() });
    await waitFor(() => { expect(screen.queryByTestId("loading")).toBeNull() });
  });

  it("should render a loading indicator when waiting for data", async () => {
    render(
      <MemoryRouter initialEntries={['/companies/test-company']}>
        <CompanyDetail />
      </MemoryRouter>
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
