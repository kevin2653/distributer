 <template>
  <div style="background-color: #f2f2f2;" align="center">
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
            <el-form-item label="微信号:">
              {{orderDetails.weixin}}
            </el-form-item>
          </div>
          <br>
          <div>
            <label>定制需求信息</label>
          </div>
          <div>
            <el-form-item label="订单编号:">
              {{orderDetails.ordersn}}
            </el-form-item>
            <el-form-item label="需求创建时间:">
              {{orderDetails.createTime}}
            </el-form-item>
            <el-form-item label="目的地:">
              {{orderDetails.destination}}
            </el-form-item>
            <el-form-item label="出行天数:">
              {{orderDetails.dayNum}}
            </el-form-item>
            <el-form-item label="临时团号:">
              {{orderDetails.teamId}}
            </el-form-item>
            <el-form-item label="出行人数:">
              <!--+ orderDetails.tourers.subNum.old-->
              {{orderDetails.tourersNum}}
            </el-form-item>
            <el-form-item label="出发日期:">
              {{orderDetails.travelDate}}
            </el-form-item>
            <el-form-item label="返回日期:">
              {{orderDetails.endDate}}
            </el-form-item>
            <el-form-item label="出发城市:">
              {{orderDetails.fromCity}}
            </el-form-item>
            <el-form-item label="抵达城市:">
              {{orderDetails.toCity}}
            </el-form-item>
            <el-form-item label="特色景点:">
              {{orderDetails.characteristic}}
            </el-form-item>
            <el-form-item label="机票要求:">
              {{orderDetails.planeClaim}}
            </el-form-item>
            <el-form-item label="酒店要求:">
              {{orderDetails.hotelClaim}}
            </el-form-item>
            <el-form-item label="车辆要求:">
              {{orderDetails.carClaim}}
            </el-form-item>
            <el-form-item label="餐食要求:">
              {{orderDetails.foodClaim}}
            </el-form-item>
            <el-form-item label="公务活动:">
              {{orderDetails.activity.title}}
            </el-form-item>
            <el-form-item label="邀请函:">
              {{orderDetails.InvitationCard}}
            </el-form-item>
            <el-form-item label="签证要求:">
              {{orderDetails.visaClaim}}
            </el-form-item>
          </div>
          <br>
          <div align="center" style="margin-right: 30rem">
            <el-form-item>
            <el-button type="primary" @click="editCustomOrder" disabled v-if="Number(orderDetails.orderId) > 0">编  辑</el-button>
              <el-button type="primary" @click="editCustomOrder" v-else>编  辑</el-button>
              <!--<el-button type="primary" @click="dialogM.settingPrice = true"></el-button>-->
              <el-button type="primary" @click="customOrderPay">支  付</el-button>
            </el-form-item>
          </div>
          <br>
        </el-form>
      </div>
    </div>
    <!--定制需求支付弹窗-->
    <div>
      <el-dialog title="订单支付" :visible.sync="dialogM.orderPayDialog" width="30%" :modal-append-to-body="false" center>
        <div style="margin-left: 5rem">
          <el-form class="demo-form-inline" :model="customOrderPayForm" :rules="rules" ref="customOrderPayForm">
            <label>团号: {{customOrderPayForm.teamId}}</label><br>
            <label>订单编号: {{customOrderPayForm.requirementId}}</label><br>
            <label>联系人: {{customOrderPayForm.linkMan}}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>电话: {{customOrderPayForm.linkTel}}</label><br>
            <label>成人: {{customOrderPayForm.adultStr}}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>儿童: {{customOrderPayForm.childStr}}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>老人: {{customOrderPayForm.oldStr}}</label><br>
            <el-form-item label="总支付金额" prop="amountStr" v-if="Number(orderDetails.orderId) === 0">
              <el-input style="width: 10rem" v-model.number="customOrderPayForm.amountStr"></el-input><label>元</label>
            </el-form-item>
            <el-form-item label="总支付金额" v-else>
              {{payParams.orderFeeStr}}
            </el-form-item>
            <el-form-item v-if="Number(orderDetails.orderId) === 0">
              <el-button type="primary" disabled v-if="customOrderPayForm.amountStr === ''" style="margin-left: 8rem">生成支付二维码</el-button>
              <el-button type="primary" @click="getPayORcode" v-else style="margin-left: 8rem">生成支付二维码</el-button>
            </el-form-item>
            <div id="qrCode" style="width: 100%;height:20rem;" align="center">
            </div>
            <br>
            <div  style="width: 100%;" align="center">
              <span v-if="Number(orderDetails.orderId) > 0">截图发给客户，扫码支付</span>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="dialogM.orderPayDialog = false">关 闭</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import global from '../../global'
  import QRCode from 'qrcodejs2'
  export default {
    components: {
      axios,
      global,
      QRCode
    },
    data () {
      return {
        /** 弹框管理 */
        dialogM: {
          orderPayDialog: false,   /** 订单支付弹窗 */
          paySuccess: false    /** 支付成功弹窗 */
        },
        /** 出行人数 */
        travelerNum: '',
        /** 当前订单详情 */
        orderDetails: {},
        /** 二维码支付参数 */
        payParams: {},
        /** 定制需求支付表单 */
        customOrderPayForm: {
          amountStr: ''
        },
        /** 下拉框管理 */
        selectM: {
          /** 机型 */
          modelOp: [{
            value: '1',
            label: '直达'
          }, {
            value: '2',
            label: '转机'
          }, {
            value: '99',
            label: '无需求'
          }],
          /** 仓位 */
          cabinOp: [{
            value: '1',
            label: '经济舱'
          }, {
            value: '2',
            label: '公务舱'
          }, {
            value: '3',
            label: '头等舱'
          }],
          /** 酒店类型 */
          hotelTypeOp: [{
            value: '1',
            label: '国家连锁'
          }, {
            value: '2',
            label: '常规15km'
          }, {
            value: '3',
            label: '市区10km'
          }, {
            value: '4',
            label: '市中心5km'
          }, {
            value: '99',
            label: '无需求'
          }],
          /** 酒店星级 */
          hotelStarOp: [{
            value: '1',
            label: '三星级'
          }, {
            value: '2',
            label: '四星级'
          }, {
            value: '3',
            label: '五星级'
          }],
          /** 酒店客房标准 */
          hotelRoomStandOp: [{
            value: '1',
            label: '标准双人间'
          }, {
            value: '2',
            label: '单间'
          }, {
            value: '3',
            label: '套房'
          }],
          /** 车辆要求 */
          carStandOp: [{
            value: '1',
            label: '司导分离'
          }, {
            value: '2',
            label: '司兼导'
          }],
          /** 活动邀请函 */
          invitationOp: [{
            value: '1',
            label: '邀请函客人自备'
          }, {
            value: '2',
            label: '邀请函我司提供'
          }],
          /** 签证原因 */
          visaReasionOp: [{
            value: '1',
            label: '因公'
          }, {
            value: '2',
            label: '因私'
          }],
          /** 签证类型 */
          visaTypeOp: [{
            value: '1',
            label: '个人旅游签证'
          }, {
            value: '2',
            label: 'ADS团队旅游签'
          }, {
            value: '3',
            label: '商签'
          }]
        },
        /** 上级携带数据 */
        lineOrder: {},
        rules: {
          amountStr: [
//            { required: true, message: '请输入开户银行卡号', trigger: 'blur' },
            { type: 'number', message: '请输入数字' }
          ]
        }
      }
    },
    created: function () {
      if (typeof this.$route.query.lineOrder !== 'undefined') {
        this.lineOrder = JSON.parse(this.$route.query.lineOrder)
      }
      this.orderDetails = JSON.parse(this.$route.query.customDetails)
//      console.log(this.orderDetails)
//      this.orderDetails.order_id = 0
//      if (Number(this.orderDetails.order_id) > 0) {
//        this.getPayParam()
//      }
      this.orderDataGet(this.orderDetails)
    },
    mounted: function () {},
    updated: function () {
      if (!this.dialogM.orderPayDialog) {
        document.getElementById('qrCode').innerHTML = ''
      }
    },
    methods: {
      // 调用支付接口
      getPayApiMethod (prepayBody) {
        var that = this
        var BODY = {
          prepayBody,
          tradeType: 'WX_NATIVE',
          sysSource: 'distributor'
        }
        axios.post(global.payApi, BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Sys ' + global.getCookie('authorization')
          }
        }).then(function (response) {
//          console.log('打印支付接口返回数据')
//          console.log(response.data)
          that.makeCode(response.data.getwayUrl)
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 生成二维码
      makeCode (text) {
//        var text = 'weixin://wxpay/bizpayurl?sign=' + this.payParams.sign + '&appid=' + this.payParams.mchId + '&mch_id=' + this.payParams.mchId + '&product_id=' + this.payParams.productId + '&time_stamp=' + this.payParams.expireTime.toString().substring(0, 10) + '&nonce_str=' + this.payParams.sign
//        console.log(text)
        var qrCode = new QRCode('qrCode', {
          text: '',
          width: 300,
          height: 300,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H})
        qrCode.makeCode(text)
      },
      // 点击下单
      getPayORcode () {
        var that = this
        var BODY = {
          requirementId: that.customOrderPayForm.requirementId,
          amount: Number(that.customOrderPayForm.amountStr) * 100
        }
        axios.post(global.API + 'distrbuter/admin/customized/addOrder', BODY, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Sys ' + global.getCookie('authorization')
          }
        }).then(function (response) {
//          console.log('打印二维码返回的数据')
//          console.log(response.data)
          if (response.data.orderId > 0) {
            that.orderDetails.orderId = response.data.orderId
            that.payParams.orderFeeStr = response.data.payParameter.orderFee / 100 + '.00'
            that.getPayApiMethod(response.data.payParameter)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 获取定制订单支付参数接口
      getPayParam () {
        var that = this
        axios.get(global.API + 'distrbuter/admin/customized/getPaymentCode/' + that.orderDetails.ordersn, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Sys ' + global.getCookie('authorization')
          }
        }).then(function (response) {
//          console.log('打印定制订单支付参数')
//          console.log(response.data)
          that.getPayApiMethod(response.data)
          that.payParams = response.data
          that.payParams.orderFeeStr = that.payParams.orderFee / 100 + '.00'
//          that.makeCode()
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 返回上一层 */
      returnToUpLevel () {
        this.$router.push({path: '/line/lineCustomOrder', query: {lineOrder: JSON.stringify(this.lineOrder)}})
      },
      /** 编辑定制需求 */
      editCustomOrder () {
        this.$router.push({path: '/line/lineCustomOrder/editCostomOrder', query: {orderDetails: JSON.stringify(this.orderDetails)}})
      },
      /** 定制需求订单支付 */
      customOrderPay () {
        this.dialogM.orderPayDialog = true
        this.customOrderPayForm.requirementId = this.orderDetails.requirementId // 订单号
        this.customOrderPayForm.teamId = this.orderDetails.teamId // 团号
        this.customOrderPayForm.linkMan = this.orderDetails.linkMan // 联系人
        this.customOrderPayForm.linkTel = this.orderDetails.linkTel // 联系电话
        this.customOrderPayForm.childStr = '无'
        if (global.isNull(this.orderDetails.tourers.subNum.child)) {
          this.customOrderPayForm.childStr = this.orderDetails.tourers.subNum.child + '人'
        }
        this.customOrderPayForm.adultStr = '无'
        if (global.isNull(this.orderDetails.tourers.subNum.adult)) {
          this.customOrderPayForm.adultStr = this.orderDetails.tourers.subNum.adult + '人'
        }
        this.customOrderPayForm.oldStr = '无'
        if (global.isNull(this.orderDetails.tourers.subNum.old)) {
          this.customOrderPayForm.oldStr = this.orderDetails.tourers.subNum.old + '人'
        }
        if (Number(this.orderDetails.orderId) > 0) {
          this.getPayParam()
        }
      },
      /** 进入界面即加载 */
      orderDataGet (orderDetails) {
        orderDetails.dayNum = orderDetails.day + '天'
        if (typeof orderDetails.tourers.subNum.old === 'undefined') {
          orderDetails.tourersNum = orderDetails.tourers.subNum.adult + '成人' + orderDetails.tourers.subNum.child + '儿童'
        } else {
          orderDetails.tourersNum = orderDetails.tourers.subNum.adult + '成人' + orderDetails.tourers.subNum.child + '儿童' + orderDetails.tourers.subNum.old + '老人'
        }
        orderDetails.planeClaim = ''
        // 机票要求
        for (var i = 0; i < this.selectM.cabinOp.length; i++) {
          if (Number(this.selectM.cabinOp[i].value) === Number(orderDetails.planeTicket.ShippingSpace)) {
            orderDetails.planeClaim = orderDetails.planeClaim + this.selectM.cabinOp[i].label
          }
        }
        for (var m = 0; m < this.selectM.modelOp.length; m++) {
          if (Number(this.selectM.modelOp[m].value) === Number(orderDetails.planeTicket.type)) {
            orderDetails.planeClaim = orderDetails.planeClaim + '/' + this.selectM.modelOp[m].label
          }
        }
        if (orderDetails.planeTicket.appoint !== null) {
          orderDetails.planeClaim = orderDetails.planeClaim + '/' + orderDetails.planeTicket.appoint
        }
        // 酒店要求
        orderDetails.hotelClaim = ''
        for (var j = 0; j < this.selectM.hotelStarOp.length; j++) {
          if (Number(this.selectM.hotelStarOp[j].value) === Number(orderDetails.hotel.stars)) {
            orderDetails.hotelClaim = orderDetails.hotelClaim + this.selectM.hotelStarOp[j].label
          }
        }
        for (var l = 0; l < this.selectM.hotelRoomStandOp.length; l++) {
          if (Number(this.selectM.hotelRoomStandOp[l].value) === Number(orderDetails.hotel.roomStandard)) {
            orderDetails.hotelClaim = orderDetails.hotelClaim + '/' + this.selectM.hotelRoomStandOp[l].label
          }
        }
        for (var k = 0; k < this.selectM.hotelTypeOp.length; k++) {
          if (Number(this.selectM.hotelTypeOp[k].value) === Number(orderDetails.hotel.type)) {
            orderDetails.hotelClaim = orderDetails.hotelClaim + '/' + this.selectM.hotelTypeOp[k].label
          }
        }
        if (orderDetails.hotel.appoint !== null) {
          orderDetails.hotelClaim = orderDetails.hotelClaim + '/' + orderDetails.hotel.appoint
        }
        // 车辆要求
        orderDetails.carClaim = ''
        if (Number(orderDetails.cars.sites) > 0) {
          orderDetails.carClaim = orderDetails.cars.sites + '座'
        }
        if (orderDetails.cars.appoint !== null) {
          orderDetails.carClaim = orderDetails.carClaim + orderDetails.cars.appoint
        }
        for (var n = 0; n < this.selectM.carStandOp.length; n++) {
          if (Number(this.selectM.carStandOp[n].value) === Number(orderDetails.cars.type)) {
            orderDetails.carClaim = orderDetails.carClaim + '/' + this.selectM.carStandOp[n].label
          }
        }
        if (orderDetails.cars.appoint !== null) {
          orderDetails.carClaim = orderDetails.carClaim + '/' + orderDetails.cars.appoint
        }
        // 餐食要求
        orderDetails.foodClaim = ''
        if (Number(orderDetails.food.courses) > 0) {
          orderDetails.foodClaim = orderDetails.foodClaim + orderDetails.food.courses + '菜/'
        }
        if (Number(orderDetails.food.soups) > 0) {
          orderDetails.foodClaim = orderDetails.foodClaim + orderDetails.food.soups + '汤/'
        }
        if (Number(orderDetails.food.characteristic) > 0) {
          orderDetails.foodClaim = orderDetails.foodClaim + orderDetails.food.characteristic + '次特色餐'
        }
//        orderDetails.foodClaim = orderDetails.food.courses + '菜/' + orderDetails.food.soups + '汤/' + orderDetails.food.characteristic + '次特色餐'
        if (orderDetails.food.appoint !== null) {
          orderDetails.foodClaim = orderDetails.foodClaim + '/' + orderDetails.food.appoint
        }
        // 邀请函
        orderDetails.InvitationCard = ''
        for (var q = 0; q < this.selectM.invitationOp.length; q++) {
          if (Number(this.selectM.invitationOp[q].value) === Number(orderDetails.activity.InvitationType)) {
            orderDetails.InvitationCard = this.selectM.invitationOp[q].label
          }
        }
        // 签证要求
        orderDetails.visaClaim = ''
        for (var w = 0; w < this.selectM.visaReasionOp.length; w++) {
          if (Number(this.selectM.visaReasionOp[w].value) === Number(orderDetails.visa.reason)) {
            orderDetails.visaClaim = orderDetails.visaClaim + this.selectM.visaReasionOp[w].label
          }
        }
        for (var r = 0; r < this.selectM.visaTypeOp.length; r++) {
          if (Number(this.selectM.visaTypeOp[r].value) === Number(orderDetails.visa.type)) {
            orderDetails.visaClaim = orderDetails.visaClaim + '/' + this.selectM.visaTypeOp[r].label
          }
        }
      }
    }
  }
</script>
