<template>
  <div class="content has-text-centered">

    <div class="columns is-vcentered">
      <div style="margin-left: 40rem;margin-top: 10rem">
        <img src="~assets/logo.png"/>
        <h2 class="is-title is-bold">环球悦旅会代理商管理系统</h2>
        <br>
        <el-form :model="systemLoginForm" :rules="rules" ref="systemLoginForm" class="demo-ruleForm">
          <el-form-item prop="managerAccount">
            <el-input v-model="systemLoginForm.managerAccount" placeholder="用户名" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item prop="managerPassword">
            <el-input type="password" v-model="systemLoginForm.managerPassword" placeholder="密码" style="width: 23.2rem"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" style="width: 23.2rem">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    components: {
      axios
    },
    data () {
      return {
        systemManager: {},
        authorization: '',
        /** 运营管理人员登陆表单 */
        systemLoginForm: {
          managerAccount: '',
          managerPassword: ''
        },
        rules: {
          managerAccount: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          managerPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      /** 跳转界面到首页 */
      enterHome () {
        this.$router.push({path: '/'})
      },
      open () {
        this.$message({
          showClose: true,
          message: '账号或者密码错误',
          type: 'error'
        })
      },
      /** login */
      login () {
        this.$refs.systemLoginForm.validate((valid) => {
          if (valid) {
            var that = this
            var BODY = {
              managerAccount: that.systemLoginForm.managerAccount,
              managerPassword: that.systemLoginForm.managerPassword
            }
            axios.post('/api/systemManager/systemManagerLogin', BODY, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'hero'
              }
            }).then(function (response) {
//              console.log('BBBBBBBBBBBBB')
              if (response.data.code === 'OK') {
//                console.log('AAAAAAAAAAAAAA')
                that.authorization = response.data.authorization
                that.systemManager = response.data.sManager
                window.location.reload()
                that.enterHome()
              } else if (response.data.code === 'error') {
                that.open()
              }
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 设置 cookie
      setCookie: function (cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        console.info(cname + '=' + cvalue + '; ' + expires)
        document.cookie = cname + '=' + escape(cvalue) + '; ' + expires
        console.info(document.cookie)
      },
      // 获取cookie
      getCookie: function (cname) {
        var name = cname + '='
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') c = c.substring(1)
          if (c.indexOf(name) !== -1) return unescape(c.substring(name.length, c.length))
        }
        return ''
      },
      // 清除cookie
      clearCookie: function () {
        this.setCookie('sysManagerName', '', -1)
      }
    }
  }
</script>

<style>

</style>
