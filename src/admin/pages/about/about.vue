<template>
  <div class="about-page-component page-content">
    <div class="container">
      <div class="page-header">
        <div class="page-title">Блок "Обо мне"</div>
        <iconed-button
            type="iconed"
            v-if="emptyCatIsShown === false"
            @click="emptyCatIsShown = true"
            title="Добавить группу"
        />
      </div>
      <ul class="skills">
        <li class="item" v-if="emptyCatIsShown">
          <category
              :category="{category: ''}"
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
              @remove="removeCategory"
              @approve="editCategory"
          />
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
import button from "../../components/button";
import category from "../../components/category";
import {mapActions, mapState} from "vuex";

export default {
  components: {
    iconedButton: button,
    category,
  },
  data() {
    return {
      emptyCatIsShown: false,
    };
  },
  computed: {
    ...mapState("categories", {
      categories: state => {
        return state.data
      }
    }),
    ...mapState("user", {
      userId: state => {
        return state.user.id
      }
    })
  },
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      createCategoryAction: "categories/create",
      removeCategoryAction: "categories/remove",
      editCategoryAction: "categories/edit",
      fetchCategoriesAction: "categories/fetch",
      addSkillAction: "skills/add",
      removeSkillAction: "skills/remove",
      editSkillAction: "skills/edit",
    }),
    async createSkill(skill, categoryId) {
      try {
        const newSkill = {
          ...skill,
          category: categoryId
        }
        await this.addSkillAction(newSkill);
        skill.title = "";
        skill.percent = "";

        this.showTooltip({text: `Добавлен скилл - ${newSkill.title}`, type: "success"})
      } catch (e) {
        this.showTooltip({text: e, type: "error"})
      }
    },
    removeSkill(skill) {
      try {
        this.removeSkillAction(skill);

        this.showTooltip({text: `Скилл '${skill.title}' удален`, type: "success"})
      } catch (e) {
        this.showTooltip({text: e, type: "error"})
      }
    },
    async editSkill(skill) {
      try {
        await this.editSkillAction(skill);
        skill.editmode = false;

        this.showTooltip({text: `Скилл '${skill.title}' изменен`, type: "success"})
      } catch (e) {
        this.showTooltip({text: e, type: "error"})
      }
    },
    async createCategory(category) {
      try {
        await this.createCategoryAction(category.category);
        this.emptyCatIsShown = false;

        this.showTooltip({text: `Создана категория - ${category.category}`, type: "success"})
      } catch (e) {
        this.showTooltip({text: e, type: "error"})
      }
    },
    async removeCategory(category) {
      try {
        await this.removeCategoryAction(category);
        this.showTooltip({text: `Категория '${category.category}' удалена`, type: "success"})
      } catch (e) {
        this.showTooltip({text: e, type: "error"})
      }
    },
    async editCategory(category) {
      try {
        await this.editCategoryAction(category);

        this.showTooltip({text: `Категория '${category.category}' изменена`, type: "success"})
      } catch (e) {
        this.showTooltip({text: e, type: "error"})
      }
    }
  },
  created() {
    this.fetchCategoriesAction(this.userId);
  },
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>