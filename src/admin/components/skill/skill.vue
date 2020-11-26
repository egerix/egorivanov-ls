<template>
  <div class="skill-component" v-if="currentSkill.editmode === false">
    <div class="title">{{ skill.title }}</div>
    <div class="percent">{{ skill.percent }}</div>
    <div class="buttons">
      <icon symbol="pencil" class="btn" @click="currentSkill.editmode = true" grayscale/>
      <icon symbol="trash" class="btn" @click="$emit('remove', skill)" grayscale/>
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="title">
      <app-input
          noSidePaddings
          v-model="currentSkill.title"
          :errorMessage="validation.firstError('currentSkill.title')"
      />
    </div>
    <div class="percent">
      <app-input
          v-model="currentSkill.percent"
          type="number"
          min="0"
          max="100"
          maxlength="3"
          :errorMessage="validation.firstError('currentSkill.percent')"
      />
    </div>
    <div class="buttons">
      <icon symbol="tick" class="btn" @click="approveClick"/>
      <icon symbol="cross" class="btn" @click="currentSkill.editmode = false"/>
    </div>
  </div>
</template>

<script>
import input from "../input";
import icon from "../icon";
import {Validator, mixin as ValidatorMixin} from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentSkill.title": (value) => {
      return Validator.value(value)
          .required("Не может быть пустым");
    },
    "currentSkill.percent": (value) => {
      return Validator.value(value)
          .required("Не может быть пустым");
    },
  },
  props: {
    skill: {
      type: Object,
      default: () => {
      },
      required: true
    }
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editmode: false
      }
    };
  },
  components: {
    icon,
    appInput: input,
  },
  methods: {
    approveClick() {
      this.$validate().then((success) => {
        if (!success) return
        this.$emit('approve', this.currentSkill)
        this.validation.reset()
      });
    }
  }
};
</script>

<style lang="postcss" src="./skill.pcss" scoped></style>

