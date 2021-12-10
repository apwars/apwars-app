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
          />
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col>
          <Title text="Soldier" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex">
          <img
            class="flag-button"
            width="56"
            src="/images/battle/flag-the-corporation-human.png"
            @click="() => changeUnit(1)"
          />
          <img
            class="flag-button ml-3"
            width="56"
            src="/images/battle/flag-the-degenerate-orc.png"
            @click="() => changeUnit(2)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="12" md="7">
          <v-row>
            <v-col class="d-flex flex-column flex-md-row">
              <div class="unit-image">
                <v-img :src="unit.portrait" contain />
              </div>
              <div class="unit-data">
                <v-text-field placeholder="Edit name">
                  <v-icon slot="append" color="white">
                    mdi-pencil-outline
                  </v-icon>
                </v-text-field>
                <div class="class-info">Class: {{ unit.className }}</div>
                <div class="xp-container mt-2">
                  <div class="xp-label d-flex justify-space-between">
                    <div class="level">Level {{ unit.level }}</div>
                    <div class="value">
                      {{ format(unit.XP) }}/{{ format(unit.maxXP) }}
                    </div>
                  </div>
                  <Progress
                    :maxScale="unit.maxXP"
                    :value="unit.XP"
                    color1="#00FFFF"
                    color2="#59BBFC"
                    noText
                  />
                </div>
                <div class="items-container d-flex justify-space-between mt-2">
                  <Slot><img src="/images/icons/items/boots.png" /></Slot>
                  <Slot><img src="/images/icons/items/platemail.png" /></Slot>
                  <Slot><img src="/images/icons/items/swords.png" /></Slot>
                  <Slot><img src="/images/icons/items/shield.png" /></Slot>
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
                    <img height="12" src="/images/icons/axe.png" />
                  </div>
                  <ForceMeter
                    type="flat"
                    :ticks="3"
                    :maxScale="3"
                    :value="unit.attack.force"
                  />
                  <div class="force-icon">
                    <div class="plus" v-if="unit.attack.force !== 3"></div>
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
                    :value="unit.attack.speed"
                  />
                  <div class="force-icon">
                    <div class="plus"></div>
                  </div>
                </div>
                <div class="d-flex mt-1">
                  <div class="force-icon">
                    <img height="14" src="/images/icons/fist.png" />
                  </div>
                  <ForceMeter
                    type="flat"
                    :ticks="3"
                    :maxScale="3"
                    :value="unit.attack.accuracy"
                  />
                  <div class="force-icon">
                    <div class="plus"></div>
                  </div>
                </div>
                <div class="d-flex mt-1">
                  <div class="force-icon">
                    <img height="12" src="/images/icons/fear.png" />
                  </div>
                  <ForceMeter
                    type="flat"
                    :ticks="3"
                    :maxScale="3"
                    :value="unit.attack.fear"
                  />
                  <div class="force-icon">
                    <div class="plus"></div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="icon-container mb-2">
                <v-img src="/images/icons/patent.png" />
              </div>
              <Button text="Unlock" type="wsecondary" isBlock />
            </v-col>
            <v-col cols="4">
              <div class="icon-container mb-2">
                <v-img src="/images/icons/anvil.png" />
              </div>
              <Button text="Unlock" type="wsecondary" isBlock />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <div class="d-flex">
            <div class="stat-container text-medium">Strenght</div>
            <ForceMeter type="flat" :maxScale="5" :value="1" />
            <div class="text-medium ml-2">{{ unit.strenght }}/{{ unit.maxStrenght }}</div>
          </div>
          <div class="d-flex">
            <div class="stat-container text-medium">Speed</div>
            <ForceMeter type="flat" :maxScale="5" :value="1" />
            <div class="text-medium ml-2">{{ unit.speed }}/{{ unit.maxSpeed }}</div>
          </div>
          <div class="d-flex">
            <div class="stat-container text-medium">HP</div>
            <ForceMeter type="flat" :maxScale="50" :value="20" />
            <div class="text-medium ml-2">{{ unit.HP }}/{{ unit.maxHP }}</div>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex"
          ><div class="mr-2">
            <div class="status-description">
              <div class="label text-large">Courage</div>
              <Button class="mt-1" size="small" type="wsecondary" isBlock
                ><v-icon class="btn-icon" small>mdi-autorenew</v-icon>
                Recharge</Button
              >
            </div>
          </div>
          <div>
            <ForceMeter :maxScale="unit.maxCourage" :value="unit.courage" color="wgreen" />
            <div class="d-flex justify-end">{{ unit.courage }}/{{ unit.maxCourage }}</div>
          </div></v-col
        >
        <v-col cols="12" md="4" class="d-flex"
          ><div class="mr-2">
            <div class="status-description">
              <div class="label text-large">Energy</div>
              <Button class="mt-1" size="small" type="wsecondary" isBlock
                ><v-icon class="btn-icon" small>mdi-autorenew</v-icon>
                Recharge</Button
              >
            </div>
          </div>
          <div>
            <ForceMeter :maxScale="unit.maxEnergy" :value="unit.energy" color="wyellow" />
            <div class="d-flex justify-end">{{ unit.energy }}/{{ unit.maxEnergy }}</div>
          </div>
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
        <v-col><div class="stat-value text-medium">Record Points</div> </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import Button from "@/lib/components/ui/Buttons/Button";
import ForceMeter from "@/lib/components/ui/ForceMeter";
import Progress from "@/lib/components/ui/Progress";
import Title from "@/lib/components/ui/Title";
import PowerBar from "@/lib/components/ui/PowerBar";
import Slot from "@/lib/components/ui/Slot";
import IconBase from "@/lib/components/ui/IconBase";

export default {
  components: {
    Button,
    ForceMeter,
    Progress,
    Title,
    PowerBar,
    Slot,
    IconBase
  },
  data() {
    return {
      unit: {
        portrait: "/images/troops/wwarrior-toon.png",
        name: "",
        className: "Warrior",
        level: 3,
        XP: 3778,
        maxXP: 10000,
        strenght: 1,
        maxStrenght: 5,
        speed: 1,
        maxSpeed: 5,
        HP: 18.7,
        maxHP: 50,
        courage: 60,
        maxCourage: 100,
        energy: 10,
        maxEnergy: 100,
        attack: {
          force: 2,
          speed: 1,
          accuracy: 1,
          fear: 0,
        },
        experience: null,
        armory: null,
      },
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
    changeUnit(id) {
      if (id === 1) {
        this.unit = {
          id: 1,
          portrait: "/images/troops/wwarrior-toon.png",
          name: "",
          className: "Warrior",
          level: 3,
          XP: 3778,
          maxXP: 10000,
          strenght: 1,
          maxStrenght: 5,
          speed: 1,
          maxSpeed: 5,
          HP: 18.7,
          maxHP: 50,
          courage: 60,
          maxCourage: 100,
          energy: 10,
          maxEnergy: 100,
          attack: {
            force: 2,
            speed: 1,
            accuracy: 1,
            fear: 0,
          },
          experience: null,
          armory: null,
        };
      } else {
        this.unit = {
          id: 2,
          portrait: "/images/troops/wgrunt-toon.png",
          name: "",
          className: "Warrior",
          level: 5,
          XP: 8659,
          maxXP: 25000,
          strenght: 2,
          maxStrenght: 5,
          speed: 3,
          maxSpeed: 5,
          HP: 48,
          maxHP: 50,
          courage: 90,
          maxCourage: 100,
          energy: 72,
          maxEnergy: 100,
          attack: {
            force: 3,
            speed: 1,
            accuracy: 2,
            fear: 2,
          },
          experience: null,
          armory: null,
        };
        
      }
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
  --b:4px; /* the thickness */
  width:12px; /* the size */
  aspect-ratio:1/1;
  border:transparent; /* the outer space */
  background:
    conic-gradient(from 90deg at var(--b) var(--b),#000 90deg,#fff 0) 
    calc(100% + var(--b)/2) calc(100% + var(--b)/2)/
    calc(50%  + var(--b))   calc(50%  + var(--b));
  display:inline-block;
  &:hover {
    cursor: pointer;
    background:
    conic-gradient(from 90deg at var(--b) var(--b),#000 90deg,yellow 0) 
    calc(100% + var(--b)/2) calc(100% + var(--b)/2)/
    calc(50%  + var(--b))   calc(50%  + var(--b));
  }
}
</style>
