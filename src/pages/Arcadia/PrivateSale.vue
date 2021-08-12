<template id="background">
  <div>
    <div class="countdown-start-private-sale" v-if="timeStartPrivateSale > 0">
      <div v-if="isLoading">
        <h1 class="h3Y text-center mt-9 mb-4">Loading...</h1>
      </div>
      <div v-else>
        <h1 class="h3Y text-center mt-9 mb-4">Private sale begins</h1>
        <countdown class="mt-10 mb-4" :time="timeStartPrivateSale"></countdown>
        <div>

            <div class="d-flex flex-column align-center mt-3">
              <v-img
                src="/images/project/ArcadiaExpansion.png"
                max-height="400"
                min-height="110"
              ></v-img>
              <h3 class="mt-4 mb-8 px-md-12 text-center">
                Arcadia is the first expansion of APWars to a turn-based Village
                building world in which players will manage domestic economies,
                handle attacks and defenses, join clans and much more!
              </h3>
              <div
                v-if="isBlocked"
                class="mt-n3 ml-3 mr-3 mb-3 px-md-12 text-center"
              >
                <v-alert color="primary" dark icon="mdi-alert" prominent>
                  This is not an error. You are seeing this message because you
                  are accessing this application with an IP address from a
                  prohibited jurisdiction or territory to participate in this
                  sale. This private sale of game items is only related to
                  utility tokens with objective use cases and bear no investment
                  characteristics of promises of dividends, guarantees of
                  appreciation, or gains of any form. Nevertheless, because
                  regulatory blurriness we are preventing Americans, for
                  example, to take part in this sale.
                </v-alert>
              </div>
              <v-img
                v-if="$vuetify.breakpoint.mdAndUp"
                src="/images/project/arcadia.png"
                max-height="1167"
                min-height="261"
              ></v-img>
              <div v-else class="d-block">
                <v-carousel
                  cycle
                  height="400"
                  hide-delimiter-background
                  show-arrows-on-hover
                >
                  <v-carousel-item v-for="(slide, i) in slides" :key="i">
                    <v-sheet height="100%">
                      <v-img
                        :src="`/images/project/${i}.png`"
                        max-height="100%"
                        min-height="120"
                      ></v-img>
                    </v-sheet>
                  </v-carousel-item>
                </v-carousel>
              </div>
            </div>

        </div>
        <!-- wLAND -->
        <v-container>
          <v-row class="justify-center">
          <v-col cols="12" lg="8">
            <h1 class="h3Y">wLAND Utility:</h1>
            <h2>
              wLand is game item resource with utility that enables the player
              to buy World and Clan reservation tickets and lands.
            </h2>
            <ul>
              <li>
                wWorld and wClan tickets: These represent reservation tickets
                that enable the bearer to establish a world and a clan when
                these respective features are available.
              </li>
              <li>
                Lands will be available to be bought only with wLAND. This is
                necessary for a player that wishes to establish villages and
                foundations.
              </li>
            </ul>
          </v-col>

          <v-col cols="12" lg="4">
            <div class="text-center">
              <v-img
                src="/images/project/wLAND.png"
                max-width="80"
                class="img"
              ></v-img>
              <h3 class="h3Y">wLAND</h3>
            </div>
            <h3 class="text-center">
              wLAND is the main resource of the Arcadia Expansion.
            </h3>
          </v-col>
        </v-row>
        </v-container>
        <!-- END wLAND -->
      </div>
    </div>
    <v-sheet
      v-else
      color="black"
      style="justify-content: center;"
      id="background"
    >
      <!-- Top -->
      <div>
        <v-img
          src="/images/project/bg-castle.png"
          :max-height="$vuetify.breakpoint.mdAndUp ? '720' : '1250'"
          min-height="400"
        >
          <div class="d-flex flex-column align-center mt-3">
            <v-img
              src="/images/project/ArcadiaExpansion.png"
              max-height="400"
              min-height="110"
            ></v-img>
            <h3 class="mt-4 mb-8 px-md-12 text-center">
              Arcadia is the first expansion of APWars to a turn-based Village
              building world in which players will manage domestic economies,
              handle attacks and defenses, join clans and much more!
            </h3>
            <div
              v-if="isBlocked"
              class="mt-n3 ml-3 mr-3 mb-3 px-md-12 text-center"
            >
              <v-alert color="primary" dark icon="mdi-alert" prominent>
                This is not an error. You are seeing this message because you
                are accessing this application with an IP address from a
                prohibited jurisdiction or territory to participate in this
                sale. This private sale of game items is only related to utility
                tokens with objective use cases and bear no investment
                characteristics of promises of dividends, guarantees of
                appreciation, or gains of any form. Nevertheless, because
                regulatory blurriness we are preventing Americans, for example,
                to take part in this sale.
              </v-alert>
            </div>
            <v-img
              v-if="$vuetify.breakpoint.mdAndUp"
              src="/images/project/arcadia.png"
              max-height="1167"
              min-height="261"
            ></v-img>
            <div v-else class="d-block">
              <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet height="100%">
                    <v-img
                      :src="`/images/project/${i}.png`"
                      max-height="100%"
                      min-height="120"
                    ></v-img>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </div>
          </div>
          <div class="gradient mt-16"></div>
        </v-img>
      </div>
      <!-- end Top -->
      <v-container id="background">
        <!-- wLAND -->
        <v-row class="justify-center">
          <v-col cols="12" lg="8">
            <h1 class="h3Y">wLAND Utility:</h1>
            <h2>
              wLand is game item resource with utility that enables the player
              to buy World and Clan reservation tickets and lands.
            </h2>
            <ul>
              <li>
                wWorld and wClan tickets: These represent reservation tickets
                that enable the bearer to establish a world and a clan when
                these respective features are available.
              </li>
              <li>
                Lands will be available to be bought only with wLAND. This is
                necessary for a player that wishes to establish villages and
                foundations.
              </li>
            </ul>
          </v-col>

          <v-col cols="12" lg="4">
            <div class="text-center">
              <v-img
                src="/images/project/wLAND.png"
                max-width="80"
                class="img"
              ></v-img>
              <h3 class="h3Y">wLAND</h3>
            </div>
            <h3 class="text-center">
              wLAND is the main resource of the Arcadia Expansion.
            </h3>
          </v-col>
        </v-row>
        <!-- END wLAND -->

        <div v-if="isWhitelisted">
          <!-- PRIVATE SALE -->
          <div class="d-flex flex-column align-center mt-2">
            <h1
              v-if="$vuetify.breakpoint.mdAndUp"
              class="h1Y text-center mt-4 mb-4"
            >
              Private Sale
            </h1>
            <h1 v-else class="h3Y text-center mt-4 mb-4">Private Sale</h1>
            <div class="d-flex justify-space-between">
              <v-img
                v-bind:class="{ 'price-disabled': pricewLAND > 0.5 }"
                src="/images/project/50.png"
                max-height="400"
                min-height="150"
                class="mt-3 mx-6 mx-lg-9"
              ></v-img>
              <v-img
                v-bind:class="{ 'price-disabled': pricewLAND > 0.75 }"
                src="/images/project/75.png"
                max-height="400"
                min-height="150"
                class="mt-3 mx-6 mx-lg-9"
              ></v-img>
              <v-img
                v-bind:class="{ 'price-disabled': percentageUnitsSold === 100 }"
                src="/images/project/150.png"
                max-height="400"
                min-height="150"
                class="mt-3 mx-6 mx-lg-9"
              ></v-img>
            </div>
            <div class="mt-6 text-center" style="width: 100%">
              <v-progress-linear
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
                SOLD UNITS:
                <amount :amount="wLANDSoldAmount" formatted decimals="2" />
              </p>
              <p :style="$vuetify.breakpoint.mdAndUp ? '' : 'font-size: 30px'">
                CURRENT PRICE: $<amount
                  :amount="pricewLAND"
                  formatted
                  decimals="2"
                />
              </p>
            </div>
            <h1
              v-if="$vuetify.breakpoint.mdAndUp"
              class="h1Y text-center mt-4 mb-4"
            >
              Total Supply: 1,500,000.00 wLAND
            </h1>
            <h1 v-else class="h3Y text-center mt-4">
              Total Supply: 1,500,000.00 wLAND
            </h1>
            <div
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'd-flex justify-space-around'
                  : 'text-center'
              "
              style="width: 80%"
            >
              <h3 :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-2'">
                Soft Cap: 200,000.00 BUSD
              </h3>
              <h3 :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-2 mb-2'">
                Hard Cap: 1,375,000.00 BUSD
              </h3>
            </div>
            <p class="mt-1">
              Cliff: *Vesting for private sale wLAND begins 1 month after TGE.
              Vesting: Monthly claims during 9 months up to 100%
            </p>
          </div>
          <!-- END PRIVATE SALE -->
          <!-- WHITELIST -->
          <div class="border mt-3">
            <h1
              v-if="$vuetify.breakpoint.mdAndUp"
              class="h1Y text-center mt-4 mb-4"
            >
              You were whitelisted
            </h1>
            <h1 v-else class="h3Y text-center mt-4 mb-4">
              You were whitelisted
            </h1>
            <v-row class="align-center">
              <v-col cols="12" lg="3" class="text-center">
                <div>
                  <v-img
                    src="/images/project/wLAND.png"
                    max-width="106"
                    class="img"
                  ></v-img>
                </div>
                <h1 class="h1Y">
                  $<amount :amount="pricewLAND" formatted decimals="2" />
                </h1>
                <h3 class="h3Y mt-n2">per wLAND</h3>
                <p>500,000.00 wLAND (locked*)</p>
                <div>
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
                    <amount
                      :amount="wLANDAvailableAmountStage"
                      formatted
                      decimals="2"
                    />
                  </p>
                </div>
              </v-col>
              <v-col cols="12" lg="8">
                <div v-if="isInPriorityPeriod" class="mb-1">
                  <small>
                    Due to the high demand, we defined a priority period of 24h
                    for those who meet the minimum requirement of 10k USD
                    allocation. After this period, every player will be able to
                    buy any amount of wLAND.
                  </small>
                  <br />
                  <small v-if="hardCommit > 0"
                    >Your hard commit is:
                    <amount :amount="hardCommit" formatted decimals="2" />
                    wLAND</small
                  >
                  <v-alert
                    dense
                    border="left"
                    type="warning"
                    class="mt-1"
                    v-if="hasBoughtInPriotiryLevel"
                  >
                    You already bought during the priority period. You need to
                    wait for more
                    {{ priorityEndBlock - currentBlockNumber }} blocks.
                  </v-alert>
                </div>
                <v-checkbox
                  v-model="checkbox"
                  class="checkbox-modal-input ma-0 pa-0 mt-2"
                  color="secondary"
                >
                  <template v-slot:label>
                    <div>
                      I understand that wLAND is a utility token used to buy
                      clans, worlds, and lands that I will receive it during 9
                      months after a one month of “cliff” that will start after
                      the end of this private sale.
                    </div>
                  </template>
                </v-checkbox>
                <v-img
                  v-bind:class="{ 'price-disabled': !checkbox }"
                  :src="
                    $vuetify.breakpoint.mdAndUp
                      ? '/images/project/rectangle.png'
                      : ''
                  "
                  max-width="788"
                >
                  <v-row class="mt-1 justify-center">
                    <v-col cols="11" lg="7">
                      <h5>QTY:</h5>
                      <v-currency-field
                        outlined
                        v-bind="currencyConfigBuywLAND"
                        v-model="amountwLAND"
                        @input="calcAmountBUSD"
                        :disabled="isInPriorityPeriod || !checkbox"
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
                    >
                      <v-img
                        v-if="$vuetify.breakpoint.mdAndUp"
                        src="/images/project/wLAND.png"
                        max-height="50"
                        max-width="50"
                      ></v-img>
                    </v-col>
                  </v-row>
                  <v-row class="justify-center mt-n8">
                    <v-col cols="11" lg="7">
                      <h5>BUSD PRICE:</h5>
                      <v-currency-field
                        outlined
                        v-bind="currencyConfig"
                        v-model="amountBUSD"
                        disabled
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
                          : 'd-flex mt-n6 mb-4 align-center img'
                      "
                      style=""
                    >
                      <v-img
                        v-if="$vuetify.breakpoint.mdAndUp"
                        src="/images/project/BUSD.png"
                        max-height="36"
                        max-width="35"
                      ></v-img>
                      <wButton
                        v-if="isApprovedBUSD"
                        width="170px"
                        :class="
                          $vuetify.breakpoint.mdAndUp ? 'mx-1 ml-2' : 'mx-12'
                        "
                        size="large"
                        @click="buywLAND"
                        :disabled="
                          !checkbox ||
                            amountBUSD == 0 ||
                            isBuyingwLAND ||
                            (hasBoughtInPriotiryLevel && isInPriorityPeriod)
                        "
                      >
                        <div class="d-flex justify-center">
                          <span
                            v-if="
                              !(hasBoughtInPriotiryLevel && isInPriorityPeriod)
                            "
                            class="align-self-center"
                          >
                            {{ isBuyingwLAND ? "Waiting..." : "Buy" }}
                          </span>
                          <span v-else class="align-self-center">WAIT</span>
                        </div>
                      </wButton>
                      <wButton
                        v-else
                        width="170px"
                        :class="
                          $vuetify.breakpoint.mdAndUp ? 'mx-1 ml-2' : 'mx-12'
                        "
                        size="large"
                        @click="approveBUSD"
                        :disabled="isLoadingApprove || !checkbox"
                      >
                        <div class="d-flex justify-center">
                          <span class="align-self-center">
                            {{ isLoadingApprove ? "Waiting..." : "Approve" }}
                          </span>
                        </div>
                      </wButton>
                    </v-col>
                    <p class="mt-n4">
                      You will receive
                      <span class="h3Y">
                        <amount :amount="wWISDOM" formatted decimals="4" />
                      </span>
                      wWISDOM
                    </p>
                  </v-row>
                </v-img>
              </v-col>
            </v-row>
            <countdown class="mt-10 mb-4" :time="privateSaleTimer"></countdown>
          </div>

          <v-row class="justify-center align-center mt-4">
            <v-col cols="12" md="4" lg="4" class="d-flex">
              <div class="text-center">
                <v-img
                  src="/images/wWISDOM.png"
                  max-width="100"
                  class="img"
                ></v-img>
                <h3 class="h3Y">wWISDOM</h3>
              </div>
              <div class="my-2 ml-2">
                <h3 class="d-flex">
                  <span>Available Balance:</span>
                  <span class="h3Y ml-1 mr-1"
                    ><amount :amount="wWISDOMBalance" formatted decimals="4"
                  /></span>
                  <span>wWISDOM</span>
                </h3>
                <wButton
                  @click="claimwWISDOW()"
                  width="170px"
                  class="mx-10 mt-2"
                  :disabled="wLANDSoldAmount < 200000"
                >
                  <div class="d-flex justify-center">
                    <div class="align-self-center">CLAIM</div>
                  </div>
                </wButton>
                <p v-if="wLANDSoldAmount < 200000">
                  The claim will be available after reaching the soft cap amount
                </p>
              </div>
            </v-col>
          </v-row>
          <!-- END WHITELIST -->
          <v-container>
            <h1 v-if="$vuetify.breakpoint.mdAndUp" class="h1Y text-center">
              Reservation Tickets
            </h1>
            <h1 v-else class="h3Y text-center mt-4 mb-4">
              Reservation Tickets
            </h1>
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
                    class="img"
                  >
                  </v-img>
                  <span class="span"
                    >Your balance: {{ worldTicketBalance }}
                  </span>
                </div>
                <div class="ml-1">
                  <h1 class="h1W">World</h1>
                  <h1 class="h3Y">39,999 BUSD</h1>
                  <p>{{ availableWorldTickets }} units to be sold</p>
                  <p class="h4B">Fee after private sale</p>
                  <p class="h4B mt-n3">(in the game)</p>
                  <div class="d-flex align-center mt-n2 mb-2">
                    <h1 class="h3Y">
                      100,000
                    </h1>
                    <span class="span ml-1">wLAND</span>
                  </div>
                  <wButton
                    :disabled="
                      isBuyingWorldTicket || availableWorldTickets == 0
                    "
                    v-if="privateSaleTimer > 0"
                    @click="buyWorldTicket()"
                    width="170px"
                    class="mt-n1"
                    size="large"
                  >
                    <div class="d-flex justify-center">
                      <span
                        v-if="!isBuyingWorldTicket"
                        class="align-self-center"
                        >BUY TICKET</span
                      >
                      <span v-else class="align-self-center">WAITING...</span>
                    </div>
                  </wButton>
                  <wButton
                    :disabled="
                      isClaimingWorldTicket ||
                        cliffEndBlock > currentBlockNumber
                    "
                    v-if="privateSaleTimer === 0 && worldTicketBalance > 0"
                    @click="claimWorldTicket()"
                    width="170px"
                    class="mt-n1"
                    size="large"
                  >
                    <div class="d-flex justify-center">
                      <span
                        v-if="!isClaimingWorldTicket"
                        class="align-self-center"
                        >CLAIM</span
                      >
                      <span v-else class="align-self-center">WAITING...</span>
                    </div>
                  </wButton>
                  <p v-if="cliffEndBlock > currentBlockNumber">
                    The claim will be available after the cliff close
                  </p>
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
                    class="img"
                  >
                  </v-img>
                  <span class="span"
                    >Your balance: {{ clanTicketBalance }}
                  </span>
                </div>
                <div class="ml-1">
                  <h1 class="h1W">Clans</h1>
                  <h1 class="h3Y">3,999 BUSD</h1>
                  <p>{{ availableClanTickets }} units to be sold</p>
                  <p class="h4B">Fee after private sale</p>
                  <p class="h4B mt-n3">(in the game)</p>
                  <div class="d-flex align-center mt-n2 mb-2">
                    <h1 class="h3Y">
                      10,000
                    </h1>
                    <span class="span ml-1">wLAND</span>
                  </div>
                  <wButton
                    :disabled="isBuyingClanTicket || availableClanTickets == 0"
                    v-if="privateSaleTimer > 0"
                    @click="buyClanTicket()"
                    width="170px"
                    class="mt-n1"
                    size="large"
                  >
                    <div class="d-flex justify-center">
                      <span v-if="!isBuyingClanTicket" class="align-self-center"
                        >BUY TICKET</span
                      >
                      <span v-else class="align-self-center">WAITING...</span>
                    </div>
                  </wButton>
                  <wButton
                    :disabled="
                      isClaimingClanTicket || cliffEndBlock > currentBlockNumber
                    "
                    v-if="privateSaleTimer === 0 && clanTicketBalance > 0"
                    @click="claimClanTicket()"
                    width="170px"
                    class="mt-n1"
                    size="large"
                  >
                    <div class="d-flex justify-center">
                      <span
                        v-if="!isClaimingClanTicket"
                        class="align-self-center"
                      >
                        CLAIM
                      </span>
                      <span v-else class="align-self-center">WAITING...</span>
                    </div>
                  </wButton>
                  <p v-if="cliffEndBlock > currentBlockNumber">
                    The claim will be available after the cliff close
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <!-- Distribution Timeline -->
          <v-img
            :src="
              $vuetify.breakpoint.mdAndUp ? '/images/project/bg-fire.png' : ''
            "
            max-height="600"
            min-height="400"
            class="justify-center align-center"
          >
            <v-container class="justify-center mt-n10">
              <h1
                v-if="$vuetify.breakpoint.mdAndUp"
                class="h1Y text-center mt-n10 mb-5"
              >
                wLAND Distribution Timeline
              </h1>
              <h1 v-else class="h3Y text-center mt-4 mb-4">
                wLAND Distribution Timeline
              </h1>
              <v-img
                :class="$vuetify.breakpoint.mdAndUp ? 'img' : ''"
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
              :src="
                $vuetify.breakpoint.mdAndUp
                  ? '/images/project/rectangle2.png'
                  : ''
              "
              :max-width="$vuetify.breakpoint.mdAndUp ? '1185' : '300'"
            >
              <v-row class="mt-4 justify-center">
                <v-col
                  cols="12"
                  md="3"
                  lg="3"
                  :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-n5'"
                >
                  <h6>TOTAL CLAIMED:</h6>
                  <v-currency-field
                    disabled
                    outlined
                    v-bind="currencyConfig"
                    v-model="claimedAmount"
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
                  md="3"
                  lg="3"
                  :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-n8'"
                >
                  <h6>NEXT AMOUNT TO CLAIM MONTHLY:</h6>
                  <v-currency-field
                    disabled
                    outlined
                    v-bind="currencyConfig"
                    v-model="unlockedAmount"
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
                  md="3"
                  lg="3"
                  :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-n8'"
                >
                  <h6>REMANING LOCKED TOKENS:</h6>
                  <v-currency-field
                    disabled
                    outlined
                    v-bind="currencyConfig"
                    v-model="remainingAmount"
                  >
                    <template v-slot:append>
                      <div class="d-flex">
                        <span class="mr-1 align-self-center">wLAND</span>
                      </div>
                    </template>
                  </v-currency-field>
                </v-col>
              </v-row>
              <v-row
                class="justify-center mt-n4"
                :style="$vuetify.breakpoint.mdAndUp ? '' : 'height: 300px'"
              >
                <wButton
                  :disabled="isClaimingwLAND || nextClaimTimer > 0"
                  @click="claimwLAND()"
                  width="170px"
                  class="mx-1 mt-n1"
                >
                  <div class="d-flex justify-center">
                    <span v-if="!isClaimingwLAND" class="align-self-center"
                      >CLAIM</span
                    >
                    <span v-else class="align-self-center">WAITING...</span>
                  </div>
                </wButton>
              </v-row>
            </v-img>
          </v-row>
          <v-row>
            <v-container class="justify-center mt-8">
              <h1
                v-if="$vuetify.breakpoint.mdAndUp"
                class="h1Y text-center mt-n10 mb-5"
              >
                Next Claim
              </h1>
              <h1 v-else class="h3Y text-center mt-4 mb-4">Next Claim</h1>
              <countdown class="mt-10 mb-4" :time="nextClaimTimer"></countdown>
            </v-container>
          </v-row>
          <!-- FAQ -->
          <v-container class="py-4 py-lg-8">
            <div class="text-center">
              <div
                class="text-uppercase font-weight-bold body-2 primary--text mb-2"
              >
                PRIVATE SALE
              </div>
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
        </div>
      </v-container>

      <modal-wood
        :open="openModalBuy"
        title="wLAND secured successfully!"
        @confirm="closeModalBuy"
        textConfirm="Ok"
        width="500px"
        height="166px"
        hideClose
      >
        <v-row dense>
          <v-col cols="12">
            <h3 class="my-2">
              You paid
              <amount :amount="amountBUSD" formatted decimals="4" /> BUSD
            </h3>
            <h3 class="my-2">
              You will be able to claim
              <amount :amount="amountwLAND" formatted decimals="4" /> wLAND
            </h3>
            <h3 class="my-2">
              You will be able to claim
              <amount :amount="wWISDOM" formatted decimals="4" /> wWISDOM
            </h3>
          </v-col>
        </v-row>
      </modal-wood>
    </v-sheet>
  </div>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import wButton from "@/lib/components/ui/Buttons/wButton";
import Countdown from "@/lib/components/ui/Utils/Countdown";
import ModalWood from "@/lib/components/ui/Modals/Templates/Wood";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import Convert from "@/lib/helpers/Convert";

import LandPrivateSale from "@/lib/eth/LandPrivateSale";
import ERC20 from "@/lib/eth/ERC20";
import axios from "axios";

export default {
  name: "Landing",
  components: {
    wButton,
    Countdown,
    Amount,
    ModalWood,
  },
  data() {
    return {
      startBlock: 9994300,
      checkbox: false,
      openModalBuy: false,
      slides: [
        "/images/project/0.png",
        "/images/project/1.png",
        "/images/project/2.png",
      ],
      currencyConfig: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 2,
        autoDecimalMode: true,
        allowNegative: false,
      },
      currencyConfigBuywLAND: {
        locale: window.navigator.userLanguage || window.navigator.language,
        prefix: "",
        suffix: "",
        decimalLength: 0,
        autoDecimalMode: true,
        allowNegative: false,
      },
      amountwLAND: 0,
      amountBUSD: 0,
      amount: 0,

      wLAND: "0x2C6107c27A15D2C7F397D88D76257Ea42c12f89F",
      addresslandPrivateSale: "0x228a6390419Ec998f79339dd8Bdf33435D700413",
      addressBUSD: "0xe9e7cea3dedca5984780bafc599bd69add087d56",

      // 0xe9e7cea3dedca5984780bafc599bd69add087d56

      nextClaim: 0,
      nextClaimTimer: 0,
      unitsClans: 4,
      unitsWorld: 4,
      panel: [0],
      faq: [
        {
          question: "What is Cliff?",
          answer:
            "Cliff is a phase in which users cannot use their tokens, they are fully locked in a smart contract.",
        },
        {
          question: "What is Vesting?",
          answer:
            "Vesting represents the slow dispersion of tokens. For this sale the total amount of tokens is going to be claimable in even parts for 9 consecutive months.",
        },
        {
          question: "What is wLAND?",
          answer:
            "wLAND is an utility token used to exchange for Worlds, Clans and actual terrains used to place buildings, foundations and Villages. The maximum supply of wLAND is 1.500.000 tokens and it will be sold in three different batches.",
        },
        {
          question: "What is wWinsdom?",
          answer:
            "wWisdom is a utility token for community voting power accountability. It is not a governance token but it can become one in the future. It will be distributed for the team, private buyers, and ring holders.",
        },
        {
          question: "What are the liquidity and listing plans for wLAND?",
          answer:
            "2.5% of total amount sold in game items will be used for liquidity provision. wLAND will be listed at an equivalent value of 1.5 BUSD in wGOLD.",
        },
        {
          question: "What is the hard cap of 1.375M BUSD?",
          answer:
            "No more sales of the game item wLAND will be made passed this value.",
        },
        {
          question: "How are tokens going to be released to investors?",
          answer:
            "Tokens will be periodically claimable from a smart contract.",
        },
        {
          question: "How long will the private sale period last?",
          answer: "Private sale will last 1 month.",
        },
        {
          question: "What happens if game itens/tokens become unsold?",
          answer: "All unsold supply will be burned.",
        },
        {
          question: "What are the vesting terms for private sale?",
          answer: "3 month cliff, 9 months vesting until 100% unlocked.",
        },
        {
          question: "What is the immediate utility of wLAND on TGE?",
          answer:
            "It can be used instantly to buy tickets for worlds and clans via a smart contract. As soon as  game starts it will be used to buy land. ",
        },
      ],
      isWhitelisted: false,
      wLANDAvailableAmountStage: 0,
      wLANDSoldAmount: 0,
      hardCommit: 0,
      priorityEndBlock: 0,
      privateSaleEndBlock: 0,
      hasBoughtInPriotiryLevel: false,
      isInPriorityPeriod: false,
      maxSupply: 0,
      pricewLAND: 0,
      soldPerStage: 500000,
      isApprovedBUSD: false,
      isLoading: true,
      isLoadingApprove: false,
      isLoadingBuy: false,
      claimInfo: {},
      remainingAmount: 0,
      claimedAmount: 0,
      unlockedAmount: 0,
      wLANDAmount: 0,
      wWISDOMBalance: 0,
      isClaimingwLAND: false,
      availableClanTickets: 0,
      availableWorldTickets: 0,
      clanTicketBalance: 0,
      worldTicketBalance: 0,
      privateSaleTimer: 0,
      isBuyingwLAND: false,
      isClaimingwWISDOM: false,
      isClaimingWorldTicket: false,
      isClaimingClanTicket: false,
      isBuyingClanTicket: false,
      isBuyingWorldTicket: false,
      cliffEndBlock: 0,
      location: {},
      isLocationLoaded: false,
      timeStartPrivateSale: 1,
    };
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

    percentageUnitsSold() {
      return parseInt((this.wLANDSoldAmount / this.maxSupply) * 100);
    },

    percentageUnitsSoldStage() {
      return parseInt(
        (1 - this.wLANDAvailableAmountStage / this.soldPerStage) * 100
      );
    },

    wWISDOM() {
      return this.amountwLAND / 10000;
    },

    isBlocked() {
      const blocked = (
        process.env.VUE_APP_BLOCKED_CONTRY_CODES || ""
      ).toUpperCase();
      const code = (this.location.country_code || "").toUpperCase();
      return code && blocked.split(",").includes(code);
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

  mounted() {
    this.initData();
  },

  methods: {
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

    async initData() {
      if (!this.isConnected) {
        return;
      }

      this.timeStartPrivateSale =
        (this.startBlock - this.currentBlockNumber) * 3 * 1000;

      this.location = await this.getLocattion();

      if (this.isBlocked) {
        return;
      }
      this.contractBUSD = new ERC20(this.addressBUSD);

      this.contractLandPrivateSale = new LandPrivateSale(
        this.addresslandPrivateSale
      );
      try {
        this.isApprovedBUSD = await this.contractBUSD.hasAllowance(
          this.account,
          this.addresslandPrivateSale
        );
      } catch (error) {
        console.log(error.toString());
      }

      this.isWhitelisted = await this.contractLandPrivateSale.checkWhitelist(
        this.account
      );

      this.claimInfo = await this.contractLandPrivateSale.getClaimInfo(
        this.account
      );

      this.remainingAmount = Convert.fromWei(
        this.claimInfo.remainingAmount,
        true
      );
      this.claimedAmount = Convert.fromWei(this.claimInfo.claimedAmount, true);
      this.wLANDAmount = Convert.fromWei(this.claimInfo.wLANDAmount, true);
      this.unlockedAmount = this.wLANDAmount / 9;
      if (this.unlockedAmount > this.remainingAmount) {
        this.unlockedAmount = this.remainingAmount;
      }
      this.wWISDOMBalance = Convert.fromWei(this.claimInfo.wWISDOWToClaim);
      this.nextClaim = this.claimInfo.nextBlock - this.currentBlockNumber;
      this.nextClaimTimer = this.nextClaim * 3 * 1000;
      if (this.nextClaimTimer < 0) {
        this.nextClaimTimer = 0;
      }
      this.wLANDSoldAmount = Convert.fromWei(
        await this.contractLandPrivateSale.wLANDSoldAmount(),
        true
      );

      this.cliffEndBlock = await this.contractLandPrivateSale.getCliffEndBlock();
      this.priorityEndBlock = await this.contractLandPrivateSale.getPriorityEndBlock();
      this.privateSaleEndBlock = await this.contractLandPrivateSale.getPrivateSaleEndBlock();
      this.privateSaleTimer =
        (this.privateSaleEndBlock - this.currentBlockNumber) * 3 * 1000;
      if (this.privateSaleTimer < 0) {
        this.privateSaleTimer = 0;
      }

      this.hardCommit = Convert.fromWei(
        await this.contractLandPrivateSale.getHardCommit(this.account),
        true
      );

      this.hasBoughtInPriotiryLevel = await this.contractLandPrivateSale.hasBoughtInPriotiryLevel(
        this.account
      );
      this.isInPriorityPeriod = await this.contractLandPrivateSale.isInPriorityPeriod(
        this.currentBlockNumber
      );
      this.maxSupply = Convert.fromWei(
        await this.contractLandPrivateSale.maxSupply(),
        true
      );
      this.pricewLAND = Convert.fromWei(
        await this.contractLandPrivateSale.pricewLAND(this.wLANDSoldAmount),
        true
      );

      if (this.isInPriorityPeriod) {
        this.amountwLAND = this.hardCommit;
      }
      this.availableClanTickets = await this.contractLandPrivateSale.getAvailableClanTickets();
      this.clanTicketBalance = await this.contractLandPrivateSale.getClanTicketBalance(
        this.account
      );
      this.availableWorldTickets = await this.contractLandPrivateSale.getAvailableWorldTickets();
      this.worldTicketBalance = await this.contractLandPrivateSale.getWorldTicketBalance(
        this.account
      );

      const availableAmounts = await this.contractLandPrivateSale.getAvailableAmounts();
      this.wLANDAvailableAmountStage =
        availableAmounts[0] > 0
          ? availableAmounts[0]
          : availableAmounts[1] > 0
          ? availableAmounts[1]
          : availableAmounts[2];

      this.isLoading = false;
    },

    async approveBUSD() {
      try {
        this.isLoadingApprove = true;

        await this.contractBUSD.approve(
          this.account,
          this.addresslandPrivateSale
        );

        this.isLoadingApprove = false;
        this.isApprovedBUSD = true;
        ToastSnackbar.success("BUSD smart contract approved successfully!");
      } catch (error) {
        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error("An error has occurred while to approve");
      }
    },

    async calcAmountBUSD(amount) {
      this.amountBUSD = Convert.fromWei(
        await this.contractLandPrivateSale.pricewLAND(
          this.wLANDSoldAmount,
          amount
        ),
        true
      );
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
        ToastSnackbar.success("wLAND secured successfully!");
      } catch (error) {
        this.isBuyingwLAND = false;

        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error("An error has occurred while buying wLAND");
      }
    },

    closeModalBuy() {
      this.openModalBuy = false;
      this.amountwLAND = 0;
    },

    openNewTab(obj) {
      window.open(obj);
    },

    async claimwLAND() {
      try {
        this.isClaimingwLAND = true;

        await this.contractLandPrivateSale.claimwLAND(this.account);

        this.isClaimingwLAND = false;
        ToastSnackbar.success("wLAND was claimed successfully!");
      } catch (error) {
        this.isClaimingwLAND = false;

        if (error.message) {
          return this.showError(error.message);
        }

        return ToastSnackbar.error(
          "An error has occurred while claiming wLAND"
        );
      }
    },

    async claimwWISDOW() {
      try {
        this.isClaimingwWISDOM = true;

        const confirmTransaction = await this.contractLandPrivateSale.claimwWISDOW(
          this.account
        );

        this.isClaimingwWISDOM = false;
        ToastSnackbar.success("wWISDOW was claimed successfully!");
      } catch (error) {
        this.isClaimingwWISDOM = false;

        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while claiming wWISDOW"
        );
      }
    },

    showError(message) {
      if (message.indexOf("Internal JSON-RPC error.") >= 0) {
        const obj = JSON.parse(message.replace("Internal JSON-RPC error.", ""));
        return ToastSnackbar.error(obj.message);
      }

      return ToastSnackbar.error(message);
    },

    async claimWorldTicket() {
      try {
        this.isClaimingWorldTicket = true;

        await this.contractLandPrivateSale.claimWorldTicket(this.account);

        this.isClaimingWorldTicket = false;
        ToastSnackbar.success("World Ticket claimed successfully!");
      } catch (error) {
        this.isClaimingWorldTicket = false;

        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while claiming world ticket"
        );
      }
    },

    async claimClanTicket() {
      try {
        this.isClaimingClanTicket = true;

        await this.contractLandPrivateSale.claimClanTicket(this.account);

        this.isClaimingClanTicket = false;
        ToastSnackbar.success("Clan Ticket claimed successfully!");
      } catch (error) {
        this.isClaimingClanTicket = false;

        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while claiming clan ticket"
        );
      }
    },

    async buyClanTicket() {
      try {
        this.isBuyingClanTicket = true;

        await this.contractLandPrivateSale.buyClanTicket(this.account);

        this.isBuyingClanTicket = false;
        ToastSnackbar.success("Clan Ticket secured successfully!");
      } catch (error) {
        this.isBuyingClanTicket = false;

        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while buying clan ticket"
        );
      }
    },

    async buyWorldTicket() {
      try {
        this.isBuyingWorldTicket = true;

        const confirmTransaction = await this.contractLandPrivateSale.buyWorldTicket(
          this.account
        );

        this.isBuyingWorldTicket = false;
        ToastSnackbar.success("World Ticket secured successfully!");
      } catch (error) {
        this.isBuyingWorldTicket = false;

        if (error.message) {
          return this.showError(error.message);
        }
        return ToastSnackbar.error(
          "An error has occurred while buying world ticket"
        );
      }
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
  },
};
</script>

<style scoped>
.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.sub {
  color: white;
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
  height: 30px;
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
.price-disabled {
  opacity: 0.6;
  filter: grayscale(1);
}

.checkbox-modal-input >>> .v-input__control > .v-input__slot fieldset {
  color: #fff !important;
  border-width: 3px !important;
  border-radius: 18px !important;
}

.checkbox-modal-input >>> .v-label {
  transform-origin: top left !important;
  font-weight: bold !important;
  color: #fff !important;
}

.checkbox-modal-input >>> .v-input__append-inner {
  color: #fff !important;
  font-weight: bold !important;
  font-size: 13px;
}

.checkbox-modal-input >>> .v-icon {
  color: #fff !important;
}

.checkbox-modal-input.v-input--is-disabled {
  opacity: 0.2;
}

.checkbox-modal-input >>> input {
  color: #fff;
  font-weight: bold;
}

.checkbox-modal-input >>> .v-messages__message {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}
.bg-fire {
  background-image: url("/images/project/bg-fire.png");
  background-size: cover;
}

.countdown-start-private-sale {
  min-height: 100vh;
  height: 100%;
  background: url("/images/project/bg-castle.png");
  background-size: cover;
  background-position: center;
  padding-top: 20px;
}
</style>
