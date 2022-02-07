<template>
  <div class="bg">
    <div class="background-image"></div>
    <v-container class="content">
      <v-row no-gutters>
        <v-col>
          <Button
            text="Go back to Home"
            icon="arrow-back"
            type="wtertiary"
            no-padding
            :handleClick="backToHome"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <Title class="mt-1" text="Fresh Start Swap" />
          <div>
            From now on, you can start a new sustainable game with rewards and
            fun
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="full-cycle-title">
            The full cycle of rewards and fun
          </div>
          <div class="cycle-container">
            <div class="cycle-step">
              <div class="cycle-n mb-1">1</div>
              <div class="cycle-illustration">
                <img
                  class="rounded-nft mr-1"
                  width="64"
                  height="64"
                  src="/images/troops/wwarrior-nft.png"
                />
                <img
                  class="rounded-nft"
                  width="64"
                  height="64"
                  src="/images/troops/wgrunt-nft.png"
                />
              </div>
              <div class="cycle-title">Unlock your Soldier</div>
            </div>
            <img src="/images/icons/arrow-left.png" alt="Arrow Left" />
            <div class="cycle-step">
              <div class="cycle-n">2</div>
              <div class="cycle-illustration">
                <img src="/images/tmj.png" height="50%" />
              </div>
              <div class="cycle-title">Play TMJ</div>
            </div>
            <img src="/images/icons/arrow-left.png" alt="Arrow Left" />
            <div class="cycle-step">
              <div class="cycle-n">3</div>
              <div class="cycle-illustration">
                <img src="/images/icons/swords.png" height="70%" />
              </div>
              <div class="cycle-title">Join The War</div>
            </div>
            <img src="/images/icons/arrow-left.png" alt="Arrow Left" />
            <div class="cycle-step">
              <div class="cycle-n">4</div>
              <div class="cycle-illustration">
                <img src="/images/icons/blue-chest.png" height="100%" />
              </div>
              <div class="cycle-title">Receive Rewards</div>
            </div>
          </div>
          <div class="swap-container">
            <div class="step-title">Select where you are coming from</div>
            <div class="swap-options-container mt-2">
              <div
                :class="[
                  'swap-option',
                  selectedSwap === option.name ? 'is-selected' : '',
                ]"
                v-for="option in swapOptions"
                :key="option.id"
                @click="() => selectSwap(option.name)"
              >
                <img width="64" height="64" :src="option.image" />
              </div>
            </div>
            <div class="transfer-instruction mt-2">
              Transfer
              <span class="value"
                >{{ selectedAmount }} {{ selectedToken }}</span
              >
              to this wallet in BSC
            </div>
            <div class="wallet">0x888259858492818961a847B5194091e484e7b786</div>
            <div>
              <div class="step-title mt-2">
                Paste the transaction hash in the field below
              </div>
              <v-text-field v-model="txHash" full-width></v-text-field>
            </div>
            <div class="step-title mt-2">Select your Soldier NFT on APWARS</div>
            <div class="swap-options-container mt-2">
              <div
                :class="[
                  'swap-option',
                  selectedNFT === 'HUMAN_SOLDIER' ? 'is-selected' : '',
                ]"
                @click="() => selectNFT('HUMAN_SOLDIER')"
              >
                <img
                  width="64"
                  height="64"
                  src="/images/troops/wwarrior-nft.png"
                />
              </div>
              <div
                :class="[
                  'swap-option',
                  selectedNFT === 'ORC_SOLDIER' ? 'is-selected' : '',
                ]"
                @click="() => selectNFT('ORC_SOLDIER')"
              >
                <img
                  width="64"
                  height="64"
                  src="/images/troops/wgrunt-nft.png"
                />
              </div>
            </div>
            <div class="swap-button-container mt-2">
              <Button
                type="whot"
                text="Swap"
                :isLoading="isLoadingSwap"
                :disabled="!txHash || isLoadingSwap"
                :handleClick="handleSwap"
                isBlock
              />
            </div>
          </div>
          <div class="d-flex justify-center">
            <div class="wallet-info mt-1">
              You don't need to approve anything or connect your wallet. We also
              don't want you to expose yourself. Just copy and paste the address
              to make the payment.
            </div>
          </div>

          <div class="video-title mt-4 mb-1">Watch TMJ gameplay</div>
          <div class="d-flex justify-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/T11W7ZvWgBM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import SwapController from "@/controller/SwapController";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import PackCard from "@/lib/components/ui/PackCard";

export default {
  components: { Title, PackCard, Button },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
  },
  computed: {
    selectedAmount() {
      if (!this.selectedSwap) {
        return "";
      }
      return this.swapOptions.find((s) => s.name === this.selectedSwap).prize;
    },
    selectedToken() {
      if (!this.selectedSwap) {
        return "";
      }
      return this.swapOptions.find((s) => s.name === this.selectedSwap).token;
    },
  },
  data() {
    return {
      isLoading: false,
      selectedSwap: null,
      selectedNFT: "HUMAN_SOLDIER",
      swapOptions: [],
      txHash: "",
      isLoadingSwap: false,
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    backToHome() {
      this.$router.push("/");
    },
    selectSwap(id) {
      this.selectedSwap = id;
    },
    selectNFT(id) {
      console.log(id);
      this.selectedNFT = id;
    },
    async fetchOptions() {
      const controller = new SwapController();
      const opts = await controller.getOptions();
      const mappedTokens = {
        CryptoCars: {
          image: "/images/icons/swap/ccars.png",
          title: "CryptoCars",
          token: "CCAR",
        },
        SquidGame: {
          image: "/images/icons/swap/squid.png",
          title: "Squid Game",
          token: "SQUID",
        },
      };
      this.swapOptions = opts.map((o) => ({ ...o, ...mappedTokens[o.name] }));
      this.selectedSwap = opts[0].name;
    },
    async handleSwap() {
      try {
        this.isLoadingSwap = true;
        const controller = new SwapController();
        await controller.swap(this.txHash, this.selectedSwap, this.selectedNFT);
        ToastSnackbar.success("Successfully swapped, welcome to APWars!");
      } catch (error) {
        ToastSnackbar.error(
          "Something went wrong while swapping, try again later."
        );
      } finally {
        this.isLoadingSwap = false;
      }
    },
  },
  created() {
    this.setHeader(false);
  },
  mounted() {
    this.fetchOptions();
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
  watch: {
    isConnected() {},
  },
};
</script>
<style lang="scss" scoped>
.bg {
  position: relative;
  background-color: #111111;
}
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("/images/background/castle-gray.png");
  background-size: cover;
  background-position: top;
  height: 70vh;
  width: 100%;
  z-index: 0;
}
.content {
  position: relative;
  z-index: 1;
}
.swap-container {
  background-color: #0d0600;
  border: 2px solid #ffeebc;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step-title {
  font-weight: bold;
  font-size: 14px;
}
.swap-options-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.swap-option {
  display: flex;
  border-radius: 5px;
  border: 2px solid #c4c4c4;
  margin-left: 12px;
  filter: grayscale(100%);
  &:hover,
  &.is-selected {
    border-color: #ffb800;
    cursor: pointer;
    filter: grayscale(0);
  }
}

.swap-button-container {
  width: 300px;
}

.highlight-text {
  color: #ffb800;
  font-weight: bold;
  font-size: 18px;
}

.transfer-instruction {
  color: #ffb800;
  > .value {
    @extend .highlight-text;
  }
}

.wallet {
  @extend .highlight-text;
}

.wallet-info {
  font-size: 14px;
  line-height: 1.3;
  text-align: center;
  color: #ffffff;
  max-width: 640px;
}

.full-cycle-title {
  @extend .highlight-text;
  font-size: 32px;
  display: flex;
  justify-content: center;
}

.cycle-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cycle-n {
  font-weight: bold;
  font-size: 32px;
  height: 36px;
  text-align: center;
}

.cycle-title {
  padding: 0px 18px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}

.cycle-illustration {
  height: 112px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

.cycle-step {
  display: block;
  margin: 18px;
}

.video-title {
  font-weight: bold;
  font-size: 22px;
  display: flex;
  justify-content: center;
}

.rounded-nft {
  border-radius: 5px;
  border: 1px solid #ffeebc;
}
</style>
