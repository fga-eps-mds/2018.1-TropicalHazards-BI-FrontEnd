<template>
  <div class="wrapper toggled">
    <sidebar/>
    <p> {{ user.username }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
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
        ...mapGetters({
            currentUser: "currentUser",
            getProjects: "getProjects",

        })
    },
    beforeMount () {
        this.loadUserInfo()
        this.loadUsers()
        this.loadProjects()
    },
    methods: {
        deleteProject () {
            this.$http.delete("project/" + this.projeto.id + "/",
                { headers: { "Authorization": "JWT " + localStorage.token } })
            window.alert("projeto deletado")
        },
        loadProjects () {
            this.$store.dispatch("loadProjects")
        },
        loadUsers () {
            this.$store.dispatch("loadUsers")
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

        Logout () {
            this.$store.dispatch("logout")
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
