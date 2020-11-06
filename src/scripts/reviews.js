import Vue from "vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";

console.log('this is the reviews module');

new Vue({
    el: "#reviews-component",
    template: "#reviews-container",
    components: {
        Swiper, SwiperSlide
    },
    data() {
        return {
            reviews: [],
            sliderOptions: {
                slidesPerView: 2,
                slidesPerGroup: 2
            }
        }
    },
    mounted() {
        const refs = this.$refs
        refs.prevBtn.style.opacity = .4
        refs.slider.$swiper.on("slideChange", function () {
            if (this.isEnd) {
                refs.nextBtn.style.opacity = .4
            } else refs.nextBtn.style.opacity = 1
            if (this.isBeginning) {
                refs.prevBtn.style.opacity = .4
            } else {
                refs.prevBtn.style.opacity = 1
            }
        })
    },
    methods: {
        requireImagesToArray(data) {
            return data.map(item => {
                item.photo = require(`../images/content/${item.photo}`).default;
                return item;
            });
        },
        slide(direction) {
            const slider = this.$refs["slider"].$swiper
            console.log(slider)
            switch (direction) {
                case "next":
                    slider.slideNext()
                    break;
                case "prev":
                    slider.slidePrev()
                    break;
            }
        }
    },
    created() {
        this.reviews = this.requireImagesToArray(require("../data/reviews.json"))
    }
});