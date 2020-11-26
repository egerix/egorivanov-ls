<template>
  <div class="reviews-page-component">
    <div class="container">
      <div class="page-header">
        <div class="page-title">
          Блок "Отзывы"
        </div>
      </div>
      <div class="form" v-if="showForm">
        <reviews-form :review="review" @closeForm="hideReviewForm" @save-review="saveReview"/>
      </div>
      <ul class="cards">
        <li class="item">
          <square-btn
              type="square"
              @click="showAddReviewForm"
          />
        </li>
        <li class="item" v-for="review in reviews" :key="review.id">
          <review-card
              :review="review"
              @delete-review="deleteReview"
              @edit-review="showEditForm"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import reviewsForm from "../../components/reviewsForm";
import reviewCard from "../../components/reviewCard";
import squareBtn from "../../components/button";
import {mapState, mapActions, mapGetters} from "vuex";
import {showTooltipOnSuccess} from "../../hellpers/tooltip"

export default {
  components: {reviewsForm, reviewCard, squareBtn},
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
    ...mapState("user", {
      userId: state => {
        return state.user.id
      }
    }),
    ...mapGetters('reviews', ['reviewIsExist'])
  },
  data: () => ({
    showForm: false,
    review: {
      text: "",
      author: "",
      occ: "",
      photo: ""
    }
  }),
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      fetchReviewsAction: "reviews/fetch",
      addNewReviewAction: "reviews/add",
      deleteReviewAction: "reviews/delete",
      updateReviewAction: "reviews/update",
    }),
    showAddReviewForm() {
      this.showForm = true
      this.review = {
        text: "",
        author: "",
        occ: "",
        photo: ""
      }
    },
    hideReviewForm() {
      this.showForm = false
    },
    saveReview(review) {
      if (this.reviewIsExist(review))
        this.updateReview(review)
      else
        this.addReview(review)
      this.showForm = false
    },
    showEditForm(review) {
      this.review = review
      this.showForm = true
    },
    async addReview(review) {
      await showTooltipOnSuccess(
          this.addNewReviewAction(review),
          `Отзыв от '${review.author}' добавлен`
      )
    },
    async updateReview(review) {
      await showTooltipOnSuccess(
          this.updateReviewAction(review),
          `Отзыв от '${review.author}' изменен`
      )
    },
    async deleteReview(review) {
      await showTooltipOnSuccess(
          this.deleteReviewAction(review.id),
          `Отзыв от '${review.author}' удален`
      )
    }
  },
  mounted() {
    this.fetchReviewsAction(this.userId);
  }
};
</script>

<style scoped lang="postcss" src="./reviews.pcss"></style>
