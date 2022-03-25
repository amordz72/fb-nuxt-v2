<template>
  <div>
    posts{{  $route.params.id }}
  </div>
</template>

<script>
export default {
validate(data){
 return ! isNaN(data.params.id)
},
}
</script>

<style>

</style>
