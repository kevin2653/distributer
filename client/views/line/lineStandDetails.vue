<template>
  <div style="background-color: #f2f2f2" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="margin-right: 5rem" align="right">
        <a @click="returnToUpLevel">返回</a>
      </div>
      <div style="width: 95%;margin-left: 3rem">
        <el-form label-width="200px">
          <div>
            <label>联系人信息</label>
          </div>
          <br>
          <div>
            <el-form-item label="联系人姓名:">
              {{orderDetails.linkMan}}
            </el-form-item>
            <el-form-item label="联系电话:">
              {{orderDetails.linkTel}}
            </el-form-item>
            <el-form-item label="邮箱地址:">
              {{orderDetails.linkEmail}}
            </el-form-item>
          </div>
          <br>
          <div>
            <label>线路产品订单信息</label>
          </div>
          <div>
            <el-form-item label="订单编号:">
              {{orderDetails.ordersn}}
            </el-form-item>
            <el-form-item label="订单创建时间:">
              {{orderDetails.createTime}}
            </el-form-item>
            <el-form-item label="线路产品名称:">
              {{orderDetails.pName}}
            </el-form-item>
            <el-form-item label="团号:">
              {{orderDetails.tourGroup}}
            </el-form-item>
            <el-form-item label="出行人数:">
              {{orderDetails.tourersNum}}
            </el-form-item>
            <el-form-item label="出行时间:">
              {{orderDetails.travelDate}}
            </el-form-item>
            <el-form-item label="退款状态:">
              {{orderDetails.canceStatusStr}}
            </el-form-item>
            <el-form-item label="取消类型:">
              {{orderDetails.cancelTypeStr}}
            </el-form-item>
            <el-form-item label="取消原因:">
              {{orderDetails.cancelReason}}
            </el-form-item>
            <el-form-item label="发票类型:">
              {{orderDetails.typeStr}}
            </el-form-item>
            <el-form-item label="抬头:">
              {{orderBill.title}}
            </el-form-item>
            <el-form-item label="税号:">
              {{orderBill.taxNum}}
            </el-form-item>
            <el-form-item label="收件人姓名:">
              {{orderDetails.receiverName}}
            </el-form-item>
            <el-form-item label="收件人电话:">
              {{orderDetails.receiverTel}}
            </el-form-item>
            <el-form-item label="收件地址:">
              {{orderDetails.receiverAddress}}
            </el-form-item>
            <el-form-item label="线路运营负责人:">
              {{orderDetails.operatorName}}
            </el-form-item>
            <el-form-item label="代理商名称:">
              {{orderDetails.distributerName}}
            </el-form-item>
            <el-form-item label="代理商结算状态:">
              {{disSettleStatus}}
            </el-form-item>
            <el-form-item label="订单状态:">
              {{orderDetails.statusStr}}
            </el-form-item>
          </div>

          <br>
          <div>
            <label>支付信息</label>
          </div>
          <div>
            <el-form-item label="支付单号:">
              {{orderDetails.payFormNo}}
            </el-form-item>
            <el-form-item label="订单金额:">
              {{orderDetails.amountStr}}
            </el-form-item>
            <el-form-item label="支付金额:">
              {{orderDetails.payAmountStr}}
            </el-form-item>
            <el-form-item label="优惠券:">
              {{orderDetails.coupon}}
            </el-form-item>
            <el-form-item label="积分:">
              {{orderDetails.integral}}
            </el-form-item>
            <el-form-item label="支付方式:">
              {{orderDetails.payType2Str}}
            </el-form-item>
            <el-form-item label="支付渠道:">
              {{orderDetails.payTypeStr}}
            </el-form-item>
          </div>
          <br>
          <div>
            <label>出行人信息</label>
          </div>
          <br>
          <div v-show="orderDetails.isInternational === 1">
            <el-table :data="travelerTable" border style="width: 100%">
              <el-table-column prop="tourerName" label="出行人姓名" align="center">
              </el-table-column>
              <el-table-column prop="passportTypeStr" label="护照类别" align="center">
              </el-table-column>
              <el-table-column prop="countryId" label="国家码" align="center">
              </el-table-column>
              <el-table-column prop="cardNumber" label="护照号" align="center">
              </el-table-column>
              <el-table-column prop="genderStr" label=" 性别" align="center">
              </el-table-column>
              <el-table-column prop="ageGroupStr" label="成人/儿童" align="center">
              </el-table-column>
              <el-table-column prop="birthday"  label="出生日期" align="center">
              </el-table-column>
              <el-table-column prop="birthAdress" label="出生地点" align="center">
              </el-table-column>
              <el-table-column prop="issueStartTime" label="签发日期" align="center">
              </el-table-column>
              <el-table-column prop="issueEndTime"  label="有效日期" align="center">
              </el-table-column>
              <el-table-column prop="issueAreaName" label="签发地点" align="center">
              </el-table-column>
              <el-table-column prop="mobile" label="联系电话" align="center">
              </el-table-column>
            </el-table>
          </div>
          <div v-show="orderDetails.isInternational === 0">
            <el-table :data="travelerTable" border style="width: 100%">
              <el-table-column prop="tourerName"  label="出行人姓名" align="center">
              </el-table-column>
              <el-table-column prop="cardTypeStr" label="证件类别" align="center">
              </el-table-column>
              <el-table-column prop="cardNumber" label="证件号码" align="center">
              </el-table-column>
              <el-table-column prop="genderStr" label=" 性别" align="center">
              </el-table-column>
              <el-table-column prop="ageGroupStr" label="成人/儿童" align="center">
              </el-table-column>
              <el-table-column prop="mobile" label="联系电话" align="center">
              </el-table-column>
            </el-table>
          </div>
          <br>
          <div align="center">
            <!--<el-form-item>-->
              <!--<el-button type="primary" @click="">编辑</el-button>-->
            <!--</el-form-item>-->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import global from '../../global'
  import Vue from 'vue'
  var api = Vue.prototype.api
  export default {
    components: {
      axios,
      api
    },
    data () {
      return {
        /** 当前订单号 */
        ordersn: '',
        /** 当前请求头 */
        authorization: '',
        /** 当前代理商id */
        distributerId: '',
        /** 发票信息 */
        orderBill: {},
        /** 出行人列表 */
        travelerTable: [],
        /** 护照列表 */
        passportList: [],
        /** 运营人员 */
        managerOp: [{}],
        /** 代理商 */
        distributerData: [{}],
        /** 代理商结算状态 */
        disSettleStatus: '',
        /** 代理商订单结算 */
        disCommissionData: [{}],
        /** 当前订单详情 */
        orderDetails: {},
        /** 省市县 */
        areaData: []
      }
    },
    created: function () {
      this.ordersn = this.$route.query.ordersn
      this.areaGet()
//      this.orderDataGet()
//      console.log('打印全局变量')
//      console.log(global)
    },
    updated: function () {
    },
    methods: {
      /** 返回上一层 */
      returnToUpLevel () {
        if (this.$route.query.sign === 'stand') {
          this.$router.push({path: '/line/lineStandOrder', query: {lineOrder: this.$route.query.lineOrder}})
        } else {
          this.$router.push({path: '/line/lineStandRefund', query: {lineOrder: this.$route.query.lineOrder}})
        }
      },
      // 获取订单详情
      getOrderDetails () {
        var that = this
        /** 获取订单详情产品 */
        axios.get(global.API + '/distrbuter/admin/order/detail/' + that.ordersn, {
          headers: {
            'Authorization': 'Sys ' + global.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          console.log('开始接收数据')
          console.log(response.data)
          console.log(typeof response.data.orderBill)
          that.orderDetails = response.data
          that.orderBill = response.data.orderBill
          that.travelerTable = response.data.tourers.list
          if (typeof response.data.tourers.possportList !== 'undefined') {
            that.passportList = response.data.tourers.possportList
          }
          // 支付单号
          if (that.orderDetails.payFormNo === '') {
            that.orderDetails.payFormNo = '---'
          }
          // 出行人数
          that.orderDetails.tourersNum = ''
          if (that.orderDetails.tourers.subNum.adult !== 0) {
            that.orderDetails.tourersNum = that.orderDetails.tourersNum + that.orderDetails.tourers.subNum.adult + '成人'
          }
          if (that.orderDetails.tourers.subNum.child !== 0) {
            that.orderDetails.tourersNum = that.orderDetails.tourersNum + that.orderDetails.tourers.subNum.child + '儿童'
          }
          if (that.orderDetails.tourers.subNum.old !== 0) {
            that.orderDetails.tourersNum = that.orderDetails.tourersNum + that.orderDetails.tourers.subNum.old + '老人'
          }
          // 订单金额
          that.orderDetails.amountStr = ((response.data.amount) / 100) + '元' + '(含单房差：' + (response.data.amountDetail.roombalance) / 100 + '元)'
          // 支付金额
          that.orderDetails.payAmountStr = (that.orderDetails.amountDetail.childprice.subAmount * that.orderDetails.amountDetail.childprice.number + that.orderDetails.amountDetail.adultprice.subAmount * that.orderDetails.amountDetail.adultprice.number + that.orderDetails.amountDetail.oldprice.subAmount * that.orderDetails.amountDetail.oldprice.number + that.orderDetails.amountDetail.roombalance + that.orderDetails.amountDetail.postage) / 100 + '元'
          // 获取代理商结算状态
          that.distributerId = that.orderDetails.distributerId
          that.disOrderStatus(that.distributerId)
          for (var i = 0; i < that.distributerData.length; i++) {
            if (that.distributerData[i].distributerId === that.orderDetails.distributerId) {
              that.orderDetails.distributerName = that.distributerData[i].distributerName
            }
          }
          // 转换运营负责人名称
          that.orderDetails.operatorName = ''
          for (var j = 0; j < that.managerOp.length; j++) {
            if (that.managerOp[j].managerId === that.orderDetails.operatorId) {
              that.orderDetails.operatorName = that.managerOp[j].managerName
            }
          }
          // 退款状态
          that.orderDetails.canceStatusStr = ''
          for (var a = 0; a < global.orderStandStatus.length; a++) {
            if (global.orderStandStatus[a].value === that.orderDetails.cancelStatus) {
              that.orderDetails.canceStatusStr = global.orderStandStatus[a].label
            } else if (that.orderDetails.cancelStatus === 0) {
              that.orderDetails.canceStatusStr = '---'
            }
          }
          // 取消类型
          that.orderDetails.cancelTypeStr = ''
          for (var q = 0; q < global.cancelType.length; q++) {
            if (global.cancelType[q].value === that.orderDetails.cancelType) {
              that.orderDetails.cancelTypeStr = global.cancelType[q].label
            } else if (that.orderDetails.cancelType === 0) {
              that.orderDetails.cancelTypeStr = '---'
            }
          }
          // 取消原因
          if (that.orderDetails.cancelReason === '') {
            that.orderDetails.cancelReason = '---'
          }
          // 发票
          that.orderDetails.typeStr = ''
          if (that.orderDetails.orderBill.length < 1) {
            that.orderDetails.typeStr = '---'
            that.orderBill.title = '---'
            that.orderBill.taxNum = '---'
          } else {
            for (var w = 0; w < global.invoiceType.length; w++) {
              if (global.invoiceType[w].value === that.orderDetails.orderBill.type) {
                that.orderDetails.typeStr = global.invoiceType[w].label
              }
            }
          }
          // 收件人
          if (that.orderDetails.receiverName === '') {
            that.orderDetails.receiverName = '---'
          }
          if (that.orderDetails.receiverTel === '') {
            that.orderDetails.receiverTel = '---'
          }
          if (that.orderDetails.receiverAddress === '') {
            that.orderDetails.receiverAddress = '---'
          }
          // 优惠券+积分
          if (that.orderDetails.coupon === 0) {
            that.orderDetails.coupon = '无'
          }
          if (that.orderDetails.integral === 0) {
            that.orderDetails.integral = '无'
          }
          // 支付渠道
          that.orderDetails.payTypeStr = ''
          for (var e = 0; e < global.payChannel.length; e++) {
            if (global.payChannel[e].value === that.orderDetails.payType) {
              that.orderDetails.payTypeStr = global.payChannel[e].label
            } else if (that.orderDetails.payType === 0) {
              that.orderDetails.payTypeStr = '---'
            }
          }
          // 支付方式
          that.orderDetails.payType2Str = ''
          for (var r = 0; r < global.payType.length; r++) {
            if (global.payType[r].value === that.orderDetails.payType2) {
              that.orderDetails.payType2Str = global.payType[r].label
            } else if (that.orderDetails.payType2 === 0) {
              that.orderDetails.payType2Str = '---'
            }
          }
//          that.orderDetails.isInternational = 1
          // 出行人列表
          for (var t = 0; t < that.travelerTable.length; t++) {
            // 证件类型
            for (var y = 0; y < global.cardTypeOp.length; y++) {
              if (global.cardTypeOp[y].value === that.travelerTable[t].cardType) {
                that.travelerTable[t].cardTypeStr = global.cardTypeOp[y].label
              }
            }
            // 职业身份
//            for (var u = 0; u < global.titleOp.length; u++) {
//              if (global.titleOp[u].value === that.travelerTable[t].title) {
//                that.travelerTable[t].titleStr = global.titleOp[u].label
//              }
//            }
            // 性别
            for (var o = 0; o < global.genderOp.length; o++) {
              if (global.genderOp[o].value === that.travelerTable[t].gender) {
                that.travelerTable[t].genderStr = global.genderOp[o].label
              }
            }
            // 年龄分组
            for (var p = 0; p < global.ageGroupOp.length; p++) {
              if (global.ageGroupOp[p].value === that.travelerTable[t].ageGroup) {
                that.travelerTable[t].ageGroupStr = global.ageGroupOp[p].label
              }
            }
            // 匹配护照信息
            for (var x = 0; x < that.passportList.length; x++) {
              if (that.travelerTable[t].id === that.passportList[x].linkManId) {
                that.travelerTable[t].countryId = that.passportList[x].countryId
                that.travelerTable[t].cardNumber = that.passportList[x].cardNumber
                that.travelerTable[t].birthday = that.passportList[x].birthday
                that.travelerTable[t].birthAdress = ''
                that.travelerTable[t].issueStartTime = ''
                that.travelerTable[t].issueEndTime = that.passportList[x].issueEndTime
//                that.travelerTable[t].issueAreaId = that.passportList[x].issueAreaId
                that.travelerTable[t].mobile = that.passportList[x].mobile
                for (var v = 0; v < global.passportType.length; v++) {
                  if (global.passportType[v].value === that.passportList[x].type) {
                    that.travelerTable[t].passportTypeStr = global.passportType[v].label
                  }
                }
                for (var m = 0; m < that.areaData.length; m++) {
                  if (that.areaData[m].id === that.passportList[x].issueAreaId) {
                    that.travelerTable[t].issueAreaName = that.areaData[m].name
                  }
                }
              }
            }
          }
          console.log(that.orderDetails)
          console.log('接收数据结束')
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 查询省市县名称 */
      areaGet: function () {
        var that = this
        axios.get(global.API + 'common/search/getChinaAreas', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Sys ' + global.getCookie('authorization')
          }
        }).then(function (response) {
          that.areaData = response.data
          that.orderDataGet()
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 进入界面即加载 */
      orderDataGet: function () {
        var that = this
        /** 获取代理商运营人员 */
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + global.getCookie('admin_token')
          }
        }).then(function (response) {
          that.managerOp = response.data.systemManagerDTOList
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
          that.distributerData = response.data.listDto
          that.getOrderDetails()
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 代理商订单状态 */
      disOrderStatus (distributerId) {
        var that = this
        var BODY = {
          distributerId: distributerId
        }
        axios.post('/api/commissionDetails/queryCommissionDetailsByJoin', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + global.getCookie('admin_token')
          }
        }).then(function (response) {
          that.disCommissionData = response.data.dtoList
//          console.log('打印当前分佣')
//          console.log(that.disCommissionData)
          for (var k = 0; k < that.disCommissionData.length; k++) {
            if (that.disCommissionData[k].orderId === that.orderDetails.ordersn) {
              if (that.disCommissionData[k].isTransferSuccess === false) {
                that.disSettleStatus = '未结算'
              }
              if (that.disCommissionData[k].isTransferSuccess === true) {
                that.disSettleStatus = '已结算'
              }
            }
          }
//          console.log('结束打印结算明细')
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
