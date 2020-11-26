import Vue from "vue";
import axios from "axios"
import config from "../../env.paths.json"

axios.defaults.baseURL = config.BASE_URL

const skillsItem = {
    props: ["skill"],
    template: "#skills-item",
    methods: {
        drawSkillPercent() {
            const circle = this.$refs["colored-circle"];
            const dashArray = parseInt(
                getComputedStyle(circle).getPropertyValue("stroke-dasharray")
            );
            circle.style.strokeDashoffset = (dashArray / 100) * (100 - this.skill.percent);
        }
    },
    mounted() {
        this.drawSkillPercent()
    }
};

const skillsRow = {
    props: ["category"],
    template: "#skills-row",
    components: {
        skillsItem,
    }
};

new Vue({
    el: "#skills-component",
    template: "#skills-list",
    components: {
        skillsRow,
    },
    data() {
        return {
            skills: []
        }
    },
    async created() {
        const {data} = await axios.get("/categories/" + config.USER_ID)
        this.skills = data
    }
});