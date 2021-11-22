<template>
  <div class="icon-info">
    <img width="48" :src="iconPath" v-if="iconPath" />
    <div class="info-container">
      <div class="info-title">{{ title }}</div>
      <div class="info-data"><slot /></div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        iconPath: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.icon-info {
    display: flex;
    align-items: center;
}
.info-title {
  color: #c4c4c4;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
}
</style>
