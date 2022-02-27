<template>
  <div class="news-container">
    <div class="title-container">
      <img src="/images/icons/journal.png" height="42" />
      <div class="ml-1">Board News</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.news-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #110c09;
  border: 2px solid #ffeebc;
  background-image: url("/images/texture/dark-wood.png");
  background-repeat: repeat;
}
.title-container {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 21px;
  line-height: 1.4;
  color: #ffeebc;
  width: 100%;
  justify-content: flex-start;
}
</style>
