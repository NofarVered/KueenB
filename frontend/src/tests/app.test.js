import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText("Office registration form")).toBeInTheDocument();

  userEvent.click(screen.getByText("Register to a day in the office"));

  // check that the content changed to the new page
  expect(screen.getByText("When are you coming?")).toBeInTheDocument();

  userEvent.click(screen.getByTestId("arrow"));

  userEvent.click(screen.getByText("Fill a health statement"));

  // check that the content changed to the new page
  expect(screen.getByText("Health Statement")).toBeInTheDocument();
});
