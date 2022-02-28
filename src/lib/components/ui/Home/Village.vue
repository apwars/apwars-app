<template>
<div class="lands">
  <div class="village-container">
    <img :class="[village.data ? '' : 'gray']" :src="image" height="52" />
    <div class="village-data ml-1">
      <div class="village-name pb-1">{{ village.name || "No Foundation" }}</div>
      <div class="localization mt-1">
        <img src="/images/icons/location.png" height="14" />
        <div class="coordinates">({{ village.x }}, {{ village.y }})</div>
        <div class="world ml-1">World {{ village.worldId }}</div>
      </div>
      
    </div>
    
  </div>
  <div class="resources mt-1" v-if="village.foundationType === 62">
        <div class="resource-info">
          <div class="resource-amount">
            <img src="/images/icons/stone.png" height="12" width="12" />
            <Progress
              :maxScale="village.buildings.warehouse.capacity"
              :value="village.wallet.balances['World1Stone']"
              noText
            />
          </div>
        </div>
        <div class="resource-info ml-1">
          <div class="resource-amount">
            <img src="/images/icons/wood.png" height="12" width="12" />
            <Progress
              :maxScale="village.buildings.warehouse.capacity"
              :value="village.wallet.balances['World1Wood']"
              noText
            />
          </div>
        </div>
        <div class="resource-info ml-1">
          <div class="resource-amount">
            <img src="/images/icons/clay.png" height="12" width="12" />
            <Progress
              :maxScale="village.buildings.warehouse.capacity"
              :value="village.wallet.balances['World1Clay']"
              noText
            />
          </div>
        </div>
        <div class="resource-info ml-1">
          <div class="resource-amount">
            <img src="/images/icons/water.png" height="12" width="12" />
            <Progress
              :maxScale="village.buildings.warehouse.capacity"
              :value="village.wallet.balances['World1Water']"
              noText
            />
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { FOUNDATIONS_DATA } from "@/data/Foundations";

import Progress from "@/lib/components/ui/Progress";

export default {
  components: { Progress },
  props: {
    village: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    image() {
      if (!this.village.data) {
        return "/images/foundations/62.png";
      }
      const data = FOUNDATIONS_DATA.find(
        (f) => f.foundationType === this.village.foundationType
      );
      return data.image;
    },
  },
};
</script>
<style lang="scss" scoped>
.village-container {
  display: flex;
  width: 100%;
  justify-content: center;
}
.village-data {
  width: 212px;
}
.gray {
  filter: grayscale(1);
}
.village-name {
  font-weight: bold;
  font-size: 12px;
  line-height: 1.2;
  color: #ffeebc;
  border-bottom: 1px solid #ffeebc;
  width: 100%;
}
.localization {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.2;
  color: #ffffff;
}

.resources {
  display: flex;
  justify-content: center;
}
.resource-info {
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  > img {
    margin-right: 2px;
  }
}
.resource-amount {
  position: relative;
  height: 8px;
  width: 66px;
  > img {
    position: absolute;
    left: -6px;
    top: -2px;
    z-index: 2;
  }
}
</style>
