<template>
  <div id="background">
    <navbar />
    <div class="row">
      <button
        id="sidebar-toggle-btn"
        class="btn btn-block text-center col d-block d-sm-none dark-bg"
        @click="toggleSidebar()">
        {{ sidebarAction }} menu
      </button>
      <sidebar
        :class="{'d-none d-lg-block': !sidebarVisibility}"
        class="col-md-3 col-lg-2 sidebar"/>
      <div class="col-12 col-md-9 col-lg-10 content">
        <transition name="router-anim">
          <router-view />
        </transition>
        <div class="bottom">
          <custom-footer/>
        </div>
      </div>
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
            sidebarVisibility: false,
            sidebarAction: "Mostrar"
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

        toggleSidebar () {
            this.sidebarVisibility = !this.sidebarVisibility
            if (this.sidebarVisibility) {
                this.sidebarAction = "Ocultar"
            }
            else {
                this.sidebarAction = "Mostrar"
            }
        }
    },

}
</script>

<style lang="scss">
  @import '../styles/base.scss';
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


  .row {
    margin-left: 0 !important;
  }

  .col-lg-10 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .content {
    padding-left: 0;
    padding-right: 0;

    .container-fluid {
      min-height: 75vh !important;
    }
  }

  .bottom {
    display: block;
    bottom: 0;
  }

  .sidebar {
    padding-left: 0;
  }

  #sidebar-toggle-btn {
    border-radius: 0;
    border: 1px solid #666;
  }

</style>
