<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  
}
</script>

<style>



  *{
    margin: 0;
    padding: 0;
  }
  body,html,#app{
    width: 100%;
    height: 100%;
  }
  
  @media screen and (max-width:400px){
    body{
      zoom: 0.5;
    }
  }
</style>
