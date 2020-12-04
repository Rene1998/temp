<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <br>
    <div class="new_line elements ">
      <input class="new_line elements" v-model="handle" placeholder="Zvolte si meno">
    </div>
    <div class="new_line elements" v-for="(message, index) in msgs" :key="index" v-show="msgs.length > 1">
      <p><strong>{{message.handle}} :</strong> {{message.message}}</p>
      <!--<p><em>{{someoneIsTyping}}</em></p>-->
    </div>
    <div class="new_line elements">
      <textarea v-model="message" placeholder="Napiste spravu">
    </textarea>
    </div>
    <div class="new_line elements">
      <button v-show="message != '' && message.length >= 2"
                 :click="sendMessage()"> Odoslat spravu
      </button>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable no-debugger */
  name: 'App',
  data(){
      return{
        msgs: [],
        handle: '',
        message: ''
      }
  },
  sockets: {
    //Spustenie pri pripojeni
    connect() {
      console.log('socket connected')
    },
    disconnect(){
      console.log('socked disconnected')
    },
    chatResponse(data){
        var wasFound = this.msgs.find( (ele)=> {
          return ele.message === data.message;
        })
        if(!wasFound) {
          this.msgs.push(data);
          console.log(data.handle + data.message +'aaaaaaa')
        }else{console.log('Message already obtained')}
        console.log('Message was successfully received');
    }
  },
  methods: {
      //Poslanie spravy
      sendMessage() {
        if(this.handle && this.message != '' && this.message.length && this.handle.length >=2) {
          this.$socket.emit('chat', {
            handle: this.handle,
            message: this.message
          })
          console.log('sprava bola odoslana')
        }
        else{
          console.log('sendmessage err')
        }
      },
      //Emitovanie, ci dany user pise alebo nie
      /*typing() {
        this.$socket.emit('typing', this.handle)
      }*/
  },
  computed:{
      //Zistovanie, ci niekto na servery nieco pise, ak ano zobrayi to jeho meno
      /*someoneIsTyping(){
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
      }*/
  },
  mounted() {
    /*this.$socket.listener.subscribe('chat-response', (data) => {
      if(data.Response_code == 200){
      this.msgs.push(data.Response);
      console.log('Message was successfully received'+ data);
    }
    });*/
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
.new_line{
    clear:both;
}
.elements{
  margin-top:40px;
  text-align: center;
  border: black;
}
  textarea{
    width: 300px;
    height: 200px;
  }
</style>
