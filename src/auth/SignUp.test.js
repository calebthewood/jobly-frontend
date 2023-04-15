import { render } from "@testing-library/react";
import Signup from "./SignupForm";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
