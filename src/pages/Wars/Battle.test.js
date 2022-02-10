import { render } from "@testing-library/vue";
import Battle from "./Battle";

describe("War Battle Screen", () => {
  test("Should hide app bar on screen enter", async () => {
    const mutations = {
      "app/setMenuDisplay": jest.fn(),
    };

    render(Battle, {
      store: {
        state: {
          war: {
            isLoading: false,
          },
        },
        mutations,
      },
    });
    expect(mutations["app/setMenuDisplay"]).toHaveBeenCalledTimes(1);
  });

  test("Should get War Data", async () => {
    const mutations = {
      "app/setMenuDisplay": jest.fn(),
    };

    const actions = {
      "war/getWar": jest.fn(),
    };

    const getters = {
      "user/account": () => "account",
    };

    render(Battle, {
      store: {
        state: {
          war: {
            isLoading: false,
          },
        },
        mutations,
        actions,
        getters,
      },
    });
    expect(actions["war/getWar"]).toHaveBeenCalled();
  });
});
