import tagsAdder from "./tagsAdder.vue";

export default {
    title: "tagsAdder",
    components: {tagsAdder}
}

export const defaultView = () => ({
    components: { tagsAdder },
    data() {
        return {
            tags: "One, two, three, four"
        }
    },
    template: `
      <div>
      <pre>{{tags}}</pre>
      <tags-adder  v-model="tags" />
      </div>
    `
});

defaultView.story = {
    name: "Стандартный вид",
    parameters: {
        backgrounds: [
            { name: 'grey', value: '#8395a7', default: true },
        ],
    },
};

export const errorView = () => ({
    components: { tagsAdder },
    data() {
        return {
            tags: ""
        }
    },
    template: `        
      <tags-adder v-model="tags" error-message='ERROR'/>
    `
});

errorView.story = {
    name: "Вывод ошибки вид",
    parameters: {
        backgrounds: [
            { name: 'grey', value: '#8395a7', default: true },
        ],
    },
};