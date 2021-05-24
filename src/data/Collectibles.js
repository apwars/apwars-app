import store from "@/store";
import { getGameItems } from "./Collectibles/GameItens";
import { getLegendaryRelics } from "./Collectibles/LegendaryRelics";

export function getCollectibles() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [].concat(getGameItems(), getLegendaryRelics());
}
