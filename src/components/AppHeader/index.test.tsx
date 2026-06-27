import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@mui/material/styles";
import { osapiens } from "../../themes";
import i18n from "../../i18n";
import AppHeader from "./index";

describe("AppHeader countdown", () => {
  beforeAll(async () => {
    if (!i18n.isInitialized) {
      await new Promise<void>((resolve) =>
        i18n.on("initialized", () => resolve())
      );
    }
  });

  it("clears the interval on unmount so timers do not leak", () => {
    const setSpy = jest.spyOn(window, "setInterval");
    const clearSpy = jest.spyOn(window, "clearInterval");

    const container = document.createElement("div");
    document.body.appendChild(container);

    act(() => {
      ReactDOM.render(
        <ThemeProvider theme={osapiens.light}>
          <AppHeader user={{}} pageTitle="Test" />
        </ThemeProvider>,
        container
      );
    });

    expect(setSpy).toHaveBeenCalled();
    const intervalId = setSpy.mock.results[0].value;

    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });

    expect(clearSpy).toHaveBeenCalledWith(intervalId);

    container.remove();
    setSpy.mockRestore();
    clearSpy.mockRestore();
  });
});
