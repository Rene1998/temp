import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        messages:[{}],
        handle: '',
        message: '',
        isConnected: false,
    },
    mutations: {
        SOCKET_CONNECT(state) {
            console.log('socket connection established');
            state.isConnected = true;
        },

        SOCKET_DISCONNECT(state) {
            console.log('socket connection unestablished');
            state.isConnected = false;
        },

        SOCKET_CHAT(state, message) {
            state.messages.push(message);
            console.log(`received message: ${message}`);
        }
    },
    actions: {
        SOCKET_CHAT(message){
            this.$socket.emit(message);
        }
    },
    getters: {
    }
})