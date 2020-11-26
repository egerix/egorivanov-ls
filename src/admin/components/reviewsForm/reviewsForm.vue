<template>
  <div class="reviewsForm-component">
    <form class="reviewsForm" @submit.prevent="handleSubmit">
      <card title="Новый отзыв">
        <div class="reviewsForm-container" slot="content">
          <div class="reviewsForm-cols">
            <div class="reviewsForm-col">
              <div
                  :style="reviewerPhoto ? {backgroundImage: `url(${reviewerPhoto})`} : ''"
                  :class="['user-photo', {uploaded: reviewerPhoto}]"
              />
              <app-button typeAttr="file" :title="reviewerPhoto ? 'Изменить фото' : 'Добавить фото'"
                          plain @change="handleChange"></app-button>
              <tooltip
                  v-if="validation.hasError('newReview.photo')"
                  :text="validation.firstError('newReview.photo')"
              />
            </div>
            <div class="reviewsForm-col">
              <div class="reviewsForm-row">
                <app-input v-model="newReview.author" title="Имя автора"
                           :error-message="validation.firstError('newReview.author')"/>
              </div>
              <div class="reviewsForm-row">
                <app-input v-model="newReview.occ" title="Титул автора"
                           :error-message="validation.firstError('newReview.occ')"/>
              </div>
              <div class="reviewsForm-row">
                <app-input v-model="newReview.text"
                           field-type="textarea"
                           title="Отзыв"
                           :error-message="validation.firstError('newReview.text')"
                />
              </div>
            </div>
          </div>
          <div class="reviewsForm-btns">
            <div class="btn">
              <app-button title="Отмена" plain @click="$emit('closeForm' ,$event)"></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" typeAttr="submit"></app-button>
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>

<script>
import card from "../card";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import tooltip from "../tooltip";
import {Validator, mixin as ValidatorMixin} from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {
    'newReview.author': function (value) {
      return Validator.value(value).required("Введите имя автора")
    },
    'newReview.occ': function (value) {
      return Validator.value(value).required("Введите имя автора")
    },
    'newReview.text': function (value) {
      return Validator.value(value).required("Введите описание")
    },
    'newReview.photo': function (value) {
      return Validator.value(value).required("Загрузите фото");
    }
  },
  components: {card, appButton, appInput, tagsAdder, tooltip},
  props: {
    review: Object,
  },
  data() {
    return {
      hovered: false,
      newReview: {...this.review},
      reviewerPhoto: ""
    };
  },
  methods: {
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (await this.$validate()) {
        this.$emit('save-review', this.newReview)
      }
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer
          ? event.dataTransfer.files[0]
          : event.target.files[0];

      this.newReview.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.reviewerPhoto = reader.result;
      };
    },
  },
  created() {
    if (this.review.photo)
      this.reviewerPhoto = 'https://webdev-api.loftschool.com/' + this.review.photo;
  },
  watch: {
    review() {
      this.newReview = {...this.review}
      this.reviewerPhoto = ''
    }
  }
};
</script>

<style src="./reviewsForm.pcss" lang="postcss" scoped></style>
