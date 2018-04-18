<template>
<div class = "ListProject">
  <div class="row">
       <h1 style="text-align:center"> Projetos </h1>
    <div class ="col s6">
            <ul class="collection">
                <li v-for="project in projects" :key="project.id" class="collection-item avatar">
                  <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }">
                    <span class="title">{{project.id}}{{ project.name }}</span>
                    <p>Descrição do projeto </p>
                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                  </router-link>

            </li>
        </ul>
        <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Open Modal!
    </button>

    <modal
      v-show="isModalVisible"
      @close="closeModal"
    />
    </div>
    <!-- <div class ="col s6">
            <ul class="collection">
                  <li v-for="project in projects" :key="project.id" class="collection-item avatar">
                    <router-link :to="{ name: 'PŕojectDetail', params: { id: project.id } }">
                      <span class="title">{{ project.name }}</span>
                      <p>Descrição do projeto </p>
                      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                    </router-link>
                  </li>
        </ul>
    </div> -->

    <br />
  </div>
</div>
</template>

<script>
import ProjectDetail from '@/components/Projects/ProjectDetail'
import SecondNavBar from '@/components/Utils/SecondNavBar'
import {mapGetters} from 'vuex'
import modal from '@/components/Modals/modal.vue';

  export default {
    components: {
    ProjectDetail,
    'secondnav': SecondNavBar,
     modal
  },
     computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  data(){
    name: 'ListProject'
    return {
      projects: {
        name: "",
        description: ""

      },
      isModalVisible: false,
      projetos: "",
      frase: '',

    }
  },

  methods: {
    getProject(){
      this.$http.get("http://localhost:8000/projects/",  { headers: { "content-type": "application/json" } }).then(result => {
        this.projects = result.data;
      },
      error => {
          console.error(error);
      });
    },

  },

  beforeMount(){
    this.getProject()
 },

}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}

</style>
