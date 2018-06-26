<template>
  <div>
    <iframe
      :src="iframe"
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
    computed: {
        iframe(){
            return process.env.METABASE_HOST + "/public/question/" + this.iframeUrl + this.iframeUrl
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
