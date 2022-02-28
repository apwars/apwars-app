<template>
  <div class="new-container" @click="open">
    <div class="news-image">
      <v-img height="80" width="80" :src="news.imageUrl" :alt="news.title" />
    </div>
    <div class="news-data ml-1">
      <div class="news-title">{{ news.title }}</div>
      <div class="content">
        {{ news.text }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    news: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    open() {
      window.open(this.news.link, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.new-container {
  &:hover {
    cursor: pointer;
  }
}
.news-image {
  height: 80px;
  min-width: 80px;
  background-color: rgb(73, 73, 73);
  border-radius: 5px;
  > img {
      border-radius: 5px;
      object-fit: cover;
  }
}
.new-container {
  display: flex;
  height: 82px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
}
.news-title {
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content {
  font-size: 10px;
  line-height: 1.3;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
