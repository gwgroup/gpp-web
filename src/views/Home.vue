<template>
  <div class="warp">
    <Header :userLoad="userLoad" />
    <Menus />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { getUserLoad } from '../utils/api/user'
import Header from '../components/Comment/Header'
import Menus from '../components/Comment/Menus'
export default {
  name: 'home',
  data () {
    return {
      userLoad: {}
    }
  },
  components: {
    Header,
    Menus
  },
  mounted () {
    getUserLoad().then(res => {
      if (res.code === 1000) {
        this.userLoad = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .warp{
    height: 100%;
    width: 100%;
    position: absolute;
    .container{
      position: absolute;
      padding-top: 64px;
      padding-left: 220px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      margin: 16px;
    }
  }
</style>
