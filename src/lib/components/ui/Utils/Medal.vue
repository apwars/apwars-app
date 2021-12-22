<template>
  <div>
    <div v-if="type === 'gold'" class="medal">
      <div class="medal__circle medal__circle--gold">
        <span>
          1
        </span>
      </div>
      <div class="medal__ribbon medal__ribbon--left"></div>
      <div class="medal__ribbon medal__ribbon--right"></div>
    </div>
    <div v-if="type === 'silver'" class="medal">
      <div class="medal__circle medal__circle--silver">
        <span>
          2
        </span>
      </div>
      <div class="medal__ribbon medal__ribbon--left"></div>
      <div class="medal__ribbon medal__ribbon--right"></div>
    </div>
    <div v-if="type === 'bronze'" class="medal">
      <div class="medal__circle medal__circle--bronze">
        <span>
          3
        </span>
      </div>
      <div class="medal__ribbon medal__ribbon--left"></div>
      <div class="medal__ribbon medal__ribbon--right"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
};
</script>

<style lang="scss" scoped>
.medal {
  margin: 20px 0 0 20px;
}

$gold-medal: #f9ad0e;
$silver-medal: #d1d7da;
$bronze-medal: #df7e08;
$neutral-medal: #d1d7da;

.medal {
  position: relative;
  margin: 0 auto;
  width: 46px;
}

.medal__circle {
  font-family: "Roboto", sans-serif;
  font-size: 28px;
  font-weight: 500;
  width: 46px;
  height: 46px;
  border-radius: 100%;
  color: white;
  text-align: center;
  line-height: 34px;
  vertical-align: middle;
  position: relative;
  border-width: 0.2em;
  border-style: solid;
  z-index: 1;

  // Default colors
  box-shadow: inset 0 0 0 darken($neutral-medal, 15%),
    2px 2px 0 rgba(0, 0, 0, 0.08);
  border-color: lighten(adjust-hue($neutral-medal, 10), 10%);
  text-shadow: 2px 2px 0 darken($neutral-medal, 20%);
  background: linear-gradient(
    to bottom right,
    $neutral-medal 50%,
    darken($neutral-medal, 5%) 50%
  );

  &.medal__circle--gold {
    box-shadow: inset 0 0 0 darken($gold-medal, 15%),
      2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: lighten(adjust-hue($gold-medal, 10), 10%);
    text-shadow: 0 0 4px darken($gold-medal, 20%);
    background: linear-gradient(
      to bottom right,
      $gold-medal 50%,
      darken($gold-medal, 5%) 50%
    );
  }

  &.medal__circle--silver {
    box-shadow: inset 0 0 0 darken($silver-medal, 15%),
      2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: lighten(adjust-hue($silver-medal, 10), 10%);
    text-shadow: 0px 0px 4px darken($silver-medal, 20%);
    background: linear-gradient(
      to bottom right,
      $silver-medal 50%,
      darken($silver-medal, 5%) 50%
    );
  }

  &.medal__circle--bronze {
    box-shadow: inset 0 0 0 darken($bronze-medal, 15%),
      2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: lighten(adjust-hue($bronze-medal, 10), 10%);
    text-shadow: 0 0 4px darken($bronze-medal, 20%);
    background: linear-gradient(
      to bottom right,
      $bronze-medal 50%,
      darken($bronze-medal, 5%) 50%
    );
  }
}

.medal__ribbon {
  content: "";
  display: block;
  position: absolute;
  border-style: solid;
  border-width: 6px 10px;
  width: 0;
  height: 20px;
  top: 35px;
}

.medal__ribbon--left {
  border-color: #fc402d #fc402d transparent #fc402d;
  left: 2px;
  transform: rotate(20deg) translateZ(-32px);
}

.medal__ribbon--right {
  right: 2px;
  border-color: darken(#fc402d, 10%) darken(#fc402d, 10%) transparent
    darken(#fc402d, 10%);
  transform: rotate(-20deg) translateZ(-48px);
}
</style>
