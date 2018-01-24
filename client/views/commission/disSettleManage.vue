<template>
  <div style="min-height: 1200px">
    <el-form v-model="settleForm" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="渠道分类">
              <el-select v-model="settleForm.channelId" placeholder="请选择" style="width: 10rem">
                <el-option
                  v-for="item in selectManOp.channelOp"
                  :key="item.channelId"
                  :label="item.channelName"
                  :value="item.channelId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div >
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
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="审核状态">
              <el-select v-model="settleForm.auditStatusId" placeholder="请选择" style="width: 10rem">
                <el-option
                  v-for="item in selectManOp.auditStatusOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="结算状态">
              <el-select v-model="settleForm.transferStatusId" placeholder="请选择" style="width: 10rem">
                <el-option
                  v-for="item in selectManOp.settleStatusOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="结算月份">
              <el-date-picker
                v-model="settleForm.settlementYear"
                align="right"
                type="year"
                placeholder="选择年"
                format="yyyy"
                value-format="yyyy"
                style="width: 10rem">
              </el-date-picker>
              <label>-</label>
              <el-date-picker
                v-model="settleForm.settlementMonth"
                type="month"
                placeholder="选择月"
                format="MM"
                value-format="MM"
                style="width: 10rem">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="运营负责人">
              <el-select v-model="settleForm.managerId" placeholder="请选择" style="width: 10rem">
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
      <el-col :span="20"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round @click="isReInvoice">发票已到</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round @click="exportReport">导出报表</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="settleData" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%" >
            <el-table-column type="selection" label="全选" width="55">
            </el-table-column>
            <el-table-column label="代理商名称" prop="dInfo.distributerName" align="center">
            </el-table-column>
            <el-table-column label="审核状态" prop="auditStatusId" align="center">
            </el-table-column>
            <el-table-column label="审核人" prop="dInfo.sManager.managerName" align="center">
            </el-table-column>
            <el-table-column label="结算状态" prop="transferStatusId" align="center">
            </el-table-column>
            <el-table-column label="分佣金额(元)" prop="settlementAmount" align="center">
            </el-table-column>
            <el-table-column label="转账金额(元)" prop="transferAmount" align="center">
            </el-table-column>
            <el-table-column label="个人扣税金额" prop="taxAmount" align="center">
            </el-table-column>
            <el-table-column label="发票是否收到" prop="isReceivedInvoice" align="center">
            </el-table-column>
            <el-table-column label="结算月份" prop="settlementYear" align="center">
            </el-table-column>
            <el-table-column align="center" width="240" label="操作">
              <template slot-scope="scope" center v-if="settleData.length > 0">
                <!--<el-button round size="mini" @click="settleAudit(scope.$index, scope.row)" v-if="scope.row.auditStatusId !== '已审核'">结算审核</el-button>-->
                <!--<el-button round size="mini" @click="settleTranfer(scope.$index, scope.row)" v-if="scope.row.transferStatusId !== '待转账'">结算转账</el-button>-->
                <el-button round size="mini" @click="settleAudit(scope.$index, scope.row)" disabled v-if="scope.row.auditStatusId === '已审核'">结算审核</el-button>
                <el-button round size="mini" @click="settleAudit(scope.$index, scope.row)" v-else>结算审核</el-button>
                <el-button round size="mini" @click="settleTranfer(scope.$index, scope.row)" disabled v-if="scope.row.transferStatusId === '待转账' || scope.row.transferStatusId === '转账完成'">结算转账</el-button>
                <el-button round size="mini" @click="settleTranfer(scope.$index, scope.row)"  v-else>结算转账</el-button>
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
        :current-page=settleForm.currentPage
        :page-sizes="[3, 5, 7, 9]"
        :page-size=settleForm.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalNum>
      </el-pagination>
    </div>
    <!--  结算审核弹出框-->
    <div>
      <el-dialog title="审核备注" :visible.sync="dialogM.settleAuditDialog" width="30%" :modal-append-to-body="false" center>
        <div style="margin-left: 5rem">
          <el-form  class="demo-form-inline">
            <el-form-item label="代理商名称">{{settleAuditForm.distributerName}}</el-form-item>
            <el-form-item label="分佣金额">{{settleAuditForm.settlementAmount}}</el-form-item>
            <el-form-item label="扣税金额">{{settleAuditForm.taxAmount}}</el-form-item>
            <el-form-item label="转账金额">{{settleAuditForm.transferAmount}}</el-form-item>
            <el-form-item label="结算状态">{{settleAuditForm.auditStatusId}}</el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="auditSuccessMeth">审核通过</el-button>
            <el-button type="primary" @click="dialogM.settleAuditDialog = false">关 闭</el-button>
          </span>
      </el-dialog>
    </div>
    <!--  结算转账弹出框-->
    <div>
      <el-dialog title="转账备注" :visible.sync="dialogM.settleTranferDialog" width="30%" :modal-append-to-body="false" center>
        <div style="margin-left: 5rem">
          <el-form  class="demo-form-inline">
            <el-form-item label="代理商名称">{{settleTranferForm.distributerName}}</el-form-item>
            <el-form-item label="分佣金额">{{settleTranferForm.settlementAmount}}</el-form-item>
            <el-form-item label="扣税金额">{{settleTranferForm.taxAmount}}</el-form-item>
            <el-form-item label="转账金额">{{settleTranferForm.transferAmount}}</el-form-item>
            <el-form-item label="结算状态">{{settleTranferForm.auditStatusId}}</el-form-item>
            <el-form-item label="开户名">{{settleTranferForm.bankAccountName}}</el-form-item>
            <el-form-item label="开户地">{{settleTranferForm.bankAddress}}</el-form-item>
            <el-form-item label="开户银行">{{settleTranferForm.bankName}}</el-form-item>
            <el-form-item label="银行卡号">{{settleTranferForm.bankAccount}}</el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="tranferSuccessMeth">确定转账</el-button>
            <el-button type="primary" @click="dialogM.settleTranferDialog = false">关 闭</el-button>
          </span>
      </el-dialog>
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
        show: false,
        /** 弹框管理 */
        dialogM: {
          dialogDistributer: false, /** 代理商弹框 */
          settleAuditDialog: false, /** 结算审核弹框 */
          settleTranferDialog: false /** 结算转账弹框 */
        },
        /** 下拉框管理 */
        selectManOp: {
          /** 审核状态 */
          auditStatusOp: [{
            value: 0,
            label: '待审核'
          }, {
            value: 1,
            label: '已审核'
          }],
          /** 结算状态 */
          settleStatusOp: [{
            value: 0,
            label: '待转账'
          }, {
            value: 1,
            label: '转账中'
          }, {
            value: 2,
            label: '转账完成'
          }],
          /** 渠道 */
          channelOp: [{}],
          /** 运营人员 */
          managerOp: [{}]
        },
        /** 省市县全部 */
        areaData: [{}],
        /** 多选框 */
        multipleSelection: [],
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
        settleData: [],
        totalNum: 0, /** 查询总条数 */
        /** 结算管理提交form */
        settleForm: {
          distributerId: '', /** 代理商id */
          settlementYear: '', /** 结算年 */
          settlementMonth: '', /** 结算月 */
          channelId: '', /** 渠道id */
          auditStatusId: '', /** 审核状态 */
          transferStatusId: '', /** 结算状态 */
          managerId: '', /** 运营负责人id */
          pageSize: 5,
          currentPage: 1
        },
        /** 结算审核弹框显示表单 */
        settleAuditForm: {
          settlementId: '',
          distributerName: '',
          settlementAmount: '',
          transferAmount: '',
          taxAmount: '',
          auditStatusId: ''
        },
        /** 结算转账弹框显示表单 */
        settleTranferForm: {
          settlementId: '',
          distributerName: '',
          settlementAmount: '',
          transferAmount: '',
          taxAmount: '',
          auditStatusId: '',
          bankAccountName: '',
          bankName: '',
          bankAccount: '',
          bankAddress: '' /** 开户地 */
        }
      }
    },
    created: function () {
      this.dataGet()
      this.areaGet()
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
      /** 结算审核 */
      settleAudit (index, row) {
        this.settleAuditForm.distributerName = row.dInfo.distributerName
        this.settleAuditForm.settlementAmount = row.settlementAmount + '元'
        this.settleAuditForm.transferAmount = row.transferAmount + '元'
        this.settleAuditForm.taxAmount = row.taxAmount + '元'
        this.settleAuditForm.auditStatusId = row.auditStatusId
        this.settleAuditForm.settlementId = row.settlementId
        this.dialogM.settleAuditDialog = true
      },
      /** 审核通过 */
      auditSuccessMeth () {
        var that = this
        var BODY = {
          settlementId: that.settleAuditForm.settlementId
        }
        console.log(BODY)
        axios.post('/api/settlementLog/updateSettlementStatusByPrimaryKey', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('修改审核')
          console.log(response.data)
          for (var i = 0; i < that.settleData.length; i++) {
            if (that.settleData[i].settlementId === response.data.settlementId) {
              for (var j = 0; j < that.selectManOp.managerOp.length; j++) {
                if (that.selectManOp.managerOp[j].managerId === response.data.managerId) {
                  that.settleData[i].dInfo.sManager.managerName = that.selectManOp.managerOp[j].managerName
                }
              }
              if (response.data.auditStatusId === 1) {
                that.settleData[i].auditStatusId = '已审核'
              }
              if (response.data.transferStatusId === 1) {
                that.settleData[i].transferStatusId = '转帐中'
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
        that.dialogM.settleAuditDialog = false
      },
      /** 结算转账 */
      settleTranfer (index, row) {
        for (var j = 0; j < this.areaData.length; j++) {
          if (row.dInfo.bankProvinceId === this.areaData[j].id) {
            row.dInfo.bankProvinceId = this.areaData[j].name
          }
          if (row.dInfo.bankCityId === this.areaData[j].id) {
            row.dInfo.bankCityId = this.areaData[j].name
          }
          if (row.dInfo.bankCountyId === this.areaData[j].id) {
            row.dInfo.bankCountyId = this.areaData[j].name
          }
        }
        this.settleTranferForm.settlementId = row.settlementId
        this.settleTranferForm.auditStatusId = row.auditStatusId
        this.settleTranferForm.distributerName = row.dInfo.distributerName
        this.settleTranferForm.settlementAmount = row.settlementAmount
        this.settleTranferForm.transferAmount = row.transferAmount
        this.settleTranferForm.taxAmount = row.taxAmount
        this.settleTranferForm.bankAccountName = row.dInfo.bankAccountName
        this.settleTranferForm.bankName = row.dInfo.bankName
        this.settleTranferForm.bankAccount = row.dInfo.bankAccount
        this.settleTranferForm.bankAddress = row.dInfo.bankProvinceId + '-' + row.dInfo.bankCityId + '-' + row.dInfo.bankCountyId
        this.dialogM.settleTranferDialog = true
      },
      /** 结算转账 */
      tranferSuccessMeth () {
        var that = this
        var BODY = {
          settlementId: that.settleTranferForm.settlementId
        }
        console.log(BODY)
        axios.post('/api/settlementLog/updateTransferStatusByPrimaryKey', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('修改结算')
          console.log(response.data)
          for (var i = 0; i < that.settleData.length; i++) {
            if (that.settleData[i].settlementId === response.data.settlementId) {
              if (response.data.transferStatusId === 2) {
                that.settleData[i].transferStatusId = '转账完成'
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
        that.dialogM.settleTranferDialog = false
      },
      /** 分页 */
      handleSizeChange (val) {
        this.settleForm.pageSize = val
        console.log('当前数量')
        console.log(this.settleForm.pageSize)
        this.onSubmit()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.settleForm.currentPage = val
        this.onSubmit()
        console.log(`当前页: ${val}`)
      },
      /** 发票已到 */
      isReInvoice () {
        var that = this
        var settlementId = []
        for (var i = 0; i < that.multipleSelection.length; i++) {
          settlementId.push(that.multipleSelection[i].settlementId)
        }
        console.log('发票参数')
        console.log(settlementId)
        var BODY = {
          settlementId: settlementId
        }
        axios.post('/api/settlementLog/updateInvoiceByPrimaryKey', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('完成修改发票')
          if (response.data === 'OK') {
            for (var j = 0; j < that.multipleSelection.length; j++) {
              for (var k = 0; k < that.settleData.length; k++) {
                if (that.multipleSelection[j].settlementId === that.settleData[k].settlementId) {
                  if (that.settleData[k].dInfo.bankAccountType === 0) {
                    that.settleData[k].isReceivedInvoice = '---'
                  }
                  if (that.settleData[k].dInfo.bankAccountType === 1) {
                    that.settleData[k].isReceivedInvoice = '是'
                  }
                }
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 多选框触发 */
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      /** form表单提交 */
      onSubmit () {
        var that = this
        var BODY = {
          distributerId: that.settleForm.distributerId, // 代理商id
          settlementYear: that.settleForm.settlementYear,
          settlementMonth: that.settleForm.settlementMonth,
          channelId: that.settleForm.channelId,
          auditStatusId: that.settleForm.auditStatusId,
          transferStatusId: that.settleForm.transferStatusId,
          managerId: that.settleForm.managerId,
          currentPage: that.settleForm.currentPage,
          pageSize: that.settleForm.pageSize
        }
        console.log('当前表单数据')
        console.log(that.settleForm)
        console.log('BODY')
        console.log(BODY)
        axios.post('/api/settlementLog/querySettlementLogByJoin', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          console.log('显示查询结果')
          that.settleData = response.data.dList
          that.totalNum = response.data.totalPage
          console.log(response.data)
          for (var i = 0; i < that.settleData.length; i++) {
            if (that.settleData[i].auditLevel > 0) {
              that.settleData[i].dInfo.sManager.managerName = that.settleData[i].sManager.managerName
            }
            that.settleData[i].settlementAmount = that.settleData[i].settlementAmount / 100
            that.settleData[i].transferAmount = that.settleData[i].transferAmount / 100
            that.settleData[i].settlementYear = that.settleData[i].settlementYear + '-' + that.settleData[i].settlementMonth
            if (that.settleData[i].auditStatusId === 0) {
              that.settleData[i].auditStatusId = '待审核'
            }
            if (that.settleData[i].auditStatusId === 1) {
              that.settleData[i].auditStatusId = '已审核'
            }
            if (that.settleData[i].transferStatusId === 0) {
              that.settleData[i].transferStatusId = '待转账'
            }
            if (that.settleData[i].transferStatusId === 1) {
              that.settleData[i].transferStatusId = '转账中'
            }
            if (that.settleData[i].transferStatusId === 2) {
              that.settleData[i].transferStatusId = '转账完成'
            }
            if (that.settleData[i].dInfo.bankAccountType === 0) {
              that.settleData[i].taxAmount = that.settleData[i].taxAmount / 100
              that.settleData[i].isReceivedInvoice = '---'
            }
            if (that.settleData[i].dInfo.bankAccountType === 1) {
              that.settleData[i].taxAmount = '---'
              if (that.settleData[i].isReceivedInvoice === true) {
                that.settleData[i].isReceivedInvoice = '是'
              }
              if (that.settleData[i].isReceivedInvoice === false) {
                that.settleData[i].isReceivedInvoice = '否'
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 重置表单 */
      onReset () {
        this.settleForm.distributerId = ''
        this.settleForm.settlementYear = ''
        this.settleForm.settlementMonth = ''
        this.settleForm.channelId = ''
        this.settleForm.auditStatusId = ''
        this.settleForm.transferStatusId = ''
        this.settleForm.managerId = ''
        this.selectDistributer = '选择代理商'
        this.settleForm.currentPage = 1
        this.settleForm.pageSize = 5
        this.settleData = []
        this.distributerData = [{}]
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
        that.settleForm.distributerId = row.distributerId
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
      /** 查询省市县名称 */
      areaGet: function () {
        console.log('开始查询名称')
        var that = this
        axios.get(api + 'common/search/getChinaAreas', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': that.getCookie('authorization')
          }
        }).then(function (response) {
          that.areaData = response.data
          console.log('省市县名称')
        }).catch(function (error) {
          console.log(error)
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
          console.log('查询代理商')
          console.log(response.data)
          that.managerData = ''
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
          that.selectManOp.channelOp = response.data
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
      /** 导出报表 */
      exportReport () {
        console.log('开始导出excel')
        window.location.href = ('/api/settlementLog/exportExcelManage?distributerId=' + this.settleForm.distributerId + '&settlementYear=' + this.settleForm.settlementYear + '&settlementMonth=' + this.settleForm.settlementMonth +
          '&channelId=' + this.settleForm.channelId + '&managerId=' + this.settleForm.managerId + '&transferStatusId=' + this.settleForm.transferStatusId + '&auditStatusId=' + this.settleForm.auditStatusId)
//        var that = this
//        var BODY = {
//          distributerId: that.settleForm.distributerId, // 代理商id
//          settlementYear: that.settleForm.settlementYear,
//          settlementMonth: that.settleForm.settlementMonth,
//          channelId: that.settleForm.channelId,
//          auditStatusId: that.settleForm.auditStatusId,
//          transferStatusId: that.settleForm.transferStatusId,
//          managerId: that.settleForm.managerId
//        }
//        console.log(BODY)
//        axios.get('/api/settlementLog/exportExcelManage', {params: BODY}, {
//          headers: {
//            'Content-Type': 'application/json'
//            'Authorization': 'hero'
//          }
//        }).then(function (response) {
//          console.log('成功')
//        }).catch(function (error) {
//          console.log(error)
//        })
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
