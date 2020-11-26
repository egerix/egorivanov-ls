<template>
  <card>
      <header slot="title">
        <div class="user">
          <div class="user__pic-wrapper">
            <img class="user-min__avatar-pic" :src="cover" alt="Avatar"/>
          </div>
          <div class="user__info">
            <div class="user__name">{{ review.author }}</div>
            <div class="user__occ">{{ review.occ }}</div>
          </div>
        </div>
      </header>
      <div class="data" slot="content">
        <div class="text">
          <p>{{review.text}}</p>
        </div>
        <div class="btns">
          <icon symbol="pencil" title="Править" @click="$emit('edit-review', review)"></icon>
          <icon symbol="trash" title="Удалить" @click="$emit('delete-review', review)"></icon>
        </div>
      </div>

  </card>
</template>

<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";
import Button from "../button/button";

export default {
  components: {Button, card, icon, tagsList },
  props: {
    review: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    }
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>
