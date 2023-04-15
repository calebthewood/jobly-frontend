import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { UserProvider } from "../testUtils";


describe('CompanyDetail', () => {
  it("matches snapshot", function () {
    let item = { title: "CEO", salary: 1000000, equity: 10 };
    const { asFragment } = render(
      <UserProvider>
        <JobCard job={item} />
      </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});