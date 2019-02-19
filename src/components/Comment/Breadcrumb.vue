<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in path" :key="item.text">{{item.text}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  data () {
    return {
      path: []
    }
  },
  created () {
    this.getPath()
  },
  methods: {
    getPath () {
      const arr = this.$route.meta.path.split('/')
      const obj = []
      arr.map(v => {
        obj.push({
          text: v,
          disabled: false
        })
      })
      obj[obj.length - 1].disabled = true
      console.log(obj)
      this.path = obj
    }
  }
}
</script>
