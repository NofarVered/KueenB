import { BrowserRouter } from "react-router-dom";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";

export const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};
