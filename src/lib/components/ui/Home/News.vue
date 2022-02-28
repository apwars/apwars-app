<template>
  <div class="news-container">
    <div class="title-container">
      <img src="/images/icons/journal.png" height="32" />
      <div class="ml-1">Board News</div>
    </div>
    <v-skeleton-loader type="paragraph" width="100%" height="64px" v-if="isLoadingNews" />
    <div class="news-navigation mt-1" v-else>
      <div class="controls" v-if="news.length > 1">
        <div class="prev" @click="() => changeIndex(-1)"></div>
        <div class="next" @click="() => changeIndex(1)"></div>
      </div>
      <New :news="currentNews" />
    </div>
  </div>
</template>
<script>
import NewsController from "@/controller/NewsController";

import New from "./New";

export default {
  components: { New },
  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },
    account() {
      return this.$store.getters["user/account"];
    },
    currentNews() {
      return this.news[this.currentIndex];
    },
  },
  data() {
    return {
      isLoadingNews: true,
      news: [],
      currentIndex: 0,
    };
  },
  methods: {
    async fetchNews() {
      this.isLoadingNews = true;
      try {
        const controller = new NewsController();
        const news = await controller.getMany();
        this.news = news.filter(n => n.id);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingNews = false;
      }
    },
    changeIndex(direction) {
      const nextIndex = this.currentIndex + direction;
      const limit = this.news.length - 1;
      if (nextIndex > limit) {
        this.currentIndex = 0;
      } else if (nextIndex < 0) {
        this.currentIndex = this.news.length - 1;
      } else {
        this.currentIndex = nextIndex;
      }
    },
  },
  watch: {
    isConnected() {
      this.fetchNews();
    },
    account() {
      this.fetchNews();
    },
  },
};
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
.news-navigation {
  position: relative;
  min-height: 80px;
  width: 100%;
}
.controls {
  display: flex;
  justify-content: space-between;
  width: 105%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
}
.prev {
  width: 0px;
  height: 0px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 15px solid #ffeebc;
  &:hover {
    cursor: pointer;
  }
}
.next {
  width: 0px;
  height: 0px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid #ffeebc;
  &:hover {
    cursor: pointer;
  }
}
</style>
