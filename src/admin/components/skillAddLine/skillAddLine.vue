<template>
  <div :class="['skill-add-line-component', {blocked: blocked}]">
    <div class="title">
      <app-input placeholder="Новый навык"
                 v-model="skill.title"
                 :errorMessage="validation.firstError('skill.title')"
      />
    </div>
    <div class="percent">
      <app-input type="number"
                 min="0"
                 max="100"
                 maxlength="3"
                 v-model="skill.percent"
                 :errorMessage="validation.firstError('skill.percent')"
      />
    </div>
    <div class="button">
      <round-button type="round" @click="addSkillClick"/>
    </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";
import {Validator, mixin as ValidatorMixin} from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "skill.title": (value) => {
      return Validator.value(value)
          .required("Не может быть пустым");
    },
    "skill.percent": (value) => {
      return Validator.value(value)
          .integer("Должно быть числом")
          .between(0, 100, "Значение должно быть меньше 100")
          .required("Не может быть пустым");
    },
  },
  data() {
    return {
      skill: {
        title: "",
        percent: "",
      },
    };
  },
  props: {
    blocked: Boolean
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  methods: {
    addSkillClick() {
      this.$validate().then((success) => {
        if (!success) return
        this.$emit("approve", this.skill)
        this.validation.reset()
      })
    },
  },
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>
