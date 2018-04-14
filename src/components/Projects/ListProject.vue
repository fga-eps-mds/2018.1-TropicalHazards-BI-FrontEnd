<template>
<div class = "ListProject">
  <div class="row">     
       <h1 style="text-align:center"> Projetos </h1>
    <div class ="col s6">    
            <ul class="collection">
                <li v-for="projeto in projetos" class="collection-item avatar">
                <span class="title"><a href="#/project/detail">{{ projeto.name }}</a></span>
                <p>Descrição do projeto </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
        </ul>
    </div>
    <div class ="col s6">    
            <ul class="collection">
                <li v-for="projeto in projetos" class="collection-item avatar">
                <span class="title"><a href="#/project/detail">{{ projeto.name }}</a></span>
                <p>Descrição do projeto </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
        </ul>
    </div>         
        <br />
  </div>
</div>
</template>

<script>
import ProjectDetail from '@/components/Projects/ProjectDetail'
 
  export default {
    components: {
    ProjectDetail,
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
