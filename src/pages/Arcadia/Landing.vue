<template id="background">
  <div>
    <v-img
      src="/images/project/bg-castle.png"
      :max-height="$vuetify.breakpoint.mdAndUp ? '720' : '1250'"
      min-height="400"
    >
      <div class="container d-flex flex-column align-center mt-6">
        <v-img
          src="/images/project/arcadia-expansion.png"
          :max-width="$vuetify.breakpoint.mdAndUp ? '523' : '300'"
          min-height="40"
        ></v-img>
        <iframe
          class="mt-6 mb-6"
          :width="$vuetify.breakpoint.mdAndUp ? '728' : '350'"
          :height="$vuetify.breakpoint.mdAndUp ? '410' : '200'"
          src="https://www.youtube-nocookie.com/embed/NrJmddH_wCY"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <wButton
          v-if="$vuetify.breakpoint.mdAndUp"
          width="170px"
          class="mx-1 ml-2"
          size="medium"
          @click="$vuetify.goTo(1800, 0)"
        >
          <div class="d-flex justify-center">
            <span class="align-self-center">
              Own lands now
            </span>
          </div>
        </wButton>
        <wButton
          v-else
          width="170px"
          class="mx-12"
          size="x-small"
          @click="$vuetify.goTo(3200, 0)"
        >
          <div class="d-flex justify-center">
            <span class="align-self-center">
              Own lands now
            </span>
          </div>
        </wButton>
      </div>
    </v-img>
    <v-divider class="color: secondary" style="max-height: 8px; height: 8px; flex: 10 10 10px" />
    <v-container class="container mt-6">
      <v-row class="justify-center align-center">
        <v-col cols="12" lg="8">
          <h1 class="h3Y">What is Arcadia Expansion?</h1>
          <h4>
            Arcadia is an expansion to a turn-based village system world where you can manage your
            own system economies, deal with attacks and defenses, join clans, and much more!
          </h4>
          <br />
          <h4>
            In a decentralized model, you will be able to create your world, farm tokens rules,
            collect resources and fees, build foundations and keep players within your system. It's
            the best move to conquer your enemy's riches and escape real estate speculation!
          </h4>
        </v-col>
        <v-col cols="12" lg="4">
          <v-img src="/images/project/world-1.png" max-width="339" min-height="164"></v-img>
        </v-col>
      </v-row>
      <v-row class="mt-6 d-flex flex-column align-center text-center">
        <h1 class="h3Y text-center mt-6 mb-6">
          How to buy wLAND and effectively participate in the Arcadia Expansion:
        </h1>
        <v-img
          :src="
            $vuetify.breakpoint.mdAndUp
              ? '/images/project/how-to-buy.png'
              : '/images/project/how-to-buy-v.png'
          "
          :max-width="$vuetify.breakpoint.mdAndUp ? '1200' : '400'"
          :min-height="$vuetify.breakpoint.mdAndUp ? '40' : '100%'"
        ></v-img>
        <wButton
          v-if="$vuetify.breakpoint.mdAndUp"
          width="170px"
          class="mx-1 ml-2 mt-6"
          size="medium"
          @click="$vuetify.goTo(1800, 0)"
        >
          <div class="d-flex justify-center">
            <span class="align-self-center">
              BUY NOW
            </span>
          </div>
        </wButton>
        <wButton
          v-else
          width="170px"
          class="mx-12 mt-6"
          size="medium"
          @click="$vuetify.goTo(3200, 0)"
        >
          <div class="d-flex justify-center">
            <span class="align-self-center">
              BUY NOW
            </span>
          </div>
        </wButton>
      </v-row>
      <v-row class="container justify-center align-center">
        <v-col cols="12" lg="8">
          <h1 class="h3Y">What to expect from wLAND?</h1>
          <h4>
            wLAND is an incredible utility token because through it you can own land and
            foundations. And this is an efficient way to raise resources, receive fees and escape
            from real estate speculation.
          </h4>
          <br />
          <h4>
            You can expect a decentralized ecosystem on your lands and keep control of the economy
            in your hands. Buying wLAND is a smart and shrewd move!
          </h4>
        </v-col>
        <v-col cols="12" lg="4">
          <iframe
            :width="$vuetify.breakpoint.mdAndUp ? '380' : '300'"
            :height="$vuetify.breakpoint.mdAndUp ? '211' : '170'"
            src="https://www.youtube-nocookie.com/embed/NrJmddH_wCY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="color: secondary" style="max-height: 8px; height: 8px; flex: 10 10 10px" />
    <h1 class="go h3Y text-center mt-6 mb-6">BUY wLAND NOW</h1>

    <v-container class="container">
      <v-row :class="$vuetify.breakpoint.mdAndUp ? 'bg-wood align-center justify-center' : ''">
        <v-col cols="12" lg="4">
          <div class="d-flex justify-start">
            <v-img
              src="/images/project/wLAND.png"
              max-width="80"
              max-height="80"
              class="img"
            ></v-img>
            <div class="mr-5">
              <h1 class="h3Y">1.50 BUSD</h1>
              <h3 class="h3Y">per wLAND</h3>
            </div>
          </div>
          <div class="text-center">
            <v-progress-linear
              class="ml-1 mr-1"
              :color="colorProgress(percentageUnitsSoldStage)"
              buffer-value="100"
              :value="percentageUnitsSoldStage"
              stream
              height="30"
            >
              <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
            <p class="mt-1">
              AVAILABLE UNITS:
              <amount :amount="wLANDAvailableAmountStage" formatted decimals="2" />
            </p>
          </div>
        </v-col>
        <v-col cols="12" lg="8">
          <v-row class="d-flex">
            <v-col cols="12" lg="10">
              <h5>QTY:</h5>
              <v-currency-field
                outlined
                v-bind="currencyConfigBuywLAND"
                v-model="amountwLAND"
                @input="calcAmountBUSD"
              >
                <template v-slot:append>
                  <div class="d-flex">
                    <span class="mr-1 align-self-center">wLAND</span>
                  </div>
                </template>
              </v-currency-field>
            </v-col>
            <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp">
              <v-img
                class="img mt-2 ml-n4"
                src="/images/project/wLAND.png"
                max-height="50"
                max-width="50"
              ></v-img>
            </v-col>
          </v-row>
          <v-row class="d-flex mt-n5">
            <v-col cols="12" lg="10">
              <h5>BUSD PRICE:</h5>
              <v-currency-field outlined v-bind="currencyConfig" v-model="amountBUSD" disabled>
                <template v-slot:append>
                  <div class="d-flex">
                    <span class="mr-1 align-self-center">BUSD</span>
                  </div>
                </template>
              </v-currency-field>
            </v-col>
            <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp">
              <v-img
                class="img mt-3 ml-n4"
                src="/images/project/BUSD.png"
                max-height="40"
                max-width="40"
              ></v-img>
            </v-col>
          </v-row>

          <wButton
            width="170px"
            :class="$vuetify.breakpoint.mdAndUp ? '' : 'mx-12'"
            size="medium"
            @click="approveBUSD"
            :disabled="isLoadingApprove"
          >
            <div class="d-flex justify-center">
              <span class="align-self-center">
                {{ isLoadingApprove ? 'Waiting...' : 'Approve' }}
              </span>
            </div>
          </wButton>
        </v-col>
      </v-row>
      <h1 class="h3Y text-center mt-9">Own Foundations:</h1>
      <v-row class="mt-2 justify-center">
        <v-col
          cols="12"
          lg="4"
          style="width: 100%"
          class="d-flex justify-space-around"
          v-for="item in foundations"
          :key="item.name"
        >
          <div class="justify-center text-center">
            <h1 class="mt-1 mb-1 text-center">{{ item.name }}</h1>
            <v-img :src="item.img" max-height="361" max-width="256" class="img mb-1"></v-img>
            <h2 class="h3Y">{{ item.price }} wLAND</h2>
            <h6 class="h3Y mb-1">per {{ item.name }}</h6>
            <wButton
              width="170px"
              :class="$vuetify.breakpoint.mdAndUp ? 'mx-1 ml-2' : 'mx-12'"
              size="medium"
              @click="openModal(item.name, item.img, item.price)"
            >
              <div class="d-flex justify-center">
                <span class="align-self-center">
                  BUY NOW
                </span>
              </div>
            </wButton>
            <span class="h3Y"> Remaining: {{ item.remaining }} </span>
          </div>
        </v-col>
      </v-row>
      <h3 class="text-center mt-6">
        By building foundations, you can earn fees for owning these resources. Everyone needs and
        wants to enjoy the benefits of increasing courage, doing business, and maintaining
        protection.
      </h3>
    </v-container>
    <v-divider
      class="color: secondary mt-6"
      style="max-height: 8px; height: 8px; flex: 10 10 10px"
    />
    <v-container class="container">
      <h1 class="h3Y mt-6 text-center">FAQ</h1>
      <v-expansion-panels v-model="panel" multiple class="mt-8 expansion">
        <v-expansion-panel v-for="(item, i) in faq" :key="i">
          <v-expansion-panel-header class="text-h5">
            {{ item.question }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-h6">
            {{ item.answer }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- :isLoading="isLoadingConfirm" -->
      <game-item-wood-modal
        :open="isConfirmOrderModalOpen"
        :imageUrl="modalImg"
        :gameItemTitle="modalName"
        @confirm="executeOrder"
        @close="isConfirmOrderModalOpen = false"
        title="Are you sure you want to buy this item?"
        :amount="balanceItem"
      >
        <p>How many items do you want to buy?</p>
        <v-row>
          <v-col cols="12" md="6">
            <number-field class="mt-n1" v-model="quantity" :max="25"></number-field>
          </v-col>
        </v-row>
        <div class="mt-n6">
          <h4 :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
            <span>You will pay per item:</span>
            <amount
              :amount="modalPrice"
              formatted
              decimals="2"
              tooltip
              title="wLAND"
              symbol="wLAND"
              icon
            />
          </h4>
          <h4 :class="$vuetify.breakpoint.mdAndUp ? 'd-flex mr-1 mb-1' : 'mt-1'">
            You will pay for {{ quantity }} items:
            <amount
              :amount="modalPrice * quantity"
              formatted
              decimals="2"
              tooltip
              title="wLAND"
              symbol="wLAND"
              icon
            />
          </h4>
        </div>
      </game-item-wood-modal>
    </v-container>
  </div>
</template>

<script>
import wButton from '@/lib/components/ui/Buttons/wButton';
import Amount from '@/lib/components/ui/Utils/Amount';
import GameItemWoodModal from '@/lib/components/ui/Modals/GameItemWoodModal';
import NumberField from '@/lib/components/ui/Utils/NumberField';

import ERC20 from '@/lib/eth/ERC20';
import Convert from '@/lib/helpers/Convert';

export default {
  data() {
    return {
      amountwLAND: 0,
      amountBUSD: 0,
      amount: 0,

      isConfirmOrderModalOpen: false,
      balanceItem: 0,
      quantity: 0,
      modalPrice: 0,
      modalImg: '',
      modalName: '',
      wLANDAvailableAmountStage: 0,

      isBuyingwLAND: false,
      isApprovedBUSD: false,

      isLoadingApprove: false,

      wLAND: '0x2C6107c27A15D2C7F397D88D76257Ea42c12f89F',
      addresslandPrivateSale: '0x228a6390419Ec998f79339dd8Bdf33435D700413',
      addressBUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',

      currencyConfigBuywLAND: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: '',
        suffix: '',
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: false,
      },

      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: '',
        suffix: '',
        decimalLength: 2,
        autoDecimalMode: true,
        allowNegative: false,
      },

      panel: [0],

      faq: [
        {
          question: 'What to do with wLAND?',
          answer:
            'You can buy lands to build foundations, collect resources and receive fees with all these features.',
        },
        {
          question: 'Why buying lands now will help me in the game?',
          answer:
            "Well, what did landowners gain by buying lands earlier and escaping real estate speculation? That's right, the valorization of their land! By buying lands now, you can pay little to build foundations, collect resources, and receive fees.",
        },
        {
          question: 'What is Arcadia?',
          answer:
            'Arcadia is the name given to the expansion of the APWars game and it consists of providing a world with land that can be purchased to collect resources, build foundations and create an economic ecosystem.',
        },
        {
          question: 'What are foundations?',
          answer:
            'Foundations are a kind of property that offers a benefit to those who pay the fees. Temples offer more courage, markets make negotiations possible, and watchtowers maintain security and offer news of troops that may be approaching.',
        },
        {
          question: 'What are the strategies for buying good lands?',
          answer:
            'Initially, you can check how much land each foundation needs to consolidate. For example, watchtowers need nine lands and a good move is to buy nine to build this foundation to receive fees or buy lands in multiple locations, so someone who wants to build foundations needs to buy (for a great price) lands from you. You can join the APWars group on Telegram and discuss more strategies with other players too!',
        },
      ],
      foundations: [
        {
          name: 'Temples',
          img: '/images/project/temples.png',
          price: 10000,
          remaining: 1,
        },
        {
          name: 'Watchtowers',
          img: '/images/project/watchtowers.png',
          price: 15000,
          remaining: 1,
        },
        {
          name: 'Markets',
          img: '/images/project/markets.png',
          price: 10000,
          remaining: 1,
        },
        {
          name: 'Hidings place',
          img: '/images/project/hidings-place.png',
          price: 5000,
          remaining: 1,
        },
        {
          name: 'Hidings place',
          img: '/images/project/hidings-place.png',
          price: 5000,
          remaining: 1,
        },
      ],
    };
  },
  components: {
    wButton,
    Amount,
    GameItemWoodModal,
    NumberField,
  },

  computed: {
    isConnected() {
      return this.$store.getters['user/isConnected'];
    },

    account() {
      return this.$store.getters['user/account'];
    },

    currentBlockNumber() {
      return this.$store.getters['user/currentBlockNumber'];
    },

    percentageUnitsSold() {
      return parseInt((this.wLANDSoldAmount / this.maxSupply) * 100);
    },

    percentageUnitsSoldStage() {
      return parseInt((1 - this.wLANDAvailableAmountStage / this.soldPerStage) * 100);
    },
  },

  methods: {
    async initData() {
      if (!this.isConnected) {
        return;
      }
      this.contractBUSD = new ERC20(this.addressBUSD);
      try {
        this.isApprovedBUSD = await this.contractBUSD.hasAllowance(
          this.account,
          this.addresslandPrivateSale
        );
      } catch (error) {
        console.log(error.toString());
      }
    },

    async calcAmountBUSD(amount) {
      this.amountBUSD = Convert.fromWei(
        await this.contractLandPrivateSale.pricewLAND(this.wLANDSoldAmount, amount),
        true
      );
    },

    async approveBUSD() {
      try {
        this.isLoadingApprove = true;

        await this.contractBUSD.approve(this.account, this.addresslandPrivateSale);

        this.isLoadingApprove = false;
        this.isApprovedBUSD = true;
        ToastSnackbar.success('BUSD smart contract approved successfully!');
      } catch (error) {
        this.isLoadingApprove = false;
        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error('An error has occurred while to approve');
      }
    },

    async buywLAND() {
      try {
        this.isBuyingwLAND = true;

        await this.contractLandPrivateSale.buywLAND(
          Convert.toWei(parseInt(this.amountwLAND)),
          this.account
        );

        this.isBuyingwLAND = false;
        this.openModalBuy = true;
        ToastSnackbar.success('wLAND secured successfully!');
      } catch (error) {
        this.isBuyingwLAND = false;

        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error('An error has occurred while buying wLAND');
      }
    },

    colorProgress(percentage) {
      if (percentage < 30) {
        return '#11D300';
      } else if (percentage > 30 && percentage < 60) {
        return '#ffa500';
      } else {
        return '#ff0000';
      }
    },
    executeOrder() {
      console.log('execute order');
    },
    openModal(name, img, price) {
      this.modalImg = img;
      this.modalName = name;
      this.modalPrice = price;
      this.isConfirmOrderModalOpen = true;
    },
  },
  watch: {
    isConnected() {
      this.initData();
    },

    currentBlockNumber() {
      this.initData();
    },

    account() {
      this.initData();
    },

    amountwLAND() {
      this.calcAmountBUSD(this.amountwLAND);
    },
  },
};
</script>

<style scoped>
.h3Y {
  background: -webkit-linear-gradient(#faff00, #ffb800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
.bg-castle {
  background-image: url('/images/project/bg-castle.png');
  background-size: cover;
}
#background {
  background-color: black;
}
.bg-wood {
  background-image: url('/images/battle/bg-wars.png');
  background-repeat: repeat;
  border: 3px solid #966a3c;
  border-radius: 20px;
  padding: 0px 40px;
}
.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.container {
  max-width: 1100px;
}
</style>
