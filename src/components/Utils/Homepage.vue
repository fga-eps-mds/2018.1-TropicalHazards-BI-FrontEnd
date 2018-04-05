<template>

 <div id="app">


      <div id="banner">
        <banner></banner>
        
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
import Banner from '@/components/Utils/Banner'
import CardsContent from '@/components/Utils/CardsContent'
import LocationMap from '@/components/Utils/LocationMap'
export default {
  name: 'Homepage',
  components: {
    
    Banner,
    CardsContent,
    LocationMap
    
  }
}

</script>


<style>

</style>
