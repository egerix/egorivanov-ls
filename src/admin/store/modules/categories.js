export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY: (state, category) => state.data.unshift(category),
        EDIT_CATEGORY(state, category) {
            state.data = state.data.map(cat => {
                return cat.id === category.id ? category : cat
            });
        },
        REMOVE_CATEGORY(state, category) {
            state.data = state.data.filter(cat => {
                return category.id !== cat.id;
            });
        },
        ADD_SKILL: (state, newSkill) => {
            state.data = state.data.map(category => {
                if (category.id === newSkill.category) {
                    category.skills = category.skills || [];
                    category.skills.push(newSkill);
                }
                return category;
            })
        },
        REMOVE_SKILL: (state, skillToRemove) => {
            state.data = state.data.map(category => {
                if (category.id === skillToRemove.category) {
                    category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id)
                }
                return category;
            })
        },
        EDIT_SKILL: (state, skillToEdit) => {
            const editSkillInCategory = category => {
                category.skills = category.skills.map(skill => {
                    return skill.id === skillToEdit.id ? skillToEdit : skill
                });
            }
            const findCategory = category => {
                if (category.id === skillToEdit.category) {
                    editSkillInCategory(category);
                }
                return category;
            }
            state.data = state.data.map(findCategory);
        }
    },
    actions: {
        async create({commit}, title) {
            try {
                const {data} = await this.$axios.post('/categories', {title})
                const fullData = {
                    ...data,
                    skills: []
                }
                commit("ADD_CATEGORY", fullData);
            } catch (error) {
                throw Error(error.response.data.message || error.response.data.error)
            }
        },
        async fetch({commit}, userId) {
            try {
                const {data} = await this.$axios.get('/categories/' + userId)
                commit("SET_CATEGORIES", data)
            } catch (error) {
                throw Error(error.response.data.message || error.response.data.error)
            }
        },
        async edit({commit}, category) {
            try {
                const {data} = await this.$axios.post(`/categories/${category.id}`, {title: category.category});
                commit('EDIT_CATEGORY', data);
                commit('tooltips/SHOW_TOOLTIP', {
                    type: 'success',
                    message: 'AAA'
                }, { root: true });
            } catch (error) {
                throw Error(error.response.data.message || error.response.data.error)
            }
        },
        async remove({commit}, category) {
            try {
                await this.$axios.delete(`/categories/${category.id}`);
                commit('REMOVE_CATEGORY', category);
            } catch (error) {
                throw Error(error.response.data.message || error.response.data.error)
            }
        }
    }
}