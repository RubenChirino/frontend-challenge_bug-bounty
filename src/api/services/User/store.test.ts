import UserStore from "./store";
import { ActionResultStatus, ActionSuccess } from "../../../types/global";
import { User } from "./store";

describe("UserStore.getOwnUser", () => {
  it("stores the fetched user on the observable `user` property", async () => {
    const store = new UserStore();
    expect(store.user).toBeNull();

    const action = (await store.getOwnUser()) as ActionSuccess<User>;

    expect(action.status).toBe(ActionResultStatus.SUCCESS);
    expect(store.user).toEqual({
      firstName: "Aria",
      lastName: "Test",
      eMail: "linda.bolt@osapiens.com",
    });
  });
});
