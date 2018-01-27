<template>
  <div style="min-height: 650px">
    <el-form  v-model="lineOrder" class="demo-form-inline">
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
            <el-form-item label="创建时间">
              <el-date-picker type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="lineOrder.startTime" style="width: 10rem">
              </el-date-picker>
              <label>-</label>
              <el-date-picker
                v-model="lineOrder.endTime"
                type="date"
                placeholder="结束时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width: 10rem">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple" style="margin-left: 27px">
            <el-form-item label="团号">
              <el-input v-model="lineOrder.teamId" style="width: 10rem"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="是否已分配运营负责人">
              <el-select v-model="lineOrder.isBeenManage"  placeholder="请选择" style="width: 10rem">
                <el-option
                  v-for="item in isBeenManageOp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
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
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button round :disabled="buttonM.orderClaim" @click="orderClaimMeth">订单认领</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="orderData" tooltip-effect="dark" @selection-change="handleSelectionChange" border style="width: 100%" >
            <el-table-column type="selection" label="全选" width="55">
            </el-table-column>
            <el-table-column label="订单编号" prop="requirementId" align="center">
            </el-table-column>
            <el-table-column label="目的地" prop="destination" align="center">
            </el-table-column>
            <el-table-column label="联系人姓名" prop="linkMan" align="center">
            </el-table-column>
            <el-table-column label="联系电话" prop="linkTel" align="center">
            </el-table-column>
            <el-table-column label="临时团号" prop="team_id" align="center">
            </el-table-column>
            <el-table-column label="需求创建时间" prop="createTime" align="center">
            </el-table-column>
            <el-table-column label="代理商名称" prop="distributerName" align="center">
            </el-table-column>
            <el-table-column label="运营负责人" prop="operatorName" align="center">
            </el-table-column>
            <el-table-column align="center" width="240" label="操作">
              <template slot-scope="scope" center>
                <el-button round size="mini" @click="seeDetails(scope.$index, scope.row)">查看详情</el-button>
                <el-button round size="mini" @click="linkLine(scope.$index, scope.row)">关联线路</el-button>
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
        :page-sizes=pageSizeArr
        :page-size=lineOrder.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalNum>
      </el-pagination>
    </div>
    <!--支付成功成功提示框-->
    <!--<el-dialog :visible.sync="dialogM.paySuccess" width="30%" :modal-append-to-body="false" center>-->
      <!--<div align="center">-->
        <!--<i class="el-icon-success"></i><br>-->
        <!--<span>-->
          <!--订单支付成功<br>-->
          <!--5s之后窗口自动退出-->
        <!--</span>-->
      <!--</div>-->
    <!--</el-dialog>-->
    <!--</el-main>-->
    <!--</el-container>-->
    <!--认领订单弹窗-->
    <div>
      <el-dialog title="订单认领备注" :visible.sync="dialogM.orderClaimDialog" width="30%" :modal-append-to-body="false" center>
        <div style="margin-left: 5rem">
          <el-form :model="orderClaimForm" class="demo-form-inline">
            <el-form-item label="订单编号">{{orderClaimForm.ordersn}}</el-form-item>
            <el-form-item label="需求目的地">美国</el-form-item>
            <el-form-item label="运营负责人">
              <el-select v-model="orderClaimForm.operationId" placeholder="请选择" style="width: 10rem">
                <el-option
                  v-for="item in managerOp"
                  :key="item.managerId"
                  :label="item.managerName"
                  :value="item.managerId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="orderClaimSubmit">确定认领</el-button>
            <el-button type="primary" @click="dialogM.orderClaimDialog = false">关 闭</el-button>
          </span>
      </el-dialog>
    </div>
    <!-- 关联线路弹窗-->
    <div>
      <el-dialog title="选择线路产品" :visible.sync="dialogM.dialogProduct" :modal-append-to-body="false"
                 :before-close="handleClose" center class="modelStyle">
        <el-container>
          <el-aside width="50%">
            <el-input v-model="proName" @change="inputChangePro" placeholder="输入线路名称或产品编号"></el-input>
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
              <label>出行时间：<br>
                2017-12-25<br>
              </label>
              <label>产品价格：<br>
                5000
              </label>
            </div>
          </el-main>
        </el-container>
        <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogM.dialogProduct = false">确定关联</el-button>
                        <el-button @click="dialogM.dialogProduct = false">取 消</el-button>
                      </span>
      </el-dialog>
    </div>
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
          dialogProduct: false,   /** 关联线路弹框 */
          orderClaimDialog: false,   /** 订单认领弹窗 */
          orderPayDialog: false,   /** 订单支付弹窗 */
          paySuccess: false    /** 支付成功弹窗 */
        },
        /** 是否分配运营负责人 */
        isBeenManageOp: [{
          value: 0,
          label: '否'
        }, {
          value: 1,
          label: '是'
        }],
        /** 运营人员 */
        managerOp: [],
        /** 多选框 */
        multipleSelection: [],
        /** 头部信息 */
        authorization: '',
        /** 代理商弹框表格 */
        tableData: [],
        disLikeTableData: [],
        /** 代理商模糊查询 */
        disName: '',
        /** 代理商详情 */
        distributerData: {},
        /** 回填代理商 */
        selectDistributer: '选择代理商',
        /** 代理商详情运营人员 */
        managerData: {},
        /** 关联线路模糊查询 */
        proName: '',
        /** 关联线路详情 */
        productData: {},
        /** 线路订单表格 */
        orderData: [],
        /** 关联订单号 */
        ordersn: '',
        /** 关联线路产品弹框表格 */
        lineData: [],
        lineLikeData: [],
        totalNum: 0, /** 查询总条数 */
        /** form表单数据 */
        lineOrder: {
          distributerId: '', /** 代理商id */
          teamId: '', /** 临时团号 */
          operatorId: '', /** 运营管理人员 */
          isBeenManage: '', /** 是否分配运营负责人 */
          startTime: '', /** 下单开始时间 */
          endTime: '', /** 下单结束时间 */
          pageIndex: 1, /** 当前页 */
          pageSize: 5 /** 每页显示条数 */
        },
        /** 订单认领form表单 */
        orderClaimForm: {
          ordersn: '',
         /** 目的地缺数据 */
          operationId: ''
        }
      }
    },
    created: function () {
      this.dataGet()
      if (typeof this.$route.query.lineOrder !== 'undefined') {
        this.lineOrder = JSON.parse(this.$route.query.lineOrder)
        this.dataGet()
        console.log('打印当前提交数据')
        console.log(this.lineOrder)
        this.onSubmit()
      }
    },
    updated: function () {
    },
    methods: {
      /** 分页 */
      handleSizeChange (val) {
        this.lineOrder.pageSize = val
        console.log('当前数量')
        console.log(this.lineOrder.pageSize)
        this.onSubmit()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.lineOrder.pageIndex = val
        this.onSubmit()
        console.log(`当前页: ${val}`)
      },
      /** 查看详情 */
      seeDetails (index, row) {
        this.$router.push({path: '/line/lineCustomOrder/customOrderDetails', query: {customDetails: JSON.stringify(row), lineOrder: JSON.stringify(this.lineOrder)}})
      },
      /** 关联线路 */
      linkLine (index, row) {
        this.ordersn = row.ordersn
        this.dialogM.dialogProduct = true
      },
      /** 订单认领 */
      orderClaimMeth () {
        this.orderClaimForm.ordersn = this.multipleSelection[0].ordersn
//        for (var i = 0; i < this.orderData.length; i++) {
//          if (this.orderData[i].ordersn === this.orderClaimForm.ordersn) {
//          }
//        }
        this.dialogM.orderClaimDialog = true
      },
      /** 确定认领 */
      orderClaimSubmit () {
        var that = this
        var BODY = {
          ordersn: that.orderClaimForm.ordersn,
          operationId: that.orderClaimForm.operationId
        }
        axios.post(global.API + 'distrbuter/admin/order/setOperationManager', BODY, {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          console.log('开始认领订单')
          console.log(response.data)
          if (response.data.code === 'SUCCESS') {
            console.log(that.orderClaimForm.ordersn)
            for (var i = 0; i < that.orderData.length; i++) {
              console.log('开始订单匹配')
              if (that.orderData[i].ordersn === that.orderClaimForm.ordersn) {
                console.log('开始订单匹配')
                for (var j = 0; j < that.managerOp.length; j++) {
                  if (that.orderClaimForm.operationId === that.managerOp[j].managerId) {
                    console.log('命名成功')
                    that.orderData[i].operationId = that.managerOp[j].managerName
                    that.orderClaimForm.ordersn = ''
                    that.orderClaimForm.operationId = ''
                  }
                }
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.dialogM.orderClaimDialog = false
      },
      /** form表单提交 */
      onSubmit () {
        var that = this
        var BODY = {
          distributerId: that.lineOrder.distributerId, // 代理商id
          teamId: that.lineOrder.teamId, // 团号
          operatorId: that.lineOrder.operatorId, // 运营人员
          isBeenManage: that.lineOrder.isBeenManage, // 是否分配运营人员
          startTime: that.lineOrder.startTime,  // 下单开始时间
          endTime: that.lineOrder.endTime, // 下单结束时间
          pageIndex: that.lineOrder.pageIndex,
          pageSize: that.lineOrder.pageSize
        }
        console.log('当前表单数据')
        console.log(BODY)
        axios.post(global.API + 'distrbuter/admin/customized/list', BODY, {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          console.log('开始查询表单')
          console.log(response.data)
          that.orderData = response.data.list
          that.totalNum = response.data.totalNum
          for (var i = 0; i < that.orderData.length; i++) {
            that.orderData[i].amount = (that.orderData[i].amount) / 100
            for (var j = 0; j < that.tableData.length; j++) {
              if (that.orderData[i].distributerId === that.tableData[j].distributerId) {
                that.orderData[i].distributerName = that.tableData[j].distributerName
              }
            }
//            var num = Number(that.orderData[i].operationId)
            for (var k = 0; k < that.managerOp.length; k++) {
              if (that.orderData[i].operatorId === that.managerOp[k].managerId) {
                that.orderData[i].operatorName = that.managerOp[k].managerName
              }
            }
          }
          console.log(that.orderData)
          console.log('查询表单结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 重置表单 */
      onReset () {
        this.lineOrder.distributerId = ''
        this.lineOrder.teamId = ''
        this.lineOrder.operatorId = ''
        this.lineOrder.isBeenManage = ''
        this.lineOrder.startTime = ''
        this.lineOrder.endTime = ''
        this.selectDistributer = '选择代理商'
        this.lineOrder.currentPage = 1
        this.lineOrder.pageSize = 5
        this.distributerData = []
        this.orderData = []
        this.managerData = {}
        this.disName = ''
        this.totalNum = 0
        console.log(this.lineOrder)
      },
      /** 多选框触发 */
      handleSelectionChange (val) {
        var that = this
        that.multipleSelection = val
        if (that.multipleSelection.length === 1) {
          that.buttonM.orderClaim = false
        } else {
          that.buttonM.orderClaim = true
        }
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
        that.lineOrder.distributerId = row.distributerId
      },
      /** input改变，查询产品 */
      inputChangePro () {
        var that = this
        for (var i = 0; i < that.lineData.length; i++) {
          if (that.lineData[i].pName.indexOf(that.proName) > -1) {
            that.lineLikeData.push(that.lineData[i])
          }
        }
        console.log(that.lineLikeData)
        that.lineData = that.lineLikeData
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
      proData (authorization) {
        var that = this
        axios.get(global.API + "distrbuter/product/list/100/''", {
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
          that.authorization = response.data.authorization
          that.proData(that.authorization)
//          console.log(that.managerOp)
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + global.getCookie('admin_token')
          }
        }).then(function (response) {
          that.tableData = response.data.listDto
          that.managerData = ''
          if (typeof that.$route.query.lineOrder !== 'undefined') {
            that.rowClickDistributer(that.lineOrder)
            that.BackFillPdistributer()
          }
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
