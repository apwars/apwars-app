import Troops from "@/lib/eth/Troops";
import { getTroops } from "@/data/Troops";

export async function getTrooper(networkId, account) {
  let troops = getTroops();

  let globalTroops = await Promise.all(
    troops.map((trooper) => {
      return new Promise(async (resolve) => {
        try {
          if (trooper.contractAddress === "") {
            resolve({
              name: trooper.name,
              team: trooper.team,
              tier: trooper.tier,
              myQty: "0",
              globalQty: "0",
              pricewGOLD: "0",
              disabled: true,
            });
          }
          const getTropper = new Troops(
            trooper.contractAddress[networkId]
          );
          const myQty = await getTropper.balanceOf(account);
          const globalQty = await getTropper.totalSupply();
          const pricewGOLD = await getTropper.pricewGOLD(
            trooper.lpAddresses,
            networkId
          );
          resolve({
            ...trooper,
            ...{
              myQty: myQty,
              globalQty: globalQty,
              pricewGOLD: pricewGOLD,
              disabled: false,
            },
            
          });
        } catch (error) {
          resolve({
            name: trooper.name,
            team: trooper.team,
            tier: trooper.tier,
            myQty: "0",
            globalQty: "0",
            pricewGOLD: "0",
            disabled: true,
          });
        }
      });
    })
  );

  let global = []

  global = globalTroops.map((trooper) => {
    return {
      ...trooper,
      ...{ globalQty: trooper.globalQty, myQty: trooper.myQty },
    };
  });

  return global
}