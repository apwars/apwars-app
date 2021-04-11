<template>
  <div class="d-flex justify-center align-center mt-1">
    <v-img width="35" max-width="35" src="/images/wgolds.png"></v-img>
    <span>
      <amount :amount="price" />
      wGOLD
    </span>
  </div>
</template>

<script>
import Amount from '@/lib/components/ui/Utils/Amount';

export default {
  props: ['price'],

  components: {
    Amount,
  }
};
</script>

<style scoped>
span {
  color: white;
}
</style>
