<template>
    <el-dialog title="创建红包" :visible.sync="flag" width="30%" append-to-body :show-close="false" :close-on-click-modal="false"	>
        <el-form :model="params" status-icon :rules="rules" ref="form" label-width="80px">
          <el-form-item label="活动名称" prop="act_name">
            <el-input v-model="params.act_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动方" prop="send_name">
            <el-input v-model="params.send_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="祝福语" prop="wishing">
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
    return {
      params: {
        act_name: null,
        send_name: null,
        wishing: null
      },
      rules: {
        act_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        send_name: [
          { required: true, message: '请输入活动方', trigger: 'blur' },
        ],
        wishing: [
          { required: true, message: '请输入祝福语', trigger: 'blur' },
        ],
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
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>
