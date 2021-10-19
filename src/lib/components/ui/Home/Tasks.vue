<template>
  <v-col cols="12" md="4">
    <v-badge
      class="badge-larg "
      color="red"
      bordered
      offset-y="30px"
      offset-x="5px"
    >
      <template v-slot:badge>
        {{ listTasks.length }}
      </template>

      <game-text header="h4">Tasks</game-text>
    </v-badge>

    <div class="loading-container" v-if="isLoading">
        <v-skeleton-loader
          class="mt-3 mx-1"
          width="200px"
          type="text, button"
        />
        <v-skeleton-loader
          class="mt-3 mx-1"
          width="200px"
          type="text, button"
        />
    </div>

    <v-slide-group v-else-if="listTasks.length" class="mt-3" show-arrows>
      <v-slide-item
        v-for="(item, index) in listTasks"
        :key="index"
        v-slot="{ toggle }"
      >
        <div class="d-flex align-center" @click="toggle">
          <div>
            <img
              class="bg-img-task"
              :width="`${$vuetify.breakpoint.mobile ? '70px' : '100px'}
                    `"
              :height="`${$vuetify.breakpoint.mobile ? '70px' : '100px'}
                    `"
              :src="item.image"
            />
          </div>

          <div class="ml-2 ml-md-3 mr-2 mr-md-6">
            <span class="font-weight-bold">{{ item.name }}</span>

            <div class="input-info" v-if="item.necessaryResources">
              <div
                class="claim-info"
                v-for="(input, index) in item.necessaryResources"
                :key="index"
              >
                <div class="image-viewport">
                  <img class="input-image" height="16px" :src="input.image" />
                </div>
                <div>{{ input.amount }} {{ input.title || input.name }}</div>
              </div>
            </div>

            <wButton
              v-if="item.combinatorInfo.isClaim"
              @click="$router.push(item.claimRouter)"
              class="mt-1"
              size="small"
            >
              Claim available
            </wButton>

            <countdown-block
              v-else
              :start-blocks="item.combinatorInfo.startBlock"
              :end-blocks="item.combinatorInfo.endBlock"
              show-progress
            />
          </div>
        </div>
      </v-slide-item>
    </v-slide-group>

    <div v-else>
      Hey, looks like you don't have any tasks right now. How about training
      units, researching weapons and evolving your troop?
      <wButton class="mt-3" @click="$router.push('/training-center')">
        Training center
      </wButton>
    </div>
  </v-col>
</template>

<script>
import { getTroops } from "@/data/Troops";
import { getMagicalItems } from "@/data/Collectibles/MagicalItems";
import { getGameItems } from "@/data/Collectibles/GameItems";

import Convert from "@/lib/helpers/Convert";
import Combinator from "@/lib/eth/Combinator";
import wButton from "@/lib/components/ui/Buttons/wButton";
import GameText from "@/lib/components/ui/Utils/GameText";
import CountdownBlock from "@/lib/components/ui/Utils/CountdownBlock";

export default {
  components: { wButton, GameText, CountdownBlock },
  data() {
    return {
      isLoading: false,
      listTasks: [],
    };
  },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },
  },
  methods: {
    async getTasks() {
      this.isLoading = true;
      const getListTasks = [];
      const assets = [].concat(getTroops()).concat(getMagicalItems()).concat(getGameItems());

      assets.filter((a) => {
        if (!a.combinators) {
          return false;
        }
        for (let combinator in a.combinators) {
          const getCombinator = a.combinators[combinator];
          if (getCombinator.idCombinator[this.networkInfo.id]) {
            getListTasks.push(getCombinator);
          }
        }
      });

      for (let task of getListTasks) {
        const combinatorContract = new Combinator(
          task.combinatorAddress[this.networkInfo.id]
        );
        await combinatorContract.getContractManager();
        const combinatorId = task.idCombinator[this.networkInfo.id];
        const getGeneralConfig = await combinatorContract.getGeneralConfig(
          this.account,
          this.account,
          combinatorId
        );

        task.combinatorInfo = await combinatorContract.combinators(
          combinatorId,
          this.account
        );

        task.combinatorInfo.endBlock =
          parseInt(task.combinatorInfo.startBlock) +
          parseInt(getGeneralConfig.blocks);

        task.combinatorInfo.isClaim = false;

        if (task.necessaryResources) {
          const tokenAConfig = await combinatorContract.getTokenAConfig(
            this.account,
            this.account,
            combinatorId
          );

          task.necessaryResources.tokenA.amount = Convert.fromWei(tokenAConfig.amount);

          const is1155 = task.necessaryResources.tokenB.type === "magicalItem";

          let tokenBConfig = null;

          if (is1155) {
            tokenBConfig = await combinatorContract.getGameItemBConfig(
              this.account,
              this.account,
              combinatorId
            );
          } else {
            tokenBConfig = await combinatorContract.getTokenBConfig(
              this.account,
              this.account,
              combinatorId
            );
          }

          task.necessaryResources.tokenB.amount = is1155 ? tokenBConfig.amount : Convert.fromWei(tokenBConfig.amount, true);
        }

        if (this.currentBlockNumber >= task.combinatorInfo.endBlock) {
          task.combinatorInfo.isClaim = true;
        }
      }

      this.listTasks = getListTasks.filter(
        (task) => task.combinatorInfo.combinatorId !== "0"
      );
      this.isLoading = false;
    },
  },
  mounted() {
    this.getTasks();
  },
};
</script>
<style lang="scss" scoped>
.bg-img-task {
  background-image: url("/images/bg-papyrus.png");
  background-size: cover;
  background-color: #d7b796;
  border-radius: 6px;
  border: 3px solid #bb7248;
}

.badge-large >>> span {
  border-radius: 30px;
  font-size: 21px;
  height: 30px;
  min-width: 30px;
}

.claim-info {
  display: flex;
  font-size: 12px;
}

.input-image {
  margin-right: 4px;
}

.image-viewport {
  width: 20px;
  display: flex;
  justify-content: center;
}

.loading-container {
  display: flex;
}
</style>