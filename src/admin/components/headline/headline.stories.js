import headline from "./headline";

export default {
    title: "headline",
    components: {headline}
};

export const defaultView = () => ({
    components: {headline},
    template: `
      <headline title="Панель админа">
      <h4>
        Контент
      </h4>
      </headline>
    `,
});