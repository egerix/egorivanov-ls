import Vue from "vue";

console.log('this is the skills module');

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
    created() {
        this.skills = require("../data/skills.json")
    }
});