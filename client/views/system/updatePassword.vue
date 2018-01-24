<template>
  <div align="center" style="min-height: 1200px">
    <div style="width:90%" align="left">
      <br>
      <div style="width: 95%">
        <el-form :model="updatePasswordForm" :rules="rules" ref="updatePasswordForm" label-width="200px" class="demo-ruleForm">
          <div>
            <el-form-item label="原登陆密码：" prop="oldPassword">
              <el-input v-model="updatePasswordForm.oldPassword" placeholder="请输入原登陆密码" style="width: 20rem"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="managerPassword">
              <el-input type="password" v-model="updatePasswordForm.managerPassword" placeholder="请输入新密码" style="width: 20rem"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="managerPasswordToo">
              <el-input type="password" v-model="updatePasswordForm.managerPasswordToo" placeholder="请确认新密码" style="width: 20rem"></el-input>
            </el-form-item>
          </div>
          <br>
          <div align="left" style="margin-left: 10rem">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定修改</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!--添加成功提示框-->
    <el-dialog :visible.sync="updatePasswordVisible" width="30%" :modal-append-to-body="false" center>
      <div align="center">
        <i class="el-icon-success"></i><br>
        <span>
          修改密码成功！<br>
          5s之后自动关闭
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  var api = Vue.prototype.api
  export default {
    components: {
      axios,
      api
    },
    data () {
      return {
        updatePasswordVisible: false,
        updatePasswordForm: {
          oldPassword: '',
          managerPassword: '',
          managerId: '',
          managerPasswordToo: ''
        },
        rules: {
          oldPassword: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
          managerPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'}
          ],
          managerPasswordToo: [
            { required: true, message: '请重复输入新密码', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
    },
    updated: function () {
    },
    methods: {
      // 获取cookie
      getCookie: function (cname) {
        var name = cname + '='
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') c = c.substring(1)
          if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
        }
        return ''
      },
      /** 定时执行函数 */
      timeMsg () {
        var that = this
        console.log('开始执行定时任务')
        setTimeout(function () {
          console.log('定时任务 Go!')
          that.updatePasswordVisible = false
          that.$router.push({path: '/login'})
        }, 5000)
        console.log('执行定时任务结束')
      },
      onSubmit () {
        this.$refs.updatePasswordForm.validate((valid) => {
          if (valid) {
            var that = this
            var BODY = {
              oldPassword: that.updatePasswordForm.oldPassword,
//          managerId: 6,
              managerPassword: that.updatePasswordForm.managerPassword
            }
            console.log(BODY)
            if (that.updatePasswordForm.managerPassword === that.updatePasswordForm.managerPasswordToo) {
              axios.post('/api/systemManager/updatePassword', BODY, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Admin ' + that.getCookie('admin_token')
                }
              }).then(function (response) {
                if (response.data === true) {
                  that.updatePasswordForm.oldPassword = ''
                  that.updatePasswordForm.managerPassword = ''
                  that.updatePasswordForm.managerPasswordToo = ''
                  that.updatePasswordVisible = true
                  that.timeMsg()
                  that.$refs.updatePasswordForm.resetFields()
                }
              }).catch(function (error) {
                console.log(error)
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
