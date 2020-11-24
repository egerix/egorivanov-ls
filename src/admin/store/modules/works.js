export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_WORK(state, newWork) {
            state.data.push(newWork);
        },
        SET_WORKS(state, works) {
            state.data = works
        },
        UPDATE_WORK(state, editedWork) {
            state.data = state.data.map(work => {
                return work.id === editedWork.id ? editedWork : work;
            })
        },
        DELETE_WORK(state, workId) {
            state.data = state.data.filter(work => {
                if (work.id !== workId) {
                    return work;
                }
            })
        }
    },
    actions: {
        async add({commit}, newWork) {
            const formData = new FormData();

            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })

            try {
                const {data} = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            } catch (error) {
                throw Error(error)
            }
        },
        async fetch({commit}) {
            try {
                const {data} = await this.$axios.get("/works/420");
                commit("SET_WORKS", data);
            } catch (error) {
                throw Error(error)
            }
        },
        async update({commit}, work) {
            try {
                const formData = new FormData();
                Object.keys(work).forEach(item => {
                    formData.append(item, work[item]);
                })
                const {data} = await this.$axios.post(`/works/${work.id}`, formData);
                commit('UPDATE_WORK', data.work);
            } catch (error) {
                throw Error(error)
            }
        },
        async delete({commit}, workId) {
            try {
                await this.$axios.delete(`/works/${workId}`);
                commit('DELETE_WORK', workId);
            } catch (error) {
                throw Error(error)
            }
        }
    },
    getters: {
        workIsExist: state => work => {
            console.log(state)
            return state.data.findIndex(element => element.id === work.id) !== -1
        }
    }
};
