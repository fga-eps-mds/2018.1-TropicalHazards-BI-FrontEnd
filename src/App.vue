<template>
  <div id="app">
    <router-view />

  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.navbar {
  background-color: #2b4a6ef1;
}
.page-footer{
  background-color:#1b1b1b;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: absolute;
  width: 100%;


}
.footer-copyright{
  background-color:#242424;
}

a {
  color: inherit !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  padding: .5em;
  margin: 0 !important;
}

.row {
  max-width: 100%;
}

.sidebar-icon li {
  font-size: 2em;
  margin-top: .5em;
  margin-bottom: .5em;
}

.card-title {
  font-weight: bold !important;
  color: #5252ff;
}

.header {
  border-bottom: 1px solid #999;
}

.custom-container {
  max-width: 100%;
  padding-right: 5%;
  padding-left: 5%;
}

#content {
  padding: 0;

}

#content .header h3 {
  margin: 0;
  padding: .3em;
  position: static;
}

#sidebar {
  height: 100%;
  border-right: 1px solid #999;
  position: relative;
  color: #333;
}

#projects {
  font-size:10px;
}

#detail {
  font-size:10px;
}

</style>
