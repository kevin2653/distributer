<template>
  <div style="background-color: #f2f2f2;min-height: 1200px" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="margin-right: 5rem" align="right">
        <a @click="returnToUpLevel">返回</a>
      </div>
      <div style="width: 45%;margin-left: 3rem">
        <el-form label-width="200px">
          <div>
            <label>新建代理商账号</label>
          </div>
          <br>
          <div>
            <el-form-item label="* 代理商名称 :">
              {{distributerName}}
            </el-form-item>
            <el-form-item label="* 新建账户名称 :">
              {{distributerAccount.name}}
            </el-form-item>
            <el-form-item label="* 初始密码 :">
              {{distributerAccount.password}}
            </el-form-item>
          </div>
          <br>
          <div align="right">
            <el-form-item>
              <el-button type="primary" @click="addAccount">创建账号</el-button>
            </el-form-item>
          </div>
          <br>
        </el-form>
      </div>
    </div>
    <!-- 创建成功弹窗 -->
    <!--添加成功提示框-->
    <el-dialog :visible.sync="addAccountVisible" width="30%" :modal-append-to-body="false" center>
      <div align="center">
        <i class="el-icon-success"></i><br>
        <span>
          新建代理商账号成功！<br>
          5s之后跳转至代理商账号管理页
        </span>
      </div>
    </el-dialog>
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
        addAccountVisible: false,
        distributerId: '',
        distributerName: '',
        dAccount: {},
        distributerAccount: {}
      }
    },
    created: function () {
      this.dAccount = JSON.parse(this.$route.query.distributerAccount)
      this.distributerId = this.$route.query.distributerId
      this.disNameDataGet()
    },
    methods: {
      /** 定时执行函数 */
      timeMsg () {
        var that = this
        setTimeout(function () {
          that.addAccountVisible = false
          that.returnToUpLevel()
        }, 5000)
      },
      /** 返回上一层 */
      returnToUpLevel () {
        this.$router.push({path: '/distributer/accountManagement', query: {distributerId: this.$route.query.distributerId, dAccount: this.$route.query.distributerAccount}})
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
      /** 获取代理商名称 */
      disNameDataGet: function () {
        var that = this
        axios.get('/api/distributerInfo/findDistributerInfoById?distributerId=' + that.distributerId, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.distributerName = response.data.distributerName
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 新建代理商账号 */
      addAccount () {
        var that = this
        console.log(that.distributerId)
        axios.post('/api/distributerAccount/saveDistributerAccount', {distributerId: that.distributerId}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
//          console.log('返回账号开始')
          that.distributerAccount = response.data
          if (that.distributerAccount.name !== null && that.distributerAccount.name !== '') {
            that.addAccountVisible = true
            that.timeMsg()
          }
          console.log(response.data)
//          console.log('返回账号结束')
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
<style>

</style>
