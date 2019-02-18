<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
body, html{
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.containWarp{
  width: 100%;
  height: 100%;
}
.searchBox{
  margin-bottom: 12px;
  label{
    width: 80px;
    text-align: right;
    display: inline-block;
    padding-right: 9px;
  }
  .searchButton{
    min-width: 180px;
    text-align: right;
  }
  .searchInput{
    width: 200px;
  }
}
.placeholder{
  height: 10px;
}
.tableCard{
  margin-top: 12px;
  .el-card__body{
    padding: 0;
  }
  .tableHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pagination{
    padding: 12px;
    text-align: right;
  }
}
.breadcrumb{
  padding-bottom: 24px;
  padding-top: 12px;
}
.breadcrumb .el-breadcrumb__inner{
  color: teal;
}
</style>
