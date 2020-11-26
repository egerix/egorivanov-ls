import reviewCard from "./reviewCard";

export default {
    title: "reviewCard",
    component: reviewCard,
};

export const defaultView = () => ({
    components: {reviewCard},
    data() {
        return {
            review: {
                text: "Текст отзыва",
                author: "Егор",
                occ: "SDET",
                photo: "https://webdev-api.loftschool.com/uploads/avatars/420q7ed5892d35244_origin.jpg"
            }
        }
    },
    template: `
      <review-card :review="review"/>
    `,
});