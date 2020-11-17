import userInfoApi from "@/api/userInfo"
import { getToken, setToken, removeToken } from "@/utils/auth"

const state = {
  token: getToken(),
  pageTitle: 'bitBesa',
  isMobile: false,
  noheader: true,
  nofooter: false,
  isToken:'',//是否登录
  // personalInfo:''//个人信息
}
const mutations = {
 
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_PAGE_TITLE: (state, pthNumIitem) => {
    state.pageTitle = pthNumIitem
  },
  SET_IS_MOBILE: (state, isMobile) => {
    state.isMobile = isMobile
  },
  SET_IS_TOKEN: (state, isToken) => {
    state.isToken = isToken
  },
  // SET_PERSONAL_INFO: (state, personalInfo) => {
  //   state.personalInfo = personalInfo
  // }
}

const actions = {
  /**
   *@desc 页面title
   */
  setPageTitle({ commit }, title) {
    document.title = title || 'bitbase'
    commit("SET_PAGE_TITLE", title)
  },
  /**
   *  登陆
   * @param {*} userInfo  登陆信息
   */
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      userInfoApi
        .login(userInfo)
        .then(response => {
          commit("SET_TOKEN", response.data.data)
          localStorage.setItem("token", response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取用户信息
   */
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      debugger
      userInfoApi
        .getUserInfo(state.token)
        .then(res => {
          commit("SET_USER_INFO", res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "")
      localStorage.removeItem("token")
      // removeToken()
      resolve()
    })
  },
  /**
   *@desc 页面title
   */
  setPageState({ commit }, state) {
    commit("SET_PAGE_STATE", state)
  },
  //是否有token
  setIsToken({ commit }, state) {
    commit('SET_IS_TOKEN', state)
  },
  // //个人信息
  // setPersonalInfo({ commit }, state) {
  //   commit('SET_PERSONAL_INFO', state)
  // },
 

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
