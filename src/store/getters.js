const getters = {
  token: state => state.user.token,
  isMobile: state => state.user.isMobile,
  pageTitle: state => state.user.pageTitle,
  noheader: state => state.user.noheader,
  nofooter: state => state.user.nofooter
}
export default getters
