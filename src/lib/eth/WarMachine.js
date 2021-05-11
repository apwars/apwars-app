import WarMachineABI from "./WarMachine.json";
import { ethers } from "ethers";
import { getTroops } from "@/data/Troops";
import { getWars } from "@/data/Wars";
import BigNumber from "bignumber.js";

export default class WarMachine {
  constructor(contract, networkInfo) {
    this.contractAddress = contract;
    this.networkInfo = networkInfo;
    this.smc = new window.web3.eth.Contract(
      WarMachineABI,
      this.contractAddress
    );
    window.WarMachine = this.smc;
  }

  allowance(owner, spender) {
    return this.smc.methods.allowance(owner, spender).call();
  }

  async getPlayerInfo(IAPWarsUnit, account) {
    const playerInfo = await this.smc.methods
      .getPlayerInfo([IAPWarsUnit], account)
      .call();

    return playerInfo.depositAmount;
  }

  async activeEnlistment() {
    const warStage = await this.smc.methods.warStage().call();
    return warStage === "0";
  }

  warStage() {
    return this.smc.methods.warStage().call();
  }

  warStats() {
    return this.smc.methods.war().call();
  }

  approve(from, spender) {
    return this.smc.methods
      .approve(spender, ethers.constants.MaxUint256)
      .send({ from });
  }

  async hasAllowance(owner, spender) {
    const allowance = await this.allowance(owner, spender);
    const bn = new BigNumber(allowance);
    return bn.gt(0);
  }

  getWarInfo(team, tokenAddresses) {
    return this.smc.methods.getWarInfo(team, tokenAddresses).call();
  }

  async getWarReportMyTrooper(team, IAPWarsUnit, address) {
    const warStats = await this.warStats();
    const warInfo = await this.smc.methods
      .getPlayerInfo([IAPWarsUnit], address)
      .call();

    const enlisted = new BigNumber(warInfo.depositAmount);
    let percentageLoss = "";
    if (warStats.attackerTeam === team) {
      percentageLoss = new BigNumber(warStats.percAttackerLosses);
    } else if (warStats.defenderTeam === team) {
      percentageLoss = new BigNumber(warStats.percDefenderLosses);
    }
    const dead = enlisted.times(percentageLoss).div("10000");
    const survivor = enlisted.minus(dead);

    const isWithdrawn = await this.smc.methods
      .withdrawn(address, IAPWarsUnit)
      .call();

    return {
      enlisted: enlisted.toFixed(),
      survivor: survivor.toFixed(),
      dead: dead.toFixed(),
      isWithdrawn: isWithdrawn,
    };
  }

  async getWarReportTrooper(team, IAPWarsUnit) {
    const warStats = await this.warStats();
    let troops = getTroops();
    troops = troops.filter(
      (trooper) =>
        trooper.team === parseInt(team) &&
        trooper.contractAddress[this.networkInfo] === IAPWarsUnit
    );
    const warInfo = await this.getWarInfo(
      team,
      troops.map((trooper) => trooper.contractAddress[this.networkInfo])
    );
    const enlisted = new BigNumber(warInfo.totalDepositAmount);
    let percentageLoss = "";
    if (warStats.attackerTeam === team) {
      percentageLoss = new BigNumber(warStats.percAttackerLosses);
    } else if (warStats.defenderTeam === team) {
      percentageLoss = new BigNumber(warStats.percDefenderLosses);
    }
    const dead = enlisted.times(percentageLoss).div("10000");
    const survivor = enlisted.minus(dead);

    return {
      enlisted: enlisted.toFixed(0),
      survivor: survivor.toFixed(0),
      dead: dead.toFixed(0),
    };
  }

  async getWarReportTeam(team) {
    const stage = parseInt(await this.warStage());
    let troops = getTroops();
    troops = troops.filter((trooper) => trooper.team === parseInt(team));
    const warInfo = await this.getWarInfo(
      team,
      troops.map((trooper) => trooper.contractAddress[this.networkInfo])
    );
    const enlisted = new BigNumber(warInfo.totalDepositAmount);

    if (stage === 0) {
      return {
        enlisted: enlisted.toFixed(0),
        survivor: "0",
        dead: "0",
      };
    }

    const warStats = await this.warStats();
    let percentageLoss = "";
    if (warStats.attackerTeam === team) {
      percentageLoss = new BigNumber(warStats.percAttackerLosses);
    } else if (warStats.defenderTeam === team) {
      percentageLoss = new BigNumber(warStats.percDefenderLosses);
    }
    const dead = enlisted.times(percentageLoss).div("10000");
    const survivor = enlisted.minus(dead);

    return {
      enlisted: enlisted.toFixed(0),
      survivor: survivor.toFixed(0),
      dead: dead.toFixed(0),
    };
  }

  async getWarReportwGOLD() {
    const stage = parseInt(await this.warStage());
    const war = getWars().find(
      (war) => war.contractAddress[this.networkInfo] === this.contractAddress
    );
    if (!war) {
      return {
        totalPrize: "0",
        won: "0",
        burned: "0",
      };
    }

    let getTotalPrize = new BigNumber(war.totalPrize);

    if (!war || stage < 2) {
      return {
        totalPrize: getTotalPrize.toFixed(0),
        won: "0",
        burned: "0",
      };
    }

    const secondRound = await this.smc.methods
      .secondRoundRandomParameters()
      .call();
    const won = getTotalPrize.times(secondRound.unlockedPrize).div("10000");
    const burned = getTotalPrize.minus(won);

    return {
      totalPrize: getTotalPrize.toFixed(0),
      won: won.toFixed(0),
      burned: burned.toFixed(0),
    };
  }

  getTotalPrize() {
    return this.smc.methods.getTotalPrize().call();
  }

  deposit(IAPWarsUnit, amount, from) {
    return this.smc.methods.deposit(IAPWarsUnit, amount).send({ from });
  }

  withdrawn(address, IAPWarsUnit) {
    return this.smc.methods.withdrawn(address, IAPWarsUnit).call();
  }

  withdraw(IAPWarsUnit, from) {
    return this.smc.methods.withdraw(IAPWarsUnit).send({ from });
  }

  withdrawPrize(from) {
    return this.smc.methods.withdrawPrize().send({ from });
  }

  async myAmountPrize(address) {
    try {
      const warStats = await this.warStats();
      let troops = getTroops();
      const contractFake = troops[0].contractAddress[this.networkInfo];

      let isAttacker = warStats.attackerTeam == warStats.winner;

      const teamA = await this.smc.methods.getWarInfo(1, [contractFake]).call();
      const teamB = await this.smc.methods.getWarInfo(2, [contractFake]).call();

      const winner = warStats.winner === "1" ? teamA : teamB;

      const teamTotalPower = isAttacker
        ? winner.totalAttackPower
        : winner.totalDefensePower;

      const myInfo = await this.smc.methods
        .getPlayerInfo([contractFake], address)
        .call();

      const totalAttackPower =
        warStats.winner === "1"
          ? myInfo.totalAttackPowerTeamA
          : myInfo.totalAttackPowerTeamB;

      const totalDefensePower =
        warStats.winner === "1"
          ? myInfo.totalDefensePowerTeamA
          : myInfo.totalDefensePowerTeamB;

      const userTotalPower = isAttacker ? totalAttackPower : totalDefensePower;
      const getTotalPrize = await this.getWarReportwGOLD();
      let userShare = new BigNumber("0");

      if (userTotalPower.toString() !== "0") {
        userShare = new BigNumber(userTotalPower)
          .div(teamTotalPower)
          .times(getTotalPrize.won);
      }

      return userShare.toFixed(0);
    } catch (error) {
      console.log(error);
      return "0";
    }
  }
}
