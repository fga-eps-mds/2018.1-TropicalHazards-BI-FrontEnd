<template>
  <div id="background">
    <navbar />
    <div class="row">
      <sidebar class="col-md-2 sidebar"/>
      <div class="col col-md-10 content">
        <transition name="router-anim">
          <router-view />
        </transition>
      </div>
    </div>
    <div class="">
      <custom-footer/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"


import Sidebar from "@/components/Utils/Sidebar"
import Footer from "@/components/Utils/Footer"
import Navbar from "@/components/Utils/Navbar"

export default {

    components: {
        "sidebar": Sidebar,
        "navbar": Navbar,
        "custom-footer": Footer
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

  @import '../styles/base.scss';

  .row {
    margin-left: 0;
  }

  form {
    background-color: #eee;
    color: $text-color;
    padding: 2em;
    border-radius: 5px;
    margin-top: 2em;
    margin-bottom: 2em;

    .btn {
      $btn-margins: 4px;
      margin-left: $btn-margins;
      margin-right: $btn-margins;
    }
  }

  .content {
    padding-left: 0;
    padding-right: 0;
  }

  .sidebar {
    padding-left: 0;
  }

</style>
