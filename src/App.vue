<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import TrackingMap from "./components/TrackingMap.vue";
import InputForm from "./components/InputForm.vue";

export default {
  name: "app"
};
</script>

<style>
body{
  margin:0;
}
</style>
