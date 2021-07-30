<template id="background">
  <v-sheet color="black" style="justify-content: center;" id="background">
    <!-- Top -->
    <div>
      <v-img src="/images/project/bg-castle.png" max-height="720" min-height="400">
        <div class="d-flex flex-column align-center mt-3">
          <v-img
            src="/images/project/ArcadiaExpansion.png"
            max-height="480"
            min-height="110"
          ></v-img>
          <h3 :style="secondaryText" class="mt-4 mb-8 px-md-12 text-center">
            Arcadia is the expansion to a world of turn-based Village Ecosystem in which players
            will manage domestic economies, handle attacks and defenses, join clans and much more!
          </h3>
          <v-img src="/images/project/arcadia.png" max-height="1167" min-height="261"></v-img>
        </div>
        <div class="gradient mt-15"></div>
      </v-img>
    </div>
    <!-- end Top -->
    <v-container id="background">
      <!-- wLAND -->
      <v-row class="mt-4 justify-center">
        <v-col cols="12" lg="8">
          <h1 class="h3Y">As a World Owners manage your ROI and fees</h1>
          <h2 class="paragraph">
            In Arcadia you will be able to create your own blockchain world with your farming rules,
            collect taxes and have players engaged in your ecosystem. Establish your own clan,
            collect deposit fees or just play the game and conquer your enemy’s riches!
          </h2>
        </v-col>
        <v-col cols="12" lg="4">
          <div>
            <v-img src="/images/project/wLAND.png" max-width="106" class="h-align"></v-img>
          </div>
          <h3>
            wLAND is a <span class="h3Y">utility token</span> used to create worlds, clans and also
            to buy lands for the creation of villages and foundations.
          </h3>
        </v-col>
      </v-row>
      <!-- END wLAND -->
      <!-- PRIVATE SALE -->
      <div class="d-flex flex-column align-center mt-3">
        <h1 v-if="$vuetify.breakpoint.mdAndUp" class="h1Y text-center mt-4 mb-4">Private Sale</h1>
        <h1 v-else class="h3Y text-center mt-4 mb-4">Private Sale</h1>
        <v-img src="/images/project/prices.png" max-height="1167" min-height="261"></v-img>
        <div class="mt-6 text-center" style="width: 100%">
          <v-progress-linear
            color="#11D300"
            buffer-value="100"
            value="20"
            stream
          ></v-progress-linear>
          <p class="mt-1">UNITS SOLD: 375,000.00</p>
          <p>CURRENT PRICE: $0.50</p>
        </div>
        <h1 v-if="$vuetify.breakpoint.mdAndUp" class="h1Y text-center mt-4 mb-4">
          Total Supply: 1,500,000.00 wLAND
        </h1>
        <h1 v-else class="h3Y text-center mt-4">Total Supply: 1,500,000.00 wLAND</h1>
        <div
          :class="$vuetify.breakpoint.mdAndUp ? 'd-flex justify-space-around' : 'text-center'"
          style="width: 80%"
        >
          <h3 :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-2'">Soft Cap: 200,000.00 BUSD</h3>
          <h3 :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-2 mb-2'">
            Hard Cap: 1,375,000.00 BUSD
          </h3>
        </div>
        <p class="mt-1">
          Cliff: *Vesting for private sale wLAND begins 1 month after TGE. Vesting: Monthly claims
          during 9 months up to 100%
        </p>
      </div>
      <!-- END PRIVATE SALE -->
      <!-- WHITELIST -->
      <div class="border mt-3 mb-4">
        <h1 v-if="$vuetify.breakpoint.mdAndUp" class="h1Y text-center mt-4 mb-4">
          You were whitelisted
        </h1>
        <h1 v-else class="h3Y text-center mt-4 mb-4">You were whitelisted</h1>
        <v-row class="align-center">
          <v-col cols="12" lg="3" class="text-center">
            <div>
              <v-img src="/images/project/wLAND.png" max-width="106" class="h-align"></v-img>
            </div>
            <h1 class="h1Y">$0.50</h1>
            <h3 class="h3Y mt-n2">per wLAND</h3>
            <p>500,000.00 wLAND (locked*)</p>
            <div>
              <v-progress-linear
                class="ml-1"
                color="#11D300"
                buffer-value="0"
                value="20"
                stream
              ></v-progress-linear>
              <p class="mt-1">UNITS SOLD: 375,000.00</p>
            </div>
          </v-col>
          <v-col cols="12" lg="8">
            <v-img
              :src="$vuetify.breakpoint.mdAndUp ? '/images/project/rectangle.png' : ''"
              max-width="788"
            >
              <v-row class="mt-1 justify-center">
                <v-col cols="11" lg="7">
                  <h5>QTY:</h5>
                  <v-currency-field
                    outlined
                    v-bind="currencyConfig"
                    v-model="amount"
                    @input="calcFee()"
                  >
                    <template v-slot:append>
                      <div class="d-flex">
                        <span class="mr-1 align-self-center">wLAND</span>
                      </div>
                    </template>
                  </v-currency-field>
                </v-col>
                <v-col
                  cols="12"
                  lg="4"
                  :class="
                    $vuetify.breakpoint.mdAndUp
                      ? 'd-flex align-center ml-n3'
                      : 'd-flex mt-n6 mb-4 align-center '
                  "
                  style=""
                >
                  <v-img
                    v-if="$vuetify.breakpoint.mdAndUp"
                    src="/images/project/wLAND.png"
                    max-height="50"
                    max-width="50"
                  ></v-img>
                  <h6 class="text-center" style="width: 100%">
                    YOUR SUPPORTING SUGGESTION IS AVAILABLE
                  </h6>
                </v-col>
              </v-row>
              <v-row class="justify-center mt-n8">
                <v-col cols="11" lg="7">
                  <h5>QTY:</h5>
                  <v-currency-field
                    outlined
                    v-bind="currencyConfig"
                    v-model="amount"
                    @input="calcFee()"
                  >
                    <template v-slot:append>
                      <div class="d-flex">
                        <span class="mr-1 align-self-center">BUSD</span>
                      </div>
                    </template>
                  </v-currency-field>
                </v-col>
                <v-col
                  cols="12"
                  lg="4"
                  :class="
                    $vuetify.breakpoint.mdAndUp
                      ? 'd-flex align-center ml-n3'
                      : 'd-flex mt-n6 mb-4 align-center h-align'
                  "
                  style=""
                >
                  <v-img
                    v-if="$vuetify.breakpoint.mdAndUp"
                    src="/images/project/BUSD.png"
                    max-height="36"
                    max-width="35"
                  ></v-img>
                  <wButton width="170px" class="mx-1 ml-2" size="large">
                    <div class="d-flex justify-center">
                      <large class="align-self-center">Approve</large>
                    </div>
                  </wButton>
                </v-col>
                <p class="mt-n4">
                  You will received <span class="h3Y">{{ wWisdom }}</span> wWISDOM
                </p>
              </v-row>
            </v-img>
          </v-col>
        </v-row>
        <countdown class="mt-10 mb-4" :time="countdownTimeEnd" @end="loadData"></countdown>
      </div>
    </v-container>

    <!-- END WHITELIST -->
    <v-container>
      <h1 v-if="$vuetify.breakpoint.mdAndUp" class="h1Y text-center mt-4 mb-4">
        Reservation Tickets
      </h1>
      <h1 v-else class="h3Y text-center mt-4 mb-4">Reservation Tickets</h1>
      <v-row>
        <v-col
          cols="12"
          md="6"
          :class="
            $vuetify.breakpoint.mdAndUp
              ? 'd-flex align-center justify-center'
              : 'align-center justify-center text-center'
          "
        >
          <div class="text-center">
            <v-img
              src="/images/project/world.png"
              max-width="300"
              min-height="100"
              :class="$vuetify.breakpoint.mdAndUp ? '' : 'w-align'"
            >
            </v-img>
            <span class="span">You buy: {{ unitsWorld }} </span>
          </div>
          <div class="ml-1">
            <h1 class="h1W">World</h1>
            <h1 class="h3Y">39,999 BUSD</h1>
            <p>2 units to be sold</p>
            <p class="h4B">Fee after private sale</p>
            <p class="h4B mt-n3">(in the game)</p>
            <div class="d-flex align-center justify-center mt-n2 mb-2">
              <h1 class="h3Y">
                100,000
              </h1>
              <span class="span ml-1">wLAND</span>
            </div>
            <wButton width="170px" class="mx-1 mt-n1" size="large">
              <div class="d-flex justify-center">
                <large class="align-self-center">BUY TICKET</large>
              </div>
            </wButton>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          :class="
            $vuetify.breakpoint.mdAndUp
              ? 'd-flex align-center justify-center'
              : 'align-center justify-center text-center'
          "
        >
          <div class="text-center">
            <v-img
              src="/images/project/clans.png"
              max-width="300"
              min-height="100"
              :class="$vuetify.breakpoint.mdAndUp ? '' : 'w-align'"
            >
            </v-img>
            <span class="span">You buy: {{ unitsClans }} </span>
          </div>
          <div class="ml-1">
            <h1 class="h1W">Clans</h1>
            <h1 class="h3Y">3,999 BUSD</h1>
            <p>50 units to be sold</p>
            <p class="h4B">Fee after private sale</p>
            <p class="h4B mt-n3">(in the game)</p>
            <div class="d-flex align-center justify-center mt-n2 mb-2">
              <h1 class="h3Y">
                10,000
              </h1>
              <span class="span ml-1">wLAND</span>
            </div>
            <wButton width="170px" class="mx-1 mt-n1" size="large">
              <div class="d-flex justify-center">
                <large class="align-self-center">BUY TICKET</large>
              </div>
            </wButton>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- Distribution Timeline -->

    <v-img
      src="/images/project/bg-fire.png"
      max-height="500"
      min-height="400"
      class="justify-center align-center"
    >
      <v-container class="justify-center">
        <h1 v-if="$vuetify.breakpoint.mdAndUp" class="h1Y text-center mt-4 mb-4">
          Distribution Timeline
        </h1>
        <h1 v-else class="h3Y text-center mt-4 mb-4">Distribution Timeline</h1>
        <v-img
          :class="$vuetify.breakpoint.mdAndUp ? 'h-align' : ''"
          src="/images/project/distributionTimeline.png"
          max-height="250"
          max-width="800"
        ></v-img>
      </v-container>
    </v-img>
    <!-- END Distribution Timeline -->
    <v-row class="justify-center">
      <v-img
        class="justify-center mt-1"
        :src="$vuetify.breakpoint.mdAndUp ? '/images/project/rectangle2.png' : ''"
        :max-width="$vuetify.breakpoint.mdAndUp ? '1185' : '300'"
      >
        <v-row class="mt-1 justify-center">
          <v-col cols="12" md="3" lg="3">
            <h6>TOTAL CLAIMED:</h6>
            <v-currency-field outlined v-bind="currencyConfig" v-model="amount" @input="calcFee()">
              <template v-slot:append>
                <div class="d-flex">
                  <span class="mr-1 align-self-center">wLAND</span>
                </div>
              </template>
            </v-currency-field>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <h6>UNLOCKED AMOUNT TO CLAIM:</h6>
            <v-currency-field outlined v-bind="currencyConfig" v-model="amount" @input="calcFee()">
              <template v-slot:append>
                <div class="d-flex">
                  <span class="mr-1 align-self-center">wLAND</span>
                </div>
              </template>
            </v-currency-field>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <h6>REMANING LOCKED TOKENS:</h6>
            <v-currency-field outlined v-bind="currencyConfig" v-model="amount" @input="calcFee()">
              <template v-slot:append>
                <div class="d-flex">
                  <span class="mr-1 align-self-center">wLAND</span>
                </div>
              </template>
            </v-currency-field>
          </v-col>
        </v-row>
        <v-row class="justify-center mt-n4">
          <wButton width="170px" class="mx-1 mt-n1" @click="">
            <div class="d-flex justify-center">
              <large class="align-self-center">CLAIM</large>
            </div>
          </wButton>
        </v-row>

        <p class="text-center mt-3">NEXT CLAIM: {{ nextClaim }} BLOCKS</p>
      </v-img>
    </v-row>
    <!-- FAQ -->
    <v-container class="py-4 py-lg-8">
      <div class="text-center">
        <div class="text-uppercase font-weight-bold body-2 primary--text mb-2">PRIVATE SALE</div>
        <h2 class="text-h3 text-lg-h2">Frequently Asked Questions</h2>
      </div>

      <v-expansion-panels v-model="panel" multiple class="mt-8">
        <v-expansion-panel v-for="(item, i) in faq" :key="i">
          <v-expansion-panel-header class="text-h5 bold">
            <h4>{{ item.question }}</h4>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="sub text-h6">
            {{ item.answer }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-sheet>
</template>

<script>
import wButton from '@/lib/components/ui/Buttons/wButton';
import Countdown from '@/lib/components/ui/Utils/Countdown';

export default {
  name: 'Landing',
  components: {
    wButton,
    Countdown,
  },
  data() {
    return {
      tokenPrice: 0.5,
      wWisdom: 5000,
      nextClaim: 5000,
      unitsClans: 4,
      unitsWorld: 4,
      panel: [0],
      faq: [
        {
          question: 'What is Cliff?',
          answer:
            'Cliff is a phase in which users cannot use their tokens, they are fully locked in a smart contract.',
        },
        {
          question: 'What is Vesting?',
          answer:
            'Vesting represents the slow dispersion of tokens. For this sale the total amount of tokens is going to be claimable in even parts for 9 consecutive months.',
        },
        {
          question: 'What is wLAND?',
          answer:
            'wLAND is an utility token used to exchange for Worlds, Clans and actual terrains used to place buildings, foundations and Villages. The maximum supply of wLAND is 1.500.000 tokens and it will be sold in three different batches.',
        },
        {
          question: 'What is wWinsdom?',
          answer:
            'wWisdom is a utility token for community voting power accountability. It is not a governance token but it can become one in the future. It will be distributed for the team, private buyers, and ring holders.',
        },
        {
          question: 'What are the liquidity and listing plans for wLAND?',
          answer:
            '2.5% of total amount sold in game items will be used for liquidity provision. wLAND will be listed at an equivalent value of 1.5 BUSD in wGOLD.',
        },
        {
          question: 'What is the hard cap of 1.375M BUSD?',
          answer: 'No more sales of the game item wLAND will be made passed this value.',
        },
        {
          question: 'How are tokens going to be released to investors?',
          answer: 'Tokens will be periodically claimable from a smart contract.',
        },
        {
          question: 'How long will the private sale period last?',
          answer: 'Private sale will last 1 month.',
        },
        {
          question: 'What happens if game itens/tokens become unsold?',
          answer: 'All unsold supply will be burned.',
        },
        {
          question: 'What are the vesting terms for private sale?',
          answer: '3 month cliff, 9 months vesting until 100% unlocked.',
        },
        {
          question: 'What is the immediate utility of wLAND on TGE?',
          answer:
            'It can be used instantly to buy tickets for worlds and clans via a smart contract. As soon as  game starts it will be used to buy land. ',
        },
      ],
    };
  },
  methods: {
    openNewTab(obj) {
      window.open(obj);
    },
  },
};
</script>

<style scoped>
.sub {
  color: white;
}
.h-align {
  position: relative;
  left: 20%;
}
.w-align {
  position: relative;
  left: 10%;
}
.h3Y {
  background: -webkit-linear-gradient(#faff00, #ffb800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
.h1Y {
  background: -webkit-linear-gradient(#faff00, #ffb800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
}
.h4B {
  background: -webkit-linear-gradient(#8fb5ff, #0085ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  font-weight: bold;
}
.h1W {
  font-size: 60px;
}
.span {
  font-size: 16px;
  color: #c4c4c4;
}
.gradient {
  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, rgb(49 45 35 / 0%) 0, rgb(0 0 0) 100%);
}
#background {
  background-color: black;
}
.theme--dark.v-sheet {
  border-color: green;
}
.border {
  border-width: 1px;
  border-color: #bb7248;
  border-style: solid;
}
</style>
