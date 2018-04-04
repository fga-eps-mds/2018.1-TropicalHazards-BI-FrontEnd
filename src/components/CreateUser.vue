<template>
  <div class="CreateUser">
      <input type="text" v-model="input.username" placeholder="Username" />
      <input type="text" v-model="input.password" placeholder="Password" />
      <input type="text" v-model="input.email" placeholder="Email" />
      <button v-on:click="sendData()">Send</button>
      <br />
      <br />
      <textarea>{{ response }}</textarea>
      <textarea>{{ users }} </textarea>
  </div>
</template>

<script>
    export default {
        name: 'CreateUser',
        data () {
            return {
                user: "",
                users: [],
                input: {
                    username: "",
                    password: "",
                    email: ""
                },
                response: ""
            }
        },
        mounted() {
            this.$http.get("http://localhost:8000/users/2/", {headers: {
              "Access-Control-Allow-Origin": "*"}}).then(response => {
                this.user = response.text();
            }, error => {
                console.error(error);
            });
        },
        created(){
            this.$http.get('http://localhost:8000/users/2').then(res => {
              this.users = res.body;
            });
        },
        methods: {
            sendData() {
              this.$http.post("https://localhost:8000/users", this.input, { headers: { "content-type": "application/json" } }).then(result => {
                  this.response = result.data;
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
