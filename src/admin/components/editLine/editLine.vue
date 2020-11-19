<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="category.editmode === false">
      <div class="text">{{ category.category }}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="category.editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
            placeholder="Название новой группы"
            v-model="newTitle"
            :errorMessage="validation.firstError('newTitle')"
            @input="$emit('input', $event)"
            @keydown.native.enter="onApprove"
            autofocus="autofocus"
            no-side-paddings="no-side-paddings"
        />
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Validator, mixin as ValidatorMixin} from "simple-vue-validator";
import category from "../category";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "newTitle": (value) => {
      return Validator.value(value)
          .required("Не может быть пустым");
    },
  },
  props: {
    category: Object,
    blocked: Boolean
  },
  data () {
    return {
      editMode: this.category.editMode,
      newTitle: ''
    };
  },
  methods: {
    onApprove() {
      this.$validate().then((success) => {
        console.log(1)
        if (!success) return
        console.log(2)

        // if (this.category.category.trim() === this.newTitle.trim()) {
        //   console.log(3)
        //
        //   this.editmode = false;
        // } else {
          console.log(4)
          this.$emit("approve", {
            ...this.category,
            category: this.newTitle
          });
        // }
        console.log("ss")

        this.validation.reset()
      });
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>