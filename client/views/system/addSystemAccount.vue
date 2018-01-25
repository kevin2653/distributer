<template>
  <div align="center" style="min-height: 1200px">
    <div style="width:90%" align="left">
      <br>
      <div style="margin-right: 5rem" align="right">
        <a @click="returnToUpLevel">返回</a>
      </div>
      <div style="width: 95%">
        <el-form :model="addAcountForm" :rules="rules" ref="addAcountForm" label-width="200px" class="demo-ruleForm">
          <div>
            <el-form-item label="用户姓名：" prop="managerName">
              <el-input v-model="addAcountForm.managerName" placeholder="请输入用户姓名" style="width: 20rem"></el-input>
            </el-form-item>
            <el-form-item label="账号：" prop="managerAccount">
              <el-input v-model="addAcountForm.managerAccount" placeholder="请输入用户邮箱" style="width: 20rem"></el-input>
            </el-form-item>
            <el-form-item label="登陆密码：" prop="managerPassword">
              <el-input type="password" v-model="addAcountForm.managerPassword" placeholder="请输入6位密码" style="width: 20rem"></el-input>
            </el-form-item>
          </div>
          <br>
          <div align="left" style="margin-left: 10rem">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">添加账号</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!--添加成功提示框-->
    <el-dialog :visible.sync="addAccountVisible" width="30%" :modal-append-to-body="false" center>
      <div align="center">
        <i class="el-icon-success"></i><br>
        <span>
          添加账号成功！<br>
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
        systemAccountForm: {},
        addAccountVisible: false,
        addAcountForm: {
          managerName: '',
          managerAccount: '',
          managerPassword: ''
        },
        rules: {
          managerName: [
            {required: true, message: '请输入收款开户名称', trigger: 'blur'}
          ],
          managerAccount: [
            {required: true, message: '请输入账号', trigger: 'change'}
          ],
          managerPassword: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        }
      }
    },
    created: function () {
      this.systemAccountForm = JSON.parse(this.$route.query.systemAccountForm)
    },
    updated: function () {
    },
    methods: {
      /** 返回上一层 */
      returnToUpLevel () {
        this.$router.push({path: '/system/sysAccountManage', query: {Number: 1, systemAccountForm: this.$route.query.systemAccountForm}})
      },
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
          that.addAccountVisible = false
        }, 5000)
        console.log('执行定时任务结束')
      },
      onSubmit () {
        this.$refs.addAcountForm.validate((valid) => {
          if (valid) {
            var that = this
            var BODY = {
              managerName: that.addAcountForm.managerName,
              managerAccount: that.addAcountForm.managerAccount,
              managerPassword: that.addAcountForm.managerPassword
            }
            console.log(BODY)
            axios.post('/api/systemManager/insertSystemManager', BODY, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Admin ' + that.getCookie('admin_token')
              }
            }).then(function (response) {
              console.log('添加代理商账号开始')
              if (response.data === true) {
                that.addAcountForm.managerName = ''
                that.addAcountForm.managerAccount = ''
                that.addAcountForm.managerPassword = ''
                that.addAccountVisible = true
                that.timeMsg()
                that.$refs.addAcountForm.resetFields()
              }
              console.log('添加代理商账号结束')
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
