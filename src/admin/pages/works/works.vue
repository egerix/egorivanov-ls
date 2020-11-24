<template>
  <div class="works-page-component">
    <div class="container">
      <div class="page-header">
        <div class="page-title">
          Блок "Работы"
        </div>
      </div>
      <div class="form" v-if="showForm">
        <works-form :work="work" @closeForm="hideWorkForm" @save-work="saveWork"/>
      </div>
      <ul class="cards">
        <li class="item">
          <square-btn
              type="square"
              title="Добавить работу"
              @click="showAddWorkForm"
          />
        </li>
        <li class="item" v-for="work in works" :key="work.id">
          <work-card
              :work="work"
              @delete-work="deleteWork"
              @edit-work="showEditForm"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import worksForm from "../../components/worksForm";
import workCard from "../../components/workCard";
import squareBtn from "../../components/button";
import {mapState, mapActions, mapGetters} from "vuex";
import { showTooltipOnSuccess } from "../../hellpers/tooltip"

export default {
  components: {worksForm, workCard, squareBtn},
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
    ...mapGetters('works', ['workIsExist'])
  },
  data: () => ({
    showForm: false,
    work: {
      title: '',
      link: '',
      description: '',
      techs: '',
      photo: ''
    }
  }),
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      fetchWorksAction: "works/fetch",
      addNewWorkAction: "works/add",
      deleteWorkAction: "works/delete",
      updateWorkAction: "works/update",
    }),
    showAddWorkForm() {
      this.showForm = true
      this.work = {
        title: '',
        link: '',
        description: '',
        techs: '',
        photo: ''
      }
    },
    hideWorkForm() {
      this.showForm = false
    },
    saveWork(work) {
      if (this.workIsExist(work))
        this.updateWork(work)
      else
        this.addWork(work)
      this.showForm = false
    },
    showEditForm(work) {
      this.work = work
      this.showForm = true
    },
    async addWork(work) {
      await showTooltipOnSuccess(
          this.addNewWorkAction(work),
          `Работа '${work.title}' добавлена`
      )
    },
    async updateWork(work) {
      await showTooltipOnSuccess(
          this.updateWorkAction(work),
          `Работа '${work.title}' изменена`
      )
    },
    async deleteWork(work) {
      await showTooltipOnSuccess(
          this.deleteWorkAction(work.id),
          `Работа '${work.title}' удалена`
      )
    }
  },
  mounted() {
    this.fetchWorksAction();
  }
};
</script>

<style scoped lang="postcss" src="./works.pcss"></style>
