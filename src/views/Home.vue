<template>
  <el-container class="warp">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="220px">Aside</el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  }
}
</script>

<style lang="scss" scoped>
  .warp{
    height: 100%;
  }
</style>
