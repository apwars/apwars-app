<template id="background">
  <div>
    <v-img
      src="/images/project/bg-castle.png"
      :max-height="$vuetify.breakpoint.mdAndUp ? '920' : '1450'"
      min-height="400"
    >
      <div v-if="isBlocked" class="mt-1 mx-1 mt-md-6 mx-md-16  text-center">
        <v-alert color="primary" dark icon="mdi-alert" prominent>
          This is not an error. You are seeing this message because you are
          accessing this application with an IP address from a prohibited
          jurisdiction or territory to participate in this sale. This sale of
          game items is only related to utility tokens with objective use cases
          and bear no investment characteristics of promises of dividends,
          guarantees of appreciation, or gains of any form. Nevertheless,
          because regulatory blurriness we are preventing Americans, for
          example, to take part in this sale.
        </v-alert>
      </div>

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

        <div class="d-flex">
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
            @click="$vuetify.goTo(2800, 0)"
          >
            <div class="d-flex justify-center">
              <span class="align-self-center">
                Own lands now
              </span>
            </div>
          </wButton>

          <wButton
            v-if="$vuetify.breakpoint.mdAndUp"
            width="170px"
            class="mx-1 ml-2"
            size="medium"
            @click="goToHome()"
          >
            <div class="d-flex justify-center">
              <span class="align-self-center">
                Go to home
              </span>
            </div>
          </wButton>
        </div>
      </div>
    </v-img>
    <v-divider
      class="color: secondary"
      style="max-height: 8px; height: 8px; flex: 10 10 10px"
    />
    <v-container class="container mt-6">
      <v-row class="justify-center align-center">
        <v-col cols="12" lg="8">
          <h1 class="h3Y">What is Arcadia Expansion?</h1>
          <h4>
            Arcadia is an expansion to a turn-based village system world where
            you can manage your own system economies, deal with attacks and
            defenses, join clans, and much more!
          </h4>
          <br />
          <h4>
            In a decentralized model, you will be able to create your world,
            farm tokens rules, collect resources and fees, build foundations and
            keep players within your system. It's the best move to conquer your
            enemy's riches and escape real estate speculation!
          </h4>
        </v-col>
        <v-col cols="12" lg="4">
          <v-img
            src="/images/project/world-1.png"
            max-width="339"
            min-height="164"
          ></v-img>
        </v-col>
      </v-row>
      <v-row v-if="isBlocked === false" class="mt-6 align-center text-center justify-center">
        <h1 class="h3Y text-center mt-6 mb-6">
          How to buy wLAND and effectively participate in the Arcadia Expansion:
        </h1>
        <v-img
          :src="
            $vuetify.breakpoint.mdAndUp
              ? '/images/project/how-to-buy.png'
              : '/images/project/how-to-buy-v.png'
          "
          :max-width="$vuetify.breakpoint.mdAndUp ? '1200' : '129'"
          :min-height="$vuetify.breakpoint.mdAndUp ? '40' : '394'"
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
          size="small"
          @click="$vuetify.goTo(2800, 0)"
        >
          <div class="d-flex justify-center">
            <span class="align-self-center">
              BUY NOW
            </span>
          </div>
        </wButton>
      </v-row>
      <v-row class="justify-center align-center">
        <v-col cols="12" lg="8">
          <h1 class="h3Y">What to expect from wLAND?</h1>
          <h4>
            wLAND is an incredible utility token because through it you can own
            land and foundations. And this is an efficient way to raise
            resources, receive fees and escape from real estate speculation.
          </h4>
          <br />
          <h4>
            You can expect a decentralized ecosystem on your lands and keep
            control of the economy in your hands. Buying wLAND is a smart and
            shrewd move!
          </h4>
        </v-col>
        <v-col cols="12" lg="4">
          <iframe
            :width="$vuetify.breakpoint.mdAndUp ? '380' : '250'"
            :height="$vuetify.breakpoint.mdAndUp ? '211' : '150'"
            src="https://www.youtube-nocookie.com/embed/NrJmddH_wCY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
    <v-divider
      class="color: secondary"
      style="max-height: 8px; height: 8px; flex: 10 10 10px"
    />
    <h1 class="go h3Y text-center mt-6 mb-6" v-if="isBlocked === false">
      BUY wLAND NOW
    </h1>

    <v-container class="container" v-if="isBlocked === false">
      <v-row
        :class="
          $vuetify.breakpoint.mdAndUp
            ? 'bg-wood align-center justify-center'
            : ''
        "
      >
        <v-col cols="12" lg="4">
          <div v-if="$route.query.ref" class="text-center my-2">
            <div v-if="isRef === undefined">
              <h3 class="h3Y">Checking coupon...</h3>
            </div>
            <div v-else-if="isRef === true">
              <h3 class="green--text">Discount coupon</h3>
              <span>5% off</span>
            </div>
            <div v-else>
              <h3 class="yellow--text">Invalid coupon</h3>
            </div>
          </div>
          <div class="d-flex justify-start">
            <v-img
              src="/images/project/wLAND.png"
              max-width="60"
              max-height="60"
              class="img"
            ></v-img>
            <div class="mr-5">
              <h1 class="h3Y">
                <amount
                  :amount="pricewLAND"
                  formatted
                  :decimals="$route.query.ref ? 3 : 2"
                />
                BUSD
              </h1>
              <h3 class="h3Y">per wLAND</h3>
            </div>
          </div>
          <div class="text-center mt-2">
            <v-progress-linear
              class="ml-1 mr-1"
              :color="colorProgress(percentageUnitsSold)"
              buffer-value="100"
              :value="percentageUnitsSold"
              stream
              height="30"
            >
              <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
            <p class="mt-1">
              AVAILABLE UNITS:
              <amount :amount="wLANDSold" formatted decimals="2" />
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
                :hint="`Balance: ${myBalanceFormatted.wLAND} wLAND`"
                persistent-hint
                :disabled="!isApprovedBUSD"
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
              <v-currency-field
                outlined
                v-bind="currencyConfig"
                v-model="amountBUSD"
                disabled
                :hint="`Balance: ${myBalanceFormatted.busd} BUSD`"
                persistent-hint
              >
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
            v-if="isApprovedBUSD"
            width="170px"
            size="medium"
            @click="buywLAND"
            :disabled="amountBUSD == 0"
          >
            <div class="d-flex justify-center">
              <span class="align-self-center">
                {{ isBuyingwLAND ? "Waiting..." : "Buy" }}
              </span>
            </div>
          </wButton>
          <wButton
            v-else
            width="170px"
            :class="$vuetify.breakpoint.mdAndUp ? '' : 'mx-12'"
            size="medium"
            @click="approveBUSD"
            :disabled="isLoadingApprove || isApprovedBUSD === undefined"
          >
            <div class="d-flex justify-center">
              <span class="align-self-center">
                {{
                  isLoadingApprove || isApprovedBUSD ? "Waiting..." : "Approve"
                }}
              </span>
            </div>
          </wButton>
        </v-col>
      </v-row>
      <h1 class="h3Y text-center mt-9">Own Foundations:</h1>
      <v-row class="mt-2 justify-center">
        <v-col v-if="loadingFoundations" cols="12" class="ma-3">
          <h1 class="text-center">Loading...</h1>
        </v-col>
        <v-col
          v-else
          cols="12"
          lg="4"
          class="d-flex justify-space-around"
          v-for="item in getFoundations"
          :key="item.name"
        >
          <div class="justify-center text-center">
            <h1 class="mt-1 mb-1 text-center">{{ item.name }}</h1>
            <v-img :src="item.img" max-width="250" class="img mb-1"></v-img>
            <h2 class="h3Y">
              <amount
                :amount="item.price"
                formatted
                decimals="2"
                tooltip
                title="wLAND"
              />
            </h2>
            <h6 class="h3Y mb-1">per {{ item.name }}</h6>
            <wButton
              v-if="isApprovedwLAND"
              width="170px"
              :class="$vuetify.breakpoint.mdAndUp ? 'mx-1 ml-2' : 'mx-12'"
              size="medium"
              @click="openModal(item)"
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
              :class="$vuetify.breakpoint.mdAndUp ? '' : 'mx-12'"
              size="medium"
              @click="approvewLAND"
              :disabled="isLoadingApprove || isApprovedwLAND === undefined"
            >
              <div class="d-flex justify-center">
                <span class="align-self-center">
                  {{
                    isLoadingApprove || isApprovedwLAND
                      ? "Waiting..."
                      : "Approve"
                  }}
                </span>
              </div>
            </wButton>

            <span class="text-caption">
              Remaining: {{ item.remaining }} {{ item.name }}</span
            >
            <br />
            <span
              class="text-caption font-weight-bold"
              :class="
                isBalanceTicket(item.price) ? 'green--text' : 'primary--text'
              "
            >
              You have: {{ myBalanceFormatted.wLAND }} wLAND
            </span>
          </div>
        </v-col>
      </v-row>

      <h2 class="text-justify mt-6">
        By building foundations, you can earn fees for owning these resources.
        Everyone needs and wants to enjoy the benefits of increasing courage,
        doing business, and maintaining protection.
      </h2>
      <h2 class="text-justify mt-6">
        Of course, you want to maintain your lands very well! So don't forget
        that land has a maintenance cost.
      </h2>
      <h2 class="text-justify">
        To build foundations, you will need to acquire villages. They promote a
        wide range of gameplay possibilities, building construction, and
        effective participation in the Arcadia Expansion. That's why they're
        easier to acquire.
      </h2>

      <h2 class="text-center mt-6">
        <a href="https://apwars.farm/docs/arcadia/foundations">
          Click here to learn more about fees and maintenance cost of each
          foundation.
        </a>
      </h2>
    </v-container>
    <v-divider
      v-if="isBlocked === false"
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
      <game-item-wood-modal
        v-if="isConfirmOrderModalOpen"
        :open="isConfirmOrderModalOpen"
        :imageUrl="ticketSelect.img"
        :gameItemTitle="ticketSelect.name"
        @confirm="buyTicket"
        @close="isConfirmOrderModalOpen = false"
        title="Are you sure you want to buy this item?"
        :amount="ticketSelect.balanceAccount"
        :isLoading="loadingTicket"
      >
        <p>How many items do you want to buy?</p>
        <v-row>
          <v-col cols="12" md="6">
            <number-field
              class="mt-n1"
              v-model="quantity"
              :max="ticketSelect.remaining"
            ></number-field>
          </v-col>
        </v-row>
        <div class="mt-n6">
          <h4 :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
            <span>You will pay per item:</span>
            <amount
              :amount="ticketSelect.price"
              formatted
              decimals="2"
              tooltip
              title="wLAND"
              symbol="wLAND"
              icon
            />
          </h4>
          <h4
            :class="$vuetify.breakpoint.mdAndUp ? 'd-flex mr-1 mb-1' : 'mt-1'"
          >
            You will pay for {{ quantity }} items:
            <amount
              :amount="ticketSelect.price * quantity"
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
import wButton from "@/lib/components/ui/Buttons/wButton";
import Amount from "@/lib/components/ui/Utils/Amount";
import GameItemWoodModal from "@/lib/components/ui/Modals/GameItemWoodModal";
import NumberField from "@/lib/components/ui/Utils/NumberField";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import LandSale from "@/lib/eth/LandSale";

import Convert from "@/lib/helpers/Convert";

import ERC20 from "@/lib/eth/ERC20";
import Collectibles from "@/lib/eth/Collectibles";
import axios from "axios";

export default {
  data() {
    return {
      amountwLAND: 0,
      amountBUSD: 0,
      amount: 0,

      supplywLAND: 896682,

      isConfirmOrderModalOpen: false,
      balancewLAND: undefined,
      balanceBUSD: undefined,
      quantity: 0,
      wLANDSoldAmount: 0,
      ticketSelect: {},

      isBuyingwLAND: false,
      isApprovedBUSD: undefined,
      isApprovedwLAND: undefined,

      isLoadingApprove: false,
      loadingFoundations: true,
      loadingTicket: false,

      ref: "0x681afa780d17da29203322b473d3f210a7d621259a4e6ce9e403f5a266ff719a",
      isRef: undefined,

      pricewLAND: 1.5,

      wLAND: "0x3301078Bf06c2B5632170d4A4742372cEcb2748e",
      addresslandSale: "0x175EeA83C23d0aD3B4323ede5FC5572A7b848619",
      addressBUSD: "0xFa1d2186CEbFe49F3e053d4751C2d6680775a70F",

      currencyConfigBuywLAND: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: false,
      },

      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 2,
        autoDecimalMode: true,
        allowNegative: false,
      },

      panel: [0],

      faq: [
        {
          question: "What to do with wLAND?",
          answer:
            "You can buy lands to build foundations, collect resources and receive fees with all these features.",
        },
        {
          question: "Why buying lands now will help me in the game?",
          answer:
            "Well, what did landowners gain by buying lands earlier and escaping real estate speculation? That's right, the valorization of their land! By buying lands now, you can pay little to build foundations, collect resources, and receive fees.",
        },
        {
          question: "What is Arcadia?",
          answer:
            "Arcadia is the name given to the expansion of the APWars game and it consists of providing a world with land that can be purchased to collect resources, build foundations and create an economic ecosystem.",
        },
        {
          question: "What are foundations?",
          answer:
            "Foundations are a kind of property that offers a benefit to those who pay the fees. Temples offer more courage, markets make negotiations possible, and watchtowers maintain security and offer news of troops that may be approaching.",
        },
        {
          question: "What are the strategies for buying good lands?",
          answer:
            "Initially, you can check how much land each foundation needs to consolidate. For example, watchtowers need nine lands and a good move is to buy nine to build this foundation to receive fees or buy lands in multiple locations, so someone who wants to build foundations needs to buy (for a great price) lands from you. You can join the APWars group on Telegram and discuss more strategies with other players too!",
        },
      ],
      foundations: [
        {
          id: 58,
          name: "Temple",
          img: "/images/foundations/temples.png",
          price: 125,
          remaining: 0,
          balanceAccount: 0,
        },
        {
          id: 59,
          name: "Watchtower",
          img: "/images/foundations/watchtowers.png",
          price: 125,
          remaining: 0,
          balanceAccount: 0,
        },
        {
          id: 60,
          name: "Market",
          img: "/images/foundations/markets.png",
          price: 400,
          remaining: 0,
          balanceAccount: 0,
        },
        {
          id: 61,
          name: "Hidout",
          img: "/images/foundations/hidings-place.png",
          price: 75,
          remaining: 0,
          balanceAccount: 0,
        },
        {
          id: 62,
          name: "Village",
          img: "/images/foundations/village.png",
          price: 10,
          remaining: 0,
          balanceAccount: 0,
        },
      ],

      location: {},
      isLocationLoaded: false,
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
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    currentBlockNumber() {
      return this.$store.getters["user/currentBlockNumber"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    percentageUnitsSold() {
      return parseInt((this.wLANDSoldAmount / this.supplywLAND) * 100);
    },

    wLANDSold() {
      return this.supplywLAND - this.wLANDSoldAmount;
    },

    myBalanceFormatted() {
      if (this.balancewLAND === undefined || this.balanceBUSD === undefined) {
        return {
          wLAND: "loading...",
          busd: "loading...",
        };
      }

      return {
        wLAND: Convert.formatString(
          Convert.fromWei(this.balancewLAND, true),
          2
        ),
        busd: Convert.formatString(Convert.fromWei(this.balanceBUSD, true), 2),
      };
    },

    getFoundations() {
      if (this.isRef === true) {
        return this.foundations.map((foundation) => {
          foundation.price = foundation.price * 0.95;
          return foundation;
        });
      }
      return this.foundations;
    },

    isBlocked() {
      if(process.env.VUE_APP_BLOCKED_CONTRY_CODES === undefined) {
        return false;
      }

      const blocked = (
        process.env.VUE_APP_BLOCKED_CONTRY_CODES || ""
      ).toUpperCase();
      const code = (this.location.country_code || "").toUpperCase();
      return code && blocked.split(",").includes(code);
    },
  },

  methods: {
    async initData() {
      if (!this.isConnected) {
        return;
      }

      if (this.isBlocked) {
        return;
      }

      this.contractBUSD = new ERC20(this.addressBUSD);
      this.contractwLAND = new ERC20(this.wLAND);
      this.contractLandSale = new LandSale(this.addresslandSale);
      this.contractCollectibles = new Collectibles(this.addresses.collectibles);

      try {
        this.location = await this.getLocattion();

        this.wLANDSoldAmount = Convert.fromWei(
          await this.contractLandSale.wLANDSoldAmount(this.account),
          true
        );

        this.isApprovedBUSD = await this.contractBUSD.hasAllowance(
          this.account,
          this.addresslandSale
        );

        this.isApprovedwLAND = await this.contractwLAND.hasAllowance(
          this.account,
          this.addresslandSale
        );

        this.balancewLAND = await this.contractwLAND.balanceOf(this.account);
        this.balanceBUSD = await this.contractBUSD.balanceOf(this.account);

        this.foundationsRemaining();
        this.checkRef();
      } catch (error) {
        console.log(error.toString());
      }
    },

    async checkRef() {
      if (this.isRef !== undefined) {
        return;
      }

      if (this.$route.query.ref) {
        this.ref = window.web3.utils.fromAscii(this.$route.query.ref);
        const referral = await this.contractLandSale.referral(
          this.ref,
          this.account
        );
        this.isRef = false;
        if (referral !== "0x0000000000000000000000000000000000000000") {
          this.isRef = true;
          this.pricewLAND = 1.425;
        }
      }
    },

    async foundationsRemaining() {
      for (let item of this.foundations) {
        item.remaining = await this.contractCollectibles.balanceOf(
          this.addresslandSale,
          item.id
        );
        item.balanceAccount = await this.contractCollectibles.balanceOf(
          this.account,
          item.id
        );
      }
      this.loadingFoundations = false;
    },

    async calcAmountBUSD(amount) {
      this.amountBUSD = amount * this.pricewLAND;
    },

    isBalanceTicket(ticketPrice) {
      return Convert.fromWei(this.balancewLAND, true) > ticketPrice;
    },

    async approveBUSD() {
      try {
        this.isLoadingApprove = true;

        await this.contractBUSD.approve(this.account, this.addresslandSale);

        this.isLoadingApprove = false;
        this.isApprovedBUSD = true;
        ToastSnackbar.success("BUSD smart contract approved successfully!");
      } catch (error) {
        this.isLoadingApprove = false;
        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error("An error has occurred while to approve");
      }
    },

    async approvewLAND() {
      try {
        this.isLoadingApprove = true;

        await this.contractwLAND.approve(this.account, this.addresslandSale);

        this.isLoadingApprove = false;
        this.isApprovedwLAND = true;
        ToastSnackbar.success("wLAND smart contract approved successfully!");
      } catch (error) {
        this.isLoadingApprove = false;
        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error("An error has occurred while to approve");
      }
    },

    async buywLAND() {
      try {
        this.isBuyingwLAND = true;

        await this.contractLandSale.buywLAND(
          parseInt(this.amountwLAND),
          this.ref,
          this.account
        );

        this.isBuyingwLAND = false;
        this.openModalBuy = true;
        this.amountwLAND = 0;
        ToastSnackbar.success("wLAND secured successfully!");
      } catch (error) {
        this.isBuyingwLAND = false;

        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error("An error has occurred while buying wLAND");
      }
    },

    async buyTicket() {
      try {
        this.loadingTicket = true;

        await this.contractLandSale.buyTicket(
          this.ticketSelect.id,
          this.quantity,
          this.ref,
          this.account
        );

        this.loadingTicket = false;
        this.isConfirmOrderModalOpen = false;
        this.quantity = 0;
        this.ticketSelect = {};
        ToastSnackbar.success("Ticket successfully purchased!");
      } catch (error) {
        this.loadingTicket = false;
        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error("An error has occurred while buying wLAND");
      }
    },

    showError(message) {
      if (message.indexOf("Internal JSON-RPC error.") >= 0) {
        const obj = JSON.parse(message.replace("Internal JSON-RPC error.", ""));
        return ToastSnackbar.error(obj.message);
      }

      return ToastSnackbar.error(message);
    },

    colorProgress(percentage) {
      if (percentage < 30) {
        return "#11D300";
      } else if (percentage > 30 && percentage < 60) {
        return "#ffa500";
      } else {
        return "#ff0000";
      }
    },

    openModal(ticket) {
      this.quantity = 0;
      this.ticketSelect = ticket;
      this.isConfirmOrderModalOpen = true;
    },

    goToHome() {
      window.location.href = "https://apwars.farm/home";
    },

    async getLocattion() {
      try {
        if (this.isLocationLoaded) {
          return this.location;
        }

        const r = (await axios.get(process.env.VUE_APP_LOCATION_SERVICE)).data;
        this.isLocationLoaded = true;

        return r;
      } catch {
        return {};
      }
    },
  },

  watch: {
    isConnected() {
      this.initData();
    },

    currentBlockNumber() {
      if (!this.isConnected) {
        return;
      }
      this.initData();
    },

    account() {
      if (!this.isConnected) {
        return;
      }
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
  background-image: url("/images/project/bg-castle.png");
  background-size: cover;
}
#background {
  background-color: black;
}
.bg-wood {
  background-image: url("/images/battle/bg-wars.png");
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
