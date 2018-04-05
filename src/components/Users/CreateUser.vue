<template>
  <div class="CreateUser">
      <input type="text" v-model="input.username" placeholder="Username" />
      <input type="password" v-model="input.password" placeholder="Password" />
      <input type="text" v-model="input.email" placeholder="Email" />
      <button v-on:click="sendData()">Send</button>
      <button v-on:click="getData()">Get</button>
      <button v-on:click="deleteData()">delete</button>

      <br />
      <br />

      <textarea >{{ response_get }}</textarea>
      
  </div>
</template>

<script>

    export default {
        name: 'CreateUser',
        components:{
        },
        data () {
            return {

                input: {
                    username: "",
                    password: "",
                    email: ""
                },
                response_get: "",
                response_post:""
            }
        },
        methods: {
            sendData() {
              this.$http.post('http://localhost:8000/users/', this.input, { headers: { "content-type": "application/json" } }).then(result => {
                  this.response_post = result.data;
                }, error => {
                    console.error(error);
                });
            },
              getData() {
              this.$http.get('http://localhost:8000/users/', { headers: { "content-type": "application/json" } }).then(result => {
                  this.response_get = result.data;
                }, error => {
                    console.error(error);
                });
            },
              deleteData() {
              this.$http.delete('http://localhost:8000/users/26', { headers: { "content-type": "application/json" } }).then(result => {
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
