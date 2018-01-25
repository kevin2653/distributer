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
              {{orderDetails.requirementId}}
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
              {{orderDetails.team_id}}
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
            <el-button type="primary" @click="editCustomOrder">编  辑</el-button>
              <el-button type="primary" @click="dialogM.settingPrice = true">价格设置</el-button>
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
          <el-form class="demo-form-inline">
            <label>团号:</label><br>
            <label>单价(成人):</label><br>
            <label>成人:</label><br>
            <label>单价(儿童):</label><br>
            <label>儿童:</label><br>
            <label>支付总金额:</label><br>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogM.orderPayDialog = false">关 闭</el-button>
          </span>
      </el-dialog>
    </div>
    <!--价格设置弹窗-->
    <div>
      <el-dialog title="价格设置" :visible.sync="dialogM.settingPrice" width="30%" :modal-append-to-body="false" center>
        <div style="margin-left: 8rem">
          <el-form status-icon label-width="100px" class="demo-ruleForm">
            <el-form-item label="订单编号：">
            </el-form-item>
            <el-form-item label="目的地">
            </el-form-item>
            <el-form-item label="单价(成人)">
              <el-input style="width: 10rem"></el-input>
            </el-form-item>
            <el-form-item label="出行人数">
              <el-input style="width: 10rem"></el-input>
            </el-form-item>
            <el-form-item label="单价(儿童)">
              <el-input style="width: 10rem"></el-input>
            </el-form-item>
            <el-form-item label="出行人数">
              <el-input style="width: 10rem"></el-input>
            </el-form-item>
            <el-form-item label="支付总金额">
              <el-input style="width: 10rem"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogM.settingPrice = false">确  定</el-button>
            <el-button type="primary" @click="dialogM.settingPrice = false">关  闭</el-button>
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
        /** 弹框管理 */
        dialogM: {
          orderPayDialog: false,   /** 订单支付弹窗 */
          settingPrice: false,   /** 价格设置弹窗 */
          paySuccess: false    /** 支付成功弹窗 */
        },
        /** 出行人数 */
        travelerNum: '',
        /** 当前订单详情 */
        orderDetails: {},
        /** 定制需求支付表单 */
        customOrderPayForm: {},
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
        lineOrder: {}
      }
    },
    created: function () {
      this.lineOrder = JSON.parse(this.$route.query.lineOrder)
      this.orderDetails = JSON.parse(this.$route.query.customDetails)
      this.orderDataGet(this.orderDetails)
    },
    mounted: function () {},
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
          if (Number(this.selectM.cabinOp[i].value) === orderDetails.planeTicket.ShippingSpace) {
            orderDetails.planeClaim = orderDetails.planeClaim + this.selectM.cabinOp[i].label
          }
        }
        for (var m = 0; m < this.selectM.modelOp.length; m++) {
          if (Number(this.selectM.modelOp[m].value) === orderDetails.planeTicket.type) {
            orderDetails.planeClaim = orderDetails.planeClaim + '/' + this.selectM.modelOp[m].label
          }
        }
        if (orderDetails.planeTicket.appoint !== null) {
          orderDetails.planeClaim = orderDetails.planeClaim + '/' + orderDetails.planeTicket.appoint
        }
        // 酒店要求
        orderDetails.hotelClaim = ''
        for (var j = 0; j < this.selectM.hotelStarOp.length; j++) {
          if (Number(this.selectM.hotelStarOp[j].value) === orderDetails.hotel.stars) {
            orderDetails.hotelClaim = orderDetails.hotelClaim + this.selectM.hotelStarOp[j].label
          }
        }
        for (var l = 0; l < this.selectM.hotelRoomStandOp.length; l++) {
          if (Number(this.selectM.hotelRoomStandOp[l].value) === orderDetails.hotel.roomStandard) {
            orderDetails.hotelClaim = orderDetails.hotelClaim + '/' + this.selectM.hotelRoomStandOp[l].label
          }
        }
        for (var k = 0; k < this.selectM.hotelTypeOp.length; k++) {
          if (Number(this.selectM.hotelTypeOp[k].value) === orderDetails.hotel.type) {
            orderDetails.hotelClaim = orderDetails.hotelClaim + '/' + this.selectM.hotelTypeOp[k].label
          }
        }
        if (orderDetails.hotel.appoint !== null) {
          orderDetails.hotelClaim = orderDetails.hotelClaim + '/' + orderDetails.hotel.appoint
        }
        // 车辆要求
        orderDetails.carClaim = ''
        orderDetails.carClaim = orderDetails.cars.sites + '座'
        if (orderDetails.cars.appoint !== null) {
          orderDetails.carClaim = orderDetails.carClaim + orderDetails.cars.appoint
        }
        for (var n = 0; n < this.selectM.carStandOp.length; n++) {
          if (Number(this.selectM.carStandOp[n].value) === orderDetails.cars.type) {
            orderDetails.carClaim = orderDetails.carClaim + '/' + this.selectM.carStandOp[n].label
          }
        }
        if (orderDetails.cars.appoint !== null) {
          orderDetails.carClaim = orderDetails.carClaim + '/' + orderDetails.cars.appoint
        }
        // 餐食要求
        orderDetails.foodClaim = orderDetails.food.courses + '菜/' + orderDetails.food.soups + '汤/' + orderDetails.food.characteristic + '次特色餐'
        if (orderDetails.food.appoint !== null) {
          orderDetails.foodClaim = orderDetails.foodClaim + '/' + orderDetails.food.appoint
        }
        // 邀请函
        orderDetails.InvitationCard = ''
        for (var q = 0; q < this.selectM.invitationOp.length; q++) {
          if (Number(this.selectM.invitationOp[q].value) === orderDetails.activity.InvitationType) {
            orderDetails.InvitationCard = this.selectM.invitationOp[q].label
          }
        }
        // 签证要求
        orderDetails.visaClaim = ''
        for (var w = 0; w < this.selectM.visaReasionOp.length; w++) {
          if (Number(this.selectM.visaReasionOp[w].value) === orderDetails.visa.reason) {
            orderDetails.visaClaim = orderDetails.visaClaim + this.selectM.visaReasionOp[w].label
          }
        }
        for (var r = 0; r < this.selectM.visaTypeOp.length; r++) {
          if (Number(this.selectM.visaTypeOp[r].value) === orderDetails.visa.type) {
            orderDetails.visaClaim = orderDetails.visaClaim + '/' + this.selectM.visaTypeOp[r].label
          }
        }
      }
    }
  }
</script>
