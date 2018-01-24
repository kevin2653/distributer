 <template>
  <div style="background-color: #f2f2f2;" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
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
              <!--{{orderDetails.linkEmail}}-->
              xxxxxx
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
              <!--{{orderDetails.ordersn}}-->
            </el-form-item>
            <el-form-item label="目的地:">
              <!--{{orderDetails.ordersn}}-->
            </el-form-item>
            <el-form-item label="出行天数:">
              <!--{{orderDetails.ordersn}}-->
            </el-form-item>
            <el-form-item label="临时团号:">
              {{orderDetails.tourGroup}}
            </el-form-item>
            <el-form-item label="出行人数:">
              {{travelerNum}}
            </el-form-item>
            <el-form-item label="出发日期:">
              {{orderDetails.travelDate}}
            </el-form-item>
            <el-form-item label="返回日期:">
              {{orderDetails.travelDate}}
            </el-form-item>
            <el-form-item label="出发城市:">
              <!--{{orderDetails.cancel_status}}-->
            </el-form-item>
            <el-form-item label="抵达城市:">
              <!--{{orderDetails.cancel_type}}-->
            </el-form-item>
            <el-form-item label="特色景点:">
              <!--{{orderDetails.cancel_reason}}-->
            </el-form-item>
            <el-form-item label="机票要求:">
              <!--{{orderBill.type}}-->
            </el-form-item>
            <el-form-item label="酒店要求:">
              <!--{{orderBill.title}}-->
            </el-form-item>
            <el-form-item label="车辆要求:">
              <!--{{orderBill.taxNum}}-->
            </el-form-item>
            <el-form-item label="餐食要求:">
              <!--{{orderDetails.receiverName}}-->
            </el-form-item>
            <el-form-item label="公务活动:">
              <!--{{orderDetails.receiverTel}}-->
            </el-form-item>
            <el-form-item label="邀请函:">
              <!--{{orderDetails.receiverAddress}}-->
            </el-form-item>
            <el-form-item label="签证要求:">
              客人自备
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
        /** 当前订单号 */
        ordersn: '',
        /** 当前请求头 */
        authorization: '',
        /** 出行人数 */
        travelerNum: '',
        /** 当前订单详情 */
        orderDetails: {},
        /** 定制需求支付表单 */
        customOrderPayForm: {}
      }
    },
    created: function () {
      this.ordersn = this.$route.params.ordersn
      this.authorization = this.$route.params.authorization
      console.log(this.ordersn)
      console.log(this.authorization)
      this.orderDataGet()
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
      /** 编辑定制需求 */
      editCustomOrder () {
        this.$router.push({name: '编辑定制需求', params: {ordersn: this.ordersn, authorization: this.authorization}})
      },
      /** 定制需求订单支付 */
      customOrderPay () {
        this.dialogM.orderPayDialog = true
      },
      /** 进入界面即加载 */
      orderDataGet: function () {
        var that = this
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
          console.log(that.orderDetails)
          console.log('接收数据结束')
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
