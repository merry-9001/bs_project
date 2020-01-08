const state = {
    name: window.localStorage.getItem('eleToken') || '',
    isAdmin: window.localStorage.getItem('isAdmin') || 0,
    userHead: window.localStorage.getItem('userHead') || '',

    nickname: window.localStorage.getItem('nickname') || '',
    username: window.localStorage.getItem('username') || '',
    headphoto: window.localStorage.getItem('headphoto') || '',
};
const actions = {

};
const mutations = {
    USER_NAME(state, payload) {
        state.name = payload.name;
        state.isAdmin = payload.isAdmin;
        state.userHead = payload.userHead;
    },
    NAME(state, payload) {
        state.nickname = payload.nickname;
        state.username = payload.username;
        state.headphoto = payload.headphoto;
        // state.userHead = payload.userHead;
    }
    
};
export default {
    namespaced: true,
    state,
    actions,
    mutations
}