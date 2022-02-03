import store from "@/store";
import { getGameItems } from "./Collectibles/GameItems";
import { getLegendaryRelics } from "./Collectibles/LegendaryRelics";
import { getWeapons } from "./Collectibles/Weapons";
import { getMagicalItems } from "./Collectibles/MagicalItems";
import { getFoundations } from "./Collectibles/Foundations";
import { getArcadia } from "./Collectibles/Arcadia";

export function getCollectibles() {
  const addresses = store.getters["user/addresses"];

  if (!addresses) {
    return [];
  }

  return [].concat(getGameItems(), getLegendaryRelics(), getWeapons(), getMagicalItems(), getFoundations(), getArcadia());
}

export function getGameItemTypesOptions() {
  const itemsData = getCollectibles();
  const itemTypes = itemsData.map(i => i.typeDesc);
  return Array.from(new Set(itemTypes));
}

export function getCollectibleById(id) {
  return getCollectibles().find(c => c.id == id);
}
