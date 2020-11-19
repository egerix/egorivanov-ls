<template>
  <card slim>
    <edit-line
        slot="title"
        v-model="categoryTitle"
        :edit-mode-by-default="empty"
        @remove="$emit('remove', $event)"
    />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li class="item" v-for="skill in skills" :key="skill.id">
          <skill
              :skill="skill"
              @remove="$emit('remove-skill', $event)"
              @approve="$emit('edit-skill', $event)"
          />
        </li>
      </ul>
      <div class="bottom-line">
        <skill-add-line :blocked="empty"/>
      </div>
    </template>
  </card>
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAddLine from "../skillAddLine";

const skills = [
  {id: 0, title: "Html", percent: 80},
  {id: 1, title: "Html", percent: 20},
  {id: 2, title: "Html", percent: 40},
]

export default {
  components: {
    card,
    editLine,
    skill,
    skillAddLine
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categoryTitle: this.title,
    }
  }
}
</script>

<style lang="postcss" scoped src="./category.pcss"/>