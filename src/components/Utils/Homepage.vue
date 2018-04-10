<template>

 <div id="app">


      <div id="about">
        <About></About>
        
      </div>   
       <router-view />

      <div id="cardsContent">
        <CardsContent> </CardsContent>
      </div>

      <div id="LocationMap">
        <LocationMap></LocationMap>
      </div>


  </div>
</template>

<script>
import About from '@/components/Utils/About'
import CardsContent from '@/components/Utils/CardsContent'
import LocationMap from '@/components/Utils/LocationMap'
export default {
  name: 'Homepage',
  components: {
    
    About,
    CardsContent,
    LocationMap
    
  }
}

</script>


<style>

</style>
