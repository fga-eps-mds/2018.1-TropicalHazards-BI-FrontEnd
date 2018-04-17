<template>
<div class = "ProjectDetail">
  <div class="row">
    <div class ="col s12">
      <h1 style="text-align:center"> {{project.name}}</h1>
      <br />
      <p style="text-align:center"> {{project.description}}</p>
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
      project: {
        id: "",
        user: "",
        name: "",
        description: "",
      },
      linkid: ""
    }
  },
  created () {
    this.$http.get('http://localhost:8000/projects/' + this.$route.params.id + '/',  { headers: {"Authorization": "JWT " + localStorage.token } }).then(result => {
      this.project = result.data;
      },
      error => {
          console.error(error);
      });

  },
  methods:{
  },

}
</script>

<style>

::placeholder { /* Most modern browsers support this now. */
  color:    #132a71;
}

</style>
