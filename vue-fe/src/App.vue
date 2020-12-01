<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <br>
    <input v-model="handle" placeholder="Zvolte si meno">
    <div v-for="message in msgs" :key="message.message" v-show="msgs.length > 1">
      <p><strong>{{message.handle}} :</strong> {{message.message}}</p>
      <p><em>{{someoneIsTyping}}</em></p>
    </div>
    <input v-model="message" v-on:keydown="typing()" placeholder="Napiste spravu" >
    <button :click="sendMessage()" v-show="message != '' && message.length >= 2">Odoslat spravu</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return{
        msgs: [{}],
        handle: '',
        message: ''
      }
  },
  sockets: {
    //Spustenie pri pripojeni
    connect() {
      console.log('socket connected')
      },
  },
  methods: {
      //Poslanie spravy
      sendMessage() {
        this.$socket.emit('chat', this.handle)
      },
      //Emitovanie, ci dany user pise alebo nie
      typing() {
        // eslint-disable-next-line no-debugger
        debugger
        this.$socket.emit('typing', this.handle)
      }
  },
  computed:{
      //Zistovanie, ci niekto na servery nieco pise, ak ano zobrayi to jeho meno
      someoneIsTyping(){
        var temp;
        this.sockets.subscribe('typing', (data) => {
          if( data.handle != '' || null || undefined){
            temp = data.handle+' is typing a message ...';
          }
          else{
            temp = '';
          }
        })
        return temp;
      }
  },
  mounted() {


      //Pridavanie sprav do arrayu
      this.sockets.subscribe('chat', (data) => {
        console.log(data)
        if(data.message & data.handle != null || undefined || '') {
          this.msgs.push({
            'message': data.message,
            'handle': data.handle
          });
        }
      })
  }

}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
