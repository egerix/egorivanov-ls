<template>
  <div class="worksForm-component">
    <form class="worksForm" @submit.prevent="handleSubmit">
      <card title="Добавление работы">
        <div class="worksForm-container" slot="content">
          <div class="worksForm-cols">
            <div class="worksForm-col">
              <label
                :style="{backgroundImage: `url(${newWork.preview})`}"
                :class="[ 'uploader', {active: newWork.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-title">Перетащите или загрузите картинку</div>
                <div class="uploader-btn">
                  <app-button typeAttr="file" @change="handleChange"></app-button>
                </div>
              </label>
            </div>
            <div class="worksForm-col">
              <div class="worksForm-row">
                <app-input v-model="newWork.title" title="Название" />
              </div>
              <div class="worksForm-row">
                <app-input v-model="newWork.link" title="Ссылка" />
              </div>
              <div class="worksForm-row">
                <app-input v-model="newWork.description" field-type="textarea" title="Описание" />
              </div>
              <div class="worksForm-row">
                <tags-adder v-model="newWork.techs" />
              </div>
            </div>
          </div>
          <div class="worksForm-btns">
            <div class="btn">
              <app-button title="Отмена" plain></app-button>
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
import { mapActions } from "vuex";

export default {
  components: { card, appButton, appInput, tagsAdder },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addNewWork: "works/add",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      await this.addNewWork(this.newWork);
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
        this.newWork.preview = reader.result;
      };
    },
  },
};
</script>

<style src="./worksForm.pcss" lang="postcss" scoped></style>
