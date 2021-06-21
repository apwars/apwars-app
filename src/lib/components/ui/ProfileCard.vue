<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <div class="btn">
          <v-img
            width="180"
            @click="changeAvatar()"
            class="justify-center mt-n4 mt-md-0 mx-auto mx-md-0"
            :src="`/images/avatars/${avatar}-avatar.png`"
          />
          <v-img
            width="180"
            @click="changeAvatar()"
            class="justify-center mt-n4 mt-md-0 mx-auto mx-md-0"
            :src="`/images/${avatar}.png`"
          />
        </div>
      </v-col>
      <v-col class="card-info-collection">
        <v-layout justify-center align-center>
          <v-flex shrink class="text-center">
            <div class="title">
              Game Items
            </div>
            <div class="value">
              {{ collectibles }}
            </div>
          </v-flex>
        </v-layout>
      </v-col>
      <v-col class="card-info-collection">
        <v-layout justify-center align-center>
          <v-flex shrink class="text-center">
            <div class="title">
              Inventory
            </div>
            <div class="value">
              {{ collection }}
            </div>
          </v-flex>
        </v-layout>
      </v-col>
      <v-col class="card-info-collection">
        <v-layout justify-center align-center>
          <v-flex shrink class="text-center">
            <div class="d-flex title justify-center">
              <img src="/images/wgold.png" height="30px" alt="wGOLD" />
              wGOLD
            </div>
            <div class="value">
              <amount :amount="balance" decimals="2" compact tooltip />
            </div>

            <v-img
              @click="goToSwap()"
              class="btn"
              width="157"
              src="/images/buttons/btn-buy-wgold.png"
            />
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameText from "@/lib/components/ui/Utils/GameText";
import Amount from "@/lib/components/ui/Utils/Amount";

export default {
  props: ["balance", "collectibles", "collection"],

  components: {
    GameText,
    Amount,
  },

  data() {
    return {};
  },

  computed: {
    avatar() {
      return this.$store.getters["user/avatar"];
    },
  },

  methods: {
    goToSwap() {
      this.$router.push("/exchange");
    },

    changeAvatar() {
      const avatar = this.avatar === "degen" ? "corp" : "degen";
      this.$store.dispatch("user/changeAvatar", { avatar });
    },
  },
};
</script>

<style scoped>
.container {
  border-color: #966a3c !important;
  border: 2px solid;
  border-radius: 0px;
}

.address {
  color: white;
  font-size: 22px;
  font-weight: bold;
}

.title {
  color: #ffb800;
  font-weight: bold;
  font-size: 32px;
}

.value {
  background: -webkit-linear-gradient(#f6ff00, #ffb800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
  font-weight: bold;
}

.btn {
  cursor: pointer;
}

.card-info-collection {
  height: 156px;
}

@media only screen and (max-width: 1024px) {
  .card-info-collection {
    height: 100%;
    padding: 5px;
  }
}
</style>
