<template>
<div class = "CreateProject">
  <div class="row">
    <div class ="col s12">    
          <div class="container center-align">
          <h1> Criar Projeto </h1>
          <input type="text" v-model="project.name" placeholder="Nome do projeto" />
          <input type="text" v-model="project.description" placeholder="Descrição" />
          <a v-on:click="PostProject()" class="waves-effect waves-light btn-large">Criar projeto</a>
         </div>         
        <br />
     </div>
  </div>
</div>
</template>

<script>
  export default {
  data(){
    name: 'CreateProject'
    return {
      project: {
        name: "",
        description: ""
        
      },
      projetos: "",

    }
  },
  methods: {
    PostProject(){
      console.log("chegou aqui")
      this.$http.post("http://localhost:8000/projects/", this.project, { headers: { "content-type": "application/json" } }).then(result => {
      this.project = result.data;
      },
      error => {
          console.error(error);
      });
    },     
  }
}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
   color:    #132a71;
}

</style>
