<template>
  <div>
    <iframe
      :src="iframeUrl"
      frameborder="0"
      width="600"
      height="400"
      allowtransparency />
  </div>
</template>

<script>
export default {
    props: {
        iframeUrl: {
            type: String,
            required: true
        }
    },
    created (){
        this.iframeUrl = "http://localhost:3000/public/question/" + this.iframeUrl
    }
}
</script>

<style>

</style>
