<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <br>
    <div class="new_line">
      <input class="new_line inputField" v-model="handle" placeholder="Zvolte si meno">
    </div>
    <div class="new_line chat" v-for="(message, index) in msgs" :key="index" v-show="msgs.length > 1">
      <p><strong>{{message.handle}} :</strong> {{message.message}}</p>
      <!--<p><em>{{someoneIsTyping}}</em></p>-->
    </div>
    <div class="new_line elements">
      <textarea v-model="message" placeholder="Napiste spravu">
    </textarea>
      <button v-on:click="showEmoji = !showEmoji"> Emoji</button>
    </div>
    <div class="new_line elements">
      <button v-on:click="sendMessage()"
              v-show="message != '' && message.length >= 2"> Odoslat spravu
      </button>
      <VEmojiPicker v-show="showEmoji == true" @select="selectEmoji" />

    </div>
  </div>
</template>

<script>
  import { VEmojiPicker } from 'v-emoji-picker';
export default {
  /* eslint-disable no-debugger */
  name: 'App',
  data(){
      return{
        msgs: [{
          handle: 'Admin',
          message: 'Vitaj' //Musel dom nastavit nejaky prvy element do arrayu inak by zobrayilo prvu spravu a6 keby sa odosle dalsia
        }],
        handle: '',
        message: '',
        showEmoji: false
      }
  },
  components: {
    VEmojiPicker
  },
  methods: {
    selectEmoji(emoji) {
      console.log(emoji.data);
      this.message += emoji.data;
    },
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
  display: flex;
  margin-top:40px;
  justify-content: center;
}
.chat{
  display: flex;
  justify-content: center;
  padding: 0;
}
.inputField {
  border-bottom: 2px solid black;
}
  textarea{
    width: 300px;
    height: 200px;
  }
</style>
