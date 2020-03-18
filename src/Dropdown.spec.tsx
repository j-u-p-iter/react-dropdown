import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { Dropdown } from "./Dropdown";

const noop = () => {};

describe("Dropdown", () => {
  it("attaches className properly", () => {
    const TEST_ID = "dropdown";
    const EXPECTED_CLASS_NAME = "dropdownClassName";

    const { getByTestId } = render(
      <Dropdown
        className={EXPECTED_CLASS_NAME}
        data-testid={TEST_ID}
        overlay={<div>Hello</div>}
        onToggle={noop}
      >
        <a href="#">Click me</a>
      </Dropdown>
    );

    expect(getByTestId(TEST_ID).className).toBe(EXPECTED_CLASS_NAME);
  });

  it("toggles overlay properly", () => {
    const OVERLAY_TEST_ID = "overlay";
    const TRIGGER_TEST_ID = "trigger";

    const { queryByTestId } = render(
      <Dropdown
        className="someClassName"
        overlay={<div data-testId={OVERLAY_TEST_ID}>Hello</div>}
        onToggle={noop}
      >
        <a href="#" data-testid={TRIGGER_TEST_ID}>
          Click me
        </a>
      </Dropdown>
    );

    // overlay is absent by default
    expect(queryByTestId(OVERLAY_TEST_ID)).toBe(null);

    fireEvent.click(queryByTestId(TRIGGER_TEST_ID));

    expect(queryByTestId(OVERLAY_TEST_ID)).not.toBe(null);
  });

  it("calls onToggle properly", () => {
    const TRIGGER_TEST_ID = "trigger";
    const onToggle = jest.fn();

    const { queryByTestId } = render(
      <Dropdown
        className="someClassName"
        overlay={<div>Hello</div>}
        onToggle={onToggle}
      >
        <a href="#" data-testid={TRIGGER_TEST_ID}>
          Click me
        </a>
      </Dropdown>
    );

    expect(onToggle).toHaveBeenCalledTimes(0);

    fireEvent.click(queryByTestId(TRIGGER_TEST_ID));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true);

    fireEvent.click(queryByTestId(TRIGGER_TEST_ID));

    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
