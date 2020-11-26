<template>
  <div class="app-container">
    <router-view name="header"/>
    <router-view class="app-content"/>
    <div :class="['notify-container', {active: isTooltipShown}]">
      <div class="notification">
        <notification
        :text="tooltipText"
        :type="tooltipType"
        @click="hideTooltip"
        />
      </div>
    </div>
  </div>
</template>

<script>
import notification from "./components/notification";
import {mapState, mapActions} from "vuex";

export default {
  components: {
    notification
  },
  computed: {
    ...mapState("tooltips", {
      isTooltipShown: (state) => state.isShown,
      tooltipText: (state) => state.text,
      tooltipType: (state) => state.type,
    }),
  },
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide"
    })
  },
}
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>

<style lang="postcss" src="./app.pcss"></style>