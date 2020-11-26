<template>
  <div class="headline-component">
    <div class="container headline-container">
      <slot></slot>
      <div class="title">{{ title }}</div>
      <div class="buttons">
        <button type="button" class="btn" @click="logout">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Панель администрирования"
    }
  },
  methods: {
    ...mapActions({
      logout: "user/logoutUser"
    })
  }
}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>