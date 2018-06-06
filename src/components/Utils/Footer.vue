<template>
  <!-- Footer -->
  <footer class="page-footer font-small stylish-color-dark pt-4 mt-4">
    <!-- Footer Links -->
    <div class="container text-center text-md-left">
      <!-- Grid row -->
      <div class="row">
        <!-- Grid column -->
        <div class="col-md-4 mx-auto">
          <!-- Content -->
          <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Observ</h5>
          <p class="white">Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <!-- Grid column -->
        <hr class="clearfix w-100 d-md-none">
        <!-- Grid column -->
        <div class="col-md-4 mx-auto">
          <!-- Links -->
          <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

          <ul class="list-unstyled">
            <li>
              <a href="#!">Documentação</a>
            </li>
            <li>
              <a href="#!">GitHub</a>
            </li>
            <li>
              <a href="#!">Inicio</a>
            </li>
            <li>
              <a href="#!">Dashboard</a>
            </li>
          </ul>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>
    <!-- Footer Links -->
    <hr>
    <!-- Call to action -->
    <ul class="list-unstyled list-inline text-center py-3">
      <li class="list-inline-item">
        <h5 class="mb-1">Registre-se de graça</h5>
      </li>
      <li class="list-inline-item">
        <a
          href="#!"
          class="btn btn-primary btn-blue">Sign up!</a>
      </li>
    </ul>
    <!-- Call to action -->
    <hr>
    <!-- Copyright -->
    <div class="white footer-copyright text-left py-3">Linceça MIT © 2018 Copyright
    </div>
    <!-- Copyright -->
  </footer>
</template>

<script>
export default {
    data () {
        return {
            footerText: ""
        }
    }
}
</script>

<style lang="scss" scoped>
  footer {
    padding-top: 1em;
    padding-bottom: .3em;
    .row {
      margin: 0;
    }
    .row a {
      padding-top: 1.3em;
      padding-bottom: 1.3em;
      text-decoration: none;
      color: inherit;
      &:hover {
        background-color: #444;
        transition: all .4s ease-in-out;
      }
    }

    #license {
      font-size: .7em;
      margin-top: 4em;
    }
.list-unstyled{
  color: white;
}
.font-weight-bold{
  color: white;
}
.white{
  color:white;
}
  }
</style>
