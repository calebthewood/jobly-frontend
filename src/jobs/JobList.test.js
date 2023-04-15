import {
  render,
  cleanup,
} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import JobList from './JobList';


afterEach(cleanup);

it("renders without crashing", function() {
  render(<JobList />);
});

it("matches snapshot with no jobs", function() {
  const { asFragment } = render(<JobList />);
  expect(asFragment()).toMatchSnapshot();
});
