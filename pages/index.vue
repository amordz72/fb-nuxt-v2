<template>
  <div class>
    <h1>{{ user }}</h1>
    <carousel></carousel>
  </div>
</template>

<script>
 


import Carousel from '~/components/Carousel.vue'
export default {
  components: { Carousel },
  name: 'IndexPage',
   computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
data(){
  return {
    user: []
  }
},
mounted(){

}
}

</script>
