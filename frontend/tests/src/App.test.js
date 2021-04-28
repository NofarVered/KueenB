import {App} from "src/App"

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    const user_copy = { user: 1, email: "https://www.url1.dev" };
    App.addUser(user_copy)

  });
});