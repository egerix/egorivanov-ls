import pageHeader from "./pagesHeader";

export default {
    title: "header",
    component: pageHeader,
};

export const defaultView = () => ({
    components: {pageHeader},
    template: `
      <page-header/>
    `,
});