import Vue from "vue";
import axios from "axios"
import config from "../../env.paths.json"

axios.defaults.baseURL = config.BASE_URL

const thumbs = {
    props: ["currentWork", "works"],
    template: "#preview-thumbs"
}
const btns = {
    template: "#preview-btns",
    props: ["currentIndex", "worksCount"],
    watch: {
        currentIndex(index) {
            if (index === 0) {
                this.$refs.prevBtn.classList.add("works-slider__btn--disabled")
                this.$refs.prevBtn.disabled = true;
            } else {
                this.$refs.prevBtn.classList.remove("works-slider__btn--disabled")
                this.$refs.prevBtn.disabled = false;
            }
            if (index === this.worksCount - 1) {
                this.$refs.nextBtn.classList.add("works-slider__btn--disabled")
                this.$refs.nextBtn.disabled = true;
            } else {
                this.$refs.nextBtn.classList.remove("works-slider__btn--disabled")
                this.$refs.nextBtn.disabled = false;
            }
        }
    },
    mounted() {
        this.$refs.prevBtn.classList.add("works-slider__btn--disabled")
        this.$refs.prevBtn.disabled = true;
    }
}

const display = {
    template: "#preview-display",
    props: ["currentWork", "works", "currentIndex", "worksCount"],
    components: {
        thumbs,
        btns
    },
    computed: {
        reversedWorks() {
            const works = [...this.works];
            return works.reverse();
        }
    }
}

const tags = {
    props: ["tags"],
    template: "#preview-tags"
}

const info = {
    template: "#preview-info",
    props: ["currentWork"],
    components: {
        tags
    },
    computed: {
        tagsArray() {
            return this.currentWork.techs.split(", ")
        }
    },
}

new Vue({
    el: "#preview-component",
    template: "#preview-container",
    components: {
        display,
        info
    },
    data() {
        return {
            works: [{
                title: '',
                link: '',
                description: '',
                techs: '',
                photo: ''
            }],
            currentIndex: 0,
            worksCount: 0
        }
    },
    computed: {
        currentWork() {
            return this.works[this.currentIndex]
        }
    },
    methods: {
        fixImagesSrc(data) {
            return data.map(item => {
                item.photo = `${config.BASE_URL}/${item.photo}`;
                return item;
            });
        },
        slide(direction) {
            const lastItem = this.works[this.works.length - 1];
            switch (direction) {
                case "next":
                    this.currentIndex++;
                    break;
                case "prev":
                    this.currentIndex--;
                    break;
            }
        },
        showSlide(slideId) {
            this.currentIndex = slideId - 1;
        },
    },
    async created() {
        const {data} = await axios.get("/works/" + config.USER_ID);
        this.works = this.fixImagesSrc(data);
        this.worksCount = this.works.length
    },
});