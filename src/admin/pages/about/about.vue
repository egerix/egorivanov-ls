<template>
  <div class="about-page-component">

    <div class="page-content">
      <div class="container">
        <div class="header">
          <div class="title">
            Блок "Обо мне"
          </div>
          <iconed-btn
              type="iconed"
              v-if="emptyCatIsShown === false"
              @click="emptyCatIsShown = true"
              title="Добавить группу"/>
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShown">
            <category
                :category="{title: ''}"
                @remove="emptyCatIsShown = false"
                @approve="createCategory"
                empty
            />
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <category
                :category="category"
                @create-skill="createSkill($event, category.id)"
                @edit-skill="editSkill"
                @remove-skill="removeSkill"
                @approve="editCategory"
                @remove="removeCategory"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>


<script>

import user from "../../components/user/user";
import iconedBtn from "../../components/button/types/iconedBtn";
import category from "../../components/category";
import {mapActions, mapState} from "vuex";

export default {
  components: {
    user,
    iconedBtn,
    category
  },
  data() {
    return {
      emptyCatIsShown: false
    }
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.data
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoriesAction: "categories/fetch",
      editCategoryAction: "categories/edit",
      removeCategoryAction: "categories/remove",
      addSkillAction: "skills/add",
      removeSkillAction: "skills/remove",
      editSkillAction: "skills/edit",
    }),
    async createCategory(category) {
      try {
        await this.createCategoryAction(category.category)
        this.emptyCatIsShown = false
      } catch (error) {
        console.log(error.message)
      }
    },
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      }
      await this.addSkillAction(newSkill);

      skill.title = "";
      skill.percent = "";
    },
    async editSkill(skill) {
      await this.editSkillAction(skill);
      skill.editmode = false;
    },
    async removeSkill(skill) {
      await this.removeSkillAction(skill);
    },
    async editCategory(category) {
      await this.editCategoryAction(category);
    },
    async removeCategory(category)  {
      await this.removeCategoryAction(category);
    },
  },
  created() {
    this.fetchCategoriesAction();
  }
}
</script>

<style lang="postcss" scoped src="./about.pcss"></style>