<template>
<div class = "app">
  <secondnav></secondnav>
  <div class="row">
       <h1 style="text-align:center"> Projetos </h1>
    <div class ="col s12">
            <ul class="collection">
                <li v-for="projeto in projetos" class="collection-item avatar">
                <span class="title"><a href="#/project/detail">{{ projeto.name }}</a></span>
                <p>Descrição do projeto </p>
            </li>
        </ul>
    </div>
  </div>
</div>
</template>

<script>
import ProjectDetail from '@/components/Projects/ProjectDetail'
import SecondNavBar from '@/components/Utils/SecondNavBar'
import {mapGetters} from 'vuex'

  export default {
    components: {
    ProjectDetail,
    'secondnav': SecondNavBar
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
      projetos: "",
      frase: '',

    }
  },

  methods: {
    getProject(){
      console.log("chegou aqui")
      this.$http.get("http://localhost:8000/projects/",  { headers: { "content-type": "application/json" } }).then(result => {
      this.projetos = result.data;
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
