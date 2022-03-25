<template>
  <div  >
    <Head></Head>
    <Navbar></Navbar>
    <nuxt></nuxt>
    <Footer></Footer>
  </div>
</template>

<script>








import Head from '~/components/Head.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: { Head, Footer },

}
</script>

<style>
</style>
