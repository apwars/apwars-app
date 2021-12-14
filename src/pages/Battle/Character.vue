<template>
  <div class="background">
    <v-container>
      <v-row dense no-gutters>
        <v-col>
          <Button
            type="wtertiary"
            icon="arrow-back"
            text="Go back to Home"
            noPadding
            :handleClick="goBackHome"
            class="mb-1"
          />
          <Title text="Soldier" />
        </v-col>
        <div class="flag-container">
          <img
            class="flag-button"
            width="64"
            src="/images/battle/flag-the-corporation-human.png"
            @click="() => changeUnit(typeHuman)"
          />
          <img
            class="flag-button ml-3"
            width="64"
            src="/images/battle/flag-the-degenerate-orc.png"
            @click="() => changeUnit(typeOrc)"
          />
        </div>
      </v-row>
      <v-row v-if="isLoadingNFT">
        <v-col class="d-flex justify-space-between">
          <v-skeleton-loader width="20%" type="image" />
          <v-skeleton-loader width="30%" type="paragraph, paragraph, text" />
          <v-skeleton-loader type="image, button" />
          <v-skeleton-loader type="image, button" />
          <v-skeleton-loader type="image, button" />
        </v-col>
      </v-row>
      <template v-else>
        <v-row>
          <v-col sm="12" md="7">
            <v-row>
              <v-col class="d-flex flex-column flex-md-row">
                <div class="unit-image">
                  <div class="unlock-button" v-if="!isUnlocked">
                    <Button
                      type="wprimary"
                      size="small"
                      text="Click to unlock"
                      :handleClick="() => openUnitUnlock()"
                    />
                    <div
                      class="recharge-price  mt-1 d-flex justify-center align-center"
                    >
                      2500
                      <img height="12" src="/images/wgold.png" alt="wGOLD" />
                    </div>
                  </div>
                  <v-img
                    :class="isUnlocked ? '' : 'locked'"
                    :src="portrait"
                    contain
                  />
                </div>
                <div class="unit-data">
                  <v-text-field
                    placeholder="Edit name"
                    :value="unit.name"
                    @input="handleNameChange"
                    :loading="isLoadingName"
                    :disable="!isUnlocked || isLoadingName"
                  >
                    <v-icon slot="append" color="white">
                      mdi-pencil-outline
                    </v-icon>
                  </v-text-field>
                  <div class="class-info">Class: Warrior</div>
                  <div class="xp-container mt-2">
                    <div class="xp-label d-flex justify-space-between">
                      <div class="level">Level {{ unit.level }}</div>
                      <div class="value">
                        {{ format(unit.points) }}/{{ format(maxXP) }}
                      </div>
                    </div>
                    <Progress
                      :maxScale="maxXP"
                      :value="unit.XP"
                      color1="#00FFFF"
                      color2="#59BBFC"
                      noText
                    />
                  </div>
                  <div
                    class="items-container d-flex justify-space-between mt-2"
                  >
                    <ItemSlot
                      ><img src="/images/icons/items/boots.png"
                    /></ItemSlot>
                    <ItemSlot
                      ><img src="/images/icons/items/helmet.png"
                    /></ItemSlot>
                    <ItemSlot
                      ><img src="/images/icons/items/swords.png"
                    /></ItemSlot>
                    <ItemSlot
                      ><img src="/images/icons/items/shield.png"
                    /></ItemSlot>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="5">
            <v-row>
              <v-col cols="4">
                <div class="icon-container mb-2">
                  <v-img src="/images/icons/sword.png" />
                </div>
                <div class="force-group">
                  <div class="d-flex mt-1">
                    <div class="force-icon">
                      <img height="14" src="/images/icons/axe.png" />
                    </div>
                    <ForceMeter
                      type="flat"
                      :ticks="3"
                      :maxScale="3"
                      :value="unit.skills.axe"
                    />
                    <div class="force-icon">
                      <div
                        class="plus"
                        v-if="unit.levelPoints && unit.skills.axe !== 3"
                        @click="() => openUpgradePointsModal('axe')"
                      ></div>
                    </div>
                  </div>
                  <div class="d-flex mt-1">
                    <div class="force-icon">
                      <img height="14" src="/images/icons/lightning.png" />
                    </div>
                    <ForceMeter
                      type="flat"
                      :ticks="3"
                      :maxScale="3"
                      :value="unit.skills.willPower"
                    />
                    <div class="force-icon">
                      <div
                        class="plus"
                        v-if="unit.levelPoints && unit.skills.willPower !== 3"
                        @click="() => openUpgradePointsModal('willPower')"
                      ></div>
                    </div>
                  </div>
                  <div class="d-flex mt-1">
                    <div class="force-icon">
                      <img height="10" src="/images/icons/fist.png" />
                    </div>
                    <ForceMeter
                      type="flat"
                      :ticks="3"
                      :maxScale="3"
                      :value="unit.skills.combos"
                    />
                    <div class="force-icon">
                      <div
                        class="plus"
                        v-if="unit.levelPoints && unit.skills.combos !== 3"
                        @click="() => openUpgradePointsModal('combos')"
                      ></div>
                    </div>
                  </div>
                  <div class="d-flex mt-1">
                    <div class="force-icon">
                      <img height="10" src="/images/icons/fear.png" />
                    </div>
                    <ForceMeter
                      type="flat"
                      :ticks="3"
                      :maxScale="3"
                      :value="unit.skills.battleScars"
                    />
                    <div class="force-icon">
                      <div
                        class="plus"
                        v-if="unit.levelPoints && unit.skills.battleScars !== 3"
                        @click="() => openUpgradePointsModal('battleScars')"
                      ></div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="icon-container mb-2">
                  <v-img src="/images/icons/patent.png" />
                </div>
                <Button disabled text="Locked" type="wsecondary" isBlock />
              </v-col>
              <v-col cols="4">
                <div class="icon-container mb-2">
                  <v-img src="/images/icons/anvil.png" />
                </div>
                <Button
                  disabled
                  isBlock
                  text="Locked"
                  type="wsecondary"
                  :handleClick="() => unlockProperty('armory')"
                />
              </v-col>
            </v-row>
            <v-row dense no-gutters>
              <v-col>
                <div class="recharge-text mt-1">
                  You have {{ unit.levelPoints }} level points available to
                  distribute.
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <div class="d-flex">
              <div class="stat-container text-medium">Strength</div>
              <ForceMeter
                type="flat"
                :maxScale="maxStrength"
                :value="unit.stats.strength"
              />
              <div class="text-medium ml-2">
                {{ unit.stats.strength }}/{{ maxStrength }}
              </div>
            </div>
            <div class="d-flex">
              <div class="stat-container text-medium">Speed</div>
              <ForceMeter
                type="flat"
                :maxScale="maxSpeed"
                :value="unit.stats.speed"
              />
              <div class="text-medium ml-2">
                {{ unit.stats.speed }}/{{ maxSpeed }}
              </div>
            </div>
            <div class="d-flex">
              <div class="stat-container text-medium">HP</div>
              <ForceMeter
                type="flat"
                :maxScale="maxHP"
                :value="unit.stats.hp"
              />
              <div class="text-medium ml-2">
                {{ unit.stats.hp }}/{{ maxHP }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4"
            ><v-row
              ><v-col class="d-flex"
                ><div class="mr-2">
                  <div class="status-description">
                    <div class="label text-large">Courage</div>
                  </div>
                </div>
                <div>
                  <ForceMeter
                    size="large"
                    :maxScale="maxCourage"
                    :value="unit.courage"
                    fillColor="#148F00"
                  />
                  <div class="d-flex justify-end">
                    {{ unit.courage }}/{{ maxCourage }}
                  </div>
                </div></v-col
              ></v-row
            >
            <v-row dense no-gutters v-if="!(unit.courage === maxCourage)">
              <v-col>
                <div class="d-flex align-items-center">
                  <Button
                    size="small"
                    type="wsecondary"
                    :disabled="!isUnlocked"
                    :handleClick="() => {isCourageModalOpen = true}"
                    ><v-icon class="btn-icon" small>mdi-autorenew</v-icon>
                    Recharge</Button
                  >
                  <div class="recharge-price d-flex align-center ml-1">
                    1000
                    <img
                      height="12px"
                      src="/images/wcourage.png"
                      alt="wCOURAGE"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row
              ><v-col class="d-flex">
                <div class="mr-2">
                  <div class="status-description">
                    <div class="label text-large">Energy</div>
                  </div>
                </div>
                <div>
                  <ForceMeter
                    :ticks="3"
                    size="large"
                    :maxScale="maxEnergy"
                    :value="unit.energy"
                    fillColor="#FFB800"
                  />
                  <div class="d-flex justify-end">
                    {{ unit.energy }}/{{ maxEnergy }}
                  </div>
                </div>
              </v-col></v-row
            >
            <v-row
              dense
              no-gutters
              v-if="
                !(unit.energy === maxEnergy)
              "
            >
              <v-col>
                <div class="d-flex align-items-center">
                  <Button
                    size="small"
                    type="wsecondary"
                    :disabled="!isUnlocked || (!hasPaidEnergyRecharge && !hasFreeEnergyRecharge)"
                    :handleClick="() => openRechargeEnergyModal()"
                    ><v-icon class="btn-icon" small>mdi-autorenew</v-icon>
                    Recharge</Button
                  >
                  <div class="recharge-price d-flex align-center ml-1">
                    <span v-if="hasFreeEnergyRecharge">0</span
                    ><span v-else>250</span>
                    <img height="12px" src="/images/wgold.png" alt="wGOLD" />
                  </div>
                </div>
                <div class="recharge-text mt-1" v-if="!hasFreeEnergyRecharge">
                  You spent free recharge in the last 8 hours and can use it
                  again in <countdown :time="nextFreeRecharge"><template slot-scope="props">{{ props.hours }} hours, {{ props.minutes }} minutes and {{ props.seconds }} seconds.</template></countdown>
                </div>
                <div class="recharge-text mt-1" v-if="!hasPaidEnergyRecharge">
                  You spent paid recharge in the last 24 hours and can use it
                  again in <countdown :time="nextPaidRecharge"><template slot-scope="props">{{ props.hours }} hours, {{ props.minutes }} minutes and {{ props.seconds }} seconds.</template></countdown>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="divider"></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <div class="stat-value text-large">Statistics</div>
          </v-col>
          <v-col>
            <div class="stat-value text-medium">Plays</div>
          </v-col>
          <v-col><div class="stat-value text-medium">Record Time</div> </v-col>
          <v-col><div class="stat-value text-medium">Record Score</div> </v-col>
          <v-col
            ><div class="stat-value text-medium">Record Points</div>
          </v-col>
        </v-row>
        <wood
          :open="isUnlockModalOpen"
          @close="isUnlockModalOpen = false"
          @confirm="() => unlockUnit()"
          title="Unlock Soldier"
        >
          <div class="modal-message d-flex justify-space-between">
            <img :src="portrait" />
            <div class="modal-text text-medium">
              You are unlocking your Soldier to fight the enemies
            </div>
          </div>
          <div class="text-medium text-center mt-2">The cost of this action is 2500 wGOLD <img height="14" src="/images/wGOLD.png" /></div>
        </wood>
        <TemplateModalPapyrus :open="isRechargeModalOpen" @close="isRechargeModalOpen = false" @confirm="rechargeEnergy">
          <div class="text-medium text-center">{{ rechargeMessage }}</div>
        </TemplateModalPapyrus>
        <TemplateModalPapyrus :open="isCourageModalOpen" @close="isCourageModalOpen = false" @confirm="rechargeCourage">
          <div class="text-medium text-center">{{ courageRechargeMessage }}</div>
        </TemplateModalPapyrus>
        <TemplateModalPapyrus :open="isPointsModalOpen" @close="isPointsModalOpen = false" @confirm="upgradePoint">
          <div class="text-medium text-center">{{ pointsMessage }}</div>
        </TemplateModalPapyrus>
      </template>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { NFT, NFT_PORTRAIT } from "@/data/NFTs";

import ToastSnackbar from "@/plugins/ToastSnackbar";

import Button from "@/lib/components/ui/Buttons/Button";
import ForceMeter from "@/lib/components/ui/ForceMeter";
import Progress from "@/lib/components/ui/Progress";
import Title from "@/lib/components/ui/Title";
import PowerBar from "@/lib/components/ui/PowerBar";
import ItemSlot from "@/lib/components/ui/ItemSlot";
import IconBase from "@/lib/components/ui/IconBase";
import Wood from "@/lib/components/ui/Modals/Templates/Wood";
import TemplateModalPapyrus from "@/lib/components/ui/Modals/Templates/TemplateModalPapyrus";
import Controller from "@/controller/SoldierController";

export default {
  components: {
    Button,
    ForceMeter,
    Progress,
    Title,
    PowerBar,
    ItemSlot,
    IconBase,
    Wood,
    TemplateModalPapyrus,
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
    portrait() {
      return NFT_PORTRAIT[this.type];
    },
    isUnlocked() {
      return this.unit.owner;
    },
    typeHuman() {
      return NFT.HUMAN;
    },
    typeOrc() {
      return NFT.ORC;
    },
    hasFreeEnergyRecharge() {
      return !this.unit.recharges.wENERGY.freeLastDate || this.nextFreeRecharge < 0;
    },
    hasPaidEnergyRecharge() {
      return !this.unit.recharges.wENERGY.lastDate || this.nextPaidRecharge < 0;
    },
    nextFreeRecharge() {
      let next = new Date(this.unit.recharges.wENERGY.freeLastDate);
      next.setTime(next.getTime() + (8 * 60 * 60 * 1000));
      return next.getTime() - new Date().getTime();
    },
    nextPaidRecharge() {
      let next = new Date(this.unit.recharges.wENERGY.lastDate);
      next.setTime(next.getTime() + (1 * 24 * 60 * 60 * 1000));
      return next.getTime() - new Date().getTime();
    }
  },
  data() {
    return {
      isUnlockModalOpen: false,
      type: NFT.HUMAN,
      isLoadingNFT: false,
      timeout: null,
      isLoadingName: false,
      isCourageModalOpen: false,
      isRechargeModalOpen: false,
      isPointsModalOpen: false,
      unit: {
        name: "",
        level: 0,
        levelPoints: 0,
        attack: null,
        experience: null,
        armory: null,
        energy: 0,
        courage: 0,
        points: 0,
        stats: {
          hp: 0,
          speed: 0,
          strength: 0,
        },
        skills: {
          axe: 0,
          willPower: 0,
          combos: 0,
          battleScars: 0,
        },
        recharges: {
          wCOURAGE: {
            count: 0,
            lastDate: null,
          },
          wENERGY: {
            count: 0,
            lastDate: null,
            freeLastDate: null,
          },
        },
      },
      nameCache: null,
      maxXP: 10000,
      maxStrength: 5,
      maxSpeed: 5,
      maxHP: 50,
      maxCourage: 100,
      maxEnergy: 3,
      rechargeMessage: null,
      rechargeAction: null,
      pointsAction: null,
      pointsMessage: null,
      basePointsMessage: 'You are upgrading skill at the cost of {{QTY}} level points.',
      courageRechargeMessage: 'You are recharging courage at the cost of 1000 wCOURAGE.',
      freeRechargeMessage: 'You are spending the free energy recharge, the next one will be available after 8 hours.',
      paidRechargeMessage: 'You are recharging energy for 250 wGOLD, the next paid recharge will be available after 24 hours.'
    };
  },
  methods: {
    ...mapMutations({
      setHeader: "app/setMenuDisplay",
    }),
    goBackHome() {
      this.$router.push("/");
    },
    format(value) {
      return new Intl.NumberFormat("en-US").format(value);
    },
    openUnitUnlock() {
      this.isUnlockModalOpen = true;
    },
    async unlockUnit() {
      this.unlockNFT();
      this.isUnlockModalOpen = false;
    },
    async loadWallet() {
      const c = new Controller(this.addresses.apiArcadia);
      await c.wallets(this.account);
    },
    async loadNFT(type) {
      this.isLoadingNFT = true;
      const c = new Controller(this.addresses.apiArcadia);
      try {
        const response = await c.getNFTByType(this.account, type);
        this.unit = { ...response.data, owner: response.owner };
        this.nameCache = this.unit.name;
      } catch (error) {
        if (error.status === 404) {
          console.log(`${type} NFT not found for this account`);
          this.resetUnit();
        }
      } finally {
        this.isLoadingNFT = false;
      }
    },
    async unlockNFT() {
      const c = new Controller(this.addresses.apiArcadia);
      try {
        const response = await c.unlockNFT(this.account, this.type);
        this.unit = { ...response.data, owner: response.owner };
        this.nameCache = this.unit.name;
      } catch (error) {
        if (error.code === 4001) {
          return ToastSnackbar.error('Signature cancelled by user');
        }
        ToastSnackbar.error('Something went wrong while trying to unlock NFT');
      }
    },
    async rechargeToken(token) {
      const c = new Controller(this.addresses.apiArcadia);
      try {
        const response = await c.rechargeToken(this.account, this.type, token);
        this.unit = { ...response.data, owner: response.owner };
      } catch (error) {
        ToastSnackbar.error(`Something went wrong while trying to recharge energy: ${error.code}`)
      }
    },
    async upgradeSkill(skill) {
      const c = new Controller(this.addresses.apiArcadia);
      try {
        const s = {
          [skill]: 1,
        };
        const response = await c.upgradeSkill(this.account, this.type, s);
        this.unit = { ...response.data, owner: response.owner };
      } catch (error) {
        console.error(error);
      }
    },
    changeUnit(type) {
      if (type !== this.type) {
        this.type = type;
        this.loadNFT(type);
      }
    },
    resetUnit() {
      this.unit = Object.assign({}, {
        name: "",
        level: 0,
        levelPoints: 0,
        attack: null,
        experience: null,
        armory: null,
        energy: 0,
        courage: 0,
        points: 0,
        stats: {
          hp: 0,
          speed: 0,
          strength: 0,
        },
        skills: {
          axe: 0,
          willPower: 0,
          combos: 0,
          battleScars: 0,
        },
        recharges: {
          wCOURAGE: {
            count: 0,
            lastDate: null,
          },
          wENERGY: {
            count: 0,
            lastDate: null,
            freeLastDate: null,
          },
        }});
    },
    async changeName(value) {
      this.isLoadingName = true;
      const c = new Controller(this.addresses.apiArcadia);
      try {
        await c.changeName(this.account, this.type, value);
      } catch (error) {
        this.unit.name = this.nameCache;
        console.error(error);
      } finally {
        this.isLoadingName = false;
      }
    },
    handleNameChange(value) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.changeName(value);
      }, 800);
    },
    openRechargeEnergyModal() {
      if (this.hasFreeEnergyRecharge) {
        this.rechargeMessage = this.freeRechargeMessage;
        this.rechargeAction = 'wFREE-ENERGY';
      } else {
        this.rechargeMessage = this.paidRechargeMessage;
        this.rechargeAction = 'wENERGY';
      }
      this.isRechargeModalOpen = true;
    },
    rechargeEnergy() {
      this.rechargeToken(this.rechargeAction);
      this.isRechargeModalOpen = false;
    },
    rechargeCourage() {
      this.rechargeToken('wCOURAGE');
      this.isCourageModalOpen = false;
    },
    openUpgradePointsModal(skill) {
      this.pointsAction = skill;
      const currentPoints = this.unit.skills[skill];
      this.pointsMessage = this.basePointsMessage.replace('{{QTY}}', currentPoints + 2);
      this.isPointsModalOpen = true;
    },
    upgradePoint() {
      this.upgradeSkill(this.pointsAction);
      this.isPointsModalOpen = false;
    }
  },
  watch: {
    isConnected() {
      this.loadWallet();
      this.loadNFT(this.type);
    },

    account() {
      this.loadWallet();
      this.loadNFT(this.type);
    },
  },
  async mounted() {
    this.setHeader(false);
  },
  beforeRouteLeave(to, from, next) {
    this.setHeader(true);
    next();
  },
};
</script>
<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background-image: url("/images/background/enlistment.png");
  background-size: cover;
}
.text-medium {
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
}
.text-big {
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
}
.text-large {
  font-weight: bold;
  font-size: 28px;
  line-height: 37px;
}
.unit-image {
  position: relative;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    margin-right: 24px;
    max-width: 240px;
  }
}
.unit-data {
  width: 100%;
}
.class-info {
  @extend .text-big;
}
.xp-label {
  @extend .text-medium;
  margin-bottom: 4px;
}
.icon-container {
  width: 100%;
  border-radius: 50%;
  outline: 2px solid #ffeebc;
}
.divider {
  width: 100%;
  outline: 2px solid #ffeebc;
  border-radius: 50%;
}
.stat-value {
  height: 38px;
  display: flex;
  align-items: center;
}
.btn-icon {
  color: inherit;
  margin-right: 2px;
}
.stat-container {
  width: 88px;
}
.force-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  padding-bottom: 6px;
  color: white;
}
.flag-button {
  &:hover {
    cursor: pointer;
    transition: all ease 1s;
    transform: scale(1.1);
  }
}
.plus {
  --b: 4px; /* the thickness */
  width: 12px; /* the size */
  aspect-ratio: 1/1;
  border: transparent; /* the outer space */
  background: conic-gradient(
      from 90deg at var(--b) var(--b),
      #000 90deg,
      #fff 0
    )
    calc(100% + var(--b) / 2) calc(100% + var(--b) / 2) / calc(50% + var(--b))
    calc(50% + var(--b));
  display: inline-block;
  &:hover {
    cursor: pointer;
    background: conic-gradient(
        from 90deg at var(--b) var(--b),
        #000 90deg,
        yellow 0
      )
      calc(100% + var(--b) / 2) calc(100% + var(--b) / 2) / calc(50% + var(--b))
      calc(50% + var(--b));
  }
}
.locked {
  filter: grayscale(100%);
}
.unlock-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}
.modal-text {
  max-width: 260px;
}
.recharge-price {
  font-weight: bold;
  font-size: 10px;
  line-height: 1.2;
  > img {
    margin-left: 2px;
  }
}
.recharge-text {
  font-weight: bold;
  font-size: 10px;
  line-height: 1.2;
}
</style>
