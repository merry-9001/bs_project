<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
@media (max-width: 700px) {
  body {
    font-size: 20px;
    // background-color: #bfa;
  }
  .carousel {
    width: 100%;
  }
  .table {
    width: 80%;
    margin: 0 auto;
  }
  .contaniner_table-qualification {
    width: 80%;
    margin: 0 auto;
  }
  .row-mobile{
    width:90%;
  }
  .video-img{
    width:50%;
  }
}
@media (min-width: 1000px) {
  body {
    font-size: 16px;
    // background-color: #bfa;
  }
  .carousel {
    width: 50%;
  }
  .table {
    width: 50%;
    margin: 0 auto;
  }
  .contaniner_table-qualification {
    width: 40%;
    margin: 0 auto;
  }
  .row-mobile{
    width:60%;
  }
    .video-img{
    width:100%;
  }
}
</style>
