<template>
  <div style="min-height: 1200px">
    <el-form v-model="settleLogForm" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="5">
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
            <el-form-item label="结算月份">
              <el-date-picker
                v-model="settleLogForm.settlementYear"
                align="right"
                type="year"
                placeholder="选择年"
                format="yyyy"
                value-format="yyyy"
                style="width: 10rem">
              </el-date-picker>
              <label>-</label>
              <el-date-picker
                v-model="settleLogForm.settlementMonth"
                type="month"
                placeholder="选择月"
                format="MM"
                value-format="MM"
                style="width: 10rem">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="运营负责人">
              <el-select v-model="settleLogForm.managerId" placeholder="请选择" style="width: 8rem">
                <el-option
                  v-for="item in selectManOp.managerOp"
                  :key="item.managerId"
                  :label="item.managerName"
                  :value="item.managerId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="发票是否收到">
              <el-select v-model="settleLogForm.isReceivedInvoice" placeholder="请选择" style="width: 8rem">
                <el-option
                  v-for="item in selectManOp.isReceivedInvoiceOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
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
      <el-col :span="22"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <!--@click="exportReport"-->
          <el-button round @click="exportExcel">导出报表</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="settleLogData" tooltip-effect="dark" border style="width: 100%" >
            <el-table-column label="代理商名称" prop="dInfo.distributerName" align="center">
            </el-table-column>
            <el-table-column label="结算月份" prop="settlementYear" align="center">
            </el-table-column>
            <el-table-column label="转账金额" prop="transferAmount" align="center">
            </el-table-column>
            <el-table-column label="运营负责人" prop="dInfo.sManager.managerName" align="center">
            </el-table-column>
            <el-table-column label="发票是否收到" prop="isReceivedInvoice" align="center">
            </el-table-column>
            <el-table-column label="转账完成时间" prop="transferEndTime" align="center">
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
        :current-page=settleLogForm.currentPage
        :page-sizes="[3, 5, 7, 9]"
        :page-size=settleLogForm.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalNum>
      </el-pagination>
    </div>
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
        /** 下拉框管理 */
        selectManOp: {
          /** 发票是否收到 */
          isReceivedInvoiceOp: [{
            value: 0,
            label: '否'
          }, {
            value: 1,
            label: '是'
          }],
          /** 运营人员 */
          managerOp: [{}]
        },
        /** 代理商弹框表格 */
        tableData: [{}],
        disLikeTableData: [{}],
        /** 代理商模糊查询 */
        disName: '',
        /** 代理商详情 */
        distributerData: {},
        /** 回填代理商 */
        selectDistributer: '选择代理商',
        /** 代理商详情运营人员 */
        managerData: {},
        /** 代理商分佣列表 */
        settleLogData: [],
        totalNum: 0, /** 查询总条数 */
        /** 分佣报表提交form */
        settleLogForm: {
          distributerId: '', /** 代理商id */
          settlementYear: '', /** 结算年 */
          settlementMonth: '', /** 结算月 */
          isReceivedInvoice: '', /** 是否收到发票 */
          managerId: '', /** 运营负责人 */
          pageSize: 5,
          currentPage: 1
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
      /** 分页 */
      handleSizeChange (val) {
        this.settleLogForm.pageSize = val
        console.log('当前数量')
        console.log(this.settleLogForm.pageSize)
        this.onSubmit()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.settleLogForm.currentPage = val
        this.onSubmit()
        console.log(`当前页: ${val}`)
      },
      /** form表单提交 */
      onSubmit () {
        var that = this
        var BODY = {
          distributerId: that.settleLogForm.distributerId, // 代理商id
          settlementYear: that.settleLogForm.settlementYear,
          settlementMonth: that.settleLogForm.settlementMonth,
          isReceivedInvoice: that.settleLogForm.isReceivedInvoice,
          managerId: that.settleLogForm.managerId,
          currentPage: that.settleLogForm.currentPage,
          pageSize: that.settleLogForm.pageSize
        }
        console.log('当前表单数据')
        console.log(that.settleLogForm)
        console.log('BODY')
        console.log(BODY)
        axios.post('/api/settlementLog/querySettlementLogByJoin', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('显示查询日志结果')
          that.settleLogData = response.data.dList
          that.totalNum = response.data.totalPage
          for (var i = 0; i < that.settleLogData.length; i++) {
            var transferEndTime = new Date(that.settleLogData[i].transferEndTime)
            that.settleLogData[i].transferEndTime = transferEndTime.getFullYear() + '-' + (transferEndTime.getMonth() + 1) + '-' + transferEndTime.getDate()
            that.settleLogData[i].transferAmount = that.settleLogData[i].transferAmount / 100
            that.settleLogData[i].settlementYear = that.settleLogData[i].settlementYear + '-' + that.settleLogData[i].settlementMonth
            if (that.settleLogData[i].dInfo.bankAccountType === 0) {
              that.settleLogData[i].isReceivedInvoice = '---'
            }
            if (that.settleLogData[i].dInfo.bankAccountType === 1) {
              if (that.settleLogData[i].isReceivedInvoice === true) {
                that.settleLogData[i].isReceivedInvoice = '是'
              }
              if (that.settleLogData[i].isReceivedInvoice === false) {
                that.settleLogData[i].isReceivedInvoice = '否'
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 重置表单 */
      onReset () {
        this.settleLogForm.distributerId = ''
        this.settleLogForm.settlementYear = ''
        this.settleLogForm.settlementMonth = ''
        this.settleLogForm.isReceivedInvoice = ''
        this.settleLogForm.managerId = ''
        this.selectDistributer = '选择代理商'
        this.settleLogForm.currentPage = 1
        this.settleLogForm.pageSize = 5
        this.distributerData = []
        this.settleLogData = []
        this.managerData = {}
        this.disName = ''
        this.totalNum = 0
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
        that.settleLogForm.distributerId = row.distributerId
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
          that.selectManOp.managerOp = response.data.systemManagerDTOList
        }).catch(function (error) {
          console.log(error)
        })
      },
      exportExcel () {
        console.log('开始导出excel')
        window.location.href = ('/api/settlementLog/exportExcelLog?distributerId=' + this.settleLogForm.distributerId + '&settlementYear=' + this.settleLogForm.settlementYear + '&settlementMonth=' + this.settleLogForm.settlementMonth +
          '&isReceivedInvoice=' + this.settleLogForm.isReceivedInvoice + '&managerId=' + this.settleLogForm.managerId)
      }
//      /** 导出报表 */
//      exportReport () {
//        const downloadUrl = url => {
//          let iframe = document.createElement('iframe')
//          iframe.style.display = 'none'
//          iframe.src = url
//          iframe.onload = function () {
//            document.body.removeChild(iframe)
//          }
//          document.body.appendChild(iframe)
//        }
//        axios.interceptors.response.use(function (response) {
//          // 处理excel文件
//          console.log('处理excel文件开始')
//          console.log(response)
//          if (response.headers && (response.headers['content-type'] === 'application/vnd.ms-excel' || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
//            downloadUrl(response.request.responseURL)
//            console.log('处理excel文件进去')
//          }
//          console.log('处理excel文件结束')
//        }, error => {
//          // Do something with response error
//          console.log(error)
//        })
//        var that = this
//        var BODY = {
//          distributerId: that.settleLogForm.distributerId, // 代理商id
//          settlementYear: that.settleLogForm.settlementYear,
//          settlementMonth: that.settleLogForm.settlementMonth,
//          isReceivedInvoice: that.settleLogForm.isReceivedInvoice,
//          managerId: that.settleLogForm.managerId
//        }
//        console.log(BODY)
//        axios.get('/api/settlementLog/exportExcelLog', {params: BODY}, {
//          headers: {
//            'Content-Type': 'application/json'
//          }
//        }).then(function (response) {
//          console.log('成功')
//        }).catch(function (error) {
//          console.log(error)
//        })
//      }
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
