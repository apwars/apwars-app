import store from "@/store";
import { getGameItems } from "./Collectibles/GameItems";
import { getLegendaryRelics } from "./Collectibles/LegendaryRelics";
import { getWeapons } from "./Collectibles/Weapons";
import { getMagicalItems } from "./Collectibles/MagicalItems";

export function getCollectibles() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [].concat(getGameItems(), getLegendaryRelics(), getWeapons(), getMagicalItems());
}
