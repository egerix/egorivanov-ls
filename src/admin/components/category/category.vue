<template>
  <card slim>
    <edit-line
        slot="title"
        :category="category"
        @remove="$emit('remove', category)"
        @approve="$emit('approve', category)"
    />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li class="item" v-for="skill in category.skills" :key="skill.id">
          <skill
              :skill="skill"
              @remove="$emit('remove-skill', $event)"
              @approve="$emit('edit-skill', $event)"
          />
        </li>
      </ul>
      <div class="bottom-line">
        <skill-add-line
            :blocked="empty"
            @approve="$emit('create-skill', $event)"
        />
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
    skillAddLine
  },
  props: {
    empty: Boolean,
    category: {
      type: Object
    }
  },
}
</script>

<style lang="postcss" scoped src="./category.pcss"/>