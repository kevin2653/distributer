<template>
  <div style="min-height: 1200px">
    <el-form v-model="commoissionForm" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple"style="margin-left: 1rem">
            <el-form-item label="渠道分类">
              <el-select v-model="commoissionForm.orderType" placeholder="请选择" style="width: 10rem">
                <el-option
                  v-for="item in channelOp"
                  :key="item.channelId"
                  :label="item.channelName"
                  :value="item.channelId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div style="margin-left: 15px">
              <el-form-item label="代理商名称">
                <el-button style="width: 10rem" @click="dialogM.dialogDistributer = true">{{selectDistributer}}</el-button>
                <el-dialog title="选择代理商" :visible.sync="dialogM.dialogDistributer" :modal-append-to-body="false"
                           :before-close="handleClose" center class="modelStyle">
                  <el-container>
                    <el-aside width="50%">
                      <el-input v-model="disName" @change="inputChangeDis" placeholder="输入代理商名称"></el-input>
                      <el-table :data="tableData" border @row-click="rowClickDistributer" height="250" style="width: 100%">
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
                        <el-button @click="dialogM.dialogDistributer = false">取 消</el-button>
                      </span>
                </el-dialog>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="退款时间">
              <el-date-picker v-model="commoissionForm.settlementYear" align="right" type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 10rem">
              </el-date-picker>
              <label>-</label>
              <el-date-picker v-model="commoissionForm.settlementMonth" type="date" placeholder="结束时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 10rem">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="运营负责人">
            <el-select v-model="commoissionForm.orderType" placeholder="请选择" style="width: 10rem">
              <el-option
                v-for="item in managerOp"
                :key="item.managerId"
                :label="item.managerName"
                :value="item.managerId">
              </el-option>
            </el-select>
          </el-form-item>
        </div></el-col>
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
      <el-col :span="22"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round @click="exportReport">导出报表</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="commissionData" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column label="渠道分类" prop="dInfo.distributerName" align="center">
            </el-table-column>
            <el-table-column label="代理商名称" prop="order.userName" align="center">
            </el-table-column>
            <el-table-column label="退款总金额(元)" prop="commissionAmount" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
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
        /** 弹框管理 */
        dialogM: {
          dialogDistributer: false  /** 代理商弹框 */
        },
        /** 产品类别 */
        productType: [{
          value: 1,
          label: '线路'
        }, {
          value: 2,
          label: '签证'
        }],
        /** 代理商弹框表格 */
        tableData: [],
        disLikeTableData: [],
        managerOp: [], /** 运营人员 */
        channelOp: [], /** 代理商渠道 */
        /** 代理商模糊查询 */
        disName: '',
        /** 代理商详情 */
        distributerData: {},
        /** 回填代理商 */
        selectDistributer: '选择代理商',
        /** 代理商详情运营人员 */
        managerData: {},
        /** 代理商分佣列表 */
        commissionData: [],
        totalNum: 0, /** 查询总条数 */
        /** 分佣报表提交form */
        commoissionForm: {
          distributerId: '', /** 代理商id */
          settlementYear: '', /** 结算年 */
          settlementMonth: '', /** 结算月 */
          orderType: '' /** 产品类别 */
        }
      }
    },
    created: function () {
      this.dataGet()
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
      /** form表单提交 */
      onSubmit () {
        var that = this
        var BODY = {
          distributerId: that.commoissionForm.distributerId, // 代理商id
          settlementYear: that.commoissionForm.settlementYear,
          settlementMonth: that.commoissionForm.settlementMonth,
          orderType: that.commoissionForm.orderType
        }
        console.log('当前表单数据')
        console.log(that.commoissionForm)
        console.log('BODY')
        console.log(BODY)
        axios.post('/api/commissionDetails/queryCommissionDetailsByJoin', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('显示查询结果')
          that.commissionData = response.data.dtoList
          that.totalNum = response.data.totalPage
          for (var i = 0; i < that.commissionData.length; i++) {
            var payDate = new Date(that.commissionData[i].order.orderPayTime)
            var finishDate = new Date(that.commissionData[i].order.orderFinishTime)
            that.commissionData[i].order.orderPayTime = payDate.getFullYear() + '-' + (payDate.getMonth() + 1) + '-' + payDate.getDate()
            that.commissionData[i].order.orderFinishTime = finishDate.getFullYear() + '-' + (finishDate.getMonth() + 1) + '-' + finishDate.getDate()
            that.commissionData[i].order.orderAmount = that.commissionData[i].order.orderAmount / 100
            that.commissionData[i].commissionAmount = that.commissionData[i].commissionAmount / 100
            that.commissionData[i].settlementYear = that.commissionData[i].settlementYear + '-' + that.commissionData[i].settlementMonth
            if (that.commissionData[i].order.orderType === 1) {
              that.commissionData[i].order.orderType = '线路'
            }
            if (that.commissionData[i].order.orderType === 8) {
              that.commissionData[i].order.orderType = '签证'
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 重置表单 */
      onReset () {
        this.commoissionForm.distributerId = ''
        this.commoissionForm.settlementYear = ''
        this.commoissionForm.settlementMonth = ''
        this.commoissionForm.orderType = ''
        this.selectDistributer = '选择代理商'
        this.commissionData = []
        this.distributerData = []
        this.managerData = {}
        this.disName = ''
      },
      /** input改变，模糊查询代理商 */
      inputChangeDis () {
        var that = this
        for (var i = 0; i < that.tableData.length; i++) {
          if (that.tableData[i].distributerName.indexOf(that.disName) > -1) {
            that.disLikeTableData.push(that.tableData[i])
          }
        }
        console.log(that.disLikeTableData)
        that.tableData = that.disLikeTableData
      },
      /** 回填代理商 */
      BackFillPdistributer () {
        this.dialogM.dialogDistributer = false
        if (this.distributerData.distributerName == null) {
          this.selectDistributer = '选择代理商'
        } else {
          this.selectDistributer = this.distributerData.distributerName
        }
      },
      /** 选择代理商显示详情 */
      rowClickDistributer (row) {
        var that = this
        for (var i = 0; i < that.tableData.length; i++) {
          if (that.tableData[i].distributerId === row.distributerId) {
            if (that.tableData[i].distributerName === '悦旅会') {
              that.distributerData.distributerName = '悦旅会'
              that.distributerData.distributerCode = '无'
              that.managerData = '无'
            } else {
              that.distributerData = that.tableData[i]
              that.managerData = that.tableData[i].sManager.managerName
            }
          }
        }
        that.commoissionForm.distributerId = row.distributerId
      },
      /** 关闭代理商弹框提示 */
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
//      reFresh () {
//        window.location.reload()
//      },
      dataGet: function (event) {
        var that = this
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
//          window.location.reload(true)
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商渠道 */
        axios.get('/api/distributerChannel/queryAllDistributerChannel', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.channelOp = response.data
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商运营人员 */
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.managerOp = response.data.systemManagerDTOList
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 导出报表 */
      exportReport () {
        console.log('开始导出excel')
        window.location.href = ('/api/commissionDetails/exportExcelCom?distributerId=' + this.commoissionForm.distributerId + '&settlementYear=' + this.commoissionForm.settlementYear + '&settlementMonth=' + this.commoissionForm.settlementMonth +
          '&orderType=' + this.commoissionForm.orderType)
      }
    }
  }
</script>
<style>
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
