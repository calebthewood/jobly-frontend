import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import CompanyList from './CompanyList';
import JoblyApi from "../api/api";


jest.mock("../api/api");

const companies = [
  {
    handle: "test-company-1",
    name: "Test Company 1",
    description: "This is a test company.",
    numEmployees: 245,
    logoUrl: "/logos/logo3.png",
  }, {
    handle: "test-company-2",
    name: "Test Company 2",
    description: "This is another test company.",
    numEmployees: 10,
    logoUrl: null,
  }
];

describe('CompanyList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', function () {
    const { asFragment } = render(<CompanyList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders Loading...', async () => {
    render(<CompanyList />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
  });

  it('should render multiple companies', async () => {
    JoblyApi.getCompanies.mockResolvedValueOnce(companies);
    render(
      <MemoryRouter initialEntries={['/companies']}>
        <UserProvider>
          <CompanyList />
        </UserProvider>
      </MemoryRouter >
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
    await waitFor(() => { expect(JoblyApi.getCompanies).toHaveBeenCalledTimes(1); });
    await waitFor(() => { expect(screen.getByText(companies[0].name)).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByText(companies[0].description)).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByText(companies[1].name)).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByText(companies[1].description)).toBeInTheDocument(); });

  });

  it('should render "not found" message if state empty', async () => {
    JoblyApi.getCompanies.mockResolvedValueOnce([]);
    render(
      <MemoryRouter initialEntries={['/companies']}>
        <UserProvider>
          <CompanyList />
        </UserProvider>
      </MemoryRouter >
    );
    await waitFor(() => { expect(JoblyApi.getCompanies).toHaveBeenCalledTimes(1); });
    await waitFor(() => { expect(screen.getByTestId('not-found')).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByText('Companies not found.')).toBeInTheDocument(); });
  });

  it('renders the search bar', async () => {
    JoblyApi.getCompanies.mockResolvedValueOnce(companies);
    render(
      <MemoryRouter initialEntries={['/companies']}>
        <UserProvider>
          <CompanyList />
        </UserProvider>
      </MemoryRouter >
    );
    await waitFor(() => { expect(screen.getByTestId('search')).toBeInTheDocument(); });
  });
});


