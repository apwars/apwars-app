<template>
  <div class="tmj-dashboard">
    <div class="d-flex justify-center">
      <img src="/images/tmj.png" height="64" alt="the monstrous journey" />
    </div>
    <div class="tmj-container mt-2">
      <div class="soldier-container">
        <img
          class="soldier-img"
          src="/images/troops/wwarrior-nft.png"
          width="89"
        />
        <div class="soldier-price">10.000</div>
        <div class="d-flex justify-center align-center">
          <img src="/images/wgold.png" height="14" width="14" />
          <span class="price-token">wGOLD</span>
        </div>
      </div>
      <div class="unlock-info">
        <div class="tmj-title">
          Unlock Soldier
        </div>
        <div class="mt-1">It's the first step toward the rewards.</div>
        <div class="d-flex justify-center">
          <Button class="mt-2" type="wsecondary" text="Play TMJ" :handleClick="() => $router.push('/the-monstrous-journey')" />
        </div>
      </div>
      <div class="soldier-container">
        <img
          class="soldier-img"
          src="/images/troops/wgrunt-nft.png"
          width="89"
        />
        <div class="soldier-price">10.000</div>
        <div class="d-flex justify-center align-center">
          <img src="/images/wgold.png" height="14" width="14" />
          <span class="price-token">wGOLD</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/lib/components/ui/Buttons/Button";

export default {
  components: { Button },
};
</script>
<style lang="scss" scoped>
.tmj-container {
  display: flex;
}
.unlock-info {
  text-align: center;
  font-size: 14px;
  line-height: 1;
}
.tmj-title {
  font-weight: bold;
  font-size: 14px;
  line-height: 1.3;
  color: #ffeebc;
}
.soldier-img {
  filter: grayscale(1);
}
.soldier-price {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
  text-align: center;
}
.price-token {
  margin-left: 2px;
  font-size: 10px;
  line-height: 1.3;
}
</style>
