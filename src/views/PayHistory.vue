<template>
    <div class="containWarp">
      <Breadcrumb class="breadcrumb"/>
      <el-card class="searchBox">
        <el-row :gutter="20">
          <el-col :span="6">
            <label>查询</label>
            <el-input class="searchInput" size="small" v-model="params.query" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" class="placeholder">
          </el-col>
          <el-col :span="6" class="searchButton">
            <el-button type="primary">查询</el-button>
            <el-button type="success" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="tableCard">
        <div slot="header" class="tableHeader">
          <span>充值记录</span>
          <span class="tableOperation">
            <el-button type="primary" size="small" @click="creat">创建红包</el-button>
          </span>
        </div>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="act_name" label="活动名称" width="180">
          </el-table-column>
          <el-table-column prop="send_name" label="活动方" width="180">
          </el-table-column>
          <el-table-column prop="wishing" label="祝福语">
          </el-table-column>
          <el-table-column prop="create_time" label="活动创建时间">
          </el-table-column>
          <el-table-column prop="used_count" label="已使用次数">
          </el-table-column>
          <el-table-column prop="used_money" label="已花费金额">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="批量生成现金红包" placement="top">
                <i class="el-icon-third-hongbao1" @click="batchCreatRedPackage(scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
                <i class="el-icon-tickets" @click="detail(scope.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            background
            :total="total">
          </el-pagination>
        </div>
      </el-card>
      <CreateRedPackage v-if="createFlag" :flag="createFlag" @close="close" @submit="submit"/>
      <BatchCreatRedPackage v-if="batchCreatFlag" :item="item" :flag="batchCreatFlag" @close="close" @submit="submit"/>
    </div>
  </template>

<script>
import { getListApi, getLoadApi } from '../utils/api/pay.js'
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
