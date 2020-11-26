export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_REVIEW(state, newWork) {
            state.data.push(newWork);
        },
        SET_REVIEWS(state, reviews) {
            state.data = reviews
        },
        UPDATE_REVIEW(state, editedWork) {
            state.data = state.data.map(review => {
                return review.id === editedWork.id ? editedWork : review;
            })
        },
        DELETE_REVIEW(state, reviewId) {
            state.data = state.data.filter(review => {
                if (review.id !== reviewId) {
                    return review;
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
                const {data} = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
            } catch (error) {
                throw Error(error)
            }
        },
        async fetch({commit}) {
            try {
                const {data} = await this.$axios.get("/reviews/420");
                commit("SET_REVIEWS", data);
            } catch (error) {
                throw Error(error)
            }
        },
        async update({commit}, review) {
            try {
                const formData = new FormData();
                Object.keys(review).forEach(item => {
                    formData.append(item, review[item]);
                })
                const {data} = await this.$axios.post(`/reviews/${review.id}`, formData);
                commit('UPDATE_REVIEW', data.review);
            } catch (error) {
                throw Error(error)
            }
        },
        async delete({commit}, reviewId) {
            try {
                await this.$axios.delete(`/reviews/${reviewId}`);
                commit('DELETE_REVIEW', reviewId);
            } catch (error) {
                throw Error(error)
            }
        }
    },
    getters: {
        reviewIsExist: state => review => {
            console.log(state)
            return state.data.findIndex(element => element.id === review.id) !== -1
        }
    }
};
