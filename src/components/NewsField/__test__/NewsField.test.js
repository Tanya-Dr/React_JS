import { fireEvent, render } from "@testing-library/react";
import { NewsField } from "..";

describe("NewsField", () => {
  describe("snapshot test", () => {
    it("matches snapshot with no news", () => {
      const news = [];
      const component = render(<NewsField news={news} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe("functionality tests", () => {
    it("renders CircularProgress when it's pending", () => {
      const component = render(<NewsField loading={true} />);
      const circularProgress = component.getByTestId("circul-element");
      expect(circularProgress).toHaveClass("MuiCircularProgress-root");
    });

    it("shows error message when request error", () => {
      const component = render(<NewsField error={true} />);
      const text = component.getByText("Request error");
      expect(text).toBeDefined();
    });

    it("renders button to try request again when request error", () => {
      const component = render(<NewsField error={true} />);
      const text = component.getByText("TRY AGAIN");
      expect(text).toBeDefined();
    });

    it("calls onClick when click button to try request again", () => {
      const handleClick = jest.fn();
      const component = render(
        <NewsField error={true} onRequestNews={handleClick} />
      );
      const clickable = component.getByText("TRY AGAIN");
      clickable.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders list of news", () => {
      const news = [
        { id: "id 1", title: "Mock News 1", url: "mockurl 1" },
        { id: "id 2", title: "Mock News 2", url: "mockurl 2" },
      ];
      const component = render(<NewsField news={news} />);
      const list = component.getByRole("list");
      expect(list).toBeDefined();
    });
  });
});
