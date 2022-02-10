<template>
  <div>
    <v-container v-if="getListPodium.length === 3">
      <v-row v-if="!$vuetify.breakpoint.xs" class="mt-8 d-flex align-end" dense>
        <v-col
          v-for="(player, index) in getListPodium"
          v-bind:key="index"
          cols="12"
          sm="4"
        >
          <v-card
            :class="
              `card-podium ${
                index === 1 ? 'gold' : index === 0 ? 'silver' : 'bronze'
              }`
            "
          >
            <div
              class="card-podium-body flex-column d-flex align-center justify-center"
            >
              <div class="d-flex flex-column align-center">
                <v-avatar
                  class="avatar d-flex justify-center"
                  :address="player.account"
                  tooltip
                />
                <img
                  :class="`mt-n2 icon-place-${index}`"
                  :src="`/images/game/icon-place-${index}.png`"
                  alt="icon-place"
                />
              </div>
              <div class="d-flex align-center my-5">
                <img
                  :width="`${index === 1 ? '85px' : '60px'}`"
                  :src="`/images/game/trophy-${index}.png`"
                  alt="trophy-gold"
                />
                <div :class="`${index === 1 ? 'text-h2' : 'text-h4'}`">
                  {{ player.score }} {{ scoreMetric }}
                </div>
              </div>
              <v-address
                class="text-center"
                :address="player.account"
                link
                tooltip
              >
              </v-address>
            </div>
            <div
              v-if="player.prizeAmount"
              class="card-podium-footer d-flex align-center  justify-center mt-2 py-2"
            >
              <img
                :width="`${index === 1 ? '65px' : '45px'}`"
                :src="`/images/icons/chest-wgold.png`"
                alt="chest-wgold"
                class="mr-1"
              />
              <div
                :class="
                  `${
                    index === 1
                      ? 'black--text text-h4'
                      : 'black--text text-h5 font-weight-bold'
                  }`
                "
              >
                {{ player.prizeAmount }} {{ player.prize }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else class="mt-8 d-flex align-end" dense>
        <v-col
          v-for="(player, index) in podium"
          v-bind:key="player.account"
          :cols="index === 0 ? 10 : 6"
          :offset="index === 0 ? 1 : 0"
          :class="`${index !== 0 ? 'mt-4' : ''}`"
        >
          <v-card
            :class="
              `card-podium ${
                index === 1 ? 'silver' : index === 0 ? 'gold' : 'bronze'
              }`
            "
          >
            <div
              class="card-podium-body flex-column d-flex align-center justify-center"
            >
              <div class="d-flex flex-column align-center">
                <v-avatar
                  width="20px"
                  class="avatar d-flex justify-center"
                  :address="player.account"
                  tooltip
                />
                <img
                  :class="`mt-n1 icon-place-${index}`"
                  :src="
                    `/images/game/icon-place-${
                      index === 0 ? 1 : index === 1 ? 0 : 2
                    }.png`
                  "
                  alt="icon-place"
                />
              </div>
              <div class="d-flex align-center my-2">
                <img
                  :width="`${index === 0 ? '40px' : '30px'}`"
                  :src="
                    `/images/game/trophy-${
                      index === 0 ? 1 : index === 1 ? 0 : 2
                    }.png`
                  "
                  alt="trophy-gold"
                />
                <div :class="`${index === 0 ? 'text-h4' : 'text-h5'}`">
                  {{ player.score }} {{ scoreMetric }}
                </div>
              </div>
              <v-address
                class="text-center text-overline"
                :address="player.account"
                link
                tooltip
              >
              </v-address>
            </div>
            <div
              class="card-podium-footer flex-column d-flex align-center justify-center py-1"
            >
              <img
                :width="`${index === 0 ? '45px' : '35px'}`"
                :src="`/images/icons/chest-wgold.png`"
                alt="chest-wgold"
              />
              <div
                :class="
                  `${
                    index === 0
                      ? 'black--text text-h5 font-weight-bold'
                      : 'black--text text-h6 font-weight-bold'
                  }`
                "
              >
                {{ player.prizeAmount }} {{ player.prize }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import VAvatar from "@/lib/components/ui/Utils/VAvatar";
import VAddress from "@/lib/components/ui/Utils/VAddress";
import Medal from "@/lib/components/ui/Utils/Medal";


export default {
  props: {
    podium: {
      type: Array,
      default: [],
    },
    scoreMetric: {
      type: String,
      default: 'pts'
    }
  },

  components: {
    Amount,
    wButton,
    VAvatar,
    VAddress,
    Medal,
  },

  computed: {
    getListPodium() {
      const podium = [];
      podium[0] = this.podium.find(p => p.position === 2);
      podium[1] = this.podium.find(p => p.position === 1);
      podium[2] = this.podium.find(p => p.position === 3);
      return podium;
    },
  },
};
</script>

<style scoped>
.card-podium {
  background: #000000;
  border: 2px solid #ffeebc;
  box-sizing: border-box;
  border-radius: 0px;
}

.card-podium .icon-place-0 {
  width: 50px;
}
.card-podium .icon-place-1 {
  width: 60px;
}
.card-podium .icon-place-2 {
  width: 40px;
}

.card-podium.gold {
  border: 2px solid #ffb800;
}
.card-podium.silver {
  border: 2px solid #c4c4c4;
}
.card-podium.bronze {
  border: 2px solid #e95809;
}

.card-podium.gold .avatar >>> img {
  margin-top: -50px;
  border: 2px solid #ffb800;
  border-radius: 8px;
}
.card-podium.silver .avatar >>> img {
  margin-top: -50px;
  border: 2px solid #c4c4c4;
  border-radius: 8px;
}
.card-podium.bronze .avatar >>> img {
  margin-top: -50px;
  border: 2px solid #e95809;
  border-radius: 8px;
}

.card-podium.gold .card-podium-footer {
  background: linear-gradient(180deg, #f3a100 0%, #ffb800 100%);
  border-top: 2px solid #ffb800;
  box-sizing: border-box;
  border-radius: 0px;
}
.card-podium.silver .card-podium-footer {
  background: linear-gradient(180deg, #8e8e8e 0%, #c4c4c4 100%);
  border-top: 2px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 0px;
}
.card-podium.bronze .card-podium-footer {
  background: linear-gradient(180deg, #be4400 0%, #e95809 100%);
  border-top: 2px solid #e95809;
  box-sizing: border-box;
  border-radius: 0px;
}


@media only screen and (max-width: 959px) {

  .card-podium.gold .avatar >>> img {
    width: 70px;
    margin-top: -35px;
    border: 2px solid #ffb800;
    border-radius: 8px;
  }
  .card-podium.silver .avatar >>> img {
    width: 70px;
    margin-top: -35px;
    border: 2px solid #c4c4c4;
    border-radius: 8px;
  }
  .card-podium.bronze .avatar >>> img {
    width: 70px;
    margin-top: -35px;
    border: 2px solid #e95809;
    border-radius: 8px;
  }
  .card-podium .icon-place-0 {
    width: 40px;
  }
  .card-podium .icon-place-1 {
    width: 40px;
  }
  .card-podium .icon-place-2 {
    width: 40px;
  }
  .list-leaderboard-avatar >>> img {
    border-radius: 6px 0px 0px 0px;
  }
  .list-leaderboard-info {
    border-top: 2px solid #ffeebc;
  }
}
@media only screen and (max-width: 1280px) {
  .dividing-line {
    background: none;
  }
}
</style>
