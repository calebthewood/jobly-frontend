import { render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router";
import axiosMock from "axios";

it("renders without crashing", function() {
  render(<MemoryRouter><App /></MemoryRouter>);
});