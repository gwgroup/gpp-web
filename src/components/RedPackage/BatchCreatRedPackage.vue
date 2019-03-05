<template>
  <el-dialog title="批量创建现金红包卡" :visible.sync="flag" width="30%" :before-close="handleClose" append-to-body>
    <el-form :model="params" status-icon :rules="rules" ref="form" label-width="70px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="params.act_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动方" prop="organizers">
        <el-input v-model="params.send_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="祝福语" prop="blessing">
        <el-input v-model="params.wishing"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
  </el-dialog>

</template>

<script>
import { reset } from '../../utils/utils.js'
import { saveRedPackageApi } from '../../utils/api/redPackage'
export default {
  name: 'createRedPackage',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validateActName = (rule, value, callback) => {
      if (value) {
        callback(new Error('请输入活动名'))
      } else {
        callback()
      }
    }
    const validateSendName = (rule, value, callback) => {
      if (value) {
        callback(new Error('请输入活动方'))
      } else {
        callback()
      }
    }
    const validateWishing = (rule, value, callback) => {
      if (value) {
        callback(new Error('请输入祝福语'))
      } else {
        callback()
      }
    }
    return {
      params: {
        act_name: null,
        send_name: null,
        wishing: null
      },
      rules: {
        name: [
          { validator: validateActName, trigger: 'blur' }
        ],
        organizers: [
          { validator: validateSendName, trigger: 'blur' }
        ],
        blessing: [
          { validator: validateWishing, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close () {
      reset(this.params)
      this.$emit('close')
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveRedPackageApi(this.params).then(res => {
            if (res.code === 1000) {
              this.$emit('submit')
              reset(this.params)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭, 数据将不保存？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
