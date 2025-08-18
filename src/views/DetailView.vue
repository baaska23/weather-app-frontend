<script>
import WeatherDetail from "@/components/WeatherDetail.vue";
export default {
  components: {WeatherDetail},
  props: ['city'],
}
</script>
<template>
  <div class="detail-page">
    <WeatherDetail :city="city"/>
  </div>
</template>
<style scoped>

</style>