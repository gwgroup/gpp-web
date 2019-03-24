<template>
  <el-dialog title="红包详情" :visible.sync="flag" width="80%" append-to-body :show-close="false"
    :close-on-click-modal="false">
    <el-table :data="list" border style="width: 100%" max-height="600">
      <el-table-column prop="money" sortable label="金额" width="180">
      </el-table-column>
      <el-table-column prop="batch_no" label="批次号" width="180">
      </el-table-column>
      <el-table-column prop="print" sortable label="是否打印">
        <template slot-scope="scope">
          <span v-if="scope.row.print === 0">未打印</span>
          <span v-if="scope.row.print === 1">已打印</span>
        </template>
      </el-table-column>
      <el-table-column prop="print" sortable label="是否使用">
        <template slot-scope="scope">
          <span v-if="scope.row.used === 0">未使用</span>
          <span v-if="scope.row.used === 1">已使用</span>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { reset } from '../../utils/utils.js'
  import { saveRedPackageApi } from '../../utils/api/redPackage'
  export default {
    name: 'loadRedPackage',
    props: {
      flag: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        params: {
        },
      }
    },
    created() {
      console.log(this.list)
    },
    methods: {
      close() {
        this.$emit('close')
      },
    }
  }
</script>