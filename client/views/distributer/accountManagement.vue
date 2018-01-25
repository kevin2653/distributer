<template>
  <div style=" min-height: 1150px">
    <el-form :model="distributerAccount" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <div>
              <el-form-item label="代理商名称">
                <el-button style="width: 15rem" @click="alertStatus">{{selectPDistributer}}</el-button>
                <el-dialog title="选择代理商" :visible.sync="dialogVisible" :modal-append-to-body="false"
                           :before-close="handleClose" center class="modelStyle">
                  <el-container>
                    <el-aside width="50%">
                      <el-input v-model="name" @change="inputChange" placeholder="输入代理商名称"></el-input>
                      <el-table :data="tableData" :show-header="false" border @row-click="rowClick" height="250" style="width: 100%">
                        <el-table-column prop="distributerName">
                        </el-table-column>
                      </el-table>
                    </el-aside>
                    <el-main width="50%">
                      <div style="margin-top: -1rem"><label>已选代理商信息</label></div>
                      <br>
                      <div>
                        <label>代理商名称：{{distributerData.distributerName}}<br><br> </label>
                        <label>代理商编号：{{distributerData.distributerCode}}<br><br></label>
                        <label>运营负责人：{{managerData}}<br><br></label>
                      </div>
                    </el-main>
                  </el-container>
                  <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="BackFillPdistributer">确 定</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                      </span>
                </el-dialog>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="buttonMan.buttonSel">查询</el-button>
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
      <el-col :span="15"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round :disabled="buttonMan.buttonAdd" @click="addAccount">新建账号</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round :disabled="buttonMan.buttonDel" @click="delBatchAccount">批量删除</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round :disabled="buttonMan.buttonDis" @click="disBatchAccount">批量禁用</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round :disabled="buttonMan.buttonAbl" @click="ablBatchAccount" >批量启用</el-button>
        </div>
      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="ContableData" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%" >
            <el-table-column type="selection" label="全选" width="55">
            </el-table-column>
            <el-table-column label="代理商名称" prop="dInfo.distributerName" align="center">
            </el-table-column>
            <el-table-column label="代理商账号" prop="name" align="center">
            </el-table-column>
            <el-table-column label="运营负责人" prop="sManager.managerName" align="center">
            </el-table-column>
            <el-table-column label="状态" prop="accountStatusId" align="center">
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" align="center">
            </el-table-column>
            <el-table-column align="center" width="280" label="操作">
              <template slot-scope="scope" center v-if="scope.row.accountStatusId !== ''">
                <el-button round size="mini" @click="restPassword(scope.$index, scope.row)">重置密码</el-button>
                <el-button round size="mini" @click="delAccount(scope.$index, scope.row)">删除</el-button>
                <el-button round size="mini" @click="disableAccount(scope.$index, scope.row)" v-if="scope.row.accountStatusId === '正常'">禁用</el-button>
                <el-button round size="mini" @click="ableAccount(scope.$index, scope.row)" v-if="scope.row.accountStatusId === '禁用'">启用</el-button>
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
        :current-page=distributerAccount.currentPage
        :page-sizes="[3, 5, 7, 9]"
        :page-size=distributerAccount.pageSize
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
          代理商账号删除成功<br>
          5s之后窗口自动退出
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
        /** 重置密码弹框 */
        restPasswordVisible: false,
        /** 删除代理商账号弹窗 */
        delAccountVisible: false,
        /** 数据总数 */
        totalPage: 0,
        /** 按钮管理 */
        buttonMan: {
          buttonSel: true,
          buttonAdd: true, /** 新建 */
          buttonDel: true, /** 批量删除 */
          buttonDis: true,   /** 批量禁用 */
          buttonAbl: true /** 批量启用 */
        },
        /** 代理商弹窗 */
        dialogVisible: false,
        /** 密码 */
        password: '',
        /** 禁用按钮 */
        isDisabled: '禁用',
        /** 表格数据 */
        ContableData: [],
        /** 代理商表格 */
        tableData: [{}],
        /** 代理商模糊查询 */
        name: '',
        /** 代理商详情 */
        distributerData: {},
        /** 回填代理商 */
        selectPDistributer: '选择代理商',
        /** 代理商详情运营人员 */
        managerData: {},
        /** 代理商id */
        distributerId: '',
        /** 多选框 */
        multipleSelection: [],
        /** form表单数据 */
        distributerAccount: {
          distributerId: '', /** 代理商id */
          currentPage: 1, /** 当前页 */
          pageSize: 5 /** 每页显示条数 */
        }
      }
    },
    created: function () {
      if (this.$route.query.distributerId > 0) {
        this.distributerId = this.$route.query.distributerId
        this.distributerAccount = JSON.parse(this.$route.query.dAccount)
        this.onSubmit()
        this.dataGet()
      } else {
        this.dataGet()
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
      /** 分页 */
      handleSizeChange (val) {
        this.distributerAccount.pageSize = val
        this.onSubmit()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.distributerAccount.currentPage = val
        this.onSubmit()
        console.log(`当前页: ${val}`)
      },
      /** 关闭代理商弹窗 */
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
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
        var accountId = []
        var accountStatusId = 0
        console.log('开启批量禁用')
        console.log(accountId)
        this.modifyStatus(accountId, accountStatusId)
        for (var i = 0; i < this.multipleSelection.length; i++) {
          accountId.push(this.multipleSelection[i].accountId)
          for (var j = 0; j < this.ContableData.length; j++) {
            if (this.multipleSelection[i].accountId === this.ContableData[j].accountId) {
              this.ContableData[j].accountStatusId = '禁用'
            }
          }
        }
      },
      /** 批量删除代理商账号 */
      delBatchAccount () {
        var that = this
        var accountId = []
        for (var i = 0; i < that.multipleSelection.length; i++) {
          accountId.push(that.multipleSelection[i].accountId)
          for (var j = 0; j < that.ContableData.length; j++) {
            if (that.multipleSelection[i].accountId === that.ContableData[j].accountId) {
              that.ContableData[j].accountStatusId = ''
              that.ContableData[j].createTime = ''
              that.ContableData[j].name = ''
            }
          }
        }
        var accountStatusId = 2
        console.log(accountId)
        this.modifyStatus(accountId, accountStatusId)
        console.log('开启弹窗')
        this.delAccountVisible = true
        that.timeMsg()
      },
      /** 批量启用代理商账号 */
      ablBatchAccount () {
        var accountId = []
        var accountStatusId = 1
        console.log('开启批量启用')
        console.log(accountId)
        this.modifyStatus(accountId, accountStatusId)
        for (var i = 0; i < this.multipleSelection.length; i++) {
          accountId.push(this.multipleSelection[i].accountId)
          for (var j = 0; j < this.ContableData.length; j++) {
            if (this.multipleSelection[i].accountId === this.ContableData[j].accountId) {
              this.ContableData[j].accountStatusId = '正常'
            }
          }
        }
      },
      /** 禁用代理商账号 */
      disableAccount (index, row) {
        var accountId = []
        accountId.push(row.accountId)
        var accountStatusId = 0
        this.modifyStatus(accountId, accountStatusId)
        for (var j = 0; j < this.ContableData.length; j++) {
          if (row.accountId === this.ContableData[j].accountId) {
            this.ContableData[j].accountStatusId = '禁用'
          }
        }
      },
      /** 启用代理商账号 */
      ableAccount (index, row) {
        var accountId = []
        accountId.push(row.accountId)
        var accountStatusId = 1
        this.modifyStatus(accountId, accountStatusId)
        for (var j = 0; j < this.ContableData.length; j++) {
          if (row.accountId === this.ContableData[j].accountId) {
            this.ContableData[j].accountStatusId = '正常'
          }
        }
      },
      /** 删除代理商账号 */
      delAccount (index, row) {
        var accountId = []
        var that = this
        accountId.push(row.accountId)
        console.log('id数组')
        console.log(accountId)
        var accountStatusId = 2
        this.modifyStatus(accountId, accountStatusId)
        for (var j = 0; j < that.ContableData.length; j++) {
          if (row.accountId === that.ContableData[j].accountId) {
            that.ContableData[j].accountStatusId = ''
            that.ContableData[j].createTime = ''
            that.ContableData[j].name = ''
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
        axios.post('/api/distributerAccount/resetPassword', {accountId: row.accountId}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('重置密码开始')
          that.password = response.data
          that.restPasswordVisible = true
          console.log('重置密码结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 修改状态方法 */
      modifyStatus (accountId, accountStatus) {
//        var that = this
        var BODY = {
          accoundId: accountId,
          accountStatusId: accountStatus
        }
        axios.post('/api/distributerAccount/updateStatus', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + this.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('修改状态开始')
          console.log(response.data)
          console.log('修改状态结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 多选框触发 */
      handleSelectionChange (val) {
        this.multipleSelection = val
        if (this.multipleSelection.length === 1) {
          this.buttonMan.buttonAdd = false
        }
        if (this.multipleSelection.length > 1) {
          this.buttonMan.buttonAdd = true
        }
        this.buttonMan.buttonDel = false
        this.buttonMan.buttonDis = false
        this.buttonMan.buttonAbl = false
        console.log('打印选择内容')
        console.log(this.multipleSelection)
      },
      /** 添加账号 */
      addAccount () {
        if (this.ContableData.length > 0) {
          for (var i = 0; i < this.multipleSelection.length; i++) {
            this.distributerId = this.multipleSelection[i].distributerId
          }
        }
        this.$router.push({path: '/distributer/accountManagement/addDisAccount', query: {distributerId: this.distributerId, distributerAccount: JSON.stringify(this.distributerAccount)}})
        console.log(this.distributerId)
      },
      /** 修改查询按钮状态 */
      alertStatus () {
        this.dialogVisible = true
      },
      /** 提交表单 */
      onSubmit () {
        var that = this
        var BODY = {
          distributerId: that.distributerAccount.distributerId,
          currentPage: that.distributerAccount.currentPage,
          pageSize: that.distributerAccount.pageSize
        }
        axios.post('/api/distributerAccount/queryDistributerAccount', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.ContableData = response.data.distributerAccountDTOList
//          that.totalPage = response.data.distributerAccountDTOList.length
          for (var i = 0; i < that.ContableData.length; i++) {
            var date = new Date(that.ContableData[i].createTime)
            if (that.ContableData[i].accountStatusId === 2) {
              console.log(that.ContableData[i].accountStatusId)
              console.log('修改表单')
              that.ContableData[i].accountStatusId = ''
              that.ContableData[i].createTime = ''
              that.ContableData[i].name = ''
            }
            if (that.ContableData[i].accountStatusId === 1) {
              that.ContableData[i].accountStatusId = '正常'
              that.ContableData[i].createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            }
            if (that.ContableData[i].accountStatusId === 0) {
              that.ContableData[i].accountStatusId = '禁用'
              that.ContableData[i].createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
//              that.isDisabled = '启用'
            }
          }
          if (that.ContableData.length === 0) {
            that.buttonMan.buttonAdd = false
          }
          that.totalPage = response.data.totalPage
          that.managerData = ''
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 重置表单 */
      onReset () {
        this.distributerAccount.distributerId = ''
        this.selectPDistributer = '选择代理商'
        this.ContableData = []
        this.distributerAccount.currentPage = 1
        this.distributerAccount.pageSize = 5
        this.buttonMan.buttonDel = true
        this.buttonMan.buttonDis = true
        this.buttonMan.buttonAbl = true
        this.buttonMan.buttonAdd = true
        this.buttonMan.buttonSel = true
        this.password = ''
        this.distributerData = [{}]
      },
      /** input改变，模糊查询代理商 */
      inputChange () {
        var that = this
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {distributerName: that.name}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 回填上级代理商 */
      BackFillPdistributer () {
        this.dialogVisible = false
        if (this.distributerData.distributerName == null) {
          this.selectPDistributer = '选择代理商'
        } else {
          this.selectPDistributer = this.distributerData.distributerName
        }
      },
      /** 选择代理商显示详情 */
      rowClick (row) {
        var that = this
        that.buttonMan.buttonSel = false
        that.distributerId = row.distributerId
        axios.get('/api/distributerInfo/findDistributerInfoById?distributerId=' + row.distributerId, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('显示详情')
          console.log(response.data)
          if (response.data.distributerId === null) {
            that.distributerData.distributerName = '悦旅会'
            that.distributerData.distributerCode = '无'
            that.managerData = '无'
          } else {
            that.distributerData = response.data
            that.managerData = response.data.sManager.managerName
          }
          that.distributerAccount.distributerId = row.distributerId
        }).catch(function (error) {
          console.log(error)
        })
//        console.log('选择行结束')
      },
      dataGet: function (event) {
        var that = this
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': ('Admin ' + that.getCookie('admin_token')).toString()
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
          if (that.$route.query.distributerId > 0) {
            for (var i = 0; i < that.tableData.length; i++) {
              if (that.distributerAccount.distributerId === that.tableData[i].distributerId) {
//                console.log('ssssssssssssss')
                that.selectPDistributer = that.tableData[i].distributerName
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
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
