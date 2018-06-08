<template>
  <div class="wrapper toggled">
    <sidebar/>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import SideBar from "@/components/Utils/SideBar"

export default {

    components: {
        "sidebar": SideBar,
    },
    data () {
        return {
            projects: [],
            tags: {
                name: "",
                slug: ""
            },
            user: {
                username: "",
                password: "",
                email: ""
            },
            isModalVisible: false
        }
    },

    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    beforeMount () {
        this.loadUserInfo()
        this.getProject()
        this.menuMobile()
    },
    methods: {
        deleteProject () {
            this.$http.delete("project/" + this.projeto.id + "/",
                { headers: { "Authorization": "JWT " + localStorage.token } })
            window.alert("projeto deletado")
        },
        getProject () {
            this.$http.get("projects/", { headers: { "content-type": "application/json" } }).then(result => {
                this.projects = result.data
            },
            error => {
                error.log(error)
            })
        },

        filterByTag () {
            this.$http.get("projects/" + "?tags__name=&tag_name=" + this.tags.name,
                { headers: { "content-type": "application/json" } }).then(result => {
                this.projects = result.data
            },
            error => {
                error.log(error)
            })
        },

        loadUserInfo () {
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },
        showModal () {
            this.isModalVisible = true
        },
        closeModal () {
            this.isModalVisible = false
        },
        modalScript () {
            $(document).ready(function () {
                $(".modal").modal()
            }),
            $(document).ready(function () {
                $("select").formSelect()
            })
        },
        menuMobile () {
            $(document).ready(function () {
                $(".sidenav").sidenav()
            })
        },
        Logout () {
            this.$http.post("rest-auth/logout/", this.user, { headers: { "content-type": "application/json"} })
            this.$store.dispatch("logout")//trigger da ação de login implementado em store/auth.js
            delete localStorage.token
            this.$router.replace("/")

        },
    },

}
</script>

<style>
#wrapper {
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#wrapper.toggled {
  padding-left: 250px;
}
</style>
