import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CompanyCard from "./CompanyCard";



describe('CompanyCard', () => {
  const companyOne = {
    handle: "rithm",
    name: "Rithm School",
    description: "Become an exceptional developer in 16 weeks.",
    logo_url: "https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
  };

  const companyTwo = {
    handle: "algo",
    name: "Algo School",
    description: "Become a mediocre developer in 160 weeks."
  };

  it("matches snapshot with logo", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyCard company={companyOne} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot without logo", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <CompanyCard company={companyTwo} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  const mockCompany = {
    handle: 'company-handle',
    name: 'Company Name',
    description: 'Company description',
    logoUrl: 'https://example.com/logo.png',
  };

  it('renders company name and description', () => {
    render(
      <MemoryRouter>
        <CompanyCard company={mockCompany} />
      </MemoryRouter>
    );

    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.getByText('Company description')).toBeInTheDocument();
  });

  it('renders company logo if provided', () => {
    render(
      <MemoryRouter>
        <CompanyCard company={mockCompany} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('company-handle')).toBeInTheDocument();
  });

  it('renders a link to the company page', () => {
    render(
      <MemoryRouter>
        <CompanyCard company={mockCompany} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/companies/company-handle'
    );
  });
});
