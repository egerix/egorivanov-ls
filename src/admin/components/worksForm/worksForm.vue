<template>
  <div class="worksForm-component">
    <form class="worksForm" @submit.prevent="handleSubmit">
      <card title="Добавление работы">
        <div class="worksForm-container" slot="content">
          <div class="worksForm-cols">
            <div class="worksForm-col">
              <label
                  :style="{backgroundImage: `url(${preview})`}"
                  :class="[ 'uploader', {active: preview}, {
                  hovered: hovered
                }]"
                  @dragover="handleDragOver"
                  @dragleave="hovered = false"
                  @drop="handleChange"
              >
                <div class="uploader-title" v-if="!preview">Перетащите или загрузите картинку</div>
                <div class="uploader-btn">
                  <app-button typeAttr="file" :title="preview ? 'Изменить' : 'Загрузить'"
                              @change="handleChange"></app-button>
                </div>
              </label>
              <tooltip
                  v-if="validation.hasError('newWork.photo')"
                  :text="validation.firstError('newWork.photo')"
              />
            </div>
            <div class="worksForm-col">
              <div class="worksForm-row">
                <app-input v-model="newWork.title" title="Название"
                           :error-message="validation.firstError('newWork.title')"/>
              </div>
              <div class="worksForm-row">
                <app-input v-model="newWork.link" title="Ссылка" :error-message="validation.firstError('newWork.link')"/>
              </div>
              <div class="worksForm-row">
                <app-input v-model="newWork.description"
                           field-type="textarea"
                           title="Описание"
                           :error-message="validation.firstError('newWork.description')"
                />
              </div>
              <div class="worksForm-row">
                <tags-adder v-model="newWork.techs" :error-message="validation.firstError('newWork.techs')"/>
              </div>
            </div>
          </div>
          <div class="worksForm-btns">
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
    'newWork.title': function (value) {
      return Validator.value(value).required("Введите название")
    },
    'newWork.link': function (value) {
      return Validator.value(value).url("Ссылка некорректна").required("Введите ссылку")
    },
    'newWork.description': function (value) {
      return Validator.value(value).required("Введите описание")
    },
    'newWork.techs': function (value) {
      return Validator.value(value).required("Заполните теги")
    },
    'newWork.photo': function (value) {
      return Validator.value(value).required("Загрузите фото");
    }
  },
  components: {card, appButton, appInput, tagsAdder, tooltip},
  props: {
    work: Object,
  },
  data() {
    return {
      hovered: false,
      newWork: {...this.work},
      preview: ""
    };
  },
  methods: {
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (await this.$validate()) {
        this.$emit('save-work', this.newWork)
      }
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer
          ? event.dataTransfer.files[0]
          : event.target.files[0];

      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.preview = reader.result;
      };
    },
  },
  created() {
    if (this.work.photo)
      this.preview = 'https://webdev-api.loftschool.com/' + this.work.photo;
  },
  watch: {
    work() {
      this.newWork = {...this.work}
      this.preview = ''
    }
  }
};
</script>

<style src="./worksForm.pcss" lang="postcss" scoped></style>
