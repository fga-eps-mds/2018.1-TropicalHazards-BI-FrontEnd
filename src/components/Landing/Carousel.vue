<template>
  <div>
    <b-carousel
      id="carousel1"
      :interval="4000"
      v-model="slide"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
        img-width="50"
        img-height="50"
      />

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>
export default {
    data () {
        return {
            slide: 0,
            sliding: null
        }
    },
    methods: {
        // onSlideStart (slide) {
        onSlideStart () {
            this.sliding = true
        },
        // onSlideEnd (slide) {
        onSlideEnd () {
            this.sliding = false
        }
    }
}
</script>
