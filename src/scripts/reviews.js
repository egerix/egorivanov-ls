import Vue from "vue";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import axios from "axios"
import config from "../../env.paths.json"

axios.defaults.baseURL = config.BASE_URL

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
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    }
                },
            }
        }
    },
    mounted() {
        const refs = this.$refs
        const classDisabled = "reviews__btn--disabled"
        refs.prevBtn.classList.add(classDisabled)
        refs.prevBtn.disabled = true;

        refs.slider.$swiper.on("slideChange", function () {
            if (this.isEnd) {
                refs.nextBtn.classList.add(classDisabled)
                refs.nextBtn.disabled = true;
            } else {
                refs.nextBtn.classList.remove(classDisabled)
                refs.nextBtn.disabled = false;
            }
            if (this.isBeginning) {
                refs.prevBtn.classList.add(classDisabled)
                refs.prevBtn.disabled = true;
            } else {
                refs.prevBtn.classList.remove(classDisabled)
                refs.prevBtn.disabled = false;
            }
        })
    },
    methods: {
        fixImagesSrc(data) {
            return data.map(item => {
                item.photo = `${config.BASE_URL}/${item.photo}`;
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
    async created() {
        const {data} = await axios.get("/reviews/" + config.USER_ID)
        this.reviews = this.fixImagesSrc(data)
    }
});