import { getInitials, stringAvatar } from "./avatar";

describe("getInitials", () => {
  it("builds the initials from first and last name", () => {
    expect(getInitials({ firstName: "Aria", lastName: "Test" })).toBe("AT");
  });

  it("does not throw when a name part is missing", () => {
    expect(() => getInitials({ firstName: "Aria" })).not.toThrow();
    expect(getInitials({ firstName: "Aria" })).toBe("A");
    expect(getInitials({ eMail: "x@y.com" })).toBe("");
  });
});

describe("stringAvatar", () => {
  it("does not throw when firstName/lastName are missing", () => {
    expect(() => stringAvatar({ eMail: "x@y.com" })).not.toThrow();
  });

  it("returns initials and a valid color for a complete user", () => {
    const result = stringAvatar({ firstName: "Aria", lastName: "Test" });

    expect(result.children).toBe("AT");
    expect(result.sx.bgcolor).toMatch(/^rgb\(\d+,\d+,\d+\)$/);
  });
});
