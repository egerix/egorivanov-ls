import skillAddLine from "./skillAddLine"

export default {
  title: "skillAddLine",
  components: {skillAddLine}
}

export const defaultView = () => ({
  components: {skillAddLine},
  template: `
    <skill-add-line /> 
  `
})

export const blockedView = () => ({
  components: {skillAddLine},
  template: `
    <skill-add-line blocked/> 
  `
})