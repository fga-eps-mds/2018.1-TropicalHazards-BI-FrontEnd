<template>
   <div id="sidebar" class="hide-on-small-only col m1 center-align grey lighten-4">
      <ul class="">
        <a href="" class="">
          <img src="https://via.placeholder.com/60x60" alt="" class="responsive-img circle center" />
        </a>
        <a href="#/home" class="">
          <li class="">
            <p> {{currentUser.name}}</p>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Home">
            <span class="fa fa-home"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Projetos">
            <span class="fa fa-th"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped"  data-position="right" data-tooltip="Observatórios">
            <span class="fa fa-area-chart"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped"  data-position="right" data-tooltip="Dados">
            <span class="fa fa-cubes"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped"  data-position="right" data-tooltip="Gerenciar perfil">
            <span class="fa fa-gear"></span>
          </li>
        </a>
        <a href="" class="sidebar-icon">
          <li class="tooltipped" data-position="right" data-tooltip="Sair">
            <span class="fa fa-sign-out"></span>
          </li>
        </a>
        <a href="#/edituser" class="">
          <li class="">
            <p> Editar Perfil</p>
          </li>
        </a>
        <a href="#/deleteuser" class="">
          <li class="">
            <p> Deletar Perfil</p>
          </li>
        </a>
        <hr>
      </ul>

   </div>


</template>


<script>
import {mapGetters} from 'vuex'

export default {

   computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  }

}


</script>



<style>

</style>
