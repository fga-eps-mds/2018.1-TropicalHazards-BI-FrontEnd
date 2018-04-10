<template>
<div class = "CreateProject">

  <div class="row">
    <div class ="col s12">
    
      <div class="row">
      
        <div class="col s12">
          <h1> Criar Projeto </h1>
            <h2> {{ token }}</h2>      
          <input type="text" v-model="project.name" placeholder="Nome do projeto" />
          <input type="text" v-model="project.description" placeholder="Descrição" />
          <button v-on:click="PostProject()">Criar projeto</button>
        </div>    
          
        <br />
        <br />
     </div>
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
      this.$http.post("http://localhost:8000/projects", this.project, { headers: { "content-type": "application/json" } }).then(result => {
      this.token = result.data;
      },
      error => {
          console.error(error);
      });
      

    },

    GetProject(){
      console.log("chegou aqui")
      this.$http.get("http://localhost:8000/projects", this.project, { headers: { "content-type": "application/json" } }).then(result => {
      this.token = result.data;
      },
      error => {
          console.error(error);
      });
      
    }
  }
}


</script>

<style>

.row{
  text-align: center;
}


</style>
