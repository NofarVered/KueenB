import React from "react";
import { getISODay, addDays } from "date-fns";
import format from "date-fns/format";
import { BrowserRouter as Router, Route, MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import App from "../App";
import Calendar from "../components/Calendar/Calendar";
import { renderWithRouter, getDB } from "./test_utils";

function getClosestSundayOfNextWeek(fromDate = new Date()) {
  fromDate = addDays(fromDate, 1);
  const offsetDays = 14 - (getISODay(fromDate) + 7);
  return format(addDays(fromDate, offsetDays), "d");
}

afterEach(cleanup);

const testDB = [
  {
    id: 31,
    email: "h",
    name: "h",
    hs: false,
    arrivaldate: "31/03/2021",
  },
  {
    id: 19,
    email: "tom",
    name: "t",
    hs: false,
    arrivaldate: "28/03/2021",
  },
  {
    id: 16,
    email: "noam@g.com",
    name: "noma",
    hs: false,
    arrivaldate: "28/03/2021",
  },
  {
    id: 34,
    email: "h",
    name: "h",
    hs: false,
    arrivaldate: "28/03/2021",
  },
  {
    id: 27,
    email: "h",
    name: "h",
    hs: false,
    arrivaldate: "27/03/2021",
  },
  {
    id: 17,
    email: "noam@g.com",
    name: "noma",
    hs: false,
    arrivaldate: "27/03/2021",
  },
  {
    id: 21,
    email: "tom",
    name: "t",
    hs: false,
    arrivaldate: "26/03/2021",
  },
  {
    id: 29,
    email: "d@g.com",
    name: "daniel",
    hs: false,
    arrivaldate: "26/03/2021",
  },
  {
    id: 26,
    email: "h",
    name: "h",
    hs: false,
    arrivaldate: "26/03/2021",
  },
  {
    id: 25,
    email: "h",
    name: "h",
    hs: false,
    arrivaldate: "25/03/2021",
  },
  {
    id: 28,
    email: "d@g.com",
    name: "daniel",
    hs: true,
    arrivaldate: "24/03/2021",
  },
  {
    id: 24,
    email: "h",
    name: "h",
    hs: false,
    arrivaldate: "24/03/2021",
  },
  {
    id: 22,
    email: "hagit",
    name: "hagit",
    hs: false,
    arrivaldate: "23/03/2021",
  },
  {
    id: 23,
    email: "h",
    name: "h",
    hs: true,
    arrivaldate: "23/03/2021",
  },
  {
    id: 18,
    email: "tom",
    name: "t",
    hs: true,
    arrivaldate: "23/03/2021",
  },
  {
    id: 14,
    email: "noam@g.com",
    name: "noma",
    hs: false,
    arrivaldate: "23/03/2021",
  },
  {
    id: 30,
    email: "d@g.com",
    name: "daniel",
    hs: false,
    arrivaldate: "06/04/2021",
  },
  {
    id: 20,
    email: "tom",
    name: "t",
    hs: false,
    arrivaldate: "06/04/2021",
  },
  {
    id: 33,
    email: "h",
    name: "h",
    hs: false,
    arrivaldate: "05/04/2021",
  },
  {
    id: 15,
    email: "noam@g.com",
    name: "noma",
    hs: false,
    arrivaldate: "02/04/2021",
  },
  {
    id: 32,
    email: "h",
    name: "h",
    hs: false,
    arrivaldate: "01/04/2021",
  },
];

test("checking calendar", () => {
  const route = "/calendar";
  const { getByText } = renderWithRouter(
    <Calendar name={"tom"} email={"t@g.c"} mapRegistersByDay={testDB} />,
    { route }
  );

  //
  fireEvent.click(getByText(getClosestSundayOfNextWeek()));

  expect(getByText(getClosestSundayOfNextWeek()).parentElement).toHaveClass(
    "selected"
  );
});
