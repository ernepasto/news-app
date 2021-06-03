import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

Vue.use(Vuex);

const user = {
    state: {
        name: null,
        surname: null,
        email: null,
        date: null
    },
    mutations: {
        insertUser(state, userData) {
            state.name = userData.name;
            state.surname = userData.surname;
            state.email = userData.email;
            state.date = userData.date;
        },
        removeUser(state) {
            state.name = null;
            state.surname = null;
            state.email = null;
            state.date = null;
        }
    },
    getters: {
        getUser: (state) => {
            const user = {
                name: state.name,
                surname: state.surname,
                email: state.email,
                date: state.date
            }
            return user;
        },
        isStored: (state) => {
            return ((state.email) ? true : false);
        },
    },
    actions: {
        signup({ commit }, credentials) {
            fetch('http://localhost:8083/api/users/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: credentials
            })
            .then(async data => {
                return { data: await data.json(), status: data.status };
            })
            .then(response => {
                if (response.status !== 200) {
                    Vue.$toast.warning(response.data.message);
                } else {
                    const data = JSON.parse(credentials);
                    commit('insertUser', data);
                    router.replace({ name: 'PageNews' });
                }
            })
            .catch((error) => {
                Vue.$toast.error('server error, try later');
                console.error('Registration error:', error);
            });
        },
        login({ commit }, credentials) {
            fetch('http://localhost:8083/api/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: credentials
            })
            .then(async data => {
                if (data.status === 200) return { data: await data.json(), status: data.status };
                else if (data.status === 406) return { data: await data.json(), status: data.status };
                else return { data: { message: 'invalid email or password' }, status: data.status };
            })
            .then(response => {
                if (response.status !== 200) {
                    Vue.$toast.warning(response.data.message);
                } else {
                    router.replace({ name: 'PageNews' });
                }
            })
            .catch((error) => {
                Vue.$toast.error('server error, try later');
                console.error('Login error:', error);
            });
        },
        logout({ commit }) {
            fetch('http://localhost:8083/api/users/logout', {
                method: 'GET',
                credentials: 'include'
            })
            .then(async data => {
                return { data: await data.json(), status: data.status };
            })
            .then(response => {
                commit('removeUser');
                Vue.$toast.success(response.data.message);
                router.replace({ name: 'PageHome' });
            })
            .catch((error) => {
                Vue.$toast.error('server error, try later');
                console.error('Logout error:', error);
            });
        },
        search({ commit }) {
            fetch('http://localhost:8083/api/users/getuser', {
                method: 'GET',
                credentials: 'include'
            })
            .then(async data => {
                return { data: await data.json(), status: data.status };
            })
            .then(response => {
                if (response.status === 200) {
                    const userData = response.data.message.user;
                    commit('insertUser', userData);
                }
            })
            .catch((error) => {
                Vue.$toast.error('server error, try later');
                console.error('Get user error:', error);
            });
        },
        update({ commit }, credentials) {
            fetch('http://localhost:8083/api/users/update', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: credentials
            })
            .then(async data => {
                if (data.status === 200) return { data: await data.json(), status: data.status };
                else if (data.status === 400) return { data: await data.json(), status: data.status };
                else return { data: { message: 'invalid password' }, status: data.status };
            })
            .then(response => {
                if (response.status !== 200) {
                    Vue.$toast.warning(response.data.message);
                } else {
                    Vue.$toast.success(response.data.message);
                    commit('insertUser', response.data.user);
                }
            })
            .catch((error) => {
                Vue.$toast.error('server error, try later');
                console.error('Get user error:', error);
            });
        },
        delete({ commit }, credentials) {
            fetch('http://localhost:8083/api/users/delete', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: credentials })
            })
            .then(async data => {
                if (data.status === 200) return { data: await data.json(), status: data.status };
                else if (data.status === 400) return { data: await data.json(), status: data.status };
                else return { data: { message: 'invalid password' }, status: data.status };
            })
            .then(response => {
                if (response.status !== 200) {
                    Vue.$toast.warning(response.data.message);
                } else {
                    Vue.$toast.success(response.data.message);
                    commit('removeUser');
                    router.replace({ name: 'PageHome' });
                }
            })
            .catch((error) => {
                Vue.$toast.error('server error, try later');
                console.error('Get user error:', error);
            });
        }
    }
};

export default new Vuex.Store({
    modules: {
        user
    }
});