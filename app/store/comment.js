export const state = () => ({
  comments: {},
})

export const getters = {
  comments: (state) => state.comments,
}

export const mutations = {
  setcomments(state, comments) {
    state.comment = comments
  },
}

export const actions = {
  async commentNew({ commit }, params) {
    await this.$axios
      .post(`/v1/articles/${params.id}/comments`, params)
      .then(() => {})
    // const comment = response.data
    // commit('setArticles', comment)
  },
  async fetchComments({ commit }, id) {
    await this.$axios.get(`/v1/articles/${id}/comments`).then((response) => {
      const comments = response.data
      debugger
      commit('setcomments', comments)
    })
  },
}
