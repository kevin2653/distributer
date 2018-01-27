<template>
  <div style=" min-height: 1150px">
    <el-form :model="systemAccountForm" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <div>
              <el-form-item label="用户姓名">
                <el-input @change="" v-model="systemAccountForm.managerName" placeholder="输入用户姓名" style="width: 12rem"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-button type="primary" @click="onReset">重置</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <el-row :gutter="20">
      <el-col :span="17"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round @click="addAccount">新建账号</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round :disabled="buttonDel" @click="delBatchAccount">批量删除</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round :disabled="buttonDis" @click="disBatchAccount">批量禁用</el-button>
        </div>
      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="managerTableData" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%" >
            <el-table-column type="selection" label="全选" width="55">
            </el-table-column>
            <el-table-column label="用户姓名" prop="managerName" align="center">
            </el-table-column>
            <el-table-column label="账号" prop="managerAccount" align="center">
            </el-table-column>
            <el-table-column label="操作员账号" prop="operatorAccount" align="center">
            </el-table-column>
            <el-table-column label="状态" prop="managerStatusId" align="center">
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" align="center">
            </el-table-column>
            <el-table-column align="center" width="360" label="操作">
              <template slot-scope="scope" center v-if="scope.row.managerStatusId !== '' && managerTableData.length > 0">
                <el-button round size="mini" @click="restPassword(scope.$index, scope.row)">重置密码</el-button>
                <el-button round size="mini" @click="delAccount(scope.$index, scope.row)" >删除</el-button>
                <el-button round size="mini" @click="ableAccount(scope.$index, scope.row)" v-if="scope.row.managerStatusId === '禁用'">启用</el-button>
                <el-button round size="mini" @click="disableAccount(scope.$index, scope.row)" v-if="scope.row.managerStatusId == '正常'">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div class="block" align="center" >
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=systemAccountForm.currentPage
        :page-sizes=pageSizeArr
        :page-size=systemAccountForm.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalPage>
      </el-pagination>
    </div>
    <!--重置密码成功提示框-->
    <el-dialog :visible.sync="restPasswordVisible" width="30%" :modal-append-to-body="false" center>
      <div align="center">
        <i class="el-icon-success"></i><br>
        <span>
          您的密码已经重置成功<br>
          重置后的密码是：{{password}}<br>
          请您牢记此密码
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="restPasswordVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="restPasswordVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <!--删除账号成功提示框-->
    <el-dialog :visible.sync="delAccountVisible" width="30%" :modal-append-to-body="false" center>
      <div align="center">
        <i class="el-icon-success"></i><br>
        <span>
          运营人员账号删除成功<br>
          5s之后窗口自动退出
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import global from '../../global'
  export default {
    components: {
      axios,
      global
    },
    data () {
      return {
        pageSizeArr: global.pageSizeArr,
        /** 重置密码弹框 */
        restPasswordVisible: false,
        /** 删除代理商账号弹窗 */
        delAccountVisible: false,
        /** 数据总数 */
        totalPage: 0,
        /** 批量删除 */
        buttonDel: true,
        /** 批量禁用 */
        buttonDis: true,
        /** 批量启用 */
        buttonAbl: true,
        /** 密码 */
        password: '',
        /** 禁用按钮 */
        isDisabled: '禁用',
        /** 表格数据 */
        managerTableData: [],
        /** 多选框 */
        multipleSelection: [],
        /** form表单数据 */
        systemAccountForm: {
          managerName: '', /** 用户名称 */
          currentPage: 1, /** 当前页 */
          pageSize: 5 /** 每页显示条数 */
        }
      }
    },
    created: function () {
      if (this.$route.query.Number > 0) {
        this.systemAccountForm = JSON.parse(this.$route.query.systemAccountForm)
        this.onSubmit()
      }
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
      //  添加操作人员账号
      updateOperator (managerId, operatorAccount) {
        var that = this
        var BODY = {
          managerId: managerId,
          operatorAccount: operatorAccount
        }
        axios.post('/api/systemManager/updateOperator', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
//          console.log('修改操作员开始')
//          console.log(response.data)
//          console.log('修改操作员结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 分页 */
      handleSizeChange (val) {
        this.systemAccountForm.pageSize = val
        this.onSubmit()
//        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.systemAccountForm.currentPage = val
        this.onSubmit()
//        console.log(`当前页: ${val}`)
      },
      /** 定时执行函数 */
      timeMsg () {
        var that = this
        console.log('开始执行定时任务')
        setTimeout(function () {
          console.log('定时任务 Go!')
          that.delAccountVisible = false
        }, 5000)
        console.log('执行定时任务结束')
      },
      /** 批量禁用代理商账号 */
      disBatchAccount () {
        var managerId = []
        for (var i = 0; i < this.multipleSelection.length; i++) {
          managerId.push(this.multipleSelection[i].managerId)
          var operatorAccount = decodeURIComponent(this.getCookie('sysManagerName'))
          this.multipleSelection[i].operatorAccount = operatorAccount
          this.updateOperator(this.multipleSelection[i].managerId, operatorAccount)
          for (var j = 0; j < this.managerTableData.length; j++) {
            if (this.multipleSelection[i].managerId === this.managerTableData[j].managerId) {
              this.managerTableData[j].managerStatusId = '禁用'
            }
          }
        }
        var managerStatusId = 0
        console.log('开启批量禁用')
        console.log(managerId)
        this.modifyStatus(managerId, managerStatusId)
      },
      /** 批量删除代理商账号 */
      delBatchAccount () {
        var that = this
        var managerId = []
        for (var i = 0; i < that.multipleSelection.length; i++) {
          managerId.push(that.multipleSelection[i].managerId)
          var operatorAccount = decodeURIComponent(this.getCookie('sysManagerName'))
          that.multipleSelection[i].operatorAccount = operatorAccount
          this.updateOperator(that.multipleSelection[i].managerId, operatorAccount)
          for (var j = 0; j < that.managerTableData.length; j++) {
            if (that.multipleSelection[i].managerId === that.managerTableData[j].managerId) {
              that.managerTableData[j].managerStatusId = ''
              that.managerTableData[j].createTime = ''
              that.managerTableData[j].managerName = ''
            }
          }
        }
        var managerStatusId = 2
        console.log(managerId)
        this.modifyStatus(managerId, managerStatusId)
        console.log('开启弹窗')
        this.delAccountVisible = true
        that.timeMsg()
      },
      /** 禁用代理商账号 */
      disableAccount (index, row) {
        var managerId = []
        managerId.push(row.managerId)
        var managerStatusId = 0
        this.modifyStatus(managerId, managerStatusId)
        var operatorAccount = decodeURIComponent(this.getCookie('sysManagerName'))
        row.operatorAccount = operatorAccount
        this.updateOperator(row.managerId, operatorAccount)
        for (var j = 0; j < this.managerTableData.length; j++) {
          if (row.managerId === this.managerTableData[j].managerId) {
            this.managerTableData[j].managerStatusId = '禁用'
          }
        }
      },
      /** 启用代理商账号 */
      ableAccount (index, row) {
        var managerId = []
        managerId.push(row.managerId)
        var operatorAccount = decodeURIComponent(this.getCookie('sysManagerName'))
        row.operatorAccount = operatorAccount
        this.updateOperator(row.managerId, operatorAccount)
        var managerStatusId = 0
        this.modifyStatus(managerId, managerStatusId)
        for (var j = 0; j < this.managerTableData.length; j++) {
          if (row.managerId === this.managerTableData[j].managerId) {
            this.managerTableData[j].managerStatusId = '正常'
          }
        }
      },
      /** 删除代理商账号 */
      delAccount (index, row) {
        var managerId = []
        var that = this
        managerId.push(row.managerId)
        console.log('id数组')
        console.log(managerId)
        var managerStatusId = 2
        this.modifyStatus(managerId, managerStatusId)
        for (var j = 0; j < that.managerTableData.length; j++) {
          if (row.managerId === that.managerTableData[j].managerId) {
            that.managerTableData[j].managerStatusId = ''
            that.managerTableData[j].createTime = ''
            that.managerTableData[j].managerName = ''
          }
        }
        this.delAccountVisible = true
        this.timeMsg()
      },
      /** 重置密码 */
      restPassword (index, row) {
        var that = this
        console.log(index)
        console.log(row)
        axios.post('/api/systemManager/resetPassword', {managerId: row.managerId}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
//          console.log('重置密码开始')
          if (response.data.code === 'OK') {
            that.password = response.data.password
            var operatorAccount = decodeURIComponent(that.getCookie('sysManagerName'))
            row.operatorAccount = operatorAccount
            that.updateOperator(row.managerId, operatorAccount)
          }
          that.restPasswordVisible = true
//          console.log('重置密码结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 修改状态方法 */
      modifyStatus (managerId, managerStatusId) {
        var that = this
        var BODY = {
          managerId: managerId,
          managerStatusId: managerStatusId
        }
        axios.post('/api/systemManager/moreDleteAndDisabled', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
//          console.log('修改状态开始')
//          console.log(response.data)
//          console.log('修改状态结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 多选框触发 */
      handleSelectionChange (val) {
        this.multipleSelection = val
        this.buttonDel = false
        this.buttonDis = false
        this.buttonAbl = false
//        console.log('打印选择内容')
//        console.log(this.multipleSelection)
      },
      /** 添加账号 */
      addAccount () {
        this.$router.push({path: '/system/sysAccountManage/addSystemAccount', query: {systemAccountForm: JSON.stringify(this.systemAccountForm)}})
      },
      /** 提交表单 */
      onSubmit () {
        var that = this
        var BODY = {
          managerName: that.systemAccountForm.managerName,
          currentPage: that.systemAccountForm.currentPage,
          pageSize: that.systemAccountForm.pageSize
        }
//        console.log(BODY)
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {params: BODY}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
//          console.log('系统运营人员账号查询')
//          console.log(response.data)
          that.managerTableData = response.data.systemManagerDTOList
//          console.log(that.managerTableData)
          that.totalPage = response.data.totalPage
          for (var i = 0; i < that.managerTableData.length; i++) {
            var date = new Date(that.managerTableData[i].createTime)
            if (that.managerTableData[i].managerStatusId === 2) {
//              console.log(that.managerTableData[i].managerStatusId)
//              console.log('修改表单')
              that.managerTableData[i].managerStatusId = ''
              that.managerTableData[i].createTime = ''
              that.managerTableData[i].managerName = ''
            }
            if (that.managerTableData[i].managerStatusId === 1) {
              that.managerTableData[i].managerStatusId = '正常'
              that.managerTableData[i].createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            }
            if (that.managerTableData[i].managerStatusId === 0) {
              that.managerTableData[i].managerStatusId = '禁用'
              that.managerTableData[i].createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
              that.isDisabled = '启用'
            }
          }
          if (that.managerTableData.length === 0) {
            that.buttonAdd = false
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 重置表单 */
      onReset () {
        this.ContableData = [{}]
        this.systemAccountForm.managerName = ''
        this.systemAccountForm.currentPage = 1
        this.systemAccountForm.pageSize = 5
        this.multipleSelection = []
        this.managerTableData = []
        this.buttonDel = true
        this.buttonDis = true
        this.buttonAbl = true
        this.buttonAdd = true
        this.buttonSel = true
        this.password = ''
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    /*background: #d3dce6;*/
    background: #F5F5F5;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
