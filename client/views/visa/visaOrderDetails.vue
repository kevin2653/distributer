<template>
  <div style="background-color: #f2f2f2" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="width: 95%;margin-left: 5rem">
        <el-form label-width="200px">
          <div>
            <label>联系人信息</label>
          </div>
          <br>
          <div>
            <el-form-item label="联系人姓名:">
              <!--{{orderDetails.linkMan}}-->
            </el-form-item>
            <el-form-item label="联系电话:">
              <!--{{orderDetails.linkTel}}-->
            </el-form-item>
            <el-form-item label="联系地址:">
              <!--{{orderDetails.linkEmail}}-->
            </el-form-item>
          </div>
          <br>
          <div>
            <label>线路产品订单信息</label>
          </div>
          <br>
          <div>
            <el-form-item label="订单编号:">
              <!--{{orderDetails.ordersn}}-->
            </el-form-item>
            <el-form-item label="订单创建时间:">
              <!--{{orderDetails.ordersn}}-->
            </el-form-item>
            <el-form-item label="签证产品名称:">
              <!--{{orderDetails.pName}}-->
            </el-form-item>
            <el-form-item label="支付方式:">
              <!--{{orderDetails.tourGroup}}-->
            </el-form-item>
            <el-form-item label="订单金额:">
              <!--{{travelerNum}}-->
            </el-form-item>
            <el-form-item label="订单状态:">
              <!--{{orderDetails.travelDate}}-->
            </el-form-item>
            <el-form-item label="签证负责人:">
              <!--{{orderDetails.cancel_status}}-->
            </el-form-item>
            <el-form-item label="面试时间:">
              <!--{{orderDetails.cancel_type}}-->
              <el-button type="primary" @click="" style="width: 8rem;margin-left: 10rem">编辑</el-button>
            </el-form-item>
            <el-form-item label="代理商名称:">
              <!--{{orderDetails.cancel_reason}}-->
            </el-form-item>
          </div>
          <br>
          <div>
            <label>签证申请人信息</label>
          </div>
          <br>
          <div>
            <el-form-item label="申请人姓名:">
              <!--{{distrubuterInfo.contactName}}-->
            </el-form-item>
            <el-form-item label="旅客身份:">
              <!--{{orderDetails.amount}}-->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="uploadData" style="width: 8rem;margin-left: -2rem">上传资料</el-button>
            </el-form-item>
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
        /** 出行人数 */
        travelerNum: '',
        /** 发票信息 */
        orderBill: {},
        /** 出行人列表 */
        travelerTable: [],
        /** 运营人员 */
        managerOp: [{}],
        /** 代理商 */
        distributerData: [{}],
        /** 代理商结算状态 */
        disSettleStatus: '',
        /** 代理商订单结算 */
        disCommissionData: [{}],
        /** 当前订单详情 */
        orderDetails: {}
      }
    },
    created: function () {
      this.ordersn = this.$route.query.ordersn
      this.orderDataGet()
//      this.areaGet()
//      this.dataGet()
    },
    updated: function () {
    },
    methods: {
      /** 上传资料 */
      uploadData () {
        this.$router.push({path: '/visa/visaOrderManage/visaOrderDetails/uploadData'})
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
      /** 进入界面即加载 */
      orderDataGet: function () {
        var that = this
        /** 获取代理商运营人员 */
        axios.get('/api/systemManager/queryAllSystemManagerByJoin', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.managerOp = response.data.systemManagerDTOList
          console.log(that.managerOp)
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取代理商 */
        axios.post('/api/distributerInfo/queryAllDistributerByJoin', {depath: ''}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.distributerData = response.data.listDto
          console.log(that.distributerData)
        }).catch(function (error) {
          console.log(error)
        })
        /** 获取订单详情产品 */
        axios.get('https://qa-api.yuelvhui.com/distrbuter/admin/order/detail/' + that.ordersn, {
          headers: {
            'Authorization': 'Sys ' + that.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          console.log('开始接收数据')
          that.orderDetails = response.data
          that.orderBill = response.data.orderBill
          that.travelerTable = response.data.tourers.list
          that.travelerNum = response.data.tourers.subNum.adult + '成人' + response.data.tourers.subNum.child + '儿童'
          that.orderDetails.amount = ((response.data.amount) / 100) + '元' + '(含单房差：' + (response.data.amountDetail.roombalance) / 100 + '元)'
          that.distributerId = that.orderDetails.distributerId
          that.disOrderStatus(that.distributerId)
          for (var i = 0; i < that.distributerData.length; i++) {
            if (that.distributerData[i].distributerId === that.orderDetails.distributerId) {
              that.orderDetails.distributerId = that.distributerData[i].distributerName
            }
          }
          // 转换运营负责人名称
//          for (var j = 0; j < that.managerOp.length; j++) {
//            if (that.managerOp[j].managerId === that.orderDetails.operationId) {
//              that.orderDetails.operationId = that.managerOp[j].managerName
//            }
//          }
          console.log(that.orderDetails)
          console.log('接收数据结束')
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
            'Authorization': 'Admin ' + that.getCookie('admin_token')
          }
        }).then(function (response) {
          that.disCommissionData = response.data.dtoList
          console.log(that.disCommissionData)
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
          console.log('结束打印结算明细')
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
