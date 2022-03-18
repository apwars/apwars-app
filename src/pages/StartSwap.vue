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
            New Players! Now you will start in a new, sustainable game that gives you rewards and it's fun!
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="full-cycle-title">
            A full cycle real game with solid economy
          </div>
          <div class="cycle-container">
            <div class="cycle-step">
              <div class="cycle-n mb-1">1</div>
              <div class="cycle-illustration">
                <img
                  class="rounded-nft mr-1"
                  height="100%"
                  src="/images/troops/wwarrior-nft.png"
                />
                <img
                  class="rounded-nft"
                  height="100%"
                  src="/images/troops/wgrunt-nft.png"
                />
              </div>
              <div class="cycle-title">Unlock your Soldier</div>
            </div>
            <img
              class="d-none"
              src="/images/icons/arrow-left.png"
              alt="Arrow Left"
            />
            <div class="cycle-step">
              <div class="cycle-n mb-1">2</div>
              <div class="cycle-illustration">
                <img src="/images/tmj.png" height="50%" />
              </div>
              <div class="cycle-title">Play TMJ</div>
            </div>
            <img
              class="d-none"
              src="/images/icons/arrow-left.png"
              alt="Arrow Left"
            />
            <div class="cycle-step">
              <div class="cycle-n mb-1">3</div>
              <div class="cycle-illustration">
                <img src="/images/icons/swords.png" height="70%" />
              </div>
              <div class="cycle-title">Join The War</div>
            </div>
            <img
              class="d-none"
              src="/images/icons/arrow-left.png"
              alt="Arrow Left"
            />
            <div class="cycle-step">
              <div class="cycle-n mb-1">4</div>
              <div class="cycle-illustration">
                <img src="/images/icons/blue-chest.png" height="100%" />
              </div>
              <div class="cycle-title">Receive Rewards</div>
            </div>
          </div>
          <div ref="form" class="swap-container">
            <template v-if="swapDone">
              <div class="highlight-text">
                Congratulations! You are ready to play in APWars!
              </div>
              <div class="mt-1">
                It's war time! Your Soldier was recruited and he's prepared to battle against the FUD Alliance and the dragon Louis.
              </div>
              <div class="mt-2">
                He's waiting for you to start your journey now by
                <span
                  class="redirect"
                  @click="
                    () =>
                      handleLink(
                        'https://app.apwars.farm/the-monstrous-journey'
                      )
                  "
                  >playing The Monstrous Journey (TMJ)</span
                >
                <br />Evolve your Soldier to win rewards and to command your army in the War!
              </div>
              <div class="mt-2">
                <span
                  class="redirect"
                  @click="() => handleLink('https://www-v1.apwars.farm/docs')"
                  >Visit the docs</span
                >
                to learn more about TMJ, the Wars and APWars.
              </div>
            </template>
            <template v-else>
              <div class="full-cycle-title">
                Unlock your Soldier by swapping for another game token
              </div>
              <div class="step-title">Select the token you want to swap</div>
              <v-skeleton-loader
                v-if="isLoading"
                type="image"
                height="64px"
                width="80px"
              />
              <div v-else class="swap-options-container mt-2">
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
              <div class="check-container">
              <v-checkbox v-model="agreement1" class="mt-1" color="primary">
                <template v-slot:label>
                  <div class="text-white">
                    I understand that in APWars all rewards are based on
                    strategy, the dedication of time, and skills. Also, I
                    understand that the entire game economy is organically based
                    on entertainment purchases and not on financial return.
                  </div>
                </template>
              </v-checkbox>
              </div>
              <div class="check-container">
              <v-checkbox v-model="agreement2" class="mt-1" color="primary">
                <template v-slot:label>
                  <div class="text-white">
                    I understand that all rewards have value exclusively within
                    the game to improve my experience and performance in matches
                    and that there is no need for any relevant financial
                    investment.
                  </div>
                </template>
              </v-checkbox>
              </div>
              <div class="step-title">To receive your Soldier:</div>
              <div class="transfer-instruction mt-2">
                1 - Transfer
                <span class="value" v-if="selectedToken"
                  >{{ selectedAmount }} {{ selectedToken }}</span
                ><span v-else>the token you want to swap </span>
                from your wallet to this BSC wallet
              </div>
              <div class="wallet d-flex align-center justify-center">
                <div class="wallet">{{ wallet }}</div>
                <v-icon class="ml-1 icon" @click="() => copyToClipboard(wallet)"
                  >mdi-content-copy</v-icon
                >
              </div>
              <div>
                <div class="step-title mt-2">
                  2 - Paste the transaction hash in the field below
                </div>
                <v-text-field
                  v-model="txHash"
                  full-width
                  :error="isNotHash(txHash)"
                  :error-messages="
                    isNotHash(txHash) ? `This does'nt look like a hash` : ''
                  "
                  ><template v-slot:append
                    ><v-icon class="ml-1 icon" @click="pasteFromClipboard"
                      >mdi-transfer-down</v-icon
                    ></template
                  ></v-text-field
                >
              </div>
              <div class="step-title mt-2">3 - Select your Soldier from APWars!</div>
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
                  text="Get Soldier"
                  :isLoading="isLoadingSwap"
                  :disabled="!txHash || isLoadingSwap || isNotHash(txHash) || !isAgreed"
                  :handleClick="handleSwap"
                  isBlock
                />
              </div>
            </template>
          </div>
          <div class="d-flex justify-center" v-if="!swapDone">
            <div class="wallet-info mt-1">
              To receive your Soldier, there's no need to connect your wallet. We also don't want you to get exposed - just copy and paste the transaction hash to make the payment and the Soldier will be sent to the wallet that transferred!
            </div>
          </div>

          <div class="video-title mt-4 mb-1">Watch the TMJ gameplay</div>
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
          <div class="footer mt-3">
            <div class="link" @click="() => handleLink('https://t.me/apwars')">
              <img
                class="mr-1"
                alt="Telegram"
                width="48"
                src="/images/icons/telegram.png"
              />
              Join our telegram group to learn more about the project.
            </div>
            <div
              class="link"
              @click="() => handleLink('https://medium.com/apwars')"
            >
              <img
                class="mr-1"
                alt="Medium"
                width="48"
                src="/images/icons/medium.png"
              />
              You can keep up with all the news on Medium too.
            </div>
            <div
              class="link"
              @click="
                () =>
                  handleLink(
                    'https://www.youtube.com/channel/UCyOXhEunVlQMxKRJcwsF_5w'
                  )
              "
            >
              <img
                class="mr-1"
                alt="YouTube"
                width="48"
                src="/images/icons/youtube.png"
              />
              Watch the gameplay on Youtube.
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import errorHandler from "@/helpers/errorHandler";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import walletTruncate from "@/helpers/walletTruncate";

import Button from "@/lib/components/ui/Buttons/Button";
import Title from "@/lib/components/ui/Title";
import PackCard from "@/lib/components/ui/PackCard";

export default {
  components: { Title, PackCard, Button },
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
    isAgreed() {
      return this.agreement1 && this.agreement2;
    },
    hasRefer() {
      return Boolean(this.$route.params.referall);
    }
  },
  data() {
    return {
      agreement1: false,
      agreement2: false,
      isLoading: false,
      selectedSwap: null,
      selectedNFT: null,
      swapOptions: [],
      txHash: "",
      isLoadingSwap: false,
      wallet: "0x888259858492818961a847B5194091e484e7b786",
      swapDone: false,
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
    selectSwap(id) {
      this.selectedSwap = id;
    },
    selectNFT(id) {
      this.selectedNFT = id;
    },
    handleLink(link) {
      window.open(link, "_blank");
    },
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        ToastSnackbar.success("Copied!");
      } catch (error) {
        ToastSnackbar.error("Not Copied, please manually select and copy!");
      }
    },
    async pasteFromClipboard() {
      try {
        const text = await navigator.clipboard.readText();
        this.txHash = text;
        ToastSnackbar.success("Pasted!");
      } catch (error) {
        ToastSnackbar.error("Not Pasted, please manually select and paste!");
      }
    },
    async fetchOptions() {
      this.isLoading = true;
      try {
        const opts = await axios.get(
          `${process.env.VUE_APP_API_ARCADIA_56}/fresh-start-swap/list-swap`
        );
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
        this.swapOptions = opts.data.map((o) => ({
          ...o,
          ...mappedTokens[o.name],
        }));
      } catch (error) {
        ToastSnackbar.error("Something went wrong while getting swap options.");
      } finally {
        this.isLoading = false;
      }
    },
    async handleSwap() {
      let body = {};
      if (this.hasRefer) {
        body.referrall = this.$route.params.referrall;
      }
      try {
        this.isLoadingSwap = true;
        await axios.post(
          `${
            process.env.VUE_APP_API_ARCADIA_56
          }/fresh-start-swap/${this.txHash.trim()}/${this.selectedSwap}/${
            this.selectedNFT
          }`,
            body
        );
        this.swapDone = true;
        this.$refs.form.focus();
        ToastSnackbar.success("Successfully swapped, welcome to APWars!");
      } catch (error) {
        const errorMessage = errorHandler(error.response.data.code);
        ToastSnackbar.error(errorMessage);
      } finally {
        this.isLoadingSwap = false;
      }
    },
    truncate(wallet) {
      return walletTruncate(wallet);
    },
    isNotHash(hash) {
      if (!hash) {
        return false;
      }
      if (!hash.trim().length > 1 || hash.substring(0, 2) !== "0x") {
        return true;
      }
      if (hash.trim().length !== 66) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.fetchOptions();
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
.brown-box {
  background-color: #0d0600;
  border: 2px solid #ffeebc;
  padding: 24px;
}
.swap-container {
  @extend .brown-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step-title {
  font-weight: bold;
  font-size: 14px;
  text-align: center;
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
  width: 100%;
  max-width: 300px;
}

.highlight-text {
  color: #ffb800;
  font-weight: bold;
  font-size: 18px;
}

.transfer-instruction {
  color: #ffb800;
  text-align: center;
  > .value {
    @extend .highlight-text;
  }
}

.redirect {
  @extend .highlight-text;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.wallet {
  @extend .highlight-text;
  font-size: 12px;
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
  text-align: center;
}

.cycle-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
}

.cycle-n {
  font-weight: bold;
  font-size: 32px;
  height: 36px;
  text-align: center;
}

.cycle-title {
  padding: 0px 4px;
  text-align: center;
  font-weight: bold;
  font-size: 10px;
  min-height: 48px;
  @media screen and (min-width: 768px) {
    font-size: 24px;
    padding: 0px 18px;
  }
}

.cycle-illustration {
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  @media screen and (min-width: 768px) {
    height: 112px;
    padding: 8px;
  }
}

.cycle-step {
  display: block;
  margin: 8px;
  @media screen and (min-width: 768px) {
    margin: 18px;
  }
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

.check-container {
  width: 100%;
  max-width: 420px;
}

.footer {
  @extend .brown-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
  > img {
    height: 64px;
    width: 64px;
  }
  > .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 12px;
    text-align: center;
    max-width: 320px;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    @media screen and (min-width: 768px) {
      flex-direction: row;
    }
  }
}

.icon {
  color: inherit;
  &:hover {
    color: white;
    cursor: pointer;
  }
}
</style>
