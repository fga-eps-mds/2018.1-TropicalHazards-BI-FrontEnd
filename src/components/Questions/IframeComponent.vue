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
        this.iframeUrl = process.env.METABASE_HOST + "/public/question/" + this.iframeUrl
    }
}
</script>

<style lang="scss" scoped>

</style>
