<template>
  <div class="containWarp">
    <Breadcrumb class="breadcrumb"/>
    <el-card class="searchBox">
      <el-row :gutter="20">
        <el-col :span="6">
          <label>账户余额</label>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="tableCard">
    </el-card>
    <CreateRedPackage v-if="createFlag" :flag="createFlag" @close="close" @submit="submit"/>
    <BatchCreatRedPackage v-if="batchCreatFlag" :item="item" :flag="batchCreatFlag" @close="close" @submit="submit"/>
  </div>
</template>

<script>
import { getListApi } from '../utils/api/pay.js'
import { reset, dateFtt } from '../utils/utils.js'
import CreateRedPackage from '../components/RedPackage/CreateRedPackage.vue'
import BatchCreatRedPackage from '../components/RedPackage/BatchCreatRedPackage.vue'

export default {
  name: 'redPackageList',
  data () {
    return {
      params: {
        query: null,
        page_index: 1,
        page_size: 10,
        sort_by: null,
        descending: null
      },
      tableData: [],
      total: 0,
      createFlag: false,
      multipleSelection: [],
      batchCreatFlag: false,
      item: {},
      loadList: []
    }
  },
  components: {
    CreateRedPackage,
    BatchCreatRedPackage
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getListApi(this.params).then(res => {
        console.log(res)
        if (res.code === 1000) {
          this.total = res.data.totalCount
          res.data.rows.map(v => {
            v.create_time = dateFtt('yyyy-MM-dd hh:mm:ss', new Date(v.create_time))
            v.update_time = dateFtt('yyyy-MM-dd hh:mm:ss', new Date(v.update_time))
          })
          this.tableData = res.data.rows
        }
      })
    },
    reset () {
      reset(this.params)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (page) {
      console.log(page)
    },
    handleCurrentChange (size) {
      console.log(size)
    },
    creat () {
      this.createFlag = true
    },
    close () {
      this.createFlag = false
      this.batchCreatFlag = false
    },
    submit: function () {
      this.createFlag = false
      this.batchCreatFlag = false
      this.params.page_index = 1
      this.getList()
    },
    batchCreatRedPackage (item) {
      this.item = item
      this.batchCreatFlag = true
    },
    detail (item) {
      getLoadApi({ id: item.id }).then(res => {
        if (res.code === 1000) {
          this.loadList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-icon-third-hongbao1, .el-icon-tickets{
    cursor: pointer;
    font-size: 16px;
    padding-left: 9px;
  }
</style>
