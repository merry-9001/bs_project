<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="less">
html,body,#app {
  width: 100%;
  height: 100%;
  margin:0;
}
         @media  (max-width:700px){
             body{
                font-size:20px;
                background-color: #bfa;
             }
         }
         @media  (min-width: 1000px) {
             body{
                font-size:16px;
                background-color: #bfa;
             }
         }
</style>
