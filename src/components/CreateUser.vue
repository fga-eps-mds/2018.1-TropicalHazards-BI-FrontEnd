<template>
  <div class="CreateUser">
      <input type="text" v-model="input.firstname" placeholder="Username" />
      <input type="text" v-model="input.lastname" placeholder="Password" />
      <!-- <input type="text" v-model="input.email" placeholder="Email" /> -->
      <button v-on:click="sendData()">Send</button>
      <button v-on:click="getData()">Get</button>

      <br />
      <br />

      <textarea>{{ response_get }}</textarea>
      <textarea>{{ response_post }}</textarea>
      
  </div>
</template>

<script>
    export default {
        name: 'CreateUser',
        data () {
            return {
                user: "",
                users:[],
                input: {
                    firstname: "",
                    lastname: "",
                    // email: ""
                },
                response_get: "",
                response_post:""  
            }
        },
        
        methods: {
            sendData() {
              this.$http.post('https://httpbin.org/post', this.input, { headers: { "content-type": "application/json" } }).then(result => {
                  this.response_post = result.data;
                }, error => {
                    console.error(error);
                });
            },
              getData() {
              this.$http.get('https://httpbin.org/ip', this.input, { headers: { "content-type": "application/json" } }).then(result => {
                  this.response_get = result.data;
                }, error => {
                    console.error(error);
                });
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
