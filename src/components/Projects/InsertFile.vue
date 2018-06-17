<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="PostFile()">Submit</button>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import axios from "axios"
import SideBar from "@/components/Utils/SideBar"
export default {

    components: {
        "sidebar": SideBar
    },
    data(){

        return {
            project: {
                user: "",
                name: "",
                description: ""
            },

            user: {
                username: "",
                email: "",
                password: ""
            },

            projetos: "",
            file: ""
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount() {
        this.loadUserInfo()
        this.loadProject()
        this.testToken()

    },
    methods: {

        handleFileUpload() {
            this.file = this.$refs.file.files[0]
        },
        upload() {
            axios({ method: "POST", "url": "http://localhost:8000/import/", "data": this.files, "headers": {"Content-Disposition": "attachment; filename=this.files[0].name"} }).then(result => {
                console.dir(result.data)
            }, error => {
                console.error(error)
            })
        },
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        loadProject (){
            this.project.user = this.currentUser.id
        },
        PostFile (){
            let formData = new FormData()
            formData.append("file", this.file)
            axios.post("http://localhost:8000/import/", formData, { headers: {"Content-Type": "multipart/form-data",   } }
            ).then(result => {
                this.postSucess(result)
            },
            error => {
                error.log(error)
            })
        },

        postSucess() {
            window.alert("Projeto criado com Sucesso")
            this.$router.replace("/home")
        },

        CreateFail () {
            window.confirm("Falha na criação do projeto")
        },

        testToken(){
            this.$http.post("obtain-token/", { "username": this.user.username, "password": "senhabanda"}).then(result => {
                localStorage.token = result.data.token
            })
        },
        modalScript() {
            (document).ready(function(){
                (".modal").modal()
            });

            (document).ready(function(){
                ("select").formSelect()
            })
        }
    },
}
</script>

<style lang="scss" scoped>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}
</style>
