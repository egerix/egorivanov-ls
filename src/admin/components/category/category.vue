<template>
  <card slim>
    <edit-line
        slot="title"
        v-model="currCategory.category"
        :editModeByDefault="empty"
        @remove="$emit('remove', currCategory)"
        @approve="onEditCategory"
    />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li class="item" v-for="skill in currCategory.skills" :key="skill.id">
          <skill
              :skill="skill"
              @remove="$emit('remove-skill', $event)"
              @approve="$emit('edit-skill', $event)"
          />
        </li>
      </ul>
      <div class="bottom-line">
        <skill-add-line @approve="$emit('create-skill', $event)" :blocked="empty"/>
      </div>
    </template>
  </card>
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAddLine from "../skillAddLine";

export default {
  components: {
    card,
    editLine,
    skill,
    skillAddLine,
  },
  props: {
    category: {
      type: Object
    },
    empty: Boolean,
  },
  data() {
    return {
      currCategory: this.category
    }
  },
  methods: {
    onEditCategory() {
      this.$emit('approve', this.category)
    }
  }
};
</script>

<style lang="postcss" scoped src="./category.pcss"/>