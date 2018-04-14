<template>
<div class = "ProjectDetail">
  <div class="row">
    <div class ="col s12">    
        <button v-on:click.stop="chamarListProject">callist</button>

          <h1 style="text-align:center"> {{projeto.name}} </h1>
          <br />    
        <p style="text-align:center"> {{projeto.description}}</p>
        
    </div>         
        <br />
  </div>
</div>
</template>

<script>
  export default {
  data(){
    name: 'ProjectDetail'
    return {
      projects: {
        name: "",
        description: ""
        
      },
      projetos: "",

    }
  },
  methods: {
    getProject(){
      console.log("chegou aqui")
      this.$http.get("http://localhost:8000/projects/${projetos.id}",  { headers: { "content-type": "application/json" } }).then(result => {
      this.projetos = result.data;
      },
      error => {
          console.error(error);
      });
    }, 
    chamarListProject(){
      this.$emit('getId')
    }    
  },

}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
  color:    #132a71;
}

</style>
