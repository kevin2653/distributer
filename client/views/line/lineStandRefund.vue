<template>
  <div style="min-height: 1200px">
    <el-form  v-model="lineOrder" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div>
              <el-form-item label="线路产品名称">
              <el-button style="width: 10rem" @click="dialogM.dialogProduct = true">{{selectProduct}}</el-button>
              <el-dialog title="选择线路产品" :visible.sync="dialogM.dialogProduct" :modal-append-to-body="false"
                         :before-close="handleClose" center class="modelStyle">
                <el-container>
                  <el-aside width="50%">
                    <el-input v-model="proName" @input="inputChangePro" placeholder="输入线路名称或产品编号"></el-input>
                    <el-table :data="lineData" border @row-click="rowClickProduct" height="250" style="width: 100%">
                      <el-table-column prop="pName">
                      </el-table-column>
                    </el-table>
                  </el-aside>
                  <el-main width="50%">
                    <div style="margin-top: -1rem"><label>已选线路产品</label></div>
                    <br>
                    <div>
                      <label>产品编号：<br>
                        {{productData.pid}}<br>
                      </label>
                      <label>产品名称：<br>
                        {{productData.pName}}<br>
                      </label>
                      <!--<label>出行时间：<br>-->
                        <!--{{}}<br>-->
                      <!--</label>-->
                      <!--<label>产品价格：<br>-->
                        <!--{{}}-->
                      <!--</label>-->
                    </div>
                  </el-main>
                </el-container>
                <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="BackFillProduct">确 定</el-button>
                        <el-button @click="dialogM.dialogProduct = false">取 消</el-button>
                      </span>
              </el-dialog>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="margin-left: 27px">
            <el-form-item label="团号">
              <el-input v-model="lineOrder.tourGroup" style="width: 10rem"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form-item label="退款状态">
              <el-select v-model="lineOrder.cancelStatus"  placeholder="请选择" style="width: 10rem">
                <el-option
                  v-for="item in refundStatusOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
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
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form-item label="运营负责人">
              <el-select v-model="lineOrder.operatorId" placeholder="请选择" style="width: 10rem">
                <el-option
                  v-for="item in managerOp"
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
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="orderData" tooltip-effect="dark" border style="width: 100%" >
            <!--<el-table-column type="selection" label="全选" width="55">-->
            <!--</el-table-column>-->
            <el-table-column label="线路产品名称" prop="pName" align="center">
            </el-table-column>
            <el-table-column label="团号" prop="tourGroup" align="center">
            </el-table-column>
            <el-table-column label="联系人姓名" prop="linkMan" align="center">
            </el-table-column>
            <el-table-column label="退款金额(元)" prop="amountStr" align="center">
            </el-table-column>
            <el-table-column label="退款状态" prop="statusStr" align="center">
            </el-table-column>
            <el-table-column label="订单取消时间" prop="cancelTimeStr" align="center">
            </el-table-column>
            <el-table-column label="退款时间" prop="refundTimeStr" align="center">
            </el-table-column>
            <el-table-column label="代理商名称" prop="distributerName" align="center">
            </el-table-column>
            <el-table-column label="运营负责人" prop="operatorName" align="center">
            </el-table-column>
            <el-table-column align="center" width="240" label="操作">
              <template slot-scope="scope" center>
                <el-button round size="mini" @click="orderAudit(scope.$index, scope.row)" v-if="scope.row.statusId === 201">审  核</el-button>
                <el-button round size="mini" @click="seeDetails(scope.$index, scope.row)">查看订单</el-button>
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
        :current-page=lineOrder.pageIndex
        :page-sizes= pageSizeArr
        :page-size=lineOrder.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalNum>
      </el-pagination>
    </div>
    <!--审核弹窗-->
    <div>
      <el-dialog title="审核备注" :visible.sync="dialogM.orderAuditDialog" width="30%" :modal-append-to-body="false" center>
        <div style="margin-left: 5rem">
          <el-form :model="orderAuditForm" class="demo-form-inline">
            <el-form-item label="订单编号">{{orderAuditForm.ordersn}}</el-form-item>
            <el-form-item label="线路名称">{{orderAuditForm.pName}}</el-form-item>
            <el-form-item label="订单金额">{{orderAuditForm.amountStr}}</el-form-item>
            <el-form-item label="退款金额">
              <el-input style="width: 10rem" v-model="orderAuditForm.refundAmountStr"></el-input><label>元</label>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="orderAuditSubmit">确  定</el-button>
            <el-button type="primary" @click="dialogM.orderAuditDialog = false">关 闭</el-button>
          </span>
      </el-dialog>
    </div>
    <!-- 关联线路弹窗-->
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
        /** button管理 */
        buttonM: {
          orderClaim: true /** 订单认领按钮 */
        },
        /** 弹框管理 */
        dialogM: {
          dialogDistributer: false,   /** 代理商弹框 */
          dialogProduct: false,   /** 线路产品弹框 */
          orderAuditDialog: false   /** 订单认领弹窗 */
        },
        /** 退款状态 */
        refundStatusOp: [{
          value: 201,
          label: '待审核'
        }, {
          value: 205,
          label: '已审核'
        }, {
          value: 211,
          label: '退款失败'
        }, {
          value: 213,
          label: '退款成功(人工)'
        }, {
          value: 215,
          label: '退款成功(系统)'
        }],
        /** 运营人员 */
        managerOp: [],
//        /** 多选框 */
//        multipleSelection: [],
        /** 头部信息 */
        authorization: '',
        /** 代理商弹框表格 */
        tableData: [],
        disLikeTableData: [{}],
        /** 代理商模糊查询 */
        disName: '',
        /** 代理商详情 */
        distributerData: {},
        /** 回填代理商 */
        selectDistributer: '选择代理商',
        /** 代理商详情运营人员 */
        managerData: {},
        /** 回填产品 */
        selectProduct: '选择产品',
        /** 线路产品模糊查询 */
        proName: '',
        /** 线路产品详情 */
        productData: {},
        /** 退款线路订单表格 */
        orderData: [],
        /** 关联线路产品弹框表格 */
        lineData: [],
        lineLikeData: [],
        totalNum: 0, /** 查询总条数 */
        /** form表单数据 */
        lineOrder: {
          distributerId: '', /** 代理商id */
          tourGroup: '', /** 团号 */
          operatorId: '', /** 运营管理人员 */
          pid: '', /** 产品id */
          cancelStatus: '', /** 退款状态 */
          pageIndex: 1, /** 当前页 */
          pageSize: 5 /** 每页显示条数 */
        },
        /** 订单审核form表单 */
        orderAuditForm: {
          ordersn: '', /** 订单编号 */
          pName: '', /** 产品名称 */
          amountStr: '', /** 订单金额 */
          refundAmountStr: '', // 退款金额
          operatorId: ''
        }
      }
    },
    created: function () {
      if (typeof this.$route.query.lineOrder !== 'undefined') {
        this.lineOrder = JSON.parse(this.$route.query.lineOrder)
        this.onSubmit()
      }
      this.dataGet()
    },
    updated: function () {
    },
    methods: {
      /** 分页 */
      handleSizeChange (val) {
        this.lineOrder.pageSize = val
//        console.log('当前数量')
//        console.log(this.lineOrder.pageSize)
        this.onSubmit()
//        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.lineOrder.pageIndex = val
        this.onSubmit()
//        console.log(`当前页: ${val}`)
      },
      /** 查看详情 */
      seeDetails (index, row) {
        this.$router.push({path: '/line/lineStandOrder/lineStandDetails', query: {ordersn: row.ordersn, lineOrder: JSON.stringify(this.lineOrder), sign: 'refund'}})
        console.log(row)
      },
      /** 订单审核 */
      orderAudit (index, row) {
        this.orderAuditForm.ordersn = row.ordersn
        this.orderAuditForm.pName = row.pName
        this.orderAuditForm.amountStr = row.amountStr
        this.dialogM.orderAuditDialog = true
      },
      /** 退款金额设置 */
      orderAuditSubmit () {
        var that = this
//        console.log((Number(this.orderAuditForm.refundAmountStr) * 100))
        axios.get(global.API + 'distrbuter/admin/order/refund/' + that.orderAuditForm.ordersn + '/' + (Number(this.orderAuditForm.refundAmountStr) * 100), {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
//          console.log(response.data)
          if (response.data.code === 'SUCCESS') {
            that.dialogM.orderAuditDialog = false
            that.orderAuditForm.refundAmountStr = ''
            that.onSubmit()
//            for (var i = 0; i < that.orderData.length; i++) {
//              if (that.orderAuditForm.ordersn === that.orderData[i].ordersn) {
//                for (var j = 0; j < global.orderStandStatus.length; j++) {
//                  if () {}
//                }
//              }
//            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** form表单提交 */
      onSubmit () {
        var that = this
        var BODY = {
          pid: that.lineOrder.pid, // 产品id
          distributerId: that.lineOrder.distributerId, // 代理商id
          tourGroup: that.lineOrder.tourGroup, // 团号
          operatorId: that.lineOrder.operatorId, // 运营人员
          cancelStatus: that.lineOrder.cancelStatus, // 退款状态
          pageIndex: that.lineOrder.pageIndex,
          pageSize: that.lineOrder.pageSize
        }
//        console.log('当前表单数据')
//        console.log(BODY)
        axios.post(global.API + '/distrbuter/admin/order/orderRefund/list', BODY, {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
//          console.log('开始查询表单')
//          console.log(response.data)
          that.orderData = response.data.orderList
          that.totalNum = response.data.totalNum
          for (var i = 0; i < that.orderData.length; i++) {
            that.orderData[i].amountStr = (that.orderData[i].amount) / 100 + '.00'
            for (var j = 0; j < that.tableData.length; j++) {
              if (that.orderData[i].distributerId === that.tableData[j].distributerId) {
                that.orderData[i].distributerName = that.tableData[j].distributerName
              }
            }
            var num = Number(that.orderData[i].operatorId)
            for (var k = 0; k < that.managerOp.length; k++) {
              if (num === that.managerOp[k].managerId) {
                that.orderData[i].operatorName = that.managerOp[k].managerName
              }
            }
            if (that.orderData[i].refundTime === 0) {
              that.orderData[i].refundTimeStr = ''
            }
            if (that.orderData[i].cancelTime === 0) {
              that.orderData[i].cancelTimeStr = ''
            }
//            console.log(that.orderData[i].cancelTime)
//            console.log(new Date().getTime())
            if (typeof that.orderData[i].cancelTime === 'number') {
              that.orderData[i].cancelTimeStr = global.changeFormat(that.orderData[i].cancelTime)
            }
          }
//          console.log(that.orderData)
//          console.log('查询表单结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 重置表单 */
      onReset () {
        this.lineOrder.distributerId = ''
        this.lineOrder.tourGroup = ''
        this.lineOrder.operatorId = ''
        this.lineOrder.cancelStatus = ''
        this.lineOrder.pid = ''
        this.selectDistributer = '选择代理商'
        this.lineOrder.pageIndex = 1
        this.lineOrder.pageSize = 5
        this.distributerData = []
        this.productData = {}
        this.selectProduct = '选择产品'
        this.orderData = []
        this.managerData = {}
        this.disName = ''
        this.totalNum = 0
//        console.log(this.lineOrder)
      },
      /** 多选框触发 */
//      handleSelectionChange (val) {
//        var that = this
//        that.multipleSelection = val
//        if (that.multipleSelection.length === 1) {
//          that.buttonM.orderClaim = false
//        } else {
//          that.buttonM.orderClaim = true
//        }
//      },
      /** input改变，模糊查询代理商 */
      inputChangeDis () {
        var that = this
        for (var i = 0; i < that.tableData.length; i++) {
          if (that.tableData[i].distributerName.indexOf(that.disName) > -1) {
            that.disLikeTableData.push(that.tableData[i])
          }
        }
//        console.log(that.disLikeTableData)
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
        that.lineOrder.distributerId = row.distributerId
      },
      /** input改变，查询产品 */
      inputChangePro (value) {
        var that = this
        setTimeout(function () {
          axios.get(global.API + 'distrbuter/product/list/1/' + value, {
            headers: {
              'Authorization': 'Sys ' + global.getCookie('authorization'),
              'Content-Type': 'application/json'
            }
          }).then(function (response) {
            that.lineData = response.data
          }).catch(function (error) {
            console.log(error)
          })
        }, 300)
      },
      /** 选择产品显示详情 */
      rowClickProduct (row) {
        var that = this
        for (var i = 0; i < that.lineData.length; i++) {
          if (that.lineData[i].pid === row.pid) {
            that.productData = that.lineData[i]
          }
        }
        that.lineOrder.pid = row.pid
      },
      /** 回填产品 */
      BackFillProduct () {
        this.dialogProduct = false
        if (this.productData.pName == null) {
          this.selectProduct = '选择产品'
        } else {
          this.selectProduct = this.productData.pName
        }
        this.dialogM.dialogProduct = false
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
      /** 获取线路产品 */
      proData () {
        var that = this
        axios.get(global.API + 'distrbuter/product/list/1', {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          that.lineData = response.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      dataGet: function (event) {
        var that = this
        /** 获取代理商运营人员 */
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + global.getCookie('admin_token')
          }
        }).then(function (response) {
          that.managerOp = response.data.systemManagerDTOList
//          that.authorization = response.data.authorization
          that.proData()
//          console.log(that.managerOp)
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {deapth: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + global.getCookie('admin_token')
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
        }).catch(function (error) {
          console.log(error)
        })
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
