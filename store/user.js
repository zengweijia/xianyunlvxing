export const state = () => {
  return { userInfo: {
    token: '',
    user: {
      nickname: '$神'
    }
  } }
}
export const mutations = {
  setUserInfo (state, data) {
    state.userInfo = data
  },
  clearUserInfo (state) {
    state.userInfo = {
      token: '',
      user: {}
    }
  }
}
export const actions = {
  login ({ commit }, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    }).then((res) => {
      const data = res.data
      commit('setUserInfo', data)
      return data
    })
  }
}
