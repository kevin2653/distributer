<template>
  <div style="background-color: #f2f2f2" align="center">
    <div style="background-color: #ffffff;width:90%" align="left">
      <br>
      <div style="margin-right: 5rem" align="right">
        <a @click="returnToUpLevel">返回</a>
      </div>
      <div style="width: 95%;margin-left: 10rem">
        <el-form label-width="200px" :model="orderDetails">
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
              <el-input style="width: 23.2rem" v-model="orderDetails.linkEmail"></el-input>
            </el-form-item>
            <el-form-item label="微信号:">
              <el-input style="width: 23.2rem" v-model="orderDetails.weixin"></el-input>
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
              <el-input style="width: 23.2rem" v-model="orderDetails.destination"></el-input>
            </el-form-item>
            <el-form-item label="出行天数:">
              <el-input style="width: 23.2rem" v-model="orderDetails.day"></el-input>
            </el-form-item>
            <el-form-item label="临时团号:">
              {{orderDetails.team_id}}
            </el-form-item>
            <el-form-item label="出行人数:">
              <label>成 人  </label><el-input style="width: 9rem" v-model="orderDetails.tourers.subNum.adult"></el-input>
              <label>儿 童  </label><el-input style="width: 9rem" v-model="orderDetails.tourers.subNum.child"></el-input>
            </el-form-item>
            <el-form-item label="出发日期:">
              <el-date-picker type="date" v-model="orderDetails.travelDate" placeholder="出发日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 23.2rem">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="返回日期:">
              <el-date-picker type="date" v-model="orderDetails.endDate" placeholder="返回日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 23.2rem">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="出发城市:">
              <el-input style="width: 23.2rem" v-model="orderDetails.fromCity"></el-input>
            </el-form-item>
            <el-form-item label="抵达城市:">
              <el-input style="width: 23.2rem" v-model="orderDetails.toCity"></el-input>
            </el-form-item>
            <el-form-item label="特色景点:">
              <el-input type="textarea" v-model="orderDetails.characteristic" :rows="2" placeholder="请输入内容" style="width: 23.2rem">
              </el-input>
            </el-form-item>
            <el-form-item label="机票要求:">
              <el-select placeholder="请选择" style="width: 8rem" v-model="orderDetails.planeTicket.ShippingSpace">
                <el-option v-for="item in selectM.cabinOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
              <label>-</label>
              <el-select placeholder="请选择" style="width: 8rem" v-model="orderDetails.planeTicket.type">
                <el-option v-for="item in selectM.modelOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
              <label>-</label>
              <el-input style="width: 15rem" placeholder="指定航空公司名称" v-model="orderDetails.planeTicket.appoint"></el-input>
            </el-form-item>
            <el-form-item label="酒店要求:">
              <el-select placeholder="请选择" style="width: 8rem" v-model="orderDetails.hotel.type">
                <el-option v-for="item in selectM.hotelTypeOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
              <label>-</label>
              <el-select placeholder="请选择" style="width: 8rem" v-model="orderDetails.hotel.stars">
                <el-option v-for="item in selectM.hotelStarOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
              <label>-</label>
              <el-select placeholder="请选择" style="width: 8rem" v-model="orderDetails.hotel.roomStandard">
                <el-option v-for="item in selectM.hotelRoomStandOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
              <label>-</label>
              <el-input style="width: 15rem" placeholder="指定酒店名称" v-model="orderDetails.hotel.appoint"></el-input>
            </el-form-item>
            <el-form-item label="车辆要求:">
              <label>巴士座位数  </label><el-input style="width: 7rem" v-model="orderDetails.cars.sites"></el-input>
              <label>-</label>
              <el-select placeholder="请选择" style="width: 8rem" v-model="orderDetails.cars.type">
                <el-option v-for="item in selectM.carStandOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
             </el-select>
              <label>-</label>
              <el-input style="width: 15rem" placeholder="指定车型名称" v-model="orderDetails.cars.appoint"></el-input>
            </el-form-item>
            <el-form-item label="餐食要求:">
              <label>菜数  </label><el-input style="width: 7rem" v-model="orderDetails.food.courses"></el-input>
              <label>-</label>
              <label>汤数  </label><el-input style="width: 7rem" v-model="orderDetails.food.soups"></el-input>
              <label>-</label>
              <label>特色餐饮数  </label><el-input style="width: 7rem" v-model="orderDetails.food.characteristic"></el-input>
            </el-form-item>
            <el-form-item label="指定特色餐:">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" style="width: 23.2rem" v-model="orderDetails.food.appoint"></el-input>
            </el-form-item>
            <el-form-item label="公务活动:">
              <el-input style="width: 23.2rem" v-model="orderDetails.activity.title"></el-input>
            </el-form-item>
            <el-form-item label="邀请函:">
              <el-select placeholder="请选择" style="width: 23.2rem" v-model="orderDetails.activity.InvitationType">
                <el-option v-for="item in selectM.invitationOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签证要求:">
              <el-select placeholder="请选择" style="width: 11rem" v-model="orderDetails.visa.reason">
                <el-option v-for="item in selectM.visaReasionOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
              <label>-</label>
              <el-select placeholder="请选择" style="width: 11rem" v-model="orderDetails.visa.type">
                <el-option v-for="item in selectM.visaTypeOp" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <br>
          <div align="center" style="margin-right: 30rem">
            <el-form-item>
              <el-button type="primary" @click="editOrder">保  存</el-button>
            </el-form-item>
          </div>
          <br>
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
        /** 下拉框管理 */
        selectM: {
          /** 机型 */
          modelOp: [{
            value: 1,
            label: '直达'
          }, {
            value: 2,
            label: '转机'
          }, {
            value: 99,
            label: '无需求'
          }],
          /** 仓位 */
          cabinOp: [{
            value: 1,
            label: '经济舱'
          }, {
            value: 2,
            label: '公务舱'
          }, {
            value: 3,
            label: '头等舱'
          }],
          /** 酒店类型 */
          hotelTypeOp: [{
            value: 1,
            label: '国家连锁'
          }, {
            value: 2,
            label: '常规15km'
          }, {
            value: 3,
            label: '市区10km'
          }, {
            value: 4,
            label: '市中心5km'
          }, {
            value: 99,
            label: '无需求'
          }],
          /** 酒店星级 */
          hotelStarOp: [{
            value: 1,
            label: '三星级'
          }, {
            value: 2,
            label: '四星级'
          }, {
            value: 3,
            label: '五星级'
          }],
          /** 酒店客房标准 */
          hotelRoomStandOp: [{
            value: 1,
            label: '标准双人间'
          }, {
            value: 2,
            label: '单间'
          }, {
            value: 3,
            label: '套房'
          }],
          /** 车辆要求 */
          carStandOp: [{
            value: 1,
            label: '司导分离'
          }, {
            value: 2,
            label: '司兼导'
          }],
          /** 活动邀请函 */
          invitationOp: [{
            value: 1,
            label: '邀请函客人自备'
          }, {
            value: 2,
            label: '邀请函我司提供'
          }],
          /** 签证原因 */
          visaReasionOp: [{
            value: 1,
            label: '因公'
          }, {
            value: 2,
            label: '因私'
          }],
          /** 签证类型 */
          visaTypeOp: [{
            value: 1,
            label: '个人旅游签证'
          }, {
            value: 2,
            label: 'ADS团队旅游签'
          }, {
            value: 3,
            label: '商签'
          }]
        },
        /** 当前订单号 */
        ordersn: '',
        /** 当前请求头 */
        authorization: '',
        /** 当前订单详情 */
        orderDetails: {}
      }
    },
    created: function () {
      this.orderDetails = JSON.parse(this.$route.query.orderDetails)
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
      // 编辑定制订单
      editOrder () {
        var that = this
        var BODY = that.orderDetails
        /** 获取订单详情产品 */
        axios.post(Vue.prototype.api + 'distrbuter/admin/customized/update', BODY, {
          headers: {
            'Authorization': 'Sys ' + that.getCookie('authorization'),
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          if (response.data.code === 'SUCCESS') {
            that.$router.push({path: '/line/lineCustomOrder/customOrderDetails', query: {customDetails: JSON.stringify(that.orderDetails)}})
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /** 返回上一层 */
      returnToUpLevel () {
        this.$router.push({path: '/line/lineCustomOrder/customOrderDetails', query: {customDetails: JSON.stringify(this.orderDetails)}})
      }
    }
  }
</script>
