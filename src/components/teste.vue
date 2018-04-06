<template>
    <div class="teste">
        <h1>Teste get {{ user }}</h1>
        <input type="text" v-model="input.username" placeholder="Username" />
        <input type="text" v-model="input.password" placeholder="Password" />
        <input type="text" v-model="input.email" placeholder="Email" />
        <button v-on:click="sendData()">Send</button>
        <br />
        <br />
        <textarea>{{ response }}</textarea>
    </div>
</template>

<script>
    export default {
        data () {
          name: 'teste'
            return {
                user: "",
                newUser: {
                    username: "",
                    password: "",
                    email: ""
                },
                response: ""
            }
        },
        mounted() {
            this.$http.get("https://localhost:8000/users/1").then(result => {
                this.user = result.body.username;
            }, error => {
                console.error(error);
            });
        },
        methods: {
            sendData() {
                this.$http.post("https://localhost:8000/users", this.newUser, { headers: { "content-type": "application/json" } }).then(result => {
                    this.response = result.data;
                }, error => {
                    console.error(error);
                });
            }
        }
    }
</script>
<style></style>
