import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import Application from "components/Application";
afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    const appointment = appointments[0];
    // console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // console.log(prettyDOM(appointment));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // console.log(prettyDOM(day));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

});