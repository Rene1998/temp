import Vue from 'vue';
import App from './App.vue';


//import socketio from 'socket.io';
//import VueSocketIO from 'vue-socket.io';

//export const SocketInstance = socketio('http://localhost:5000');

//Vue.use(VueSocketIO, SocketInstance);

import VueSocketIO from 'vue-socket.io'

//const options = { path: '/vue-fe/' }

Vue.use(new VueSocketIO({
      debug: true,
      //connection: SocketIO('http://localhost:5000', options)
      connection: 'http://localhost:5000'
    })
);

//socket io
/*import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: io('http://localhost:5000'),
    })
);*/




Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app')
