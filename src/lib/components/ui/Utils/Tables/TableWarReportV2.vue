<template>
  <v-card width="100%">
    <v-card-title>
      {{ war.name }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      class="table-war-report"
      :headers="headers"
      :items="war.players"
      :search="search"
    >
      <template v-slot:[`item.address`]="{ item }">
        <v-address :address="item.address" link tooltip></v-address>
      </template>
      <template v-slot:[`item.powerTeamA`]="{ item }">
        <amount
          :amount="item.teamAShareLabel"
          formatted
          decimals="5"
          compact
          approximate
        />
      </template>
      <template v-slot:[`item.powerTeamB`]="{ item }">
        <amount
          :amount="item.powerTeamB"
          formatted
          decimals="5"
          compact
          approximate
        />
        (<amount
          :amount="item.teamBShareLabel"
          formatted
          decimals="5"
          compact
          approximate
        />%)
      </template>
      <template v-slot:[`item.wCOURAGE`]="{ item }">
        <amount
          :amount="item.wCOURAGE"
          formatted
          decimals="5"
          compact
          approximate
        />
        (<amount
          :amount="item.wCOURAGEShare"
          formatted
          decimals="5"
          compact
          approximate
        />%)
      </template>
      <template v-slot:[`item.wGOLD`]="{ item }">
        <amount
          :amount="item.wGOLD"
          formatted
          decimals="5"
          compact
          approximate
        />
        (<amount
          :amount="item.wGOLDShare"
          formatted
          decimals="5"
          compact
          approximate
        />%)
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import VAddress from "@/lib/components/ui/Utils/VAddress";

import WarMachine from "@/lib/eth/WarMachine";

export default {
  props: ["war"],
  components: {
    VAddress,
    Amount,
  },

  data() {
    return {
      warMachine: {},
      prizeWon: false,
      search: "",
      headers: [
        {
          text: "Player",
          value: "PlayerAddress",
        },
        { text: "Corporation Power", value: "Corporation Power" },
        { text: "Degenerate Power", value: "Degen Power" },
        { text: "Team", value: "Team" },
        { text: "wCOURAGE", value: "wCOURAGE" },
        { text: "wGOLD", value: "wGOLD" },
        { text: "wGOLD Loss", value: "wGOLD Loss" },
        { text: "wGOLD Earnings", value: "wGOLD Earnings" },
        { text: "PnL", value: "wGOLD Earnings" },
      ],
    };
  },

  async mounted() {
    this.warMachine = new WarMachine(
      this.war.contractAddress[this.networkInfo.id],
      this.networkInfo.id
    );
    const prize = await this.warMachine.getWarReportwGOLD();
    this.prizeWon = web3.utils.fromWei(prize.won.toString());
    this.prizeWon = parseFloat(this.prizeWon);
  },

  computed: {
    players() {
      if (
        !this.war ||
        !this.war.report ||
        !this.war.report.players ||
        this.prizeWon === false
      ) {
        return [];
      }

      return this.war.report.players.map((player) => {
        player.powerTeamA =
          this.war.report.attack === "TeamA"
            ? player.totalAttackPowerTeamA
            : player.totalDefensePowerTeamA;
        player.powerTeamB =
          this.war.report.attack === "TeamB"
            ? player.totalAttackPowerTeamB
            : player.totalDefensePowerTeamB;

        player.team =
          player.powerTeamA > player.powerTeamB ? "Corporation" : "Degenerate";

        player.teamAShareLabel = 100 * player.teamAShare;
        player.teamBShareLabel = 100 * player.teamBShare;
        player.wCOURAGEShare =
          100 * (player.wCOURAGEAmount / this.war.report.WCOURAGESupply);

        const wGOLDShare =
          this.war.report.winner === "TeamA"
            ? player.teamAShare
            : player.teamBShare;
        player.wGOLD = this.prizeWon * wGOLDShare;
        player.wGOLDShare = 100 * wGOLDShare;

        return player;
      });
    },
    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },
  },
};
</script>

<style scoped>
.table-war-report >>> .v-data-table__wrapper > table > tbody > tr > td,
.table-war-report >>> .v-data-table__wrapper > table > thead > tr > td,
.table-war-report >>> .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 1rem;
}

.table-war-report >>> .v-data-table__wrapper > table > tbody > tr > th,
.table-war-report >>> .v-data-table__wrapper > table > thead > tr > th,
.table-war-report >>> .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 1rem;
  color: #ffb800;
}
</style>
