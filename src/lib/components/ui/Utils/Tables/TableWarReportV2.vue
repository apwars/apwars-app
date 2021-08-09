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
      :items="players"
      :search="search"
    >
      <template v-slot:[`item.PlayerAddress`]="{ item }">
        <v-address :address="item.PlayerAddress" link tooltip></v-address>
      </template>
      <template v-slot:[`item.corporationPower`]="{ item }">
        <amount
          :amount="100 * item.corporationPower"
          formatted
          decimals="4"
          approximate
        />%
      </template>
      <template v-slot:[`item.degenPower`]="{ item }">
        <amount
          :amount="100 * item.degenPower"
          formatted
          decimals="4"
          approximate
        />%
      </template>
      <template v-slot:[`item.wCOURAGE`]="{ item }">
        <amount
          :amount="item.wCOURAGE"
          formatted
          decimals="4"
          compact
          approximate
        />
      </template>
      <template v-slot:[`item.wGOLD`]="{ item }">
        <amount
          :amount="item.wGOLD"
          formatted
          decimals="4"
          compact
          approximate
        />
      </template>
      <template v-slot:[`item.wGOLDLoss`]="{ item }">
        <amount
          :amount="item.wGOLDLoss"
          formatted
          decimals="4"
          compact
          approximate
        />
      </template>
      <template v-slot:[`item.wGOLDEarnings`]="{ item }">
        <amount
          :amount="item.wGOLDEarnings"
          formatted
          decimals="4"
          compact
          approximate
        />
      </template>
      <template v-slot:[`item.PnL`]="{ item }">
        <amount :amount="100 * item.PnL" formatted decimals="2" approximate />%
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import VAddress from "@/lib/components/ui/Utils/VAddress";

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
        { text: "Corporation Power", value: "corporationPower" },
        { text: "Degenerate Power", value: "degenPower" },
        { text: "Team", value: "Team" },
        { text: "wCOURAGE", value: "wCOURAGE" },
        { text: "wGOLD", value: "wGOLD" },
        { text: "wGOLD Loss", value: "wGOLDLoss" },
        { text: "wGOLD Earnings", value: "wGOLDEarnings" },
        { text: "PnL", value: "PnL" },
      ],
    };
  },

  computed: {
    players() {
      if (!this.war || !this.war.report || !this.war.report.players) {
        return [];
      }

      return this.war.report.players;

      // return this.war.report.players.map((player) => {
      //   player.powerTeamA =
      //     this.war.report.attack === "TeamA"
      //       ? player.totalAttackPowerTeamA
      //       : player.totalDefensePowerTeamA;
      //   player.powerTeamB =
      //     this.war.report.attack === "TeamB"
      //       ? player.totalAttackPowerTeamB
      //       : player.totalDefensePowerTeamB;

      //   player.team =
      //     player.powerTeamA > player.powerTeamB ? "Corporation" : "Degenerate";

      //   player.teamAShareLabel = 100 * player.teamAShare;
      //   player.teamBShareLabel = 100 * player.teamBShare;
      //   player.wCOURAGEShare =
      //     100 * (player.wCOURAGEAmount / this.war.report.WCOURAGESupply);

      //   const wGOLDShare =
      //     this.war.report.winner === "TeamA"
      //       ? player.teamAShare
      //       : player.teamBShare;
      //   player.wGOLD = this.prizeWon * wGOLDShare;
      //   player.wGOLDShare = 100 * wGOLDShare;

      //   return player;
      // });
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
