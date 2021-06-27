const state = {
    isLogin: false,
    userId: null,
    nick: null,
    sign: null
};

const getters = {
    isLogin: (state) => state.isLogin,
    userInfo: (state) => {
        return {
            userId: state.userId,
            nick: state.nick,
            sign: state.sign
        };
    }
};

const mutations = {
    userStatus(state, flag){
        state.isLogin = flag;
    },
    userData(state, data){
        state.userId = data.userId;
        state.nick = data.nick;
        state.sign  = data.sign;
    }
};

const actions = {
    userLogin({ commit }, flag) {
        commit("userStatus", flag);
    },
    userInfoStorage({ commit }, data) {
        commit("userData", data);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};