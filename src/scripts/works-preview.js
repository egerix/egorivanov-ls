import Vue from "vue";

const thumbs = {
    props: ["currentWork", "works"],
    template: "#preview-thumbs"
}
const btns = {
    template: "#preview-btns",
    props: ["currentIndex", "worksCount"],
    watch: {
        currentIndex(index) {
            console.log(this)

            console.log(this.worksCount)
            if (index === 0) {
                this.$refs.prevBtn.style.opacity = .4;
                this.$refs.prevBtn.disabled = true;
            } else {
                this.$refs.prevBtn.style.opacity = 1;
                this.$refs.prevBtn.disabled = false;
            }
            if (index === this.worksCount - 1) {
                this.$refs.nextBtn.style.opacity = .4;
                this.$refs.nextBtn.disabled = true;
            } else {
                this.$refs.nextBtn.style.opacity = 1;
                this.$refs.nextBtn.disabled = false;
            }
        }
    },
    mounted() {
        this.$refs.prevBtn.style.opacity = .4;
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
            return works.slice(0, 3).reverse();
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
            return this.currentWork.skills.split(", ")
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
            works: [],
            currentIndex: 0,
            worksCount: 0
        }
    },
    computed: {
        currentWork() {
            return this.works[0]
        }
    },
    methods: {
        requireImagesToArray(data) {
            return data.map(item => {
                item.photo = require(`../images/content/${item.photo}`).default;
                return item;
            });
        },
        slide(direction) {
            const lastItem = this.works[this.works.length - 1];
            switch (direction) {
                case "next":
                    this.works.push(this.works[0]);
                    this.works.shift();
                    this.currentIndex++;
                    break;
                case "prev":
                    this.works.unshift(lastItem);
                    this.works.pop();
                    this.currentIndex--;
                    break;
            }
        }
    },
    created() {
        const data = require("../data/works.json");
        this.works = this.requireImagesToArray(data);
        this.worksCount = this.works.length
    },
});